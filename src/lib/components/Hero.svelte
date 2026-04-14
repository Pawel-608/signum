<script lang="ts">
	import { onMount } from 'svelte';

	let canvasEl: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let W = 0, H = 0, cols = 0, rows = 0, t = 0;
	const CW = 10, CH = 16;

	function resize() {
		if (!canvasEl) return;
		const dpr = window.devicePixelRatio || 1;
		W = window.innerWidth;
		H = window.innerHeight;
		canvasEl.width = W * dpr;
		canvasEl.height = H * dpr;
		ctx = canvasEl.getContext('2d');
		if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		cols = Math.floor(W / CW);
		rows = Math.floor(H / CH);
	}

	function draw() {
		if (!ctx) return;
		ctx.clearRect(0, 0, W, H);
		ctx.font = `${CH}px 'IBM Plex Mono', monospace`;
		t += 0.008;

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

		requestAnimationFrame(draw);
	}

	onMount(() => {
		resize();
		draw();
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	});
</script>

<!-- Full-viewport ocean layer -->
<div class="fixed inset-0 z-0 pointer-events-none">
	<canvas bind:this={canvasEl} class="block w-full h-full"></canvas>
</div>

<!-- Radial vignette to blend ocean into bg -->
<div
	class="fixed inset-0 z-1 pointer-events-none"
	style="background: radial-gradient(ellipse 90% 80% at 60% 50%, transparent 40%, var(--color-bg-primary) 80%);"
></div>

<!-- Hero content -->
<header class="relative z-10 min-h-screen flex items-center px-12 max-md:px-6" style="padding-bottom: 12vh;">
	<div class="max-w-[640px]">
		<h1
			class="reveal reveal-d2 font-display text-[clamp(3.2rem,6.5vw,5.8rem)] font-extrabold leading-[0.95] tracking-[-0.04em] mb-3"
		>
			Signum
		</h1>

		<p
			class="reveal reveal-d3 font-serif italic text-[clamp(1.4rem,3vw,2.4rem)] font-normal text-text-secondary leading-[1.2] tracking-[-0.01em] mb-12"
		>
			for Solana DeFi
		</p>

		<p
			class="reveal reveal-d4 font-mono text-[0.8rem] font-light leading-[1.85] text-text-secondary max-w-[44ch] mb-13"
		>
			Institutional-grade protocol risk scoring, monitoring, and alerts — so capital allocators can deploy with confidence.
		</p>

		<a
			href="#protocols"
			class="reveal reveal-d5 inline-flex items-center gap-2.5 font-mono text-[0.75rem] font-medium tracking-[0.03em] text-text-primary no-underline border-b border-text-muted pb-0.5 transition-all duration-300 hover:border-text-primary hover:gap-4"
		>
			Explore protocols <span>&rarr;</span>
		</a>
	</div>

	<!-- Bottom divider + stats -->
	<div
		class="absolute bottom-12 left-12 right-12 max-md:left-6 max-md:right-6 h-px bg-text-primary/8 origin-left"
		style="animation: lineGrow 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards; transform: scaleX(0);"
	></div>

	<div
		class="absolute bottom-14 right-12 max-md:right-6 flex gap-12 max-md:gap-6 opacity-0"
		style="animation: fadeIn 0.8s ease 1.4s forwards;"
	>
		<div class="text-right">
			<div class="font-mono text-[1.1rem] font-medium tracking-[-0.02em]">11</div>
			<div class="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-text-muted mt-0.5">Protocols</div>
		</div>
		<div class="text-right">
			<div class="font-mono text-[1.1rem] font-medium tracking-[-0.02em]">$5.89B</div>
			<div class="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-text-muted mt-0.5">TVL Tracked</div>
		</div>
		<div class="text-right">
			<div class="font-mono text-[1.1rem] font-medium tracking-[-0.02em]">10</div>
			<div class="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-text-muted mt-0.5">Audits Verified</div>
		</div>
	</div>

	<!-- Scroll hint -->
	<div
		class="absolute bottom-14 left-12 max-md:left-6 font-mono text-[0.6rem] tracking-[0.1em] uppercase text-text-muted opacity-0 max-md:hidden"
		style="writing-mode: vertical-lr; animation: fadeIn 0.8s ease 1.6s forwards;"
	>
		Scroll
	</div>
</header>
