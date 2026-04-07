/**
 * useScrollReveal — lightweight scroll-triggered reveal
 * Uses IntersectionObserver (no framer dependency) for performance.
 * Works WITH Lenis — Lenis smooths the scroll, IO triggers the animations.
 */
import { useEffect, useRef } from 'react';

const DEFAULT_OPTIONS = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
};

export const useScrollReveal = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.classList.add('sr-visible');
                obs.unobserve(el); // fire once
            }
        }, { ...DEFAULT_OPTIONS, ...options });

        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return ref;
};
