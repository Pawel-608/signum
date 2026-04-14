<script lang="ts">
	import type { Protocol } from '$lib/types';
	import { riskLabels } from '$lib/data';
	import { riskColor } from '$lib/utils';

	let { protocol, defaultOpen = false }: { protocol: Protocol; defaultOpen?: boolean } = $props();

	let isOpen = $state(defaultOpen);

	const circumference = 2 * Math.PI * 23;
	let offset = $derived(circumference - (protocol.overallRisk / 10) * circumference);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div
	class="bg-bg-surface border rounded-xl overflow-hidden transition-colors duration-200
		{protocol.alert ? 'border-status-error/40' : isOpen ? 'border-border-default bg-bg-surface-hover' : 'border-border-subtle hover:border-border-default hover:bg-bg-surface-hover'}"
>
	{#if protocol.alert}
		<div class="flex items-center gap-3 px-6 py-3 bg-status-error-bg border-b border-status-error/20">
			<span class="font-mono text-[0.7rem] font-bold text-status-error tracking-[0.06em] uppercase">&#9888; ALERT</span>
			<span class="font-mono text-[0.75rem] text-status-error">{protocol.alert}</span>
		</div>
	{/if}
	<!-- Summary button -->
	<button
		type="button"
		class="w-full grid grid-cols-[auto_1fr_auto_auto] max-md:grid-cols-[auto_1fr_auto] gap-6 max-md:gap-4 items-center p-6 border-0 bg-transparent text-inherit text-left cursor-pointer"
		aria-expanded={isOpen}
		onclick={toggle}
	>
		<div
			class="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-[0.8125rem] font-bold shrink-0"
			style="background: {protocol.color}18; color: {protocol.color}"
		>
			{protocol.name.substring(0, 2).toUpperCase()}
		</div>
		<div class="flex flex-col gap-0.5">
			<div class="font-sans text-lg font-semibold tracking-[-0.01em]">{protocol.name}</div>
			<div class="font-mono text-[0.6875rem] text-text-muted tracking-[0.04em]">
				{protocol.category}{#if protocol.subcategories} — <span class="text-text-muted/70">{protocol.subcategories.join(', ')}</span>{/if}
			</div>
		</div>
		<div class="flex gap-8 max-md:gap-4 items-center font-mono text-xs text-text-muted max-md:col-span-full max-md:justify-between">
			<span>
				<strong class="block text-text-primary text-[0.9375rem] font-semibold leading-tight">{protocol.tvl}</strong>
				TVL
			</span>
		</div>
		<!-- Risk ring -->
		<div class="w-14 h-14 relative">
			<svg viewBox="0 0 56 56" class="w-full h-full -rotate-90">
				<circle cx="28" cy="28" r="23" fill="none" stroke="var(--color-border-default)" stroke-width="3" />
				<circle
					cx="28"
					cy="28"
					r="23"
					fill="none"
					stroke={riskColor(protocol.overallRisk)}
					stroke-width="3"
					stroke-linecap="round"
					stroke-dasharray={circumference}
					stroke-dashoffset={offset}
					class="transition-[stroke-dashoffset] duration-1000"
				/>
			</svg>
			<div
				class="absolute inset-0 flex items-center justify-center font-mono text-[0.8125rem] font-semibold"
				style="color: {riskColor(protocol.overallRisk)}"
			>
				{protocol.overallRisk}
			</div>
		</div>
		<!-- Toggle icon -->
		<span
			class="w-7 h-7 border border-border-default rounded-lg inline-flex items-center justify-center font-mono transition-all duration-200
				{isOpen ? 'rotate-45 text-accent' : 'text-text-muted'}"
		>
			+
		</span>
	</button>

	<!-- Details panel -->
	{#if isOpen}
		<div class="px-8 pb-8 max-md:px-6 max-md:pb-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border-subtle">
				<!-- Description -->
				<p class="col-span-full text-text-secondary text-sm leading-[1.7] max-w-[80ch]">
					{protocol.details}
				</p>

				<!-- Pools -->
				<div class="bg-bg-primary border border-border-subtle rounded-lg p-6">
					<div class="font-mono text-[0.6875rem] text-text-muted tracking-[0.08em] uppercase mb-4">
						Pools and Markets
					</div>
					<div class="flex flex-col gap-2">
						{#each protocol.pools as pool}
							<div class="grid grid-cols-[1fr_auto_auto] max-md:grid-cols-1 gap-4 max-md:gap-1 items-center py-2 border-b border-border-subtle last:border-b-0 font-mono text-xs">
								<span class="text-text-primary font-semibold">{pool.name}</span>
								<span class="text-text-muted">{pool.size}</span>
								<span class="text-text-muted">{pool.risk} risk</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Metrics -->
				<div class="bg-bg-primary border border-border-subtle rounded-lg p-6">
					<div class="font-mono text-[0.6875rem] text-text-muted tracking-[0.08em] uppercase mb-4">
						Protocol Metrics
					</div>
					<div class="grid grid-cols-2 gap-px bg-border-subtle rounded-lg overflow-hidden mb-6">
						<div class="bg-bg-primary p-4">
							<div class="font-mono text-[0.625rem] text-text-muted tracking-[0.06em] uppercase mb-0.5">TVL</div>
							<div class="font-mono text-[0.9375rem] font-medium">{protocol.tvl}</div>
						</div>
						<div class="bg-bg-primary p-4">
							<div class="font-mono text-[0.625rem] text-text-muted tracking-[0.06em] uppercase mb-0.5">30d Change</div>
							<div
								class="font-mono text-[0.9375rem] font-medium"
								style="color: {protocol.tvlChange.startsWith('+') ? 'var(--color-status-success)' : 'var(--color-status-error)'}"
							>
								{protocol.tvlChange}
							</div>
						</div>
						<div class="bg-bg-primary p-4">
							<div class="font-mono text-[0.625rem] text-text-muted tracking-[0.06em] uppercase mb-0.5">Audits</div>
							<div class="font-mono text-[0.9375rem] font-medium">{protocol.audits}</div>
						</div>
						<div class="bg-bg-primary p-4">
							<div class="font-mono text-[0.625rem] text-text-muted tracking-[0.06em] uppercase mb-0.5">Age</div>
							<div class="font-mono text-[0.9375rem] font-medium">{protocol.age}</div>
						</div>
					</div>
				</div>

				<!-- Risk Dimensions -->
				<div class="bg-bg-primary border border-border-subtle rounded-lg p-6">
					<div class="font-mono text-[0.6875rem] text-text-muted tracking-[0.08em] uppercase mb-4">
						Risk Dimensions
					</div>
					<div class="flex flex-col gap-2">
						{#each Object.entries(protocol.risks) as [key, val]}
							<div class="flex items-center gap-4">
								<span class="font-mono text-[0.6875rem] text-text-muted min-w-[100px]">{riskLabels[key] ?? key}</span>
								<div class="flex-1 h-1 bg-border-subtle rounded-full overflow-hidden">
									<div
										class="h-full rounded-full transition-[width] duration-1000 ease-out"
										style="width: {val * 10}%; background: {riskColor(val)}"
									></div>
								</div>
								<span class="font-mono text-[0.6875rem] font-medium min-w-[28px] text-right" style="color: {riskColor(val)}">
									{val}
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Signals -->
				<div class="bg-bg-primary border border-border-subtle rounded-lg p-6">
					<div class="font-mono text-[0.6875rem] text-text-muted tracking-[0.08em] uppercase mb-4">
						Signals
					</div>
					<div class="flex flex-col gap-2">
						{#each protocol.signals as signal}
							<div class="py-2 border-b border-border-subtle last:border-b-0 font-mono text-xs font-semibold text-text-primary">
								{signal}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
