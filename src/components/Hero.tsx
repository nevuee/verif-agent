'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Lock, FileCode } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.4]" />
        {/* Subtle Mono Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-black/5 blur-[120px] rounded-full animate-pulse duration-[10s]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gray-400/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-8 shadow-sm hover:shadow-md hover:border-black/20 transition-all cursor-default backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            <span className="text-xs text-black font-semibold tracking-wide uppercase">0xVRE Mainnet Live</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-black mb-8 tracking-tighter leading-[0.95]">
            Trustless AI,<br />
            <span className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">Verified.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            The accountability layer for autonomous agents. We provide <span className="text-black font-medium underline decoration-gray-300 underline-offset-4">zk-SNARK proofs</span> for every AI inference.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="#registry" className="group px-8 py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center gap-3">
              Deploy Agent
              <Activity className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
            <a href="#verify" className="group px-8 py-4 bg-white text-black border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all hover:border-black/20 hover:scale-[1.02] flex items-center gap-3 shadow-lg hover:shadow-xl">
              Verify Proof
              <FileCode className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
            </a>
          </div>
          {/* Scroll indicator - below buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center gap-2 mt-16 pointer-events-none"
          >
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Scroll to Verify</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-black/20 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements (Images) */}

      {/* Left Mascot (Mirrored) - Desktop Only */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-0 left-0 md:left-[5%] hidden md:block pointer-events-none z-0 translate-y-[10%]"
      >
        <div className="relative w-64 h-64 md:w-[500px] md:h-[500px] scale-x-[-1]">
          <Image
            src="/0xvre-maskot.png"
            alt="0xVRE Mascot Left"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* Right Mascot - Visible on Mobile & Desktop */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute bottom-0 right-0 md:right-[5%] block pointer-events-none z-0 translate-y-[10%]"
      >
        <div className="relative w-64 h-64 md:w-[500px] md:h-[500px]">
          <Image
            src="/0xvre-maskot.png"
            alt="0xVRE Mascot Right"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

    </section>
  );
}
