import { motion } from 'framer-motion';

const variants = {
    fadeUp: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } },
    fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } } },
    slideLeft: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } },
    slideRight: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } },
    zoomIn: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } },
};

const AnimatedSection = ({ children, className = '', variant = 'fadeUp', delay = 0, once = true }) => (
    <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-80px' }}
        variants={{
            hidden: variants[variant]?.hidden ?? variants.fadeUp.hidden,
            visible: {
                ...(variants[variant]?.visible ?? variants.fadeUp.visible),
                transition: {
                    ...(variants[variant]?.visible?.transition ?? {}),
                    delay,
                },
            },
        }}
        className={className}
    >
        {children}
    </motion.section>
);

export default AnimatedSection;
