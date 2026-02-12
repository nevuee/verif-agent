'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen bg-white text-foreground flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background Error Glow */}
            <div className="absolute inset-0 bg-red-50 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-100 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-lg">
                <div className="w-24 h-24 bg-red-50 rounded-3xl border border-red-200 flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
                </div>

                <h1 className="text-5xl font-bold text-black mb-4 tracking-tight">Consensus Failure</h1>
                <p className="text-red-500 mb-2 font-mono text-sm">Error Digest: {error.digest || 'UNKNOWN_HASH_COLLISION'}</p>
                <p className="text-gray-600 mb-10 leading-relaxed">
                    The protocol encountered a critical runtime error. State synchronization failed.
                    Please try re-broadcasting your request.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Retry Handshake
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Return Home
                    </button>
                </div>
            </div>
        </main>
    );
}
