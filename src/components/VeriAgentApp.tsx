'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, CheckCircle, XCircle, AlertCircle, FileJson, BadgeCheck, Server, Activity, Database, Shield, Terminal, RefreshCw, Filter, Wallet, Bot, Zap, Lock } from 'lucide-react';
import { useAccount, useSendTransaction } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther } from 'viem';

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

const STATIC_AGENTS = [
    { id: 'AG-8823', name: 'Alpha DeFi Sentinel', type: 'DeFi Risk Manager', reputation: 99, stake: '150,000 VERI', status: 'Verified', uptime: '99.99%' },
    { id: 'AG-1094', name: 'GovGuard V2', type: 'DAO Voting Advisor', reputation: 96, stake: '45,500 VERI', status: 'Verified', uptime: '98.50%' },
    { id: 'AG-4421', name: 'Nexus Auditor', type: 'Smart Contract Audit', reputation: 98, stake: '200,000 VERI', status: 'Verified', uptime: '100.00%' },
    { id: 'AG-0012', name: 'Degens Delight', type: 'Memecoin Sniper', reputation: 45, stake: '2,000 VERI', status: 'Probation', uptime: '82.10%' },
];

const NODE_LOG_TEMPLATES = [
    "Syncing block #{block}...",
    "Verifying x402 proof for Agent {agent}...",
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
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();
    const { sendTransaction, isPending: isTxPending } = useSendTransaction();
    const [activeTab, setActiveTab] = useState<'deploy' | 'inference' | 'registry' | 'node'>('deploy');

    // -- DEPLOY STATE --
    const [deployStep, setDeployStep] = useState<'idle' | 'deploying' | 'deployed' | 'payment_pending' | 'activated'>('idle');
    const [deployLogs, setDeployLogs] = useState<{ time: string, text: string }[]>([]);
    const [agentName, setAgentName] = useState('');
    const [generatedCodes, setGeneratedCodes] = useState({ link: '', verify: '' });
    const deployLogRef = useRef<HTMLDivElement>(null);

    // -- REGISTRY STATE --
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Statuses');
    const [sortBy, setSortBy] = useState('Reputation');
    // Initialize with static only to avoid hydration mismatch
    const [agents, setAgents] = useState(STATIC_AGENTS);
    const [visibleAgents, setVisibleAgents] = useState(12);

    // -- SIMULATOR STATE --
    const [simulationStep, setSimulationStep] = useState<'idle' | 'running' | 'verified'>('idle');
    const [prompt, setPrompt] = useState('Analyze the risk of Contract 0x123...abc based on liquidity depth and ownership renouncement.');
    const [simLogs, setSimLogs] = useState<{ time: string, text: string }[]>([]);
    const simLogContainerRef = useRef<HTMLDivElement>(null);
    const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // -- NODE STATE --
    const [nodeLogs, setNodeLogs] = useState<string[]>([]);
    const [totalProofs, setTotalProofs] = useState(1248932);
    const nodeLogContainerRef = useRef<HTMLDivElement>(null);

    // Setup mounted state to prevent hydration errors
    useEffect(() => {
        setIsMounted(true);
        setAgents([...STATIC_AGENTS, ...generateMockAgents(46)]);
        setAgentName(`Agent-${Math.floor(Math.random() * 9000) + 1000}`);
    }, []);

    // Cleanup
    useEffect(() => {
        return () => {
            if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
        };
    }, []);

    // Auto-scroll deploy logs
    useEffect(() => {
        if (deployLogRef.current) {
            deployLogRef.current.scrollTop = deployLogRef.current.scrollHeight;
        }
    }, [deployLogs]);

    // Deploy Logic
    const handleDeploy = () => {
        if (!isConnected) return;
        setDeployStep('deploying');
        setDeployLogs([]);

        // Generate codes
        const linkCode = Array.from({ length: 8 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]).join('');
        const verifyCode = `pincer-${Array.from({ length: 4 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]).join('')}`;
        setGeneratedCodes({ link: linkCode, verify: verifyCode });

        const logs = [
            "Initializing x402 Agent Container...",
            "Compiling reasoning constraints...",
            "Generating ZK-verification keys...",
            "Deploying on-chain identity...",
            "Registering with x402 Registry...",
            "✅ Agent deployed. Status: PENDING_ACTIVATION"
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                const time = new Date().toLocaleTimeString('en-US', { hour12: false });
                setDeployLogs(prev => [...prev, { time, text: logs[i] }]);
                i++;
            } else {
                clearInterval(interval);
                setDeployStep('deployed');
            }
        }, 800);
    };

    const handlePayment = () => {
        // approx $0.10 USD at $2500 ETH = 0.00004 ETH
        try {
            sendTransaction({
                to: '0x000000000000000000000000000000000000dEaD',
                value: parseEther('0.00004')
            }, {
                onSuccess: () => {
                    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
                    setDeployStep('activated');
                    setDeployLogs(prev => [...prev,
                    { time, text: "Payment confirmed. Agent activated on x402 Mainnet." },
                    { time, text: "✅ STATUS: LIVE" }
                    ]);
                },
                onError: (error: any) => {
                    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
                    setDeployLogs(prev => [...prev, { time, text: `❌ Payment Error: ${error.message.slice(0, 50)}...` }]);
                }
            });

            // Backup simulation for demo purposes if wallet interaction fails/is cancelled but state needs to progress (optional, kept for robustness)
            // In production, remove this timeout block and rely solely on `onSuccess`
            /* 
            setTimeout(() => {
                 setDeployStep('activated');
                 // ...
            }, 5000); 
            */
        } catch (error) {
            console.error("Payment initiation failed:", error);
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            setDeployLogs(prev => [...prev, { time, text: `❌ Payment Initiation Failed.` }]);
        }
    };

    // Simulator Logic (Free Trial)
    const runSimulation = () => {
        if (simulationStep === 'running') return;
        setSimulationStep('running');
        setSimLogs([]);

        const steps = [
            "Initializing x402 secure enclave (LIVE)...",
            "Loading Agent context...",
            "Parsing prompt...",
            "Fetching on-chain data...",
            "> Found verified contract source code",
            "> Liquidity Pool Depth: $4.2M",
            "> Ownership: Renounced",
            "Running risk analysis model...",
            "Generating Reasoning Trace...",
            "Computing SHA-256 state root...",
            "Generating Halo2 Proof...",
            "Verifying x402 constraints...",
            "Proof Validated! Output: RISK_SCORE_LOW (12/100)"
        ];

        let i = 0;
        simulationIntervalRef.current = setInterval(() => {
            if (i < steps.length) {
                const time = new Date().toLocaleTimeString('en-US', { hour12: false });
                setSimLogs(prev => [...prev, { time, text: steps[i] }]);
                i++;
                if (simLogContainerRef.current) {
                    simLogContainerRef.current.scrollTop = simLogContainerRef.current.scrollHeight;
                }
            } else {
                if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
                setSimulationStep('verified');
            }
        }, 500);
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
            if (Math.random() > 0.5) setTotalProofs(prev => prev + 1);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    // Filter Logic
    const filteredAgents = agents.filter(a =>
        (filterStatus === 'All Statuses' || a.status === filterStatus) &&
        (a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.type.toLowerCase().includes(searchTerm.toLowerCase()))
    ).sort((a, b) => {
        if (sortBy === 'Reputation') return b.reputation - a.reputation;
        if (sortBy === 'Stake') return parseInt(b.stake.replace(/,/g, '')) - parseInt(a.stake.replace(/,/g, ''));
        return 0;
    });

    const tweetText = `I'm claiming my AI agent "${agentName}" on @moltbook 🦀\n\nVerification: ${generatedCodes.verify}\n${address}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    // Prevent hydration mismatch
    if (!isMounted) return <div className="min-h-screen bg-white flex items-center justify-center"><RefreshCw className="w-8 h-8 animate-spin text-gray-300" /></div>;

    return (
        <section id="registry" className="py-24 bg-white min-h-screen scroll-mt-20">
            <div id="verify" className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-black mb-2">0xVRE <span className="text-gray-500 font-light">Explorer</span></h2>
                        <p className="text-gray-600">Deploy agents, verify proofs, and monitor network status.</p>
                    </div>
                    <div className="flex p-1.5 bg-gray-50/50 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-inner overflow-x-auto max-w-full">
                        {['deploy', 'inference', 'registry', 'node'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize duration-300 whitespace-nowrap ${activeTab === tab ? 'bg-white text-black shadow-lg shadow-black/5 ring-1 ring-black/5 scale-[1.02]' : 'text-gray-500 hover:text-black hover:bg-white/50'}`}
                            >
                                {tab === 'deploy' ? 'Deploy Agent' : tab === 'inference' ? 'Live Inference (LIVE!!)' : tab === 'registry' ? 'Agent Registry' : 'Node Status'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden min-h-[700px] shadow-2xl relative">
                    <AnimatePresence mode="wait">

                        {/* --- DEPLOY TAB --- */}
                        {activeTab === 'deploy' && (
                            <motion.div key="deploy" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col h-full">
                                <div className="p-8 border-b border-gray-100 bg-white">
                                    <h3 className="text-2xl font-bold text-black mb-1">Deploy New Agent</h3>
                                    <p className="text-gray-500 text-sm">Launch an autonomous agent container on the x402 network.</p>
                                </div>

                                <div className="flex-1 grid md:grid-cols-12 h-full bg-gray-50/30">
                                    {/* Left Panel: Configuration */}
                                    <div className="md:col-span-5 p-8 flex flex-col justify-center border-r border-gray-100 bg-white relative overflow-hidden">
                                        {!isConnected ? (
                                            <div className="z-10 relative">
                                                <div className="w-16 h-16 bg-gray-50 rounded-2xl mx-auto flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                                                    <Wallet className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <div className="text-center mb-8">
                                                    <h4 className="text-lg font-bold text-black mb-2">Connect Wallet</h4>
                                                    <p className="text-gray-500 text-sm max-w-[240px] mx-auto leading-relaxed">
                                                        Access the x402 network to deploy and manage your autonomous agents.
                                                    </p>
                                                </div>
                                                <div className="flex justify-center">
                                                    <ConnectButton.Custom>
                                                        {({ openConnectModal }) => (
                                                            <button
                                                                onClick={openConnectModal}
                                                                className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg shadow-black/10 flex items-center gap-2 text-sm"
                                                            >
                                                                Connect Wallet <span className="text-gray-400">→</span>
                                                            </button>
                                                        )}
                                                    </ConnectButton.Custom>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="max-w-md mx-auto w-full space-y-8 z-10">
                                                <div className="space-y-4">
                                                    <label className="block text-sm font-semibold text-gray-900">Agent Configuration</label>
                                                    <div className="flex gap-2">
                                                        <div className="relative flex-1">
                                                            <input
                                                                type="text"
                                                                value={agentName}
                                                                onChange={(e) => setAgentName(e.target.value)}
                                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-black text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all pl-10"
                                                                placeholder="Agent Name"
                                                            />
                                                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                                                <Bot className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => setAgentName(`Agent-${Math.floor(Math.random() * 9000) + 1000}`)}
                                                            className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 hover:border-gray-300 transition-all group"
                                                            title="Generate Random Name"
                                                        >
                                                            <RefreshCw className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform duration-600" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="bg-yellow-50/50 border border-yellow-200/60 rounded-xl p-4 relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-4 opacity-10 blur-sm pointer-events-none">
                                                        <AlertCircle className="w-16 h-16 text-yellow-600" />
                                                    </div>
                                                    <div className="flex items-start gap-3 relative z-10">
                                                        <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                                        <div className="space-y-1">
                                                            <div className="text-xs font-bold text-yellow-800 uppercase tracking-wide">Network Requirement</div>
                                                            <p className="text-xs text-yellow-700 leading-relaxed">
                                                                Deployment is free. Activation requires <span className="font-mono font-bold bg-yellow-100 px-1 rounded">$0.10 (ETH)</span>.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={handleDeploy}
                                                    disabled={deployStep !== 'idle'}
                                                    className={`w-full py-4 rounded-xl font-bold text-white shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${deployStep !== 'idle' ? 'bg-gray-800 cursor-not-allowed shadow-none opacity-80' : 'bg-black hover:bg-gray-900 hover:shadow-2xl shadow-black/20'}`}
                                                >
                                                    {deployStep === 'idle' ? (
                                                        <>Deploy Agent <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-mono ml-1">PRESS</span></>
                                                    ) : deployStep === 'deploying' ? (
                                                        <><RefreshCw className="w-4 h-4 animate-spin py-0.5" /> Initializing...</>
                                                    ) : (
                                                        <><CheckCircle className="w-4 h-4" /> Deployment Complete</>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                        {/* Background decorative elements */}
                                        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                                    </div>

                                    {/* Right Panel: Terminal */}
                                    <div className="md:col-span-7 bg-[#0F0F11] text-gray-200 p-8 font-mono text-sm relative border-l border-black overflow-hidden flex flex-col">

                                        {/* Terminal Header */}
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800/50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 transition-colors shadow-sm" />
                                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors shadow-sm" />
                                                <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 transition-colors shadow-sm" />
                                            </div>
                                            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold flex items-center gap-2">
                                                <Terminal className="w-3 h-3" /> x402-CLI v2.4.0
                                            </div>
                                        </div>

                                        {/* Terminal Body */}
                                        <div ref={deployLogRef} className="flex-1 space-y-3 overflow-y-auto custom-scrollbar min-h-[300px] font-mono text-xs leading-relaxed">
                                            {deployLogs.length === 0 && (
                                                <div className="h-full flex flex-col items-center justify-center text-gray-700 space-y-4 opacity-50">
                                                    <div className="w-12 h-12 border border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                                                        <span className="text-xl">_</span>
                                                    </div>
                                                    <p>Waiting for deployment sequence...</p>
                                                </div>
                                            )}

                                            {deployLogs.map((log, i) => (
                                                <div key={i} className={`flex items-start gap-3 ${log.text.includes('✅') ? 'text-green-400 font-bold bg-green-900/10 p-2 rounded -mx-2 border border-green-900/20' : log.text.includes('❌') ? 'text-red-400 font-bold bg-red-900/10 p-2 rounded -mx-2 border border-red-900/20' : 'text-gray-400'}`}>
                                                    <span className="text-gray-600 select-none mt-0.5 text-[10px] whitespace-nowrap">[{log.time}]</span>
                                                    <span className="text-gray-700 select-none mt-0.5">$</span>
                                                    <span>{log.text}</span>
                                                </div>
                                            ))}

                                            {/* Step 1: Claim Card (After Deploy) */}
                                            {(deployStep === 'deployed' || deployStep === 'payment_pending' || deployStep === 'activated') && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    className="mt-8 bg-gradient-to-br from-[#1A1A1C] to-[#111] rounded-xl p-6 border border-gray-800 shadow-2xl relative overflow-hidden group"
                                                >
                                                    <div className="absolute top-0 right-0 p-12 bg-green-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-green-500/20 transition-all duration-700" />

                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${deployStep === 'activated' ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'}`}>
                                                            {deployStep === 'activated' ? <BadgeCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-bold text-sm">Deployment Pending</h4>
                                                            <p className="text-[10px] text-gray-500">Contract deployed. Proof of Ownership required.</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 mb-6">
                                                        <div className="bg-black/40 rounded-lg p-3 border border-gray-800/50 flex items-center justify-between group/code hover:border-gray-700 transition-colors cursor-pointer">
                                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Claim Link</div>
                                                            <div className="font-mono text-xs text-white tracking-widest">{generatedCodes.link}</div>
                                                        </div>
                                                        <div className="bg-black/40 rounded-lg p-3 border border-gray-800/50 flex items-center justify-between group/code hover:border-gray-700 transition-colors cursor-pointer">
                                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Verify Code</div>
                                                            <div className="font-mono text-xs text-green-400 tracking-widest">{generatedCodes.verify}</div>
                                                        </div>
                                                    </div>

                                                    {deployStep === 'deployed' && (
                                                        <div className="space-y-2">
                                                            <a
                                                                href={tweetUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block w-full text-center py-3.5 bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold rounded-lg transition-all text-xs uppercase tracking-wide shadow-lg shadow-[#1DA1F2]/20 hover:shadow-[#1DA1F2]/40 transform hover:-translate-y-0.5 active:translate-y-0"
                                                            >
                                                                1. Tweet to Claim Ownership
                                                            </a>
                                                            <button
                                                                onClick={() => setDeployStep('payment_pending')}
                                                                className="w-full py-2 border border-gray-700 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors text-xs"
                                                            >
                                                                I've posted the tweet → Continue
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Step 2: Payment Button */}
                                                    {deployStep === 'payment_pending' && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                            <div className="mb-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                                                                <p className="text-yellow-200 text-xs flex items-center gap-2">
                                                                    <Zap className="w-3 h-3 fill-current" /> Final Step: Activate Enclave
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={handlePayment}
                                                                disabled={isTxPending}
                                                                className={`w-full py-4 font-bold rounded-lg transition-all text-sm shadow-lg flex items-center justify-center gap-2 ${isTxPending ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20'}`}
                                                            >
                                                                {isTxPending ? (
                                                                    <><RefreshCw className="w-4 h-4 animate-spin" /> Processing Payment...</>
                                                                ) : (
                                                                    <>Pay $0.10 to Activate Agent <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded ml-1">~0.00004 ETH</span></>
                                                                )}
                                                            </button>
                                                            <button onClick={() => setDeployStep('deployed')} className="w-full mt-2 text-[10px] text-gray-500 hover:text-gray-300">
                                                                ← Back
                                                            </button>
                                                        </motion.div>
                                                    )}

                                                    {/* Step 3: Activated */}
                                                    {deployStep === 'activated' && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-center">
                                                            <div className="inline-flex items-center gap-2 bg-green-500 text-black px-4 py-2 rounded-full font-bold text-sm mb-2 shadow-lg shadow-green-500/20">
                                                                <CheckCircle className="w-4 h-4 fill-current" /> AGENT ACTIVATED
                                                            </div>
                                                            <p className="text-gray-500 text-xs">Your agent is now live on x402 Network.</p>
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* --- INFERENCE TAB (FREE DEMO) --- */}
                        {activeTab === 'inference' && (
                            <motion.div key="inference" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full relative">
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200">Free Public Live Mode</div>
                                </div>

                                <div className="flex-1 grid md:grid-cols-2 h-full">
                                    <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col bg-white">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-black flex items-center gap-2">
                                                <Play className="w-5 h-5 text-black" /> Live Inference
                                            </h3>
                                        </div>

                                        <div className="space-y-6 flex-1">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-2">Select Public Agent</label>
                                                <select className="w-full bg-white border border-gray-200 rounded-lg p-3 text-black focus:outline-none focus:border-black transition-colors shadow-sm">
                                                    {STATIC_AGENTS.slice(0, 5).map(a => <option key={a.id}>{a.name} ({a.id})</option>)}
                                                </select>
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-sm text-gray-600 mb-2">Input Prompt / Task</label>
                                                <textarea
                                                    value={prompt}
                                                    onChange={(e) => setPrompt(e.target.value)}
                                                    className="w-full h-40 bg-white border border-gray-200 rounded-lg p-4 text-black focus:outline-none focus:border-black resize-none font-mono text-sm leading-relaxed shadow-sm block"
                                                />
                                                <div className="flex gap-2 mt-2">
                                                    <button onClick={() => setPrompt("Audit Arbitrage Bot 0x7a...9f for reentrancy vulnerabilities.")} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600">Audit Bot</button>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={runSimulation}
                                            disabled={simulationStep === 'running'}
                                            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 mt-8 ${simulationStep === 'running' ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-black hover:bg-gray-800 hover:shadow-lg'}`}
                                        >
                                            {simulationStep === 'running' ? <><RefreshCw className="w-4 h-4 animate-spin" /> PROCESSING...</> : <><Play className="w-4 h-4 fill-current" /> EXECUTE FREE REQUEST</>}
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
                                                    Waiting for task execution...
                                                </div>
                                            )}
                                            {simLogs.map((log, i) => (
                                                <div key={i} className="mb-2 text-gray-700">
                                                    <span className="text-gray-400 mr-2">[{log.time}]</span>
                                                    {log.text.startsWith('>') ? <span className="text-black font-bold">{log.text}</span> : log.text}
                                                </div>
                                            ))}
                                            {simulationStep === 'running' && (
                                                <div className="animate-pulse text-black">_</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

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
                                            placeholder="Search agents..."
                                            className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all hover:bg-white"
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
                                        </select>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                                    {filteredAgents.slice(0, visibleAgents).map((agent) => (
                                        <motion.div
                                            key={agent.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-5 bg-white rounded-2xl border border-gray-100 hover:border-black/10 transition-all shadow-sm flex flex-col relative overflow-hidden"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-bold">{agent.name.charAt(0)}</div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-black truncate max-w-[120px]">{agent.name}</h4>
                                                        <div className="text-[10px] text-gray-500">{agent.id}</div>
                                                    </div>
                                                </div>
                                                <div className="px-2 py-1 rounded-full text-[10px] bg-gray-50 border border-gray-200">{agent.status}</div>
                                            </div>
                                            <div className="mt-auto grid grid-cols-2 gap-2 text-xs">
                                                <div><div className="text-gray-400">Rep</div><div className="font-bold">{agent.reputation}</div></div>
                                                <div><div className="text-gray-400">Stake</div><div className="font-bold">{agent.stake}</div></div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* --- NODE TAB --- */}
                        {activeTab === 'node' && (
                            <motion.div key="node" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 h-full bg-white flex flex-col">
                                <div className="bg-green-50 rounded-xl p-4 border border-green-100 mb-4 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-green-800 font-mono text-xs">Node Connection Stable: {totalProofs.toLocaleString()} proofs verified</span>
                                </div>
                                <div ref={nodeLogContainerRef} className="flex-1 font-mono text-xs overflow-y-auto custom-scrollbar space-y-1.5 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    {nodeLogs.map((log, i) => (
                                        <div key={i} className="text-gray-600">{log}</div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
