/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 FloatTest.gltf --transform
*/

import React, { useRef } from 'react'
import { useGLTF, Float } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/FloatTest-transformed.glb')
  return (
    <Float speed={1} rotationIntensity={1}
    floatIntensity={0.02}
    floatingRange={[0.2,0.2]}
    >
    <group {...props} dispose={null}>
      <mesh scale={0.6} geometry={nodes.Plane.geometry} material={materials.NetworkingCardTexture} />
    </group>
    </Float>
  )
}

useGLTF.preload('/FloatTest-transformed.glb')
