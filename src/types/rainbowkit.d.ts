// Type declarations for @rainbow-me/rainbowkit
// These help TypeScript recognize the module

declare module '@rainbow-me/rainbowkit' {
    import { ReactNode } from 'react';

    export interface Theme {
        colors?: Record<string, string>;
    }

    export function getDefaultWallets(): { wallets: any[] };
    export function getDefaultConfig(config: {
        appName: string;
        projectId: string;
        wallets?: any[];
        chains: any[];
        ssr?: boolean;
    }): any;

    export function lightTheme(options?: {
        accentColor?: string;
        accentColorForeground?: string;
        borderRadius?: 'none' | 'small' | 'medium' | 'large';
        fontStack?: 'system' | 'rounded';
        overlayBlur?: 'none' | 'small' | 'large';
    }): Theme;

    export function darkTheme(options?: {
        accentColor?: string;
        accentColorForeground?: string;
        borderRadius?: 'none' | 'small' | 'medium' | 'large';
        fontStack?: 'system' | 'rounded';
        overlayBlur?: 'none' | 'small' | 'large';
    }): Theme;

    export interface RainbowKitProviderProps {
        children: ReactNode;
        theme?: Theme;
        coolMode?: boolean;
        showRecentTransactions?: boolean;
        appInfo?: {
            appName?: string;
            learnMoreUrl?: string;
        };
    }

    export function RainbowKitProvider(props: RainbowKitProviderProps): JSX.Element;

    export interface ConnectButtonRenderProps {
        account?: {
            address: string;
            balanceDecimals?: number;
            balanceFormatted?: string;
            balanceSymbol?: string;
            displayBalance?: string;
            displayName: string;
            ensAvatar?: string;
            ensName?: string;
            hasPendingTransactions: boolean;
        };
        chain?: {
            hasIcon: boolean;
            iconUrl?: string;
            iconBackground?: string;
            id: number;
            name?: string;
            unsupported?: boolean;
        };
        mounted: boolean;
        authenticationStatus?: 'loading' | 'unauthenticated' | 'authenticated';
        openAccountModal: () => void;
        openChainModal: () => void;
        openConnectModal: () => void;
        accountModalOpen: boolean;
        chainModalOpen: boolean;
        connectModalOpen: boolean;
    }

    export interface ConnectButtonProps {
        accountStatus?: 'avatar' | 'address' | 'full';
        chainStatus?: 'icon' | 'name' | 'full' | 'none';
        showBalance?: boolean;
        label?: string;
    }

    export const ConnectButton: React.FC<ConnectButtonProps> & {
        Custom: React.FC<{
            children: (props: ConnectButtonRenderProps) => ReactNode;
        }>;
    };
}

declare module '@rainbow-me/rainbowkit/wallets' {
    export const argentWallet: any;
    export const trustWallet: any;
    export const ledgerWallet: any;
    export const coinbaseWallet: any;
    export const metaMaskWallet: any;
    export const rainbowWallet: any;
    export const walletConnectWallet: any;
    export const braveWallet: any;
    export const imTokenWallet: any;
    export const okxWallet: any;
    export const phantomWallet: any;
    export const safeWallet: any;
    export const zerionWallet: any;
}

declare module 'viem/chains' {
    interface Chain {
        id: number;
        name: string;
        nativeCurrency: {
            decimals: number;
            name: string;
            symbol: string;
        };
        rpcUrls: {
            default: { http: readonly string[] };
            public?: { http: readonly string[] };
        };
        blockExplorers?: {
            default: { name: string; url: string };
        };
        testnet?: boolean;
    }

    export const mainnet: Chain;
    export const sepolia: Chain;
    export const polygon: Chain;
    export const optimism: Chain;
    export const arbitrum: Chain;
    export const base: Chain;
    export const baseSepolia: Chain;
    export const goerli: Chain;
}

