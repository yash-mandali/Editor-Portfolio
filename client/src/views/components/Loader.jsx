import React from 'react';
import { motion } from 'framer-motion';

const dot = {
    hidden: { scale: 0.6, opacity: 0.2 },
    visible: { scale: 1, opacity: 1 }
};

const Loader = () => {
    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-gradient-to-b from-black/40 to-black/25 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl">
                    <div className="flex items-center gap-2">
                        <motion.span className="w-4 h-4 rounded-full bg-white" variants={dot} initial="hidden" animate="visible" transition={{ repeat: Infinity, repeatType: 'mirror', duration: 0.6, delay: 0 }} />
                        <motion.span className="w-4 h-4 rounded-full bg-white" variants={dot} initial="hidden" animate="visible" transition={{ repeat: Infinity, repeatType: 'mirror', duration: 0.6, delay: 0.15 }} />
                        <motion.span className="w-4 h-4 rounded-full bg-white" variants={dot} initial="hidden" animate="visible" transition={{ repeat: Infinity, repeatType: 'mirror', duration: 0.6, delay: 0.3 }} />
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-white text-xl font-bold tracking-tight">STERLING<span className="text-amber-300">.</span>EDIT</h3>
                    <p className="text-white/80 text-sm mt-1">Loading — crafting something beautiful for you</p>
                </div>
            </div>
        </div>
    );
};

export default Loader;
