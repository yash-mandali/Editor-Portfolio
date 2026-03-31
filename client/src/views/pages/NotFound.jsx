import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Terminal } from 'lucide-react';

const NotFound = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[100px] rounded-full" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center px-6 max-w-2xl"
            >
                {/* 404 Tag */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-8">
                    <Terminal size={12} className="text-cyan-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Error_Code: 404</span>
                </motion.div>

                {/* 404 Number */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-9xl md:text-[180px] font-black text-white tracking-tighter leading-none mb-4 opacity-10">
                        404
                    </h1>
                </motion.div>

                {/* Heading */}
                <motion.h2 variants={itemVariants} className="text-3xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                    SIGNAL <span className="text-[#2e2e42]">LOST</span>
                </motion.h2>

                {/* Description */}
                <motion.p variants={itemVariants} className="text-lg text-neutral-500 font-light mb-12 leading-relaxed max-w-md mx-auto">
                    The sequence you are looking for has been moved or deleted from the master timeline.
                </motion.p>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        to="/"
                        className="px-10 py-4 bg-cyan-400 hover:bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,212,255,0.25)]"
                    >
                        <Home size={14} />
                        Return to Origin
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 border border-white/10"
                    >
                        <ArrowLeft size={14} />
                        Go Back
                    </button>
                </motion.div>

                {/* Quick Links */}
                <motion.div variants={itemVariants} className="mt-20 pt-10 border-t border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600 mb-6">Alternative Routes</p>
                    <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
                        <Link to="/portfolio" className="text-white hover:text-cyan-400 transition-colors">Portfolio</Link>
                        <Link to="/services" className="text-white hover:text-cyan-400 transition-colors">Services</Link>
                        <Link to="/about" className="text-white hover:text-cyan-400 transition-colors">About</Link>
                        <Link to="/contact" className="text-white hover:text-cyan-400 transition-colors">Contact</Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;
