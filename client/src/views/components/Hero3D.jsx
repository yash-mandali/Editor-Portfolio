import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

/* ── Floating particle field — GPU-friendly points geometry ── */
function ParticleField() {
    const ref = useRef();
    const count = 120;

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
        ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.08;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#00d4ff" size={0.025} transparent opacity={0.55} sizeAttenuation />
        </points>
    );
}

/* ── Slow-spinning torus ring ── */
function Ring() {
    const ref = useRef();
    useFrame(({ clock }) => {
        ref.current.rotation.x = clock.elapsedTime * 0.18;
        ref.current.rotation.z = clock.elapsedTime * 0.12;
    });
    return (
        <mesh ref={ref} position={[2.2, 0.4, -3]}>
            <torusGeometry args={[0.7, 0.04, 12, 60]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.22} />
        </mesh>
    );
}

/* ── Floating wireframe icosahedron ── */
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
            <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.3} />
        </mesh>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
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
        </div>
    );
}
