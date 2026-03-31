import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(interval); return 100; }
                return p + Math.random() * 18;
            });
        }, 60);
        return () => clearInterval(interval);
    }, []);

    const capped = Math.min(Math.round(progress), 100);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-neutral-950 overflow-hidden"
        >
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-10"
                style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }}
            />

            {/* Corner accents */}
            {[['top-8 left-8', 'border-t border-l'], ['top-8 right-8', 'border-t border-r'], ['bottom-8 left-8', 'border-b border-l'], ['bottom-8 right-8', 'border-b border-r']].map(([pos, border], i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className={`absolute ${pos} w-8 h-8 ${border} border-cyan-400/40`} />
            ))}

            {/* Center content */}
            <div className="relative flex flex-col items-center gap-8">
                {/* Spinning ring */}
                <div className="relative w-20 h-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-2 rounded-full border border-transparent border-t-cyan-400/40"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-cyan-400 font-black text-xs">{capped}%</span>
                    </div>
                </div>

                {/* Brand */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
                    <div className="text-white font-black text-2xl tracking-[0.3em] uppercase mb-1">
                        {'{'}EDIT<span className="text-cyan-400">.</span>{'}'}
                    </div>
                    <div className="text-neutral-600 text-[10px] font-black tracking-[0.4em] uppercase">Loading Experience</div>
                </motion.div>

                {/* Progress bar */}
                <div className="w-48 h-[2px] bg-white/5 relative overflow-hidden">
                    <motion.div
                        className="absolute left-0 top-0 h-full bg-cyan-400"
                        initial={{ width: '0%' }}
                        animate={{ width: `${capped}%` }}
                        transition={{ ease: 'easeOut' }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Loader;
