<script lang="ts">
	import { protocols, riskKeys, riskLabels } from '$lib/data';
	import { riskLevel } from '$lib/utils';

	const sorted = [...protocols].sort((a, b) => a.overallRisk - b.overallRisk);

	const chipClasses: Record<string, string> = {
		low: 'text-status-success bg-status-success-bg',
		medium: 'text-status-warning bg-status-warning-bg',
		high: 'text-status-error bg-status-error-bg'
	};
</script>

<div class="overflow-x-auto">
	<table class="w-full border-collapse">
		<thead>
			<tr>
				<th class="font-mono text-[0.6875rem] text-text-muted tracking-[0.06em] uppercase text-left p-4 border-b border-border-default sticky top-0 bg-bg-primary">
					Protocol
				</th>
				{#each [...riskKeys.map(k => riskLabels[k]), 'Overall'] as header}
					<th class="font-mono text-[0.6875rem] text-text-muted tracking-[0.06em] uppercase text-center p-4 border-b border-border-default sticky top-0 bg-bg-primary">
						{header}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each sorted as p}
				<tr class="border-b border-border-subtle hover:bg-bg-surface transition-colors duration-150">
					<td class="p-6 font-mono text-[0.8125rem]">
						<div class="flex items-center gap-4 font-sans font-medium">
							<span class="w-2 h-2 rounded-full shrink-0" style="background: {p.color}"></span>
							{p.name}
						</div>
					</td>
					{#each riskKeys as key}
						<td class="p-6 text-center">
							<span class="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full font-mono text-[0.6875rem] font-medium {chipClasses[riskLevel(p.risks[key])]}">
								{p.risks[key]}
							</span>
						</td>
					{/each}
					<td class="p-6 text-center">
						<span class="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full font-mono text-[0.6875rem] font-semibold {chipClasses[riskLevel(p.overallRisk)]}">
							{p.overallRisk}
						</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
