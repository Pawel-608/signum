<script lang="ts">
	import { onMount } from 'svelte';
	import type { Slide } from './types';

	let { slides }: { slides: Slide[] } = $props();

	let current = $state(0);
	let transitioning = $state(false);

	const total = $derived(slides.length);

	function go(index: number) {
		if (transitioning || index === current || index < 0 || index >= total) return;
		transitioning = true;
		current = index;
		history.replaceState(null, '', `#${index + 1}`);
		setTimeout(() => (transitioning = false), 500);
	}

	function next() { go(current + 1); }
	function prev() { go(current - 1); }

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
			e.preventDefault();
			next();
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			prev();
		}
	}

	let touchStartX = 0;
	function handleTouchStart(e: TouchEvent) { touchStartX = e.touches[0].clientX; }
	function handleTouchEnd(e: TouchEvent) {
		const diff = touchStartX - e.changedTouches[0].clientX;
		if (Math.abs(diff) > 60) diff > 0 ? next() : prev();
	}

	// Same wave algorithm as Hero, rendered to canvas once per slide at a frozen time
	let waveCanvases: HTMLCanvasElement[] = [];

	function renderWaveToCanvas(canvas: HTMLCanvasElement, t: number) {
		const CW = 10, CH = 16;
		const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
		const W = typeof window !== 'undefined' ? window.innerWidth : 1440;
		const H = typeof window !== 'undefined' ? window.innerHeight : 900;
		canvas.width = W * dpr;
		canvas.height = H * dpr;
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, W, H);
		ctx.font = `${CH}px 'IBM Plex Mono', monospace`;

		const cols = Math.floor(W / CW);
		const rows = Math.floor(H / CH);

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = c / cols;
				const y = r / rows;

				const w1 = Math.sin(x * 5 + t * 0.45 + y * 2.2) * 0.4;
				const w2 = Math.sin(x * 9 - t * 0.25 + y * 0.6) * 0.22;
				const w3 = Math.cos(x * 2.8 + t * 0.6 - y * 2.8) * 0.3;
				const w4 = Math.sin((x * 7 + y * 3.5) - t * 0.35) * 0.14;
				const height = w1 + w2 + w3 + w4;
				const surface = 0.48 + height;
				const dy = y - surface;
				const absDy = Math.abs(dy);

				if (absDy < 0.055) {
					const foam = absDy < 0.018;
					const h = 158 + height * 25;
					const s = foam ? 22 : 30;
					const l = foam ? 78 : 68 + height * 8;
					const a = foam ? 0.65 : 0.45;
					ctx.fillStyle = `hsla(${h},${s}%,${l}%,${a})`;
					ctx.fillText(foam ? '~' : '\u2248', c * CW, r * CH + CH);
				} else if (dy > 0) {
					const depth = dy * 2.8;
					const v = Math.max(0, 1 - depth);
					const chars = '\u00B7.:;\u2591\u2592\u2593\u2588\u2593\u2592\u2591:.\u00B7';
					const ci = Math.floor(v * (chars.length - 1));
					const ch = chars[Math.max(0, Math.min(ci, chars.length - 1))];
					const h = 155 + depth * 30;
					const l = 50 + v * 28;
					const a = v * 0.5;
					ctx.fillStyle = `hsla(${h},35%,${l}%,${a})`;
					ctx.fillText(ch, c * CW, r * CH + CH);
				} else {
					const skyD = -dy;
					if (skyD < 0.35) {
						const a = (0.35 - skyD) * 0.35;
						ctx.fillStyle = `hsla(160,12%,72%,${a})`;
						ctx.fillText('\u00B7', c * CW, r * CH + CH);
					}
				}
			}
		}
	}

	onMount(() => {
		const hash = parseInt(location.hash.replace('#', ''), 10);
		if (hash >= 1 && hash <= total) {
			current = hash - 1;
		}

		waveCanvases.forEach((canvas, i) => {
			if (canvas) renderWaveToCanvas(canvas, i * 3.5);
		});
	});
</script>

