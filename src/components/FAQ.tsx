'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import Image from 'next/image';


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
        <section id="faq" className="py-24 bg-gray-50 relative overflow-hidden" style={{ clipPath: 'inset(0)' }}>
            {/* Fixed Background Token (Optimized) */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.15]">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        rotate: { duration: 100, repeat: Infinity, ease: "linear" },
                        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative w-[500px] h-[500px] md:w-[1000px] md:h-[1000px]"
                >
                    <Image
                        src="/TOKEN.png"
                        alt="0xVRE Token"
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>
            </div>

            <div className="max-w-3xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <HelpCircle className="w-4 h-4 text-black" />
                        <span className="text-sm font-medium text-gray-700">Frequently Asked Questions</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                        Understand the <span className="text-black underline decoration-wavy decoration-gray-400">Protocol</span>
                    </h2>
                    <p className="text-gray-600">
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
                            className="border border-gray-200 rounded-2xl bg-white overflow-hidden hover:border-black/30 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-semibold text-black">{faq.question}</span>
                                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-gray-200 text-black' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
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
                                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
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
