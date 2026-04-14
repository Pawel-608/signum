<!--
	Icon grid visual — 2-column grid of labeled icon cards.
-->
<script lang="ts">
	let { items }: {
		items: { icon: string; label: string; desc: string }[];
	} = $props();
</script>

<div class="hidden lg:grid grid-cols-2 gap-3">
	{#each items as item}
		<div class="bg-bg-surface border border-border-subtle rounded-xl p-6 hover:border-border-default transition-colors">
			<div class="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center font-mono text-accent text-sm font-bold mb-4">{item.icon}</div>
			<div class="font-sans font-bold text-base text-text-primary mb-1">{item.label}</div>
			<div class="font-mono text-sm text-text-secondary">{item.desc}</div>
		</div>
	{/each}
</div>
