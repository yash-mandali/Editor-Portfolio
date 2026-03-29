import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

function OrbitingRings() {
    const ring1Ref = useRef();
    const ring2Ref = useRef();
    const ring3Ref = useRef();

    useFrame((state) => {
        ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.3;
        ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.4;
        ring3Ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    });

    return (
        <group position={[3, 0, -8]}>
            <Ring ref={ring1Ref} args={[1, 1.1, 64]}>
                <meshStandardMaterial
                    color="#f59e0b"
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                />
            </Ring>
            <Ring ref={ring2Ref} args={[1.5, 1.6, 64]}>
                <meshStandardMaterial
                    color="#f59e0b"
                    transparent
                    opacity={0.08}
                    side={THREE.DoubleSide}
                />
            </Ring>
            <Ring ref={ring3Ref} args={[2, 2.1, 64]}>
                <meshStandardMaterial
                    color="#f59e0b"
                    transparent
                    opacity={0.05}
                    side={THREE.DoubleSide}
                />
            </Ring>
        </group>
    );
}

function FloatingParticles() {
    const pointsRef = useRef();

    const [positions] = useMemo(() => {
        const positions = new Float32Array(200 * 3);
        for (let i = 0; i < 200; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return [positions];
    }, []);

    useFrame((state) => {
        pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={200}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#f59e0b"
                size={0.02}
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

function PulsingSphere() {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    });

    return (
        <Sphere ref={meshRef} args={[0.2, 32, 32]} position={[-3, -1, -6]}>
            <meshStandardMaterial
                color="#f59e0b"
                transparent
                opacity={0.4}
                emissive="#f59e0b"
                emissiveIntensity={0.2}
            />
        </Sphere>
    );
}

function About3D() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.6} />
                <OrbitingRings />
                <FloatingParticles />
                <PulsingSphere />
            </Canvas>
        </div>
    );
}

export default About3D;