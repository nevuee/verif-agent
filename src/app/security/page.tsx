'use client';

import { Shield, Bug, Search, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-20 pt-24">
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">Security Center</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    Security is our top priority. Help us secure the 0xVRE protocol and get rewarded.
                </p>
            </motion.div>

            <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">

                {/* Bug Bounty */}
                <section>
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden p-8 md:p-12 relative shadow-lg">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Bug className="w-64 h-64 text-black" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-black mb-6 flex items-center gap-3">
                                <Bug className="w-8 h-8 text-black" /> Bug Bounty Program
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 max-w-2xl">
                                We offer competitive rewards for responsible disclosure of security vulnerabilities.
                                Rewards are distributed in USDC/USDT or vested VERI tokens.
                            </p>

                            <div className="grid md:grid-cols-4 gap-4 mb-8">
                                <div className="p-6 bg-gray-50 rounded-xl border border-red-200 shadow-sm">
                                    <h4 className="text-red-600 font-bold mb-1">Critical</h4>
                                    <p className="text-2xl font-mono text-black font-bold">$100,000+</p>
                                    <p className="text-xs text-gray-500 mt-2">Fund loss, consensus failure</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-xl border border-orange-200 shadow-sm">
                                    <h4 className="text-orange-600 font-bold mb-1">High</h4>
                                    <p className="text-2xl font-mono text-black font-bold">$20,000+</p>
                                    <p className="text-xs text-gray-500 mt-2">Temporary freezing, DOS</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-xl border border-yellow-200 shadow-sm">
                                    <h4 className="text-yellow-600 font-bold mb-1">Medium</h4>
                                    <p className="text-2xl font-mono text-black font-bold">$5,000</p>
                                    <p className="text-xs text-gray-500 mt-2">RPC failure, griefing</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-xl border border-blue-200 shadow-sm">
                                    <h4 className="text-blue-600 font-bold mb-1">Low</h4>
                                    <p className="text-2xl font-mono text-black font-bold">$1,000</p>
                                    <p className="text-xs text-gray-500 mt-2">UI bugs, minor logic</p>
                                </div>
                            </div>

                            <a href="https://immunefi.com" target="_blank" className="inline-block px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                                Submit a Report via Immunefi
                            </a>
                        </div>
                    </div>
                </section>

                {/* Audits */}
                <section>
                    <h2 className="text-2xl font-bold text-black mb-8 flex items-center gap-3">
                        <Search className="w-6 h-6 text-black" /> Security Audits
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white border border-gray-200 rounded-xl flex items-center justify-between group hover:border-black/30 transition-colors cursor-pointer shadow-sm hover:shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="text-black font-bold group-hover:text-gray-700 transition-colors">Core Protocols v1.0</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                        <span>Audited by Trail of Bits</span>
                                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                        <span>Jan 2026</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">PASSED</div>
                        </div>

                        <div className="p-6 bg-white border border-gray-200 rounded-xl flex items-center justify-between group hover:border-black/30 transition-colors cursor-pointer shadow-sm hover:shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="text-black font-bold group-hover:text-gray-700 transition-colors">ZK-Verifier Circuits</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                        <span>Audited by OpenZeppelin</span>
                                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                        <span>Dec 2025</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">PASSED</div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
