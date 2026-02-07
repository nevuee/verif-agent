'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 group pointer-events-auto"
                >
                    {/* Glow Container */}
                    <div className="relative flex items-center justify-center p-3 bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg hover:border-black/30 transition-colors duration-300">
                        {/* Animated Ring */}
                        <div className="absolute inset-0 rounded-xl border-2 border-black opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />

                        {/* Icon */}
                        <ChevronUp className="w-6 h-6 text-black group-hover:text-gray-700 transition-colors relative z-10" />
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
