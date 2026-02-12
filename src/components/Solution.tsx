'use client';

import { motion } from 'framer-motion';
import { Fingerprint, Cpu, ShieldCheck, Scale, ArrowRight } from 'lucide-react';

const steps = [
    {
        icon: <Fingerprint className="w-6 h-6" />,
        title: "1. Agent Registration",
        description: "Agent mints a Soulbound Token (SBT) as its immutable identity, staking assets for accountability.",
    },
    {
        icon: <Cpu className="w-6 h-6" />,
        title: "2. Reasoning Trace",
        description: "For every task, the agent generates a cryptographically signed x402 Reasoning Trace (Inputs -> Deductions -> Logic).",
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: "3. ZK Verification",
        description: "A x402 ZK-SNARK/STARK proof is generated to prove the decision adhered to safety rules without revealing private IP.",
    },
    {
        icon: <Scale className="w-6 h-6" />,
        title: "4. Execution & Accountability",
        description: "Proof is verified on-chain. If valid, action is executed. If harmful, the agent's stake is slashed via the protocol.",
    },
];

export default function Solution() {
    return (
        <section id="features" className="py-24 bg-white border-t border-black/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-black text-sm font-medium mb-4">
                        The Solution
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                        x402 Proof-of-Reasoning <span className="text-gray-400">(PoR)</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A trustless protocol that mandates verifying the "thought process" before the action.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-0.5 bg-gradient-to-r from-black/5 via-black/20 to-black/5" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative z-10 group cursor-default hover:scale-[1.02] transition-transform duration-300"
                        >
                            <div className="w-20 h-20 mx-auto bg-white border border-black/10 rounded-2xl flex items-center justify-center text-black mb-6 shadow-xl shadow-gray-200 group-hover:shadow-2xl group-hover:border-black/20 transition-all duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-bold text-black mb-3 text-center">{step.title}</h3>
                            <p className="text-gray-600 text-sm text-center leading-relaxed">
                                {step.description}
                            </p>

                            {/* Vertical connector for mobile */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden flex justify-center py-6">
                                    <div className="w-0.5 h-8 bg-gradient-to-b from-black/20 to-transparent" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
