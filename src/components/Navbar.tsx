'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Wallet } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <Image
                src="/vra_1.svg"
                alt="0xVRE Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain transition-transform group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-black group-hover:text-gray-700 transition-colors">0xVRE</span>
              <p className="text-[10px] text-gray-500 font-medium">Proof-of-Reasoning Layer</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-sm text-gray-600 hover:text-black transition-colors">
              Features
            </a>
            <a href="/#registry" className="text-sm text-gray-600 hover:text-black transition-colors">
              Agent Registry
            </a>
            <a href="/#verify" className="text-sm text-gray-600 hover:text-black transition-colors">
              Verify
            </a>
            <a href="/docs" className="text-sm text-gray-600 hover:text-black transition-colors">
              Docs
            </a>

            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            className="px-6 py-2 bg-primary rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 flex items-center gap-2"
                          >
                            <Wallet className="w-4 h-4" />
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} className="px-6 py-2 bg-red-500 rounded-lg text-sm font-semibold text-white">
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={openChainModal}
                            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-semibold text-gray-700 transition-colors"
                          >
                            {chain.hasIcon && (
                              <div style={{ background: chain.iconBackground, width: 20, height: 20, borderRadius: 999, overflow: 'hidden', marginRight: 4 }}>
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 20, height: 20 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button
                            onClick={openAccountModal}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 flex items-center gap-2 hover:bg-gray-50 hover:border-black/30 transition-all shadow-sm"
                          >
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {
          mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 py-4 px-4 space-y-3 bg-white/95 backdrop-blur-md rounded-lg border border-black/5 shadow-xl"
            >
              <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-black transition-colors py-2">
                Features
              </a>
              <a href="/#registry" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-black transition-colors py-2">
                Agent Registry
              </a>
              <a href="/#verify" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-black transition-colors py-2">
                Simulate & Verify
              </a>
              <a href="/docs" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-black transition-colors py-2">
                Docs
              </a>
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated');

                  if (!ready) return null;

                  if (!connected) {
                    return (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          openConnectModal();
                        }}
                        className="w-full px-6 py-3 bg-primary rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2"
                      >
                        <Wallet className="w-4 h-4" />
                        Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          openChainModal();
                        }}
                        className="w-full px-6 py-3 bg-red-500 rounded-lg text-sm font-semibold text-white"
                      >
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAccountModal();
                      }}
                      className="w-full px-6 py-3 bg-gray-800 border border-white/10 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2"
                    >
                      {account.displayName}
                    </button>
                  );
                }}
              </ConnectButton.Custom>
            </motion.div>
          )
        }
      </div >
    </motion.nav >
  );
}
