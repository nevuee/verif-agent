'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, CheckCircle, XCircle, AlertCircle, FileJson, BadgeCheck } from 'lucide-react';

// Mock Data for Registry
const mockAgents = [
    { id: 'AG-8823', name: 'Alpha DeFi Sentinel', type: 'DeFi Risk Manager', reputation: 98, stake: '50,000 VERI', status: 'Verified' },
    { id: 'AG-1094', name: 'GovGuard V2', type: 'DAO Voting Advisor', reputation: 94, stake: '12,500 VERI', status: 'Verified' },
    { id: 'AG-4421', name: 'Nexus Auditor', type: 'Smart Contract Audit', reputation: 99, stake: '100,000 VERI', status: 'Verified' },
    { id: 'AG-0012', name: 'Degens Delight', type: 'Memecoin Sniper', reputation: 45, stake: '2,000 VERI', status: 'Probation' },
];

export default function VeriAgentApp() {
    const [activeTab, setActiveTab] = useState<'registry' | 'simulate'>('registry');
    const [simulationStep, setSimulationStep] = useState<'idle' | 'reasoning' | 'proving' | 'verified'>('idle');
    const [prompt, setPrompt] = useState('Analyze the risk of Contract 0x123...abc based on liquidity depth and ownership renouncement.');

    const runSimulation = () => {
        if (simulationStep !== 'idle') return;
        setSimulationStep('reasoning');

        // Simulate flow
        setTimeout(() => setSimulationStep('proving'), 2500);
        setTimeout(() => setSimulationStep('verified'), 5000);
    };

    const resetSimulation = () => setSimulationStep('idle');

    return (
        <section id="registry" className="py-24 bg-[#1a1a1a] min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">VeriAgent <span className="text-secondary font-light">Scout</span></h2>
                        <p className="text-gray-400">Explore registered agents and verify their reasoning traces.</p>
                    </div>

                    <div className="flex p-1 bg-[#262626] rounded-xl border border-white/10">
                        <button
                            onClick={() => setActiveTab('registry')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'registry' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Agent Registry
                        </button>
                        <button
                            onClick={() => setActiveTab('simulate')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'simulate' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Task Simulator
                        </button>
                    </div>
                </div>

                <div className="bg-[#262626] rounded-2xl border border-white/5 overflow-hidden min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'registry' ? (
                            <motion.div
                                key="registry"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="p-6"
                            >
                                {/* Search Bar */}
                                <div className="flex gap-4 mb-8">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Search agents by ID, capability, or name..."
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50"
                                        />
                                    </div>
                                    <button className="px-6 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-gray-300 hover:text-white hover:border-white/30 transition-colors">
                                        Filter
                                    </button>
                                </div>

                                {/* Agent Grid */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    {mockAgents.map((agent) => (
                                        <div key={agent.id} className="p-6 bg-[#1a1a1a] rounded-xl border border-white/5 hover:border-primary/30 transition-all group cursor-pointer">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                                        {agent.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-bold group-hover:text-primary transition-colors">{agent.name}</h4>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <span>{agent.id}</span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                            <span>{agent.type}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`px-2 py-1 rounded text-xs font-medium ${agent.status === 'Verified' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                                    {agent.status}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4">
                                                <div className="text-gray-400">Reputation <span className="text-white font-mono">{agent.reputation}/100</span></div>
                                                <div className="text-gray-400">Staked <span className="text-white font-mono">{agent.stake}</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="simulate"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col h-full"
                            >
                                <div className="flex-1 grid md:grid-cols-2 h-full">
                                    {/* Input Panel */}
                                    <div className="p-8 border-r border-white/5 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                            <Play className="w-5 h-5 text-secondary" />
                                            Task Simulation
                                        </h3>

                                        <div className="mb-6">
                                            <label className="block text-sm text-gray-400 mb-2">Select Agent</label>
                                            <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary">
                                                {mockAgents.map(a => <option key={a.id}>{a.name} ({a.id})</option>)}
                                            </select>
                                        </div>

                                        <div className="mb-6 flex-1">
                                            <label className="block text-sm text-gray-400 mb-2">Input Prompt / Task</label>
                                            <textarea
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                className="w-full h-full min-h-[200px] bg-[#1a1a1a] border border-white/10 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-secondary resize-none font-mono text-sm leading-relaxed"
                                            />
                                        </div>

                                        <button
                                            onClick={simulationStep === 'idle' || simulationStep === 'verified' ? runSimulation : undefined}
                                            disabled={simulationStep === 'reasoning' || simulationStep === 'proving'}
                                            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
                                        ${simulationStep === 'idle' || simulationStep === 'verified'
                                                    ? 'bg-secondary hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20'
                                                    : 'bg-gray-700 cursor-not-allowed opacity-50'}`}
                                        >
                                            {simulationStep === 'idle' || simulationStep === 'verified' ? (
                                                <>RUN SIMULATION <Play className="w-4 h-4 fill-current" /></>
                                            ) : (
                                                <>PROCESSING...</>
                                            )}
                                        </button>

                                        {simulationStep === 'verified' && (
                                            <button onClick={resetSimulation} className="mt-4 text-sm text-gray-500 underline hover:text-white">Reset Simulation</button>
                                        )}
                                    </div>

                                    {/* Output / Trace Panel */}
                                    <div className="p-8 bg-[#151515] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

                                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                                            <FileJson className="w-5 h-5 text-primary" />
                                            Live Reasoning Trace
                                        </h3>

                                        <div className="space-y-6 relative z-10">
                                            {/* Reasoning Step 1: Context Analysis */}
                                            <div className={`transition-all duration-500 ${simulationStep !== 'idle' ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className={`p-2 rounded-full ${simulationStep !== 'idle' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-600'}`}>
                                                        1
                                                    </div>
                                                    <span className="text-gray-300 font-mono text-sm">Context Analysis</span>
                                                </div>
                                                {simulationStep !== 'idle' && (
                                                    <div className="ml-10 p-3 bg-[#1a1a1a] border border-blue-500/30 rounded-lg text-xs font-mono text-blue-300">
                                                        Parsing liquidity_depth and governance_events for contract:0x123...
                                                    </div>
                                                )}
                                            </div>

                                            {/* Reasoning Step 2: Rules Check */}
                                            <div className={`transition-all duration-500 delay-700 ${['reasoning', 'proving', 'verified'].includes(simulationStep) ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className={`p-2 rounded-full ${['reasoning', 'proving', 'verified'].includes(simulationStep) ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-800 text-gray-600'}`}>
                                                        2
                                                    </div>
                                                    <span className="text-gray-300 font-mono text-sm">Compliance Check (Blacklist)</span>
                                                </div>
                                                {['reasoning', 'proving', 'verified'].includes(simulationStep) && (
                                                    <div className="ml-10 p-3 bg-[#1a1a1a] border border-purple-500/30 rounded-lg text-xs font-mono text-purple-300">
                                                        Checking OFAC Blacklist... PASSED ✓ <br />
                                                        Checking Internal Safety Policy... PASSED ✓
                                                    </div>
                                                )}
                                            </div>

                                            {/* Reasoning Step 3: ZK Proof Generation */}
                                            <div className={`transition-all duration-500 delay-[2500ms] ${['proving', 'verified'].includes(simulationStep) ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className={`p-2 rounded-full ${['proving', 'verified'].includes(simulationStep) ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-800 text-gray-600'}`}>
                                                        3
                                                    </div>
                                                    <span className="text-gray-300 font-mono text-sm">Generating ZK-Reasoning Proof</span>
                                                </div>
                                                {['proving', 'verified'].includes(simulationStep) && (
                                                    <div className="ml-10 p-3 bg-[#1a1a1a] border border-orange-500/30 rounded-lg text-xs font-mono text-orange-300 animate-pulse">
                                                        Encoding Trace... <br />
                                                        Generating Succinct Proof (Halo2)...
                                                    </div>
                                                )}
                                            </div>

                                            {/* Final Step: Verified */}
                                            {simulationStep === 'verified' && (
                                                <motion.div
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="mt-8 p-6 bg-green-900/10 border border-green-500/50 rounded-xl flex items-center justify-between"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <BadgeCheck className="w-10 h-10 text-green-500" />
                                                        <div>
                                                            <h4 className="text-green-400 font-bold">Proof Verified</h4>
                                                            <p className="text-xs text-green-600/80">TxHash: 0x8a...33f1</p>
                                                        </div>
                                                    </div>
                                                    <button className="px-4 py-2 bg-green-500/20 text-green-400 text-xs rounded-lg hover:bg-green-500/30">
                                                        View On-Chain
                                                    </button>
                                                </motion.div>
                                            )}

                                            {/* Connecting Lines */}
                                            <div className="absolute left-[27px] top-[40px] bottom-[40px] w-0.5 bg-gray-800 -z-10" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
