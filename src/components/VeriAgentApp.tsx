'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, CheckCircle, XCircle, AlertCircle, FileJson, BadgeCheck, Server, Activity, Database, Shield, Terminal, RefreshCw, Filter } from 'lucide-react';

// --- MOCK DATA GENERATOR ---
const AGENT_TYPES = ['DeFi Risk Manager', 'DAO Voting Advisor', 'Smart Contract Audit', 'Memecoin Sniper', 'Yield Optimizer', 'NFT Appraiser', 'Social Sentiment', 'MEV Protection'];
const STATUSES = ['Verified', 'Verified', 'Verified', 'Probation', 'Verified', 'Offline', 'Verified'];

const generateMockAgents = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
        const id = `AG-${Math.floor(Math.random() * 9000) + 1000}`;
        const type = AGENT_TYPES[Math.floor(Math.random() * AGENT_TYPES.length)];
        const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
        const reputation = Math.floor(Math.random() * 20) + 80; // 80-99
        const stake = (Math.floor(Math.random() * 500) * 100 + 1000).toLocaleString();

        return {
            id,
            name: `${type.split(' ')[0]} ${['Sentinel', 'Guardian', 'Oracle', 'Node', 'Agent', 'Bot', 'Runner'][Math.floor(Math.random() * 7)]} ${Math.floor(Math.random() * 99)}`,
            type,
            reputation,
            stake: `${stake} VERI`,
            status,
            uptime: `${(95 + Math.random() * 5).toFixed(2)}%`
        };
    });
};

const INITIAL_AGENTS = [
    { id: 'AG-8823', name: 'Alpha DeFi Sentinel', type: 'DeFi Risk Manager', reputation: 99, stake: '150,000 VERI', status: 'Verified', uptime: '99.99%' },
    { id: 'AG-1094', name: 'GovGuard V2', type: 'DAO Voting Advisor', reputation: 96, stake: '45,500 VERI', status: 'Verified', uptime: '98.50%' },
    { id: 'AG-4421', name: 'Nexus Auditor', type: 'Smart Contract Audit', reputation: 98, stake: '200,000 VERI', status: 'Verified', uptime: '100.00%' },
    { id: 'AG-0012', name: 'Degens Delight', type: 'Memecoin Sniper', reputation: 45, stake: '2,000 VERI', status: 'Probation', uptime: '82.10%' },
    ...generateMockAgents(46) // Total ~50 agents
];

const NODE_LOG_TEMPLATES = [
    "Syncing block #{block}...",
    "Verifying proof for Agent {agent}...",
    "Proof Validated. Gas used: {gas}",
    "New task submitted to mempool: Task-{task}",
    "Challenge period started for Task-{task}...",
    "Peer connected: {ip}",
    "Consensus reached on block #{block}",
    "Broadcasting state root update...",
    "Received ZK-SNARK proof from {agent}",
    "Indexing event logs..."
];

