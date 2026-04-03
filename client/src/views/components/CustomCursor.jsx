import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleHover = (e) => {
            const target = e.target;
            const isClickable = target.closest('a, button, [role="button"], .cursor-pointer');
            const isVideo = target.closest('.group.relative.aspect-video, .video-hover');

            if (isVideo) {
                setIsHovering(true);
                setCursorText('VIEW');
            } else if (isClickable) {
                setIsHovering(true);
                setCursorText('');
            } else {
                setIsHovering(false);
                setCursorText('');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[10000] hidden lg:block overflow-hidden">
            {/* Main Cinematic Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-cyan-400 rounded-full flex items-center justify-center text-[10px] font-black tracking-tighter text-cyan-400"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovering ? 2.5 : 1,
                    backgroundColor: isHovering ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                }}
            >
                {cursorText}
            </motion.div>

            {/* Inner Precision Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isHovering ? 0 : 1
                }}
            />

            {/* Trailing Atmospheric Glow */}
            <motion.div
                className="fixed top-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[120px] rounded-full"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </div>
    );
};

export default CustomCursor;
