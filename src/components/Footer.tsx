'use client';

import { motion } from 'framer-motion';
import { Github, Send } from 'lucide-react';
import Link from 'next/link';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative border-t border-black/5 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/vra_1.svg"
                  alt="VeriAgent Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-black">0xVRA</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              The first accountability layer for autonomous AI agents.
              Trust, verify, and trace every decision on-chain.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-black mb-6">Protocol</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#registry" className="hover:text-black transition-colors">Agent Registry</a></li>
              <li><a href="#verify" className="hover:text-black transition-colors">Verifier Node</a></li>
              <li><Link href="/protocol#slashing" className="hover:text-black transition-colors">Slashing Conditions</Link></li>
              <li><Link href="/protocol#governance" className="hover:text-black transition-colors">Governance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-6">Developers</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/docs" className="hover:text-black transition-colors">Documentation</Link></li>
              <li><Link href="/docs#sdk-reference" className="hover:text-black transition-colors">0xVRA SDK</Link></li>
              <li><a href="https://github.com/veri-agent" target="_blank" className="hover:text-black transition-colors">Github</a></li>
              <li><Link href="/security" className="hover:text-black transition-colors">Bug Bounty</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold text-black mb-6">Community</h4>
            <div className="flex items-center gap-4">
              <a href="https://t.me/veriagent" target="_blank" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center justify-center transition-all group">
                <Send className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
              </a>
              <a href="https://github.com/veri-agent" target="_blank" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center justify-center transition-all group">
                <Github className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 0xVRA Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-gray-500 hover:text-black transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
