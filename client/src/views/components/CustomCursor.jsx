import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    // Don't render on touch devices — saves event listeners and motion values
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return null;
    }

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const springX = useSpring(mouseX, { damping: 30, stiffness: 300, mass: 0.4 });
    const springY = useSpring(mouseY, { damping: 30, stiffness: 300, mass: 0.4 });
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const move = e => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
        const over = e => {
            setHovering(!!e.target.closest('a, button, [role="button"]'));
        };
        window.addEventListener('mousemove', move, { passive: true });
        window.addEventListener('mouseover', over, { passive: true });
        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseover', over);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Outer ring */}
            <motion.div
                className="absolute border border-[#00d4ff]/50 rounded-sm"
                style={{ left: springX, top: springY, translateX: '-50%', translateY: '-50%' }}
                animate={{ width: hovering ? 52 : 28, height: hovering ? 52 : 28 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Inner dot */}
            <motion.div
                className="absolute w-1 h-1 rounded-full bg-[#00d4ff]"
                style={{ left: mouseX, top: mouseY, translateX: '-50%', translateY: '-50%' }}
                animate={{ opacity: hovering ? 0 : 1 }}
                transition={{ duration: 0.15 }}
            />
        </div>
    );
};

export default CustomCursor;
