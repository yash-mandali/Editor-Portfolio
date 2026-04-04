import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [hoverType, setHoverType] = useState('default'); // 'default', 'button', 'video'

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const videoHover = target.closest('.video-card-hover, video, iframe');
            const buttonHover = target.closest('button, a, .magnetic-btn');
            
            if (videoHover) {
                setIsHovering(true);
                setHoverType('video');
            } else if (buttonHover) {
                setIsHovering(true);
                setHoverType('button');
            } else {
                setIsHovering(false);
                setHoverType('default');
            }
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
                    width: isHovering ? (hoverType === 'video' ? 100 : 70) : 34,
                    height: isHovering ? (hoverType === 'video' ? 100 : 70) : 34,
                    borderColor: isHovering ? 'rgba(0, 212, 255, 0.6)' : 'rgba(255, 255, 255, 0.15)',
                    borderWidth: isHovering ? 1.5 : 1,
                    rotate: isHovering ? 90 : 0
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute border rounded-sm pointer-events-none mix-blend-difference"
            />
            
            {/* Center Crosshair */}
            <motion.div
                style={{
                    left: springX,
                    top: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0.5,
                }}
                className="absolute w-4 h-4 flex items-center justify-center pointer-events-none"
            >
                <div className="absolute w-[1px] h-full bg-cyan-400/40" />
                <div className="absolute h-[1px] w-full bg-cyan-400/40" />
            </motion.div>

            {/* Cinematic Corner Reticles */}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                            left: springX,
                            top: springY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                        className={`absolute pointer-events-none ${hoverType === 'video' ? 'w-24 h-24' : 'w-16 h-16'}`}
                    >
                        {/* Top-Left */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.4)]" />
                        {/* Top-Right */}
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.4)]" />
                        {/* Bottom-Left */}
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.4)]" />
                        {/* Bottom-Right */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.4)]" />

                        {/* Hover Text */}
                        {hoverType === 'video' && (
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-cyan-400 whitespace-nowrap tracking-[0.2em] uppercase font-bebas"
                            >
                                PLAY_SHOWREEL
                            </motion.span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

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
        </div>
    );
};

export default CustomCursor;
