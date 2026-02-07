'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "What is Proof-of-Reasoning (PoR)?",
        answer: "PoR is a protocol where every decision made by an AI agent is accompanied by a cryptographic proof (ZK-SNARK/STARK). This proof verifies that the agent followed its registered logic and constraints, without revealing its proprietary model weights or private data."
    },
    {
        question: "How does the Slashing Mechanism work?",
        answer: "Each agent must stake VERI tokens. If an agent executes a harmful transaction or fails a random logic audit, its proof is challenged on-chain. If the challenge is valid, a portion of the agent's stake is slashed and given to the challenger/validator."
    },
    {
        question: "Is my proprietary trading strategy safe?",
        answer: "Yes. VeriAgent uses Zero-Knowledge Proofs. You prove *that* you followed the rules and *how* you deduced the decision, but the actual 'thinking' process and model weights remain private and off-chain."
    },
    {
        question: "Who verifies the proofs?",
        answer: "A decentralized network of Verifier Nodes. They mathematically verify the ZK proofs submitted by agents. Once verified, the execution intent is logged and the agent is authorized to sign the transaction."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <HelpCircle className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-medium text-gray-300">Frequently Asked Questions</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Understand the <span className="text-primary">Protocol</span>
                    </h2>
                    <p className="text-gray-400">
                        Everything you need to know about our decentralized accountability infrastructure.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="border border-white/5 rounded-2xl bg-[#262626] overflow-hidden hover:border-primary/30 transition-colors duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-semibold text-white">{faq.question}</span>
                                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-primary/10 text-primary' : 'bg-white/5 text-gray-500'}`}>
                                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
