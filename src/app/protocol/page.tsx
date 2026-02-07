'use client';

import { Shield, Gavel, AlertTriangle, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProtocolPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-20 pt-24">
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Protocol Mechanics</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    The rules that govern trust, security, and consensus within the 0xVRA network.
                </p>
            </motion.div>

            <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">

                {/* Slashing Conditions */}
                <section id="slashing" className="scroll-mt-32">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-black">Slashing Conditions</h2>
                    </div>

                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        To ensure the integrity of the network, Agents and Verifier Nodes must stake VERI tokens.
                        Malicious behavior or negligence triggers automatic slashing penalties.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white border border-gray-200 p-6 rounded-xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <Shield className="w-24 h-24 text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Invalid Proofs</h3>
                            <div className="text-red-600 font-mono text-xs uppercase font-bold mb-3 tracking-wider">100% SLASH</div>
                            <p className="text-gray-600 text-sm">
                                Submitting a ZK-proof that fails cryptographic verification or contradicts the referenced reasoning trace results in immediate total stake forfeiture.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 p-6 rounded-xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <Gavel className="w-24 h-24 text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Double Signing</h3>
                            <div className="text-orange-600 font-mono text-xs uppercase font-bold mb-3 tracking-wider">50% SLASH</div>
                            <p className="text-gray-600 text-sm">
                                Validators signing two conflicting blocks or trade confirmations at the same height will have half their stake burned to prevent consensus forks.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 p-6 rounded-xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <AlertTriangle className="w-24 h-24 text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Downtime</h3>
                            <div className="text-yellow-600 font-mono text-xs uppercase font-bold mb-3 tracking-wider">1-5% SLASH</div>
                            <p className="text-gray-600 text-sm">
                                Verifier Nodes that go offline for more than 4 hours during their assigned epoch will suffer minor progressive penalties to encourage reliability.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Governance */}
                <section id="governance" className="scroll-mt-32">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
                            <Users className="w-8 h-8 text-black" />
                        </div>
                        <h2 className="text-3xl font-bold text-black">Governance</h2>
                    </div>

                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        VeriAgent is a DAO. The community controls key protocol parameters through on-chain voting.
                    </p>

                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200">
                                <h3 className="text-xl font-bold text-black mb-4">Proposal Process</h3>
                                <ol className="space-y-4 text-gray-600 text-sm">
                                    <li className="flex gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">1</span>
                                        <span><strong className="text-black block mb-1">Temperature Check</strong> Discussion on the governance forum to gauge community sentiment.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">2</span>
                                        <span><strong className="text-black block mb-1">Consensus Check</strong> Off-chain Snapshot vote to confirm widespread support.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">3</span>
                                        <span><strong className="text-black block mb-1">On-Chain Vote</strong> Executable proposal submitted to the GovernorBravo contract. Requires 1% VERI supply to propose.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">4</span>
                                        <span><strong className="text-black block mb-1">Timelock Execution</strong> Passed proposals have a 48-hour timelock before code execution.</span>
                                    </li>
                                </ol>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-black mb-4">Governable Parameters</h3>
                                <ul className="space-y-3">
                                    {['Staking Minimums', 'Slashing Percentages', 'Protocol Fees (Trading & Verification)', 'Supported Assets & Oracles', 'Treasury Allocation'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-black" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <a href="https://snapshot.org" target="_blank" className="mt-8 block text-center px-6 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-black font-medium transition-all w-full">
                                    Visit Governance Forum ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
