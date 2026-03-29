import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

function SimpleSphere() {
    return (
        <Sphere args={[0.5, 32, 32]} position={[0, 0, -2]}>
            <meshStandardMaterial color="#f59e0b" />
        </Sphere>
    );
}

function AnimatedBackground() {
    console.log('AnimatedBackground component is rendering');
    return (
        <div className="fixed inset-0 -z-10 w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 5] }}
                style={{ width: '100%', height: '100%' }}
            >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <SimpleSphere />
            </Canvas>
        </div>
    );
}

export default AnimatedBackground;