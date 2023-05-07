/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 NetworkingCardFinale.gltf --transform
*/

import React, { useRef } from 'react'
import { useGLTF, Float } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/NetworkingCardFinale-transformed.glb')
  return (
    <Float speed={1} rotationIntensity={1}
    floatIntensity={0.02}
    >
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Plane.geometry} material={materials.NetworkingCardTexture} />
    </group>
    </Float>
  )
}

useGLTF.preload('/NetworkingCardFinale-transformed.glb')
