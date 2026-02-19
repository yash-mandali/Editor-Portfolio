import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center px-6 max-w-2xl"
            >
                {/* 404 Number */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-9xl md:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-600 mb-4 leading-none">
                        404
                    </h1>
                </motion.div>

                {/* Heading */}
                <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                    Page Not Found
                </motion.h2>

                {/* Description */}
                <motion.p variants={itemVariants} className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted. Let's get you back on track.
                </motion.p>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-3 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 border border-neutral-300 dark:border-neutral-700"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </motion.div>

                {/* Quick Links */}
                <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Quick Links:</p>
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                        <Link to="/portfolio" className="text-amber-600 dark:text-amber-500 hover:underline">Portfolio</Link>
                        <span className="text-neutral-400">•</span>
                        <Link to="/services" className="text-amber-600 dark:text-amber-500 hover:underline">Services</Link>
                        <span className="text-neutral-400">•</span>
                        <Link to="/about" className="text-amber-600 dark:text-amber-500 hover:underline">About</Link>
                        <span className="text-neutral-400">•</span>
                        <Link to="/contact" className="text-amber-600 dark:text-amber-500 hover:underline">Contact</Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;
