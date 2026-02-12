'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    getDefaultConfig,
    lightTheme
} from '@rainbow-me/rainbowkit';
import {
    metaMaskWallet,
    trustWallet,
    ledgerWallet,
    argentWallet,
    coinbaseWallet,
    rainbowWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
    mainnet,
    sepolia,
} from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

// Use a fallback generic Project ID if one isn't provided (for demo/dev purposes)
// In production, this MUST be set to a valid WalletConnect Cloud Project ID
const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64';

// Define Custom Mainnet Chain with Fast Public RPC to improve connection speed
const customMainnet = {
    ...mainnet,
    rpcUrls: {
        ...mainnet.rpcUrls,
        default: { http: ['https://eth.llama.rpc.com'] },
        public: { http: ['https://eth.llama.rpc.com'] },
    },
} as const;

const config = getDefaultConfig({
    appName: '0xVRE',
    projectId: PROJECT_ID,
    chains: [
        customMainnet,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
    ],
    wallets: [
        {
            groupName: 'Recommended',
            wallets: [
                metaMaskWallet,
                rainbowWallet,
                coinbaseWallet,
                walletConnectWallet,
            ],
        },
        {
            groupName: 'Other',
            wallets: [
                argentWallet,
                trustWallet,
                ledgerWallet,
            ],
        },
    ],
    ssr: false, // Keep ssr: false for instant client-side loading
});

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={lightTheme({
                        accentColor: '#000000',
                        accentColorForeground: 'white',
                        borderRadius: 'medium',
                        fontStack: 'system',
                        overlayBlur: 'small',
                    })}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
