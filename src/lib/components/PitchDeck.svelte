<script lang="ts">
	import { onMount } from 'svelte';

	let current = $state(0);
	let direction = $state(1);
	let transitioning = $state(false);

	const slides: { id: string; eyebrow: string; title: string; subtitle?: string; body?: string; bullets?: string[]; stat?: { value: string; label: string }[]; cta?: string; visual?: 'rings' | 'grid' | 'bars' | 'chart' }[] = [
		{
			id: 'title',
			eyebrow: 'Investor Deck — 2026',
			title: 'Signum',
			subtitle: 'Real-time risk intelligence for Solana DeFi',
			body: 'Institutional-grade protocol risk scoring, monitoring, and alerts — so capital allocators can deploy with confidence.',
			visual: 'rings'
		},
		{
			id: 'problem',
			eyebrow: '01 — The Problem',
			title: '$8B+ in TVL with zero standardized risk data',
			bullets: [
				'DeFi protocols self-report metrics with no independent verification',
				'Fund managers rely on Twitter threads and Discord for risk signals',
				'Three major exploits in the last 12 months totaled $420M in losses',
				'No Bloomberg terminal equivalent exists for on-chain risk'
			],
			visual: 'bars'
		},
		{
			id: 'solution',
			eyebrow: '02 — The Solution',
			title: 'Continuous risk scoring across four dimensions',
			body: 'Signum monitors smart contract security, liquidity depth, governance structure, and oracle dependencies in real-time — delivering a single composite risk score per protocol.',
			bullets: [
				'Automated on-chain analysis — not manual audits',
				'Four risk dimensions scored 1–10 with transparent methodology',
				'Real-time alerts on score changes and anomaly detection',
				'API-first for integration into existing portfolio tools'
			],
			visual: 'grid'
		},
		{
			id: 'product',
			eyebrow: '03 — Product',
			title: 'Dashboard, API, and Alerts',
			bullets: [
				'Live dashboard tracking 8+ protocols and $8.4B in TVL',
				'REST & WebSocket API for programmatic access',
				'Configurable alert thresholds via email, Slack, and webhook',
				'Historical risk score timeseries for backtesting strategies'
			],
			stat: [
				{ value: '8', label: 'Protocols Tracked' },
				{ value: '4', label: 'Risk Dimensions' },
				{ value: '<5min', label: 'Update Latency' },
				{ value: '99.9%', label: 'Uptime SLA' }
			]
		},
		{
			id: 'market',
			eyebrow: '04 — Market',
			title: '$1.2T crypto AUM needs risk infrastructure',
			body: 'The total addressable market spans crypto hedge funds, DAOs, treasury managers, and institutional allocators entering DeFi.',
			stat: [
				{ value: '$1.2T', label: 'Crypto AUM (TAM)' },
				{ value: '$180B', label: 'DeFi TVL (SAM)' },
				{ value: '$12B', label: 'Solana DeFi (SOM)' },
				{ value: '340+', label: 'Target Institutions' }
			]
		},
		{
			id: 'model',
			eyebrow: '05 — Business Model',
			title: 'SaaS tiers + enterprise API licensing',
			bullets: [
				'Free tier — dashboard access with delayed data (top of funnel)',
				'Pro ($299/mo) — real-time data, alerts, API access, 10K calls/mo',
				'Enterprise (custom) — unlimited API, dedicated support, custom scoring',
				'Data licensing — risk feeds to exchanges, custodians, and insurers'
			],
			stat: [
				{ value: '$299', label: 'Pro Monthly' },
				{ value: '85%', label: 'Gross Margin' },
				{ value: '18mo', label: 'Payback Period' },
				{ value: '140%', label: 'Net Revenue Retention' }
			]
		},
		{
			id: 'traction',
			eyebrow: '06 — Traction',
			title: 'Early signals validate demand',
			bullets: [
				'3 pilot customers including a top-20 crypto fund',
				'$42K ARR with zero paid acquisition',
				'1,200+ monthly active dashboard users',
				'Featured in Solana Foundation ecosystem report'
			],
			stat: [
				{ value: '$42K', label: 'ARR' },
				{ value: '1.2K', label: 'MAU' },
				{ value: '3', label: 'Pilot Customers' },
				{ value: '28%', label: 'MoM Growth' }
			]
		},
		{
			id: 'team',
			eyebrow: '07 — Team',
			title: 'Built by risk engineers and protocol researchers',
			bullets: [
				'CEO — Ex-Chainalysis, 8 years in crypto risk & compliance',
				'CTO — Ex-Jump Crypto, Solana core contributor',
				'Head of Research — PhD Quantitative Finance, ex-Gauntlet',
				'Advisors from Multicoin Capital, Solana Foundation, and Anchorage'
			]
		},
		{
			id: 'ask',
			eyebrow: '08 — The Ask',
			title: 'Raising $4M Seed to scale coverage and go-to-market',
			body: 'Funds will be deployed across engineering (50%), sales (30%), and operations (20%) over an 18-month runway.',
			bullets: [
				'Expand from 8 to 40+ protocols across Solana, Ethereum, and Base',
				'Build enterprise sales team targeting top 50 crypto funds',
				'Launch insurance-grade risk feeds for on-chain underwriting',
				'Achieve $1M ARR within 12 months'
			],
			cta: 'signum.risk@proton.me'
		}
	];

	const total = slides.length;

	function go(index: number) {
		if (transitioning || index === current || index < 0 || index >= total) return;
		direction = index > current ? 1 : -1;
		transitioning = true;
		current = index;
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

	const ringData = [
		{ label: 'Contract', score: 4.6, color: 'var(--color-status-warning)' },
		{ label: 'Liquidity', score: 5.8, color: 'var(--color-status-warning)' },
		{ label: 'Governance', score: 6.4, color: 'var(--color-status-error)' },
		{ label: 'Oracle', score: 5.5, color: 'var(--color-status-warning)' }
	];
</script>

<svelte:window onkeydown={handleKey} />

<div
	class="fixed inset-0 overflow-hidden select-none bg-bg-primary text-text-primary"
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
	role="application"
	aria-label="Pitch deck presentation"
>
	<!-- Top bar -->
	<div class="fixed top-0 left-0 right-0 z-50">
		<!-- Progress bar -->
		<div class="h-[2px] bg-border-subtle">
			<div
				class="h-full bg-accent transition-all duration-500 ease-out"
				style="width: {((current + 1) / total) * 100}%"
			></div>
		</div>
		<!-- Logo + Counter -->
		<div class="flex items-center justify-between px-10 py-5">
			<a href="/" class="font-mono text-[0.8125rem] font-semibold tracking-[0.06em] uppercase no-underline text-text-primary hover:text-accent transition-colors">
				Sig<span class="text-accent">num</span>
			</a>
			<div class="font-mono text-xs text-text-muted">
				{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
			</div>
		</div>
	</div>

	<!-- Slides -->
	{#each slides as slide, i}
		<div
			class="absolute inset-0 flex items-center"
			style="transition: opacity 0.5s ease-out, transform 0.5s ease-out; opacity: {i === current ? 1 : 0}; transform: translateX({i === current ? 0 : i < current ? -100 : 100}%); pointer-events: {i === current ? 'auto' : 'none'};"
			aria-hidden={i !== current}
		>
			<div class="w-full max-w-[1280px] mx-auto px-8 md:px-16">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<!-- Text column -->
					<div class="max-w-[600px]">
						<div class="font-mono text-[0.6875rem] text-accent tracking-[0.12em] uppercase mb-6 flex items-center gap-3">
							<span class="w-6 h-px bg-accent"></span>
							{slide.eyebrow}
						</div>

						<h2
							class="font-sans font-bold tracking-[-0.03em] leading-[1.08] mb-8 text-text-primary"
							style="font-size: {slide.id === 'title' ? 'clamp(3rem,7vw,5.5rem)' : 'clamp(1.75rem,4vw,3rem)'}"
						>
							{#if slide.id === 'title'}
								<span class="block text-text-muted font-light text-[clamp(1rem,2vw,1.25rem)] tracking-[0.2em] uppercase mb-4">Introducing</span>
							{/if}
							{slide.title}
						</h2>

						{#if slide.subtitle}
							<p class="text-lg text-text-secondary font-light mb-6">{slide.subtitle}</p>
						{/if}

						{#if slide.body}
							<p class="text-[0.9375rem] text-text-muted leading-[1.8] mb-8 max-w-[52ch]">{slide.body}</p>
						{/if}

						{#if slide.bullets}
							<ul class="space-y-3 mb-8">
								{#each slide.bullets as bullet}
									<li class="flex items-start gap-3 text-[0.875rem] text-text-secondary leading-[1.7]">
										<span class="w-1 h-1 rounded-full bg-accent mt-2.5 shrink-0"></span>
										{bullet}
									</li>
								{/each}
							</ul>
						{/if}

						{#if slide.cta}
							<div class="inline-flex items-center gap-3 px-6 py-3 border border-accent/30 rounded-lg font-mono text-sm text-accent hover:bg-accent-dim transition-colors cursor-pointer">
								{slide.cta}
							</div>
						{/if}
					</div>

					<!-- Visual column -->
					{#if slide.stat}
						<div class="grid grid-cols-2 gap-px bg-border-subtle rounded-xl overflow-hidden">
							{#each slide.stat as s}
								<div class="bg-bg-surface p-8">
									<div class="font-mono text-[2rem] font-bold text-text-primary tracking-[-0.02em] mb-1">{s.value}</div>
									<div class="font-mono text-[0.6875rem] text-text-muted tracking-[0.06em] uppercase">{s.label}</div>
								</div>
							{/each}
						</div>
					{:else if slide.visual === 'rings'}
						<div class="hidden lg:flex flex-col items-center gap-8">
							<div class="grid grid-cols-2 gap-6">
								{#each ringData as ring}
									{@const circ = 2 * Math.PI * 38}
									{@const off = circ - (ring.score / 10) * circ}
									<div class="flex flex-col items-center gap-2">
										<div class="w-24 h-24 relative">
											<svg viewBox="0 0 96 96" class="w-full h-full -rotate-90">
												<circle cx="48" cy="48" r="38" fill="none" stroke="var(--color-border-subtle)" stroke-width="4" />
												<circle cx="48" cy="48" r="38" fill="none" stroke={ring.color} stroke-width="4" stroke-linecap="round"
													stroke-dasharray={circ} stroke-dashoffset={off} />
											</svg>
											<div class="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold" style="color: {ring.color}">
												{ring.score}
											</div>
										</div>
										<span class="font-mono text-[0.625rem] text-text-muted uppercase tracking-[0.08em]">{ring.label}</span>
									</div>
								{/each}
							</div>
							<div class="font-mono text-[0.625rem] text-text-muted tracking-[0.06em]">AVG RISK COMPOSITE: 5.6 / 10</div>
						</div>
					{:else if slide.visual === 'bars'}
						<div class="hidden lg:flex flex-col gap-5 bg-bg-surface border border-border-subtle rounded-xl p-8">
							{#each [
								{ label: 'Self-reported TVL accuracy', value: 34, color: 'var(--color-status-error)' },
								{ label: 'Protocols with independent audits', value: 52, color: 'var(--color-status-warning)' },
								{ label: 'Real-time risk monitoring', value: 12, color: 'var(--color-status-error)' },
								{ label: 'Institutional-grade data feeds', value: 8, color: 'var(--color-status-error)' }
							] as bar}
								<div>
									<div class="flex justify-between mb-2">
										<span class="font-mono text-[0.6875rem] text-text-muted">{bar.label}</span>
										<span class="font-mono text-[0.6875rem] font-semibold" style="color: {bar.color}">{bar.value}%</span>
									</div>
									<div class="h-1.5 bg-border-subtle rounded-full overflow-hidden">
										<div class="h-full rounded-full transition-all duration-1000" style="width: {i === current ? bar.value : 0}%; background: {bar.color}"></div>
									</div>
								</div>
							{/each}
							<div class="font-mono text-[0.625rem] text-text-muted mt-2">Source: DeFi Risk Infrastructure Report 2025</div>
						</div>
					{:else if slide.visual === 'grid'}
						<div class="hidden lg:grid grid-cols-2 gap-3">
							{#each [
								{ icon: '{}', label: 'Smart Contract', desc: 'Bytecode analysis & audit verification' },
								{ icon: '~', label: 'Liquidity', desc: 'Depth, concentration & redemption risk' },
								{ icon: '#', label: 'Governance', desc: 'Admin keys, multisig & voting power' },
								{ icon: '()', label: 'Oracle', desc: 'Feed diversity & manipulation resistance' }
							] as dim}
								<div class="bg-bg-surface border border-border-subtle rounded-xl p-6 hover:border-border-default transition-colors">
									<div class="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center font-mono text-accent text-sm font-bold mb-4">{dim.icon}</div>
									<div class="font-sans font-semibold text-sm text-text-primary mb-1">{dim.label}</div>
									<div class="font-mono text-[0.6875rem] text-text-muted">{dim.desc}</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/each}

	<!-- Navigation dots -->
	<div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
		{#each slides as _, i}
			<button
				class="h-2 rounded-full transition-all duration-300"
				style="width: {i === current ? '1.5rem' : '0.5rem'}; background: {i === current ? 'var(--color-accent)' : 'var(--color-border-default)'};"
				onclick={() => go(i)}
				aria-label="Go to slide {i + 1}"
			></button>
		{/each}
	</div>

	<!-- Arrow buttons -->
	<button
		class="fixed left-6 bottom-8 z-50 w-8 h-8 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-default transition-all font-mono text-xs"
		style="opacity: {current === 0 ? 0 : 1}; pointer-events: {current === 0 ? 'none' : 'auto'};"
		onclick={prev}
		aria-label="Previous slide"
	>
		&#8592;
	</button>
	<button
		class="fixed right-6 bottom-8 z-50 w-8 h-8 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-default transition-all font-mono text-xs"
		style="opacity: {current === total - 1 ? 0 : 1}; pointer-events: {current === total - 1 ? 'none' : 'auto'};"
		onclick={next}
		aria-label="Next slide"
	>
		&#8594;
	</button>
</div>
