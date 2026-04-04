import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Particles() {
    const ref = useRef();
    const count = 50; // reduced from 80

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 12;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 3;
        }
        return arr;
    }, []);

    useFrame(({ clock }) => {
        ref.current.rotation.y = clock.elapsedTime * 0.05;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#e2b02e" size={0.022} transparent opacity={0.4} sizeAttenuation />
        </points>
    );
}

function OrbitRing() {
    const ref = useRef();
    useFrame(({ clock }) => {
        ref.current.rotation.z = clock.elapsedTime * 0.2;
        ref.current.rotation.x = 0.9;
    });
    return (
        <mesh ref={ref} position={[3.5, 0, -6]}>
            <torusGeometry args={[1.2, 0.03, 8, 48]} />
            <meshBasicMaterial color="#e2b02e" transparent opacity={0.12} />
        </mesh>
    );
}

export default function About3D() {
    const wrapperRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) return null;

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={wrapperRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            {visible && (
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 60 }}
                    dpr={[1, 1.5]}
                    frameloop="always"
                    gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
                    style={{ background: 'transparent' }}
                >
                    <ambientLight intensity={0.5} />
                    <Particles />
                    <OrbitRing />
                </Canvas>
            )}
        </div>
    );
}
