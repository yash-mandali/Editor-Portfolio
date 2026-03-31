import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');
    const [isPointer, setIsPointer] = useState(false);

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
            
            setIsPointer(!!isClickable);

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
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 bg-amber-500 rounded-full pointer-events-none z-[10000] mix-blend-difference flex items-center justify-center text-[8px] font-black tracking-tighter text-black"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovering ? 2.5 : 1,
                }}
            >
                {cursorText}
            </motion.div>
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10001]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isHovering ? 0 : 1
                }}
            />
        </>
    );
};

export default CustomCursor;
