import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function ParticleField() {
    const ref = useRef();
    const count = 80; // reduced from 120

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 14;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
        }
        return arr;
    }, []);

    useFrame(({ clock }) => {
        ref.current.rotation.y = clock.elapsedTime * 0.04;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#00d4ff" size={0.025} transparent opacity={0.5} sizeAttenuation />
        </points>
    );
}

function Ring() {
    const ref = useRef();
    useFrame(({ clock }) => {
        ref.current.rotation.x = clock.elapsedTime * 0.18;
        ref.current.rotation.z = clock.elapsedTime * 0.12;
    });
    return (
        <mesh ref={ref} position={[2.2, 0.4, -3]}>
            <torusGeometry args={[0.7, 0.04, 8, 48]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} />
        </mesh>
    );
}

function IcoWire() {
    const ref = useRef();
    useFrame(({ clock }) => {
        ref.current.rotation.y = clock.elapsedTime * 0.22;
        ref.current.rotation.x = clock.elapsedTime * 0.14;
        ref.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.18;
    });
    return (
        <mesh ref={ref} position={[-2.4, -0.3, -4]}>
            <icosahedronGeometry args={[0.45, 0]} />
            <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.28} />
        </mesh>
    );
}

export default function Hero3D() {
    const wrapperRef = useRef(null);
    const [visible, setVisible] = useState(false);

    // Never render on mobile — saves ~60MB GPU memory and stops the rAF loop
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
        <div ref={wrapperRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            {visible && (
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 55 }}
                    dpr={[1, 1.5]}
                    frameloop="always"
                    gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
                    style={{ background: 'transparent' }}
                >
                    <ambientLight intensity={0.6} />
                    <ParticleField />
                    <Ring />
                    <IcoWire />
                </Canvas>
            )}
        </div>
    );
}
