import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import Loader from './Loader';

function Card() {

    const card = useGLTF('./3dModels/NetworkingCardBlue.gltf');

  return (
    <mesh>
        <hemisphereLight 
        intensity={0.15}
        groundColor="black" />
        <pointLight intensity={1} />
        <primitive
        object={card.scene}
        />
    </mesh>
  )
}

const CardCanvas = () => {
    return (
        <Canvas
        frameloop='demand'
        shadows
        camera={{position: [20, 3, 0], fov: 25}}
        gl={{ preserveDrawingBuffer: true}}
        >

        <Suspense>

            <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            />

            <Card />

        </Suspense>

        <Preload all />
        </Canvas>
    )
}


export default CardCanvas;
