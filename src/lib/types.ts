export interface Pool {
	name: string;
	size: string;
	risk: 'Low' | 'Medium' | 'High';
}

export interface RiskDimensions {
	smartContract: number;
	economic: number;
	operational: number;
	governance: number;
	counterparty: number;
	regulatory: number;
	reputational: number;
}

export interface Protocol {
	name: string;
	category: string;
	subcategories?: string[];
	color: string;
	tvlNum: number;
	tvl: string;
	tvlChange: string;
	audits: number;
	age: string;
	overallRisk: number;
	alert?: string;
	risks: RiskDimensions;
	pools: Pool[];
	signals: string[];
	details: string;
}
