export function riskColor(score: number): string {
	if (score <= 4) return 'var(--color-status-success)';
	if (score <= 6) return 'var(--color-status-warning)';
	return 'var(--color-status-error)';
}

export function riskLevel(score: number): 'low' | 'medium' | 'high' {
	if (score <= 4) return 'low';
	if (score <= 6) return 'medium';
	return 'high';
}

export function riskChipClasses(score: number): string {
	const level = riskLevel(score);
	const map = {
		low: 'text-status-success bg-status-success-bg',
		medium: 'text-status-warning bg-status-warning-bg',
		high: 'text-status-error bg-status-error-bg'
	};
	return map[level];
}