<svelte:window onkeydown={handleKey} />

<div
	class="deck-root"
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
	role="application"
	aria-label="Pitch deck presentation"
>
	<!-- Top bar -->
	<div class="deck-topbar">
		<div class="deck-progress">
			<div class="deck-progress-fill" style="width: {((current + 1) / total) * 100}%"></div>
		</div>
		<div class="deck-header">
			<a href="/" class="deck-logo">
				Sig<span>num</span>
			</a>
			<div class="deck-counter">
				{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
			</div>
		</div>
	</div>

	<!-- Slides -->
	{#each slides as slide, i}
		<div
			class="deck-slide"
			class:deck-slide--active={i === current}
			class:deck-slide--before={i < current}
			class:deck-slide--after={i > current}
			aria-hidden={i !== current}
		>
			<canvas class="deck-wave" bind:this={waveCanvases[i]}></canvas>
			<div class="deck-slide-inner">
				{@render slide.content()}
			</div>
		</div>
	{/each}

	<!-- Bottom nav -->
	<div class="deck-bottom">
		<button
			class="deck-arrow"
			style="visibility: {current === 0 ? 'hidden' : 'visible'}"
			onclick={prev}
			aria-label="Previous slide"
		>&#8592;</button>

		<div class="deck-dots">
			{#each slides as _, i}
				<button
					class="deck-dot"
					class:deck-dot--active={i === current}
					onclick={() => go(i)}
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
		</div>

		<button
			class="deck-arrow"
			style="visibility: {current === total - 1 ? 'hidden' : 'visible'}"
			onclick={next}
			aria-label="Next slide"
		>&#8594;</button>
	</div>
</div>

<style>
	/* All layout-critical CSS lives here — no Tailwind for positioning.
	   This renders in SSR so there's zero flash. */

	.deck-root {
		position: fixed;
		inset: 0;
		overflow: hidden;
		background: var(--color-bg-primary);
		color: var(--color-text-primary);
		font-family: var(--font-sans);
		user-select: none;
		z-index: 40;
	}

	/* ── Top bar ── */
	.deck-topbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 60;
		background: var(--color-bg-primary);
	}
	.deck-progress {
		height: 2px;
		background: var(--color-border-subtle);
	}
	.deck-progress-fill {
		height: 100%;
		background: var(--color-accent);
		transition: width 0.5s ease-out;
	}
	.deck-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 2.5rem;
	}
	.deck-logo {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--color-text-primary);
	}
	.deck-logo span { color: var(--color-accent); }
	.deck-counter {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	/* ── Wave background ── */
	.deck-wave {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		opacity: 0.35;
	}

	/* ── Slides ── */
	.deck-slide {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		transition: opacity 0.5s ease-out, transform 0.5s ease-out;
		will-change: opacity, transform;
	}
	.deck-slide--active {
		opacity: 1;
		transform: translateX(0);
		pointer-events: auto;
	}
	.deck-slide--before {
		opacity: 0;
		transform: translateX(-100%);
		pointer-events: none;
	}
	.deck-slide--after {
		opacity: 0;
		transform: translateX(100%);
		pointer-events: none;
	}
	.deck-slide-inner {
		width: 100%;
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 4rem;
	}
	@media (max-width: 768px) {
		.deck-slide-inner { padding: 0 2rem; }
	}

	/* ── Bottom nav ── */
	.deck-bottom {
		position: fixed;
		bottom: 2rem;
		left: 0;
		right: 0;
		z-index: 60;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		padding: 0 1.5rem;
	}
	.deck-dots {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.deck-dot {
		height: 0.5rem;
		width: 0.5rem;
		border-radius: 9999px;
		border: none;
		background: var(--color-border-default);
		cursor: pointer;
		padding: 0;
		transition: all 0.3s ease;
	}
	.deck-dot--active {
		width: 1.5rem;
		background: var(--color-accent);
	}
	.deck-arrow {
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border-default);
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.deck-arrow:hover {
		color: var(--color-text-primary);
		border-color: var(--color-text-muted);
	}
</style>
