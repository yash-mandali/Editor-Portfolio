import React from 'react';
import { motion } from 'framer-motion';

// simple wrapper that fades and lifts content into view on scroll
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const AnimatedSection = ({ children, className = '' }) => (
    <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        className={className}
    >
        {children}
    </motion.section>
);

export default AnimatedSection;
