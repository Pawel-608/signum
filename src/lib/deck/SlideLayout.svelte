<!--
	Two-column slide layout with text on the left and optional visual on the right.
	Use the `visual` snippet slot to render right-column content.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow,
		title,
		titleSize = 'normal',
		subtitle = '',
		body = '',
		bullets = [] as string[],
		cta = '',
		visual
	}: {
		eyebrow: string;
		title: string;
		titleSize?: 'hero' | 'normal';
		subtitle?: string;
		body?: string;
		bullets?: string[];
		cta?: string;
		visual?: Snippet;
	} = $props();
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
	<!-- Text column -->
	<div class="max-w-[640px]" style="margin-top: -4rem;">
		<div class="font-mono text-[0.9rem] text-accent tracking-[0.12em] uppercase mb-10 flex items-center gap-4">
			<span class="w-10 h-px bg-accent"></span>
			{eyebrow}
		</div>

		<h2
			class="font-sans font-extrabold tracking-[-0.04em] leading-[1.02] mb-10 text-text-primary"
			style="font-size: {titleSize === 'hero' ? 'clamp(4rem,9vw,7.5rem)' : 'clamp(2.4rem,5vw,4rem)'}"
		>
			{title}
		</h2>

		{#if subtitle}
			<p class="text-2xl text-text-secondary font-normal mb-10 whitespace-nowrap">{subtitle}</p>
		{/if}

		{#if body}
			<p class="text-lg text-text-secondary leading-[1.8] mb-10 max-w-[52ch]">{body}</p>
		{/if}

		{#if bullets.length > 0}
			<ul class="space-y-4 mb-10">
				{#each bullets as bullet}
					<li class="flex items-start gap-3 text-base text-text-secondary leading-[1.7]">
						<span class="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0"></span>
						{bullet}
					</li>
				{/each}
			</ul>
		{/if}

		{#if cta}
			<div class="inline-flex items-center gap-3 px-7 py-3.5 border border-accent/30 rounded-lg font-mono text-[0.9rem] text-accent hover:bg-accent-dim transition-colors cursor-pointer">
				{cta}
			</div>
		{/if}
	</div>

	<!-- Visual column -->
	{#if visual}
		<div>
			{@render visual()}
		</div>
	{/if}
</div>
