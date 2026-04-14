import type { Protocol } from './types';

export const protocols: Protocol[] = [
	{
		name: 'Kamino',
		category: 'Lending & Liquidity',
		subcategories: ['Lending', 'Liquidity Vaults', 'Multiply'],
		color: '#0d9468',
		tvlNum: 1868,
		tvl: '$1.87B',
		tvlChange: '+9.13%',
		audits: 2,
		age: '1y 10m',
		overallRisk: 5.4,
		risks: { smartContract: 5, economic: 6, operational: 5, governance: 6, counterparty: 5, regulatory: 4, reputational: 4 },
		pools: [
			{ name: 'SOL Lending Market', size: '$620M', risk: 'Medium' },
			{ name: 'USDC Lending Market', size: '$530M', risk: 'Medium' },
			{ name: 'Multiply Vaults', size: '$340M', risk: 'High' }
		],
		signals: ['Lending collateral concentration', 'Vault strategy automation', 'Admin and parameter controls'],
		details:
			'Largest protocol on Solana by TVL. Combines lending, concentrated liquidity vaults, and multiply strategies. Audited by two independent firms.'
	},
	{
		name: 'Jupiter',
		category: 'DEX Aggregator',
		subcategories: ['Aggregator', 'Perpetuals', 'Lending', 'Staked SOL'],
		color: '#5a8a1e',
		tvlNum: 1863,
		tvl: '$1.86B',
		tvlChange: '+7.7%',
		audits: 0,
		age: '2y 8m',
		overallRisk: 5.8,
		risks: { smartContract: 6, economic: 7, operational: 5, governance: 6, counterparty: 6, regulatory: 4, reputational: 3 },
		pools: [
			{ name: 'JLP Pool', size: '$735M', risk: 'High' },
			{ name: 'Jupiter Lend', size: '$605M', risk: 'Medium' },
			{ name: 'SOL / USDC Route', size: '$520M', risk: 'Medium' }
		],
		signals: ['Aggregator routing dependency', 'JLP pool counterparty risk', 'Oracle-backed perps markets'],
		details:
			'Largest DEX aggregator on Solana with lending and perpetual exchange. JLP pool carries counterparty risk from leveraged perps trading. No publicly listed audits.'
	},
	{
		name: 'Sanctum',
		category: 'Liquid Staking',
		subcategories: ['Validator LSTs', 'Infinity Pool'],
		color: '#7c3aed',
		tvlNum: 1379,
		tvl: '$1.38B',
		tvlChange: '+13.21%',
		audits: 0,
		age: '1y 6m',
		overallRisk: 5.8,
		risks: { smartContract: 6, economic: 5, operational: 6, governance: 7, counterparty: 5, regulatory: 4, reputational: 5 },
		pools: [
			{ name: 'Validator LST Pool', size: '$1.0B', risk: 'Low' },
			{ name: 'Infinity Pool', size: '$192M', risk: 'Medium' },
			{ name: 'LST Liquidity', size: '$188M', risk: 'Medium' }
		],
		signals: ['No public audit reports', 'Rapid TVL growth', 'Validator set concentration'],
		details:
			'Validator-specific liquid staking tokens on Solana. Enables any validator to create their own LST. Fast-growing but lacks publicly disclosed audits.'
	},
	{
		name: 'Raydium',
		category: 'DEX / AMM',
		subcategories: ['CLMM', 'Standard AMM', 'Launchpad'],
		color: '#6366f1',
		tvlNum: 1023,
		tvl: '$1.02B',
		tvlChange: '+7.19%',
		audits: 0,
		age: '3y 5m',
		overallRisk: 6.2,
		risks: { smartContract: 7, economic: 6, operational: 6, governance: 8, counterparty: 5, regulatory: 5, reputational: 4 },
		pools: [
			{ name: 'SOL / USDC CLMM', size: '$280M', risk: 'Medium' },
			{ name: 'RAY / SOL', size: '$110M', risk: 'High' },
			{ name: 'Launchpad Pools', size: '$85M', risk: 'High' }
		],
		signals: ['No public audits listed', 'Concentrated liquidity ranges', 'RAY incentive dependency'],
		details:
			'Hybrid AMM with concentrated liquidity. One of the oldest DEXes on Solana. $174M daily volume. No publicly listed audits despite $1B+ TVL.'
	},
	{
		name: 'Jito',
		category: 'Liquid Staking / MEV',
		subcategories: ['Liquid Staking', 'MEV Tips', 'Restaking', 'DAO'],
		color: '#059669',
		tvlNum: 968,
		tvl: '$968.6M',
		tvlChange: '+7.27%',
		audits: 2,
		age: '2y 3m',
		overallRisk: 4.2,
		risks: { smartContract: 3, economic: 4, operational: 4, governance: 5, counterparty: 4, regulatory: 4, reputational: 3 },
		pools: [
			{ name: 'JitoSOL Stake Pool', size: '$965M', risk: 'Low' },
			{ name: 'Restaking', size: '$16.8M', risk: 'Medium' },
			{ name: 'MEV Tips Flow', size: '$143M', risk: 'Medium' }
		],
		signals: ['Validator diversity', 'MEV reward dependency', 'Restaking expansion'],
		details:
			'MEV-powered liquid staking. JitoSOL accrues MEV rewards on top of staking yield. Audited by Neodyme and Halborn. Expanding into restaking.'
	},
	{
		name: 'DoubleZero',
		category: 'Liquid Staking',
		color: '#2563eb',
		tvlNum: 879,
		tvl: '$879.9M',
		tvlChange: '+7.99%',
		audits: 0,
		age: '0y 9m',
		overallRisk: 6.4,
		risks: { smartContract: 7, economic: 5, operational: 7, governance: 7, counterparty: 5, regulatory: 5, reputational: 7 },
		pools: [
			{ name: 'Staked SOL Pool', size: '$879M', risk: 'Medium' }
		],
		signals: ['No public audits', 'Young protocol', 'Rapid TVL accumulation'],
		details:
			'Newer liquid staking protocol with nearly $880M TVL. No publicly disclosed audits. $277M daily volume. Significant TVL decline (-25.3%) over 30 days.'
	},
	{
		name: 'Binance Staked SOL',
		category: 'Liquid Staking',
		color: '#f0b90b',
		tvlNum: 845,
		tvl: '$845.2M',
		tvlChange: '+11.12%',
		audits: 2,
		age: '1y 6m',
		overallRisk: 4.8,
		risks: { smartContract: 3, economic: 3, operational: 5, governance: 6, counterparty: 6, regulatory: 6, reputational: 3 },
		pools: [
			{ name: 'BNSOL Stake Pool', size: '$845M', risk: 'Low' }
		],
		signals: ['Centralized exchange backing', 'Audited by Neodyme & Halborn', 'CEX concentration risk'],
		details:
			'Binance-backed liquid staking on Solana. Audited by Neodyme and Halborn via Solana SPL Stake Pool program. Centralization risk from single-operator model.'
	},
	{
		name: 'Marinade',
		category: 'Liquid Staking',
		subcategories: ['Liquid Staking', 'Native Staking'],
		color: '#0e7490',
		tvlNum: 527,
		tvl: '$527.4M',
		tvlChange: '+25.3%',
		audits: 3,
		age: '3y 4m',
		overallRisk: 4.0,
		risks: { smartContract: 3, economic: 3, operational: 4, governance: 5, counterparty: 4, regulatory: 4, reputational: 2 },
		pools: [
			{ name: 'mSOL Stake Pool', size: '$280M', risk: 'Low' },
			{ name: 'Native Stake', size: '$247M', risk: 'Low' }
		],
		signals: ['Strongest weekly growth (+25.3%)', 'Three independent audits', 'Oldest LST on Solana'],
		details:
			'Pioneer Solana liquid staking protocol. mSOL backed by diversified validator set. Audited by Neodyme, Ackee Blockchain, and Kudelski Security.'
	},
	{
		name: 'Meteora',
		category: 'DEX (DLMM)',
		color: '#e11d48',
		tvlNum: 302,
		tvl: '$302.1M',
		tvlChange: '+20.8%',
		audits: 0,
		age: '1y 4m',
		overallRisk: 6.0,
		risks: { smartContract: 6, economic: 6, operational: 6, governance: 6, counterparty: 5, regulatory: 4, reputational: 5 },
		pools: [
			{ name: 'SOL / USDC DLMM', size: '$95M', risk: 'Medium' },
			{ name: 'Memecoin Pools', size: '$120M', risk: 'High' },
			{ name: 'Long-tail Pools', size: '$87M', risk: 'High' }
		],
		signals: ['Fastest DEX growth (+20.8%)', 'No public audits', 'High memecoin pool exposure'],
		details:
			'Dynamic Liquidity Market Maker (DLMM). Fastest growing DEX on Solana this week. Heavy memecoin pool exposure increases risk profile.'
	},
	{
		name: 'Orca',
		category: 'DEX (CLMM)',
		color: '#b45309',
		tvlNum: 256,
		tvl: '$256.7M',
		tvlChange: '+8.7%',
		audits: 0,
		age: '3y 3m',
		overallRisk: 5.6,
		risks: { smartContract: 4, economic: 6, operational: 5, governance: 5, counterparty: 5, regulatory: 4, reputational: 4 },
		pools: [
			{ name: 'SOL / USDC Whirlpool', size: '$88M', risk: 'Medium' },
			{ name: 'mSOL / SOL Whirlpool', size: '$54M', risk: 'Medium' },
			{ name: 'Long-tail Pools', size: '$31M', risk: 'High' }
		],
		signals: ['Concentrated liquidity depth', 'Long-tail asset exposure', 'No public audits listed'],
		details:
			'Concentrated liquidity DEX (Whirlpools). One of the oldest DEXes on Solana. Clean UX focused on simplicity. No publicly listed audit reports.'
	},
	{
		name: 'Drift',
		category: 'Perpetuals DEX',
		subcategories: ['Perpetuals', 'Spot', 'Staked SOL'],
		color: '#a78bfa',
		tvlNum: 0,
		tvl: '$0',
		tvlChange: '-100%',
		audits: 3,
		age: '2y 6m',
		overallRisk: 9.8,
		alert: 'EXPLOIT — All TVL drained via multisig social engineering attack. Blind signing enabled unauthorized fund transfers.',
		risks: { smartContract: 5, economic: 10, operational: 10, governance: 8, counterparty: 9, regulatory: 7, reputational: 10 },
		pools: [
			{ name: 'SOL-PERP Market', size: '$0', risk: 'High' },
			{ name: 'BTC-PERP Market', size: '$0', risk: 'High' },
			{ name: 'Insurance Fund', size: '$0', risk: 'High' }
		],
		signals: ['EXPLOITED — full TVL loss', 'Blind signing attack on multisig', 'Social engineering of core contributor', 'Cascading impact on 20+ downstream protocols'],
		details:
			'Decentralized perpetuals exchange hacked via social engineering attack on multisig signers. Blind signing allowed attackers to drain all funds. Full TVL loss across all markets.'
	}
];

