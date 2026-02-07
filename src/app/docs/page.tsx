'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Book, Code, Terminal, Shield, Cpu, Activity, AlertCircle } from 'lucide-react';

const sections = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        icon: <Book className="w-4 h-4" />,
        items: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'architecture', title: 'Architecture' },
            { id: 'tokenomics', title: 'Tokenomics' }
        ]
    },
    {
        id: 'development',
        title: 'Development',
        icon: <Code className="w-4 h-4" />,
        items: [
            { id: 'deploy-agent', title: 'Deploying an Agent' },
            { id: 'sdk-reference', title: 'SDK Reference' },
            { id: 'testing', title: 'Backtesting' }
        ]
    },
    {
        id: 'api',
        title: 'API Reference',
        icon: <Terminal className="w-4 h-4" />,
        items: [
            { id: 'websocket', title: 'WebSocket Feeds' },
            { id: 'rest-api', title: 'REST Endpoints' }
        ]
    }
];

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState('introduction');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8">

                {/* Sidebar Navigation */}
                <aside className="w-full md:w-56 flex-shrink-0">
                    <div className="sticky top-24 space-y-6">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                            />
                        </div>

                        {/* Navigation Links */}
                        <nav className="space-y-4">
                            {sections.map((section) => (
                                <div key={section.id}>
                                    <div className="flex items-center gap-2 px-2 mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        {section.icon}
                                        {section.title}
                                    </div>
                                    <ul className="space-y-1">
                                        {section.items.map((item) => (
                                            <li key={item.id}>
                                                <button
                                                    onClick={() => setActiveSection(item.id)}
                                                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${activeSection === item.id
                                                        ? 'bg-black/5 text-black font-medium'
                                                        : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                                                        }`}
                                                >
                                                    {item.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="prose prose-gray max-w-none">

                        {/* Content: Introduction */}
                        {activeSection === 'introduction' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-black text-xs font-medium mb-6">
                                    <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                                    Documentation v1.0
                                </div>
                                <h1 className="text-3xl font-bold text-black mb-4">Introduction to 0xVRE</h1>
                                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                                    0xVRE (Proof-of-Reasoning Layer) is the decentralized accountability protocol for autonomous AI agents.
                                    By leveraging zk-SNARKs and optimistic verification, we ensure that every action taken by an agent is
                                    cryptographically verifiable and adheres to its pre-defined policy.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
                                    <div className="p-5 bg-white rounded-xl border border-gray-200 hover:border-black/30 transition-colors group shadow-sm hover:shadow-md">
                                        <Cpu className="w-6 h-6 text-black mb-3 group-hover:scale-110 transition-transform" />
                                        <h3 className="text-base font-bold text-black mb-1">Autonomous Execution</h3>
                                        <p className="text-gray-600 text-sm leading-snug">Agents run 24/7 on decentralized compute nodes, executing strategies without human intervention.</p>
                                    </div>
                                    <div className="p-5 bg-white rounded-xl border border-gray-200 hover:border-black/30 transition-colors group shadow-sm hover:shadow-md">
                                        <Shield className="w-6 h-6 text-black mb-3 group-hover:scale-110 transition-transform" />
                                        <h3 className="text-base font-bold text-black mb-1">Verifiable Proof</h3>
                                        <p className="text-gray-600 text-sm leading-snug">All trades and performance metrics are anchored on-chain, ensuring tamper-proof history.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Content: Deploy Agent */}
                        {activeSection === 'deploy-agent' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-2.5 py-0.5 bg-black/5 text-black rounded-full text-[10px] font-bold uppercase tracking-wider">Developer Guide</span>
                                    <span className="text-gray-500 text-xs">15 mins read</span>
                                </div>

                                <h1 className="text-3xl font-bold text-black mb-4">Deploying Your First Agent</h1>
                                <p className="text-base text-gray-600 mb-6">
                                    Follow this guide to package your Python or TypeScript strategy and deploy it to the VeriAgent network.
                                </p>

                                <h3 className="text-xl font-bold text-black mt-8 mb-3">1. Install the CLI</h3>
                                {/* Code Block */}
                                <div className="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-lg font-mono text-sm mb-6 shadow-sm overflow-x-auto relative group">
                                    <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <div className="leading-relaxed">
                                        <span className="text-gray-500">$</span> npm install -g @0xvre/cli<br />
                                        <span className="text-gray-500">$</span> 0xvre login
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-black mt-8 mb-3 flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-xs">2</span>
                                    Initialize Project
                                </h3>
                                <div className="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-lg font-mono text-sm mb-6 shadow-sm overflow-x-auto">
                                    <span className="text-gray-500">$</span> 0xvre init my-strategy --template mean-reversion
                                </div>

                                <div className="p-4 border-l-2 border-black bg-black/5 rounded-r-lg my-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <AlertCircle className="w-16 h-16 text-black" />
                                    </div>
                                    <h4 className="font-bold text-black mb-1 flex items-center gap-2 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        Requirement
                                    </h4>
                                    <p className="text-xs text-gray-600 relative z-10 leading-relaxed">You must hold at least 1000 VERI tokens to deploy a mainnet agent. This serves as a spam prevention mechanism and aligns incentives.</p>
                                </div>

                                <h3 className="text-xl font-bold text-black mt-8 mb-3 flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-xs">3</span>
                                    Deploy to Mainnet
                                </h3>
                                <div className="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-lg font-mono text-sm mb-6 shadow-sm overflow-x-auto">
                                    <span className="text-gray-500">$</span> 0xvre deploy --network mainnet
                                </div>
                            </motion.div>
                        )}

                        {/* Content: Architecture */}
                        {activeSection === 'architecture' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h1 className="text-3xl font-bold text-black mb-6">Protocol Architecture</h1>
                                <p className="text-lg text-gray-600 mb-8">
                                    VeriAgent uses a three-layer architecture to ensure trustless execution of off-chain AI agents.
                                </p>

                                <div className="space-y-8">
                                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                                        <h3 className="text-xl font-bold text-black mb-2">1. Execution Layer (Off-Chain)</h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            Agents run on decentralized compute nodes (VeriNodes). They ingest market data and generate trade signals.
                                            Crucially, they must also generate a <span className="text-black font-mono">Reasoning Trace</span> for every action.
                                        </p>
                                        <div className="bg-gray-100 p-3 rounded-lg font-mono text-xs text-gray-600">
                                            Input: Market Data + Strategy Parameters<br />
                                            Output: Trade Signal + ZK-Proof Hash
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">2. Verification Layer (ZK-Rollup)</h3>
                                        <p className="text-gray-600 text-sm">
                                            The Reasoning Trace is compressed into a ZK-SNARK proof. This proves the agent followed its stated strategy and risk limits without revealing proprietary logic.
                                        </p>
                                    </div>

                                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                                        <h3 className="text-xl font-bold text-black mb-2">3. Settlement Layer (On-Chain)</h3>
                                        <p className="text-gray-600 text-sm">
                                            The Verifier Contract validates the proof. If valid, the trade is executed atomically on the DEX. If invalid or malicious, the transaction is reverted and the agent's stake is slashed.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Content: Tokenomics */}
                        {activeSection === 'tokenomics' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h1 className="text-3xl font-bold text-black mb-6">Tokenomics ($VERI)</h1>
                                <p className="text-lg text-gray-600 mb-8">
                                    The VERI token aligns incentives between agents, verifiers, and investors.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                                        <Shield className="w-8 h-8 text-black mb-4" />
                                        <h3 className="text-lg font-bold text-black mb-2">Staking & Slashing</h3>
                                        <p className="text-sm text-gray-600">Agents must stake VERI to deploy. Malicious behavior results in immediate slashing of the stake.</p>
                                    </div>
                                    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                                        <Activity className="w-8 h-8 text-gray-700 mb-4" />
                                        <h3 className="text-lg font-bold text-black mb-2">Compute Payment</h3>
                                        <p className="text-sm text-gray-600">VeriNodes earn VERI for providing compute power and generating ZK proofs.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Content: SDK Reference */}
                        {activeSection === 'sdk-reference' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h1 className="text-3xl font-bold text-black mb-6">SDK Reference</h1>
                                <p className="text-gray-600 mb-6">The core library for building VeriAgents.</p>

                                <h3 className="text-xl font-bold text-black mb-4">Basic Agent Structure</h3>
                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-mono text-sm text-gray-700 overflow-x-auto mb-8">
                                    <pre>{`import { Agent, Context } from '@veriagent/sdk';

export class MyStrategy extends Agent {
    async onTick(ctx: Context) {
        const price = await ctx.getPrice('ETH/USD');
        
        // Define reasoning trace
        ctx.reason({
            observation: \`Price \${price} below MA-200\`,
            logic: "Trend reversal detected",
            action: "BUY"
        });

        if (price < 2000) {
            return ctx.order.marketBuy('ETH', 1.5);
        }
    }
}`}</pre>
                                </div>
                            </motion.div>
                        )}

                        {/* Content: Backtesting */}
                        {activeSection === 'testing' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h1 className="text-3xl font-bold text-black mb-6">Backtesting</h1>
                                <p className="text-gray-600 mb-6">Verify your strategy against historical data before mainnet deployment.</p>

                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-mono text-sm mb-6">
                                    <span className="text-gray-500">$</span> 0xvre backtest --strategy src/main.ts --days 30
                                </div>
                                <p className="text-sm text-gray-600">
                                    The backtester runs your agent in a sandboxed environment, simulating market conditions and verifying that valid Proof-of-Reasoning traces are generated for every trade.
                                </p>
                            </motion.div>
                        )}

                        {/* Content: WebSocket */}
                        {activeSection === 'websocket' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h1 className="text-3xl font-bold text-black mb-6">WebSocket API</h1>
                                <p className="text-gray-600 mb-6">Real-time feeds for agent status and market events.</p>

                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-mono text-sm mb-6 text-gray-700">
                                    wss://api.veriagent.network/v1/stream
                                </div>

                                <h3 className="text-lg font-bold text-black mb-2">Subscribe to Agent</h3>
                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-mono text-xs text-gray-700">
                                    {`{
  "op": "subscribe",
  "channel": "agent_execution",
  "agent_id": "AG-8823"
}`}
                                </div>
                            </motion.div>
                        )}

                        {/* Content: REST API */}
                        {activeSection === 'rest-api' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h1 className="text-3xl font-bold text-black mb-6">REST API</h1>

                                <div className="space-y-6">
                                    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">GET</span>
                                            <code className="text-sm text-black">/v1/agents</code>
                                        </div>
                                        <p className="text-sm text-gray-600">List all verified agents needing updates.</p>
                                    </div>

                                    <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">GET</span>
                                            <code className="text-sm text-black">/v1/agents/{'{id}'}/proofs</code>
                                        </div>
                                        <p className="text-sm text-gray-600">Get history of ZK-proofs for a specific agent.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
