<!--
	Risk score ring visualization.
	Pass an array of { label, score } objects. Color is derived from score:
	  ≥7 = green (success), 5–6.9 = yellow (warning), <5 = red (error).
	Use size="lg" for larger rings.
-->
<script lang="ts">
	let { rings, summary = '', size = 'default' }: {
		rings: { label: string; score: number }[];
		summary?: string;
		size?: 'default' | 'lg';
	} = $props();

	function scoreColor(score: number): string {
		if (score >= 7) return 'var(--color-status-success)';
		if (score >= 5) return 'var(--color-status-warning)';
		return 'var(--color-status-error)';
	}

	const topRow = rings.slice(0, 4);
	const bottomRow = rings.slice(4);

	const lg = $derived(size === 'lg');
</script>

<div class="hidden lg:flex flex-col items-center" class:gap-7={!lg} class:gap-8={lg}>
	<div class="flex justify-center" class:gap-6={!lg} class:gap-7={lg}>
		{#each topRow as ring}
			{@const circ = 2 * Math.PI * 36}
			{@const off = circ - (ring.score / 10) * circ}
			<div class="flex flex-col items-center" class:gap-2.5={!lg} class:gap-3={lg}>
				<div class="relative" class:w-24={!lg} class:h-24={!lg} class:w-32={lg} class:h-32={lg}>
					<svg viewBox="0 0 84 84" class="w-full h-full -rotate-90">
						<circle cx="42" cy="42" r="36" fill="none" stroke="var(--color-border-subtle)" stroke-width={lg ? 3 : 3.5} />
						<circle cx="42" cy="42" r="36" fill="none" stroke={scoreColor(ring.score)} stroke-width={lg ? 3 : 3.5} stroke-linecap="round"
							stroke-dasharray={circ} stroke-dashoffset={off} />
					</svg>
					<div class="absolute inset-0 flex items-center justify-center font-mono font-extrabold" class:text-lg={!lg} class:text-xl={lg} style="color: {scoreColor(ring.score)}">
						{ring.score}
					</div>
				</div>
				<span class="font-mono font-medium text-text-secondary uppercase tracking-[0.06em] text-center leading-tight" class:text-xs={!lg} class:text-sm={lg}>{ring.label}</span>
			</div>
		{/each}
	</div>
	{#if bottomRow.length > 0}
		<div class="flex justify-center" class:gap-6={!lg} class:gap-7={lg}>
			{#each bottomRow as ring}
				{@const circ = 2 * Math.PI * 36}
				{@const off = circ - (ring.score / 10) * circ}
				<div class="flex flex-col items-center" class:gap-2.5={!lg} class:gap-3={lg}>
					<div class="relative" class:w-24={!lg} class:h-24={!lg} class:w-32={lg} class:h-32={lg}>
						<svg viewBox="0 0 84 84" class="w-full h-full -rotate-90">
							<circle cx="42" cy="42" r="36" fill="none" stroke="var(--color-border-subtle)" stroke-width={lg ? 3 : 3.5} />
							<circle cx="42" cy="42" r="36" fill="none" stroke={scoreColor(ring.score)} stroke-width={lg ? 3 : 3.5} stroke-linecap="round"
								stroke-dasharray={circ} stroke-dashoffset={off} />
						</svg>
						<div class="absolute inset-0 flex items-center justify-center font-mono font-extrabold" class:text-lg={!lg} class:text-xl={lg} style="color: {scoreColor(ring.score)}">
							{ring.score}
						</div>
					</div>
					<span class="font-mono font-medium text-text-secondary uppercase tracking-[0.06em] text-center leading-tight" class:text-xs={!lg} class:text-sm={lg}>{ring.label}</span>
				</div>
			{/each}
		</div>
	{/if}
	{#if summary}
		<div class="font-mono text-sm font-semibold text-text-secondary tracking-[0.08em] mt-2">{summary}</div>
	{/if}
</div>
