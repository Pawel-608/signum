<!--
	Horizontal bar chart visual for slides.
	Pass bars array and whether the slide is currently active.
-->
<script lang="ts">
	let { bars, active = true, source = '', sources = [] as { label: string; url: string }[] }: {
		bars: { label: string; value: number; color: string }[];
		active?: boolean;
		source?: string;
		sources?: { label: string; url: string }[];
	} = $props();
</script>

<div class="hidden lg:flex flex-col gap-5 bg-bg-surface border border-border-subtle rounded-xl p-8">
	{#each bars as bar}
		<div>
			<div class="flex justify-between mb-2">
				<span class="font-mono text-sm text-text-secondary">{bar.label}</span>
				<span class="font-mono text-sm font-bold" style="color: {bar.color}">{bar.value}%</span>
			</div>
			<div class="h-2 bg-border-subtle rounded-full overflow-hidden">
				<div class="h-full rounded-full transition-all duration-1000" style="width: {active ? bar.value : 0}%; background: {bar.color}"></div>
			</div>
		</div>
	{/each}
	{#if sources.length > 0}
		<div class="font-mono text-xs text-text-muted mt-3 flex flex-wrap gap-x-4 gap-y-1">
			{#each sources as s}
				<a href={s.url} target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-accent underline decoration-text-muted/30 hover:decoration-accent transition-colors">
					{s.label}
				</a>
			{/each}
		</div>
	{:else if source}
		<div class="font-mono text-xs text-text-muted mt-3">{source}</div>
	{/if}
</div>
