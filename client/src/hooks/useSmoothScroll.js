/**
 * useSmoothScroll — Lenis integration hook
 * Returns the lenis instance so components can subscribe to scroll events.
 */
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let globalLenis = null;

export const getLenis = () => globalLenis;

export const useSmoothScroll = (pathname) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Skip on mobile/tablet and admin pages
        const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        const isAdmin = pathname?.startsWith('/admin');
        if (isTouchDevice || isAdmin) return;

        // Ensure document scrolls (not a child element)
        document.documentElement.style.scrollBehavior = 'auto';

        const lenis = new Lenis({
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1.0,
            syncTouch: false,
        });

        lenisRef.current = lenis;
        globalLenis = lenis;

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
            globalLenis = null;
        };
    }, [pathname]);

    return lenisRef;
};
