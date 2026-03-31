import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Stars() {
    const ref = useRef();

    const [sphere] = useMemo(() => {
        const sphere = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            sphere[i * 3] = (Math.random() - 0.5) * 20;
            sphere[i * 3 + 1] = (Math.random() - 0.5) * 20;
            sphere[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return [sphere];
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00d4ff"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function FloatingGeometry() {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    return (
        <mesh ref={meshRef} position={[2, -1, -5]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
                color="#00d4ff"
                transparent
                opacity={0.1}
                wireframe
            />
        </mesh>
    );
}

function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars />
                <FloatingGeometry />
            </Canvas>
        </div>
    );
}

export default AnimatedBackground;