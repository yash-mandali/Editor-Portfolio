import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSphere() {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.5;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.3;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    });

    return (
        <Sphere ref={meshRef} args={[0.3, 32, 32]} position={[-2, 0, -3]}>
            <meshStandardMaterial
                color="#f59e0b"
                transparent
                opacity={0.3}
                roughness={0.1}
                metalness={0.8}
            />
        </Sphere>
    );
}

function FloatingBox() {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.2) * 0.4;
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.9) * 0.6;
        meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    });

    return (
        <Box ref={meshRef} args={[0.4, 0.4, 0.4]} position={[2, -1, -4]}>
            <meshStandardMaterial
                color="#f59e0b"
                transparent
                opacity={0.2}
                wireframe
            />
        </Box>
    );
}

function FloatingTorus() {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.15;
    });

    return (
        <Torus ref={meshRef} args={[0.5, 0.1, 16, 100]} position={[0, 1, -5]}>
            <meshStandardMaterial
                color="#f59e0b"
                transparent
                opacity={0.25}
                emissive="#f59e0b"
                emissiveIntensity={0.1}
            />
        </Torus>
    );
}

function Hero3D() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <directionalLight position={[-10, -10, -5]} intensity={0.3} />
                <FloatingSphere />
                <FloatingBox />
                <FloatingTorus />
            </Canvas>
        </div>
    );
}

export default Hero3D;