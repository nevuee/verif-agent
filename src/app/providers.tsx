'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    getDefaultWallets,
    lightTheme,
} from '@rainbow-me/rainbowkit';
import {
    mainnet,
    sepolia,
} from 'viem/chains';
import { createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64';

const { connectors } = getDefaultWallets({
    appName: '0xVRE',
    projectId: PROJECT_ID,
});

const config = createConfig({
    connectors,
    chains: [mainnet, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : [])],
    transports: {
        [mainnet.id]: http('https://eth.llama.rpc.com'),
        [sepolia.id]: http('https://rpc.sepolia.org'),
    },
    batch: { multicall: true },
    ssr: false,
    pollingInterval: 12_000,
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
