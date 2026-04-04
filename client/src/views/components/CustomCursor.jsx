import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    const springConfig = { damping: 25, stiffness: 250 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable = target.closest('button, a, .cursor-pointer');
            setIsPointer(!!isClickable);
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Main Outer Ring */}
            <motion.div
                style={{
                    left: springX,
                    top: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovering ? 64 : 32,
                    height: isHovering ? 64 : 32,
                    borderColor: isHovering ? 'rgba(0, 212, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)',
                }}
                className="absolute border border-white/20 rounded-full transition-colors duration-300 pointer-events-none mix-blend-difference"
            />
            
            {/* Inner Dot */}
            <motion.div
                style={{
                    left: cursorX,
                    top: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    backgroundColor: '#00d4ff',
                    boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
                }}
                className="absolute w-1 h-1 rounded-full pointer-events-none"
            />

            {/* Cinematic Corner Accents (only on hover) */}
            {isHovering && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        left: springX,
                        top: springY,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                    className="absolute w-16 h-16 pointer-events-none"
                >
                   <div className="absolute top-0 left-0 w-2 h-[1px] bg-cyan-400" />
                   <div className="absolute top-0 left-0 w-[1px] h-2 bg-cyan-400" />
                   <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-cyan-400" />
                   <div className="absolute bottom-0 right-0 w-[1px] h-2 bg-cyan-400" />
                </motion.div>
            )}
        </div>
    );
};

export default CustomCursor;