export default function VeriAgentApp() {
    const [activeTab, setActiveTab] = useState<'registry' | 'simulate' | 'node'>('registry');

    // -- REGISTRY STATE --
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Statuses');
    const [sortBy, setSortBy] = useState('Reputation');
    const [agents, setAgents] = useState(INITIAL_AGENTS);
    const [visibleAgents, setVisibleAgents] = useState(12);

    // -- SIMULATOR STATE --
    const [simulationStep, setSimulationStep] = useState<'idle' | 'running' | 'verified'>('idle');
    const [prompt, setPrompt] = useState('Analyze the risk of Contract 0x123...abc based on liquidity depth and ownership renouncement.');
    const [simLogs, setSimLogs] = useState<string[]>([]);
    const simLogContainerRef = useRef<HTMLDivElement>(null);

    // -- NODE STATE --
    const [nodeLogs, setNodeLogs] = useState<string[]>([]);
    const [totalProofs, setTotalProofs] = useState(1248932);
    const nodeLogContainerRef = useRef<HTMLDivElement>(null);

    // Filter Logic
    const filteredAgents = agents
        .filter(a =>
            (filterStatus === 'All Statuses' || a.status === filterStatus) &&
            (a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.type.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortBy === 'Reputation') return b.reputation - a.reputation;
            if (sortBy === 'Stake') return parseInt(b.stake.replace(/,/g, '')) - parseInt(a.stake.replace(/,/g, ''));
            return 0;
        });

    // Simulator Logic
    const runSimulation = () => {
        if (simulationStep === 'running') return;
        setSimulationStep('running');
        setSimLogs([]);

        const steps = [
            "Initializing secure enclave...",
            "Loading Agent AG-8823 context...",
            "Parsing prompt: 'Analyze risk of Contract 0x123...'",
            "Fetching on-chain data for 0x123... (Mainnet)",
            "> Found verified contract source code",
            "> Liquidity Pool Depth: $4.2M",
            "> Ownership: Renounced",
            "Running risk analysis model (v2.4)...",
            "Generating ZK-Reasoning Trace...",
            "Computing SHA-256 state root...",
            "Generating Halo2 Proof...",
            "Verifying constraints...",
            "Proof Validated! Output: RISK_SCORE_LOW (12/100)"
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                setSimLogs(prev => [...prev, steps[i]]);
                i++;
                // Auto scroll
                if (simLogContainerRef.current) {
                    simLogContainerRef.current.scrollTop = simLogContainerRef.current.scrollHeight;
                }
            } else {
                clearInterval(interval);
                setSimulationStep('verified');
            }
        }, 800);
    };

    // Node Live Feed Logic
    useEffect(() => {
        const interval = setInterval(() => {
            const template = NODE_LOG_TEMPLATES[Math.floor(Math.random() * NODE_LOG_TEMPLATES.length)];
            const log = template
                .replace("{block}", Math.floor(18239000 + Math.random() * 1000).toString())
                .replace("{agent}", `AG-${Math.floor(Math.random() * 9000) + 1000}`)
                .replace("{gas}", Math.floor(Math.random() * 50000 + 21000).toString())
                .replace("{task}", Math.floor(Math.random() * 9000).toString())
                .replace("{ip}", `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);

            const time = new Date().toLocaleTimeString('en-US', { hour12: false });

            setNodeLogs(prev => [`[${time}] ${log}`, ...prev].slice(0, 50));

            // Randomly increment total proofs
            if (Math.random() > 0.5) {
                setTotalProofs(prev => prev + 1);
            }

        }, 2000); // New log every 2 seconds

        return () => clearInterval(interval);
    }, []);


    return (
        <section id="registry" className="py-24 bg-white min-h-screen scroll-mt-20">
            <div id="verify" className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-black mb-2">0xVRA <span className="text-gray-500 font-light">Explorer</span></h2>
                        <p className="text-gray-600">Explore registered agents, verify proofs, and monitor network status.</p>
                    </div>

                    <div className="flex p-1.5 bg-gray-50/50 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-inner">
                        {['registry', 'simulate', 'node'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize duration-300 ${activeTab === tab ? 'bg-white text-black shadow-lg shadow-black/5 ring-1 ring-black/5 scale-[1.02]' : 'text-gray-500 hover:text-black hover:bg-white/50'}`}
                            >
                                {tab === 'registry' ? 'Agent Registry' : tab === 'simulate' ? 'Task Simulator' : 'Node Status'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden min-h-[700px] shadow-2xl relative">
                    <AnimatePresence mode="wait">
                        {/* --- REGISTRY TAB --- */}
                        {activeTab === 'registry' && (
                            <motion.div key="registry" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-6 h-full flex flex-col">
                                <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between z-10 relative">
                                    <div className="relative flex-1 max-w-lg">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search agents by ID, type, or name..."
                                            className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-4 focus:ring-gray-100 transition-all hover:bg-white"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:border-black/50"
                                        >
                                            <option>All Statuses</option>
                                            <option>Verified</option>
                                            <option>Probation</option>
                                            <option>Offline</option>
                                        </select>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:border-black/50"
                                        >
                                            <option>Reputation</option>
                                            <option>Stake</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                                    {filteredAgents.slice(0, visibleAgents).map((agent) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                                            key={agent.id}
                                            className="p-5 bg-white rounded-2xl border border-gray-100/80 hover:border-black/10 transition-all group cursor-pointer shadow-sm flex flex-col justify-between relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-20 bg-gradient-to-bl from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full pointer-events-none" />

                                            <div className="flex justify-between items-start mb-4 relative z-10">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300">
                                                        {agent.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-black group-hover:text-gray-800 transition-colors truncate max-w-[120px]">{agent.name}</h4>
                                                        <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-1">
                                                            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{agent.id}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${agent.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    agent.status === 'Probation' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                        'bg-red-50 text-red-700 border-red-200'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Verified' ? 'bg-green-500' : agent.status === 'Probation' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                                    {agent.status}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-gray-700 mb-4 bg-gray-50 p-2.5 rounded-xl border border-gray-100 relative z-10">
                                                <Activity className="w-3 h-3" />
                                                {agent.type}
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 relative z-10">
                                                <div><div className="text-gray-400 text-[10px] uppercase tracking-wider mb-1 font-semibold">Reputation</div><div className="text-black font-mono font-bold text-sm">{agent.reputation}</div></div>
                                                <div><div className="text-gray-400 text-[10px] uppercase tracking-wider mb-1 font-semibold">Staked</div><div className="text-black font-mono font-bold text-sm">{agent.stake}</div></div>
                                                <div><div className="text-gray-400 text-[10px] uppercase tracking-wider mb-1 font-semibold">Uptime</div><div className="text-green-600 font-mono font-bold text-sm">{agent.uptime}</div></div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {filteredAgents.length === 0 && (
                                        <div className="col-span-full text-center py-20 text-gray-500">
                                            No agents found matching your criteria.
                                        </div>
                                    )}
                                </div>

                                {filteredAgents.length > visibleAgents && (
                                    <div className="mt-6 text-center">
                                        <button
                                            onClick={() => setVisibleAgents(prev => prev + 12)}
                                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-lg text-sm transition-colors"
                                        >
                                            Load More Agents
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* --- SIMULATOR TAB --- */}
                        {activeTab === 'simulate' && (
                            <motion.div key="simulate" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                                <div className="flex-1 grid md:grid-cols-2 h-full">
                                    <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col bg-white">
                                        <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-2">
                                            <Play className="w-5 h-5 text-black" /> Task Simulator
                                        </h3>

                                        <div className="space-y-6 flex-1">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-2">Select Agent</label>
                                                <select className="w-full bg-white border border-gray-200 rounded-lg p-3 text-black focus:outline-none focus:border-black transition-colors shadow-sm">
                                                    {INITIAL_AGENTS.slice(0, 5).map(a => <option key={a.id}>{a.name} ({a.id})</option>)}
                                                </select>
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-sm text-gray-600 mb-2">Input Prompt / Task</label>
                                                <textarea
                                                    value={prompt}
                                                    onChange={(e) => setPrompt(e.target.value)}
                                                    className="w-full h-40 bg-white border border-gray-200 rounded-lg p-4 text-black focus:outline-none focus:border-black resize-none font-mono text-sm leading-relaxed shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={runSimulation}
                                            disabled={simulationStep === 'running'}
                                            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 mt-8 ${simulationStep === 'running' ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-black hover:bg-gray-800 hover:shadow-lg'}`}
                                        >
                                            {simulationStep === 'running' ? <><RefreshCw className="w-4 h-4 animate-spin" /> PROCESSING...</> : <><Play className="w-4 h-4 fill-current" /> RUN SIMULATION</>}
                                        </button>
                                    </div>

                                    <div className="p-8 bg-gray-50 relative overflow-hidden flex flex-col">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
                                        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2 relative z-10">
                                            <Terminal className="w-5 h-5 text-black" /> Live Reasoning Trace
                                        </h3>

                                        <div
                                            ref={simLogContainerRef}
                                            className="flex-1 bg-white rounded-xl border border-gray-200 p-4 font-mono text-xs overflow-y-auto custom-scrollbar relative z-10 shadow-inner"
                                        >
                                            {simLogs.length === 0 && simulationStep === 'idle' && (
                                                <div className="h-full flex items-center justify-center text-gray-400">
                                                    Waiting for task input...
                                                </div>
                                            )}
                                            {simLogs.map((log, i) => (
                                                <div key={i} className="mb-2 text-gray-700">
                                                    <span className="text-gray-400 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                                    {log.startsWith('>') ? <span className="text-black font-bold">{log}</span> : log}
                                                </div>
                                            ))}
                                            {simulationStep === 'running' && (
                                                <div className="animate-pulse text-black">_</div>
                                            )}
                                        </div>

                                        {simulationStep === 'verified' && (
                                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <BadgeCheck className="w-8 h-8 text-green-500" />
                                                    <div>
                                                        <h4 className="text-green-500 font-bold text-sm">Proof Verified</h4>
                                                        <p className="text-[10px] text-green-500/70">TxHash: 0x8a...33f1</p>
                                                    </div>
                                                </div>
                                                <button className="px-3 py-1.5 bg-green-500/20 text-green-500 text-xs rounded hover:bg-green-500/30 font-medium">
                                                    View On-Chain
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* --- NODE TAB --- */}
                        {activeTab === 'node' && (
                            <motion.div key="node" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 h-full bg-white flex flex-col">
                                <div className="grid md:grid-cols-3 gap-6 mb-8">
                                    {/* Stats Cards */}
                                    {/* Stats Cards */}
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                                        <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Activity className="w-16 h-16 text-black" /></div>
                                        <div className="text-gray-500 text-sm mb-1">Node Status</div>
                                        <div className="text-2xl font-bold text-green-600 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Operational</div>
                                        <div className="mt-4 text-xs text-gray-400">Uptime: 14d 21h 12m</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                                        <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Database className="w-16 h-16 text-black" /></div>
                                        <div className="text-gray-500 text-sm mb-1">Total Proofs Verified</div>
                                        <div className="text-2xl font-bold text-black tabular-nums">{totalProofs.toLocaleString()}</div>
                                        <div className="mt-4 text-xs text-green-600 flex items-center gap-1"><Activity className="w-3 h-3" /> +12% activity</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                                        <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Shield className="w-16 h-16 text-black" /></div>
                                        <div className="text-gray-500 text-sm mb-1">Slash Events</div>
                                        <div className="text-2xl font-bold text-black">0</div>
                                        <div className="mt-4 text-xs text-gray-400">Network secure</div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl border border-gray-200 flex-1 overflow-hidden flex flex-col shadow-inner">
                                    <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
                                        <span className="font-mono text-sm text-gray-600 flex items-center gap-2"><Terminal className="w-4 h-4" /> Node Logs</span>
                                        <span className="text-[10px] text-green-600 flex items-center gap-1 bg-green-100 px-2 py-1 rounded"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" /> LIVE FEED</span>
                                    </div>
                                    <div ref={nodeLogContainerRef} className="flex-1 p-4 font-mono text-xs overflow-y-auto custom-scrollbar space-y-1.5">
                                        {nodeLogs.map((log, i) => (
                                            <div key={i} className={`flex gap-3 ${log.includes('Verified') ? 'text-green-600' : log.includes('Slash') ? 'text-red-500' : 'text-gray-500'}`}>
                                                <span className="opacity-50 flex-shrink-0">{log.split(']')[0]}]</span>
                                                <span>{log.split(']')[1]}</span>
                                            </div>
                                        ))}
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
