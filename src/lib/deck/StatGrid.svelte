<!--
	2x2 stat grid visual for slides.
	Pass an array of { value, label } objects.
-->
<script lang="ts">
	let { stats }: { stats: { value: string; label: string }[] } = $props();

	function valueSize(v: string): string {
		if (v.length <= 4) return 'text-[2.5rem]';
		if (v.length <= 7) return 'text-[2rem]';
		return 'text-[1.6rem]';
	}
</script>

<div class="grid grid-cols-2 gap-px bg-border-subtle rounded-xl overflow-hidden">
	{#each stats as s}
		<div class="bg-bg-surface p-10 flex flex-col justify-center min-h-[140px]">
			<div class="font-mono {valueSize(s.value)} font-bold text-text-primary tracking-[-0.02em] mb-2">{s.value}</div>
			<div class="font-mono text-sm text-text-secondary tracking-[0.06em] uppercase">{s.label}</div>
		</div>
	{/each}
</div>
