import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

/* ── Sparse particle cloud ── */
function Particles() {
    const ref = useRef();
    const count = 80;

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
            <pointsMaterial color="#00d4ff" size={0.022} transparent opacity={0.45} sizeAttenuation />
        </points>
    );
}

/* ── Orbiting ring ── */
function OrbitRing() {
    const ref = useRef();
    useFrame(({ clock }) => {
        ref.current.rotation.z = clock.elapsedTime * 0.2;
        ref.current.rotation.x = 0.9;
    });
    return (
        <mesh ref={ref} position={[3.5, 0, -6]}>
            <torusGeometry args={[1.2, 0.03, 10, 60]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.15} />
        </mesh>
    );
}

export default function About3D() {
    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
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
        </div>
    );
}
