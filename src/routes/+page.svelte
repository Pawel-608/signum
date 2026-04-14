<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';

	import ProtocolCard from '$lib/components/ProtocolCard.svelte';
	import RiskMatrix from '$lib/components/RiskMatrix.svelte';
	import { protocols } from '$lib/data';

	const sortedByTvl = [...protocols].sort((a, b) => b.tvlNum - a.tvlNum);
</script>

<svelte:head>
	<title>Signum — Solana Protocol Risk Analysis</title>
</svelte:head>

<Nav />
<Hero />

<!-- Protocols Section -->
<section id="protocols" class="relative z-10 py-24">
	<div class="max-w-[1280px] mx-auto px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 items-end">
			<div>
				<div class="font-mono text-[0.6875rem] text-text-muted uppercase tracking-[0.1em] mb-6">
					01 — Protocol Analysis
				</div>
				<h2 class="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] leading-[1.1]">
					Individual protocol <span class="font-light text-text-secondary">risk profiles</span>
				</h2>
			</div>
			<p class="text-sm text-text-secondary leading-[1.7] max-w-[44ch]">
				Each protocol is scored on a 1-10 scale across four risk dimensions. Higher scores indicate greater risk exposure.
			</p>
		</div>

		<div class="flex flex-col gap-4">
			{#each sortedByTvl as protocol, i}
				<ProtocolCard {protocol} defaultOpen={i === 0} />
			{/each}
		</div>
	</div>
</section>

<!-- Risk Matrix Section -->
<section id="matrix" class="relative z-10 py-24">
	<div class="max-w-[1280px] mx-auto px-8">
		<hr class="border-0 border-t border-border-subtle" />
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 mb-12 items-end">
			<div>
				<div class="font-mono text-[0.6875rem] text-text-muted uppercase tracking-[0.1em] mb-6">
					02 — Comparative Matrix
				</div>
				<h2 class="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] leading-[1.1]">
					Cross-protocol <span class="font-light text-text-secondary">risk comparison</span>
				</h2>
			</div>
			<p class="text-sm text-text-secondary leading-[1.7] max-w-[44ch]">
				Side-by-side comparison of risk ratings across all monitored protocols and risk categories.
			</p>
		</div>

		<RiskMatrix />
	</div>
</section>
