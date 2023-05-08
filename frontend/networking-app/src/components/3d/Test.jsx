import React from 'react'

import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import Card from './FloatTest'


const Test = () => {

  return (
    <div style={{ width: '100%', height: "250px"}}>
        <Canvas
        camera={{position: [1, 0, 6] ,fov: 35}} s
        >
            <Stage environment="city" intensity={1.2}>
                <Card />
            </Stage>
            <OrbitControls 
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            />
            <hemisphereLight 
            intensity={1} />
        </Canvas>
    </div>
  )
}

export default Test;