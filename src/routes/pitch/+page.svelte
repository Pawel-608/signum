<script lang="ts">
	import { Deck, SlideLayout, StatGrid, RiskRings, BarChart, IconGrid } from '$lib/deck';
	import type { Slide } from '$lib/deck';

	const slides: Slide[] = [
		{ id: 'title', content: titleSlide },
		{ id: 'problem', content: problemSlide },
		{ id: 'solution', content: solutionSlide },
		{ id: 'product', content: productSlide },
		{ id: 'market', content: marketSlide },
		{ id: 'competition', content: competitionSlide },
		{ id: 'traction', content: tractionSlide },
		{ id: 'team', content: teamSlide },
	];
</script>

<svelte:head>
	<title>Signum — Pitch Deck</title>
</svelte:head>

<!-- ─── SLIDE DEFINITIONS ─── -->
<!-- To add a new slide: define a snippet below, then add it to the slides array above. -->

{#snippet titleSlide()}
	<SlideLayout
		eyebrow="Colosseum Eternal Hackathon — 2026"
		title="Signum"
		titleSize="hero"
		subtitle="Institutional-grade risk infrastructure for Solana DeFi"
	>
		{#snippet visual()}
			<RiskRings
				rings={[
					{ label: 'Smart Contract', score: 7.2 },
					{ label: 'Economic', score: 5.6 },
					{ label: 'Operational', score: 4.3 },
					{ label: 'Governance', score: 6.4 },
					{ label: 'Counterparty', score: 5.2 },
					{ label: 'Regulatory', score: 8.1 },
					{ label: 'Reputational', score: 7.4 }
				]}
				summary="7-DIMENSION RISK COMPOSITE"
			/>
		{/snippet}
	</SlideLayout>
{/snippet}

{#snippet problemSlide()}
	<SlideLayout
		eyebrow="01 — The Problem"
		title="80% of stolen funds come from risks no audit covers."
		body="Smart contract bugs caused 67% of losses in 2020. By 2024 — just 40%. Off-chain attacks now dominate."
	>
		{#snippet visual()}
			<BarChart
				bars={[
					{ label: 'Off-chain attacks (% of funds stolen)', value: 80, color: 'var(--color-status-error)' },
					{ label: 'Private key compromise alone', value: 44, color: 'var(--color-status-error)' },
					{ label: 'Smart contract exploits (↓ from 67%)', value: 40, color: 'var(--color-status-warning)' },
					{ label: 'Hacked protocols that had audits', value: 20, color: 'var(--color-status-warning)' },
					{ label: 'Protocols with zero audits', value: 43, color: 'var(--color-status-error)' }
				]}
				sources={[
					{ label: 'Halborn Top 100 DeFi Hacks', url: 'https://www.halborn.com/reports/top-100-defi-hacks-2025' },
					{ label: 'Chainalysis 2024', url: 'https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2025/' },
					{ label: 'Cicada Partners', url: 'https://medium.com/@cicadapartners/the-state-of-defi-exploit-risk-dd2b2c32b25f' },
					{ label: 'Landsman et al. (SSRN)', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5198563' }
				]}
			/>
		{/snippet}
	</SlideLayout>
{/snippet}

{#snippet solutionSlide()}
	<SlideLayout
		eyebrow="02 — The Solution"
		title="Seven risk dimensions, one composite score"
	>
		{#snippet visual()}
			<RiskRings
				size="lg"
				rings={[
					{ label: 'Smart Contract', score: 7.2 },
					{ label: 'Economic', score: 5.6 },
					{ label: 'Operational', score: 4.3 },
					{ label: 'Governance', score: 6.4 },
					{ label: 'Counterparty', score: 5.2 },
					{ label: 'Regulatory', score: 8.1 },
					{ label: 'Reputational', score: 7.4 }
				]}
				summary="7-DIMENSION RISK COMPOSITE"
			/>
		{/snippet}
	</SlideLayout>
{/snippet}

{#snippet competitionSlide()}
	<SlideLayout
		eyebrow="05 — Competition"
		title="Everyone covers a slice. Nobody covers it all."
	>
		{#snippet visual()}
			<div class="hidden lg:block bg-bg-surface border border-border-subtle rounded-xl p-5 overflow-hidden">
				<div class="flex justify-end gap-5 mb-3 font-mono text-xs text-text-muted">
					<span><span class="text-status-success">&#9679;</span> Covered</span>
					<span><span class="text-status-warning">&#9675;</span> Partial</span>
					<span><span class="text-border-default">&#8212;</span> None</span>
				</div>
				<table class="w-full font-mono border-collapse" style="border-spacing: 0;">
					<thead>
						<tr>
							<th class="text-left py-2.5 px-3 text-sm text-text-secondary font-semibold border-b-2 border-border-default"></th>
							<th class="text-center py-2.5 px-2 text-[0.7rem] text-text-muted font-semibold tracking-wide uppercase border-b-2 border-border-default">SC</th>
							<th class="text-center py-2.5 px-2 text-[0.7rem] text-text-muted font-semibold tracking-wide uppercase border-b-2 border-border-default">Econ</th>
							<th class="text-center py-2.5 px-2 text-[0.7rem] text-text-muted font-semibold tracking-wide uppercase border-b-2 border-border-default">Ops</th>
							<th class="text-center py-2.5 px-2 text-[0.7rem] text-text-muted font-semibold tracking-wide uppercase border-b-2 border-border-default">Gov</th>
							<th class="text-center py-2.5 px-2 text-[0.7rem] text-text-muted font-semibold tracking-wide uppercase border-b-2 border-border-default">Cpty</th>
							<th class="text-center py-2.5 px-2 text-[0.7rem] text-text-muted font-semibold tracking-wide uppercase border-b-2 border-border-default">Reg</th>
							<th class="text-center py-2.5 px-2 text-[0.7rem] text-text-muted font-semibold tracking-wide uppercase border-b-2 border-border-default">Rep</th>
							<th class="text-center py-2.5 px-2 text-[0.7rem] text-accent font-bold tracking-wide uppercase border-b-2 border-border-default">SOL</th>
						</tr>
					</thead>
					<tbody>
						{#each [
							{ name: 'Credora', cols: ['~', '1', '0', '0', '1', '0', '0', '0'] },
							{ name: 'Gauntlet', cols: ['0', '1', '0', '~', '0', '0', '0', '~'] },
							{ name: 'Chaos Labs', cols: ['0', '1', '0', '0', '0', '0', '0', '~'] },
							{ name: 'Exponential', cols: ['1', '~', '0', '~', '0', '0', '0', '~'] },
							{ name: 'Sentora', cols: ['0', '1', '0', '0', '0', '0', '0', '0'] },
							{ name: 'STRIDE', cols: ['1', '0', '1', '~', '0', '0', '0', '1'] },
						] as row}
							<tr class="border-b border-border-subtle">
								<td class="py-2.5 px-3 text-sm text-text-secondary font-medium">{row.name}</td>
								{#each row.cols as c}
									<td class="text-center py-2.5 px-2 text-base">
										{#if c === '1'}
											<span class="text-status-success">&#9679;</span>
										{:else if c === '~'}
											<span class="text-status-warning">&#9675;</span>
										{:else}
											<span class="text-border-default">&#8212;</span>
										{/if}
									</td>
								{/each}
							</tr>
						{/each}
						<tr class="border-t-2 border-accent/30">
							<td class="py-2.5 px-3 text-sm font-bold text-accent">Signum</td>
							{#each Array(8) as _}
								<td class="text-center py-2.5 px-2 text-base text-status-success font-bold">&#9679;</td>
							{/each}
						</tr>
					</tbody>
				</table>
			</div>
		{/snippet}
	</SlideLayout>
{/snippet}

{#snippet productSlide()}
	<SlideLayout
		eyebrow="03 — Product & Business Model"
		title="Recurring audits. Protocols pay annually. Results are public."
	>
		{#snippet visual()}
			<StatGrid stats={[
				{ value: '7', label: 'Risk Dimensions' },
				{ value: 'Annual', label: 'Subscription' },
				{ value: '85%', label: 'Gross Margin' },
				{ value: 'AI-Ready', label: 'Agent API' }
			]} />
		{/snippet}
	</SlideLayout>
{/snippet}

{#snippet marketSlide()}
	<SlideLayout
		eyebrow="04 — Market"
		title="The audit market is $2B and blind to 80% of risk"
	>
		{#snippet visual()}
			<StatGrid stats={[
				{ value: '$2B+', label: 'DeFi Audit Market' },
				{ value: '24.6%', label: 'CAGR' },
				{ value: '100+', label: 'Solana Protocols' },
				{ value: '$12B', label: 'Solana DeFi TVL' }
			]} />
		{/snippet}
	</SlideLayout>
{/snippet}

{#snippet tractionSlide()}
	<SlideLayout
		eyebrow="06 — Traction"
		title="Three protocols already want in"
	>
		{#snippet visual()}
			<div class="hidden lg:flex flex-col gap-5">
				<div class="bg-bg-surface border border-border-subtle rounded-xl p-7 flex items-center gap-7">
					<div class="w-14 h-14 rounded-xl bg-[#0a0a0a] flex items-center justify-center shrink-0 p-2">
						<img src="/team/derp-trade.png" alt="derp.trade" class="h-7 object-contain" />
					</div>
					<div>
						<div class="font-sans font-bold text-base text-text-primary">derp.trade</div>
						<div class="font-mono text-sm text-text-secondary mt-1">Solana perpetual trading protocol</div>
					</div>
				</div>
				<div class="bg-bg-surface border border-border-subtle rounded-xl p-7 flex items-center gap-7">
					<div class="w-14 h-14 rounded-xl bg-[#0a0a0a] flex items-center justify-center shrink-0 p-2">
						<img src="/team/action-codes.svg" alt="actioncodes.org" class="h-9 object-contain" />
					</div>
					<div>
						<div class="font-sans font-bold text-base text-text-primary">actioncodes.org</div>
						<div class="font-mono text-sm text-text-secondary mt-1">One-time action codes for Solana</div>
					</div>
				</div>
				<div class="bg-bg-surface border border-border-subtle rounded-xl p-7 flex items-center gap-7">
					<div class="w-14 h-14 rounded-xl bg-[#0a0a0a] flex items-center justify-center shrink-0 p-2">
						<img src="/team/tempo-trade.png" alt="tempotrade.xyz" class="h-9 object-contain" />
					</div>
					<div>
						<div class="font-sans font-bold text-base text-text-primary">tempotrade.xyz</div>
						<div class="font-mono text-sm text-text-secondary mt-1">Automated trading on Solana</div>
					</div>
				</div>
			</div>
		{/snippet}
	</SlideLayout>
{/snippet}

{#snippet teamSlide()}
	<SlideLayout
		eyebrow="07 — Team"
		title="Built by DeFi operators and security researchers"
	>
		{#snippet visual()}
			<div class="hidden lg:flex flex-col gap-4">
				<div class="flex items-center gap-5 bg-bg-surface border border-border-subtle rounded-xl p-5">
					<img src="/team/pawel_rainer.png" alt="pawel_rainer" class="w-14 h-14 rounded-full object-cover shrink-0" />
					<div>
						<div class="font-sans font-bold text-base text-text-primary">@pawel_rainer</div>
						<div class="font-mono text-sm text-text-secondary mt-1">Ex-CEO ionic.trade · DeFi product & risk strategy</div>
					</div>
				</div>
				<div class="flex items-center gap-5 bg-bg-surface border border-border-subtle rounded-xl p-5">
					<img src="/team/filip_sokolowski.jpg" alt="filip_sokolowski" class="w-14 h-14 rounded-full object-cover shrink-0" />
					<div>
						<div class="font-sans font-bold text-base text-text-primary">@filip_sokolowski</div>
						<div class="font-mono text-sm text-text-secondary mt-1">Ex-CTO ionic.trade · Solana protocol engineering</div>
					</div>
				</div>
				<div class="flex items-center gap-5 bg-bg-surface border border-border-subtle rounded-xl p-5">
					<img src="/team/meltedblocks.png" alt="meltedblocks" class="w-14 h-14 rounded-full object-cover shrink-0" />
					<div>
						<div class="font-sans font-bold text-base text-text-primary">@meltedblocks</div>
						<div class="font-mono text-sm text-text-secondary mt-1">Security auditor for top Solana protocols incl. Jito</div>
					</div>
				</div>
			</div>
		{/snippet}
	</SlideLayout>
{/snippet}


<Deck {slides} />
