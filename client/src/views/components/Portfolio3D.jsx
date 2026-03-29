import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere, useCursor } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveBox({ position, color }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    useFrame((state) => {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[1]) * 0.3;
        if (hovered) {
            meshRef.current.scale.setScalar(1.2);
        } else {
            meshRef.current.scale.setScalar(1);
        }
    });

    return (
        <Box
            ref={meshRef}
            args={[0.3, 0.3, 0.3]}
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.6}
                emissive={color}
                emissiveIntensity={hovered ? 0.3 : 0.1}
            />
        </Box>
    );
}

function FloatingSpheres() {
    const groupRef = useRef();

    useFrame((state) => {
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    });

    return (
        <group ref={groupRef}>
            <Sphere args={[0.15, 32, 32]} position={[1, 1, -4]}>
                <meshStandardMaterial
                    color="#f59e0b"
                    transparent
                    opacity={0.4}
                    emissive="#f59e0b"
                    emissiveIntensity={0.2}
                />
            </Sphere>
            <Sphere args={[0.1, 32, 32]} position={[-1.5, -0.5, -3]}>
                <meshStandardMaterial
                    color="#fbbf24"
                    transparent
                    opacity={0.5}
                    emissive="#fbbf24"
                    emissiveIntensity={0.15}
                />
            </Sphere>
            <Sphere args={[0.12, 32, 32]} position={[0, -1.2, -5]}>
                <meshStandardMaterial
                    color="#f59e0b"
                    transparent
                    opacity={0.3}
                    emissive="#f59e0b"
                    emissiveIntensity={0.25}
                />
            </Sphere>
        </group>
    );
}

function MouseFollower() {
    const meshRef = useRef();
    const { viewport } = useThree();

    useFrame((state) => {
        const x = (state.mouse.x * viewport.width) / 2;
        const y = (state.mouse.y * viewport.height) / 2;
        meshRef.current.position.set(x, y, -2);
        meshRef.current.rotation.z = state.clock.elapsedTime;
    });

    return (
        <Sphere ref={meshRef} args={[0.05, 16, 16]}>
            <meshStandardMaterial
                color="#f59e0b"
                transparent
                opacity={0.8}
                emissive="#f59e0b"
                emissiveIntensity={0.5}
            />
        </Sphere>
    );
}

function Portfolio3D() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={0.8} />
                <directionalLight position={[-5, -5, -5]} intensity={0.3} />

                <InteractiveBox position={[-2, 1, -3]} color="#f59e0b" />
                <InteractiveBox position={[2, -1, -4]} color="#fbbf24" />
                <InteractiveBox position={[0, 0.5, -2]} color="#f59e0b" />

                <FloatingSpheres />
                <MouseFollower />
            </Canvas>
        </div>
    );
}

export default Portfolio3D;