export const riskKeys = ['smartContract', 'economic', 'operational', 'governance', 'counterparty', 'regulatory', 'reputational'] as const;

export const riskLabels: Record<string, string> = {
	smartContract: 'Smart Contract',
	economic: 'Economic',
	operational: 'Operational',
	governance: 'Governance',
	counterparty: 'Counterparty',
	regulatory: 'Regulatory',
	reputational: 'Reputational'
};

export const asciiFrames = [
	`solrisk://monitor

      .-\"\"\"\"-.
    .'  .--.  '.
   /   /    \\   \\
  |   |  []  |   |
  |   |      |   |
   \\   \\____/   /
    '.        .'
      '-....-'

  pools   [####----]
  oracles [###-----]
  gov     [######--]
  tx      scan_01`,
	`solrisk://monitor

      .-\"\"\"\"-.
    .'  .--.  '.
   /   / /\\ \\   \\
  |   | <  > |   |
  |   |  \\/  |   |
   \\   \\____/   /
    '.        .'
      '-....-'

  pools   [#####---]
  oracles [####----]
  gov     [#######-]
  tx      scan_02`,
	`solrisk://monitor

      .-\"\"\"\"-.
    .'  .--.  '.
   /   /    \\   \\
  |   |  <>  |   |
  |   |  <>  |   |
   \\   \\____/   /
    '.        .'
      '-....-'

  pools   [######--]
  oracles [#####---]
  gov     [######--]
  tx      scan_03`,
	`solrisk://monitor

      .-\"\"\"\"-.
    .'  .--.  '.
   /   /_  _\\   \\
  |   |  \\/  |   |
  |   |  /\\  |   |
   \\   \\____/   /
    '.        .'
      '-....-'

  pools   [#####---]
  oracles [####----]
  gov     [#######-]
  tx      scan_04`
];
