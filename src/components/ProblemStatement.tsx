'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, EyeOff, Gavel } from 'lucide-react';

const problems = [
    {
        icon: <EyeOff className="w-8 h-8 text-primary" />,
        title: "Blackbox Execution",
        description: "AI agents execute tasks without independent verification of their reasoning or data sources. If they err or cheat, there's no way to trace 'why'.",
    },
    {
        icon: <AlertTriangle className="w-8 h-8 text-secondary" />,
        title: "Unaccountable Actions",
        description: "On-chain actions are often irreversible. If an agent hallucinates and burns funds, there is no recourse or embedded accountability mechanism.",
    },
    {
        icon: <Gavel className="w-8 h-8 text-primary" />,
        title: "Principal-Agent Problem 2.0",
        description: "How can you trust an agent is working for you, not its hidden biases or a third party? Without proof, trust is blind.",
    },
];

export default function ProblemStatement() {
    return (
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        The Problem: <span className="text-primary">Unverifiable</span> Agents
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        As AI agents become autonomous, the lack of transparency in their decision-making process becomes a critical risk for finance and governance.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 rounded-2xl bg-[#262626] border border-white/5 hover:border-primary/50 transition-colors group"
                        >
                            <div className="mb-6 p-4 bg-black/30 rounded-full w-fit group-hover:bg-primary/10 transition-colors">
                                {problem.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{problem.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        </section>
    );
}
