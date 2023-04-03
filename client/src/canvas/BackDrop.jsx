import React,{useRef} from 'react'
import {easing} from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'





const BackDrop = () => {
  const shadows= useRef()

  return (
    <AccumulativeShadows 
       ref={shadows}
       position={[0,0,-0.14]}
       temporal
       alphaTest={0.85}
       frames={60}
       scale={10}
       rotation={[Math.PI / 2, 0, 0]}
       >
      <RandomizedLight 
        amount={4}   
        radius={9}
        intensity={0.55}
        ambient={0.15}
        position={[5, 5, -10]}   
      />
      <RandomizedLight 
        amount={4}   
        radius={7}
        intensity={0.25}
        ambient={0.65}
        position={[-5, 5, -9]}   
      />
    </AccumulativeShadows>
  )
}

export default BackDrop