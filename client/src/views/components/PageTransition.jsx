import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateX: 10, y: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, rotateX: -10, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
                perspective: "1200px",
                transformStyle: "preserve-3d"
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
