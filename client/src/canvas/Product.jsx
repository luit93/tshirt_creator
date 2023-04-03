// Importing necessary libraries 
import React from 'react'
import {easing} from 'maath'
import {useSnapshot} from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'

const Product = () => {
    // Accessing the current state using a snapshot
    const snap = useSnapshot(state)
    
    // Loading nodes and materials from GLTF file
    const {nodes, materials}= useGLTF('/shirt_baked.glb')
    
    // Loading logo texture and full texture using useTexture hook
    const logoTexture = useTexture(snap.logoDecal)
    const patternTexture = useTexture(snap.patternDecal)
    
    // Updating color of material based on current state using useFrame hook
    useFrame((state,delta)=>{
        easing.dampC(materials.lambert1.color,snap.color,0.25,delta)
    })
    
    // Converting state object to string for better performance when passing as a prop
    const stateString = JSON.stringify(snap)
    
  // Returning a group to render mesh and other components
  return (
    <group key={stateString}>
        <mesh 
         castShadow
         // Adding geometry and material to mesh 
         geometry={nodes.T_Shirt_male.geometry}
         material={materials.lambert1}
         material-roughness={1}
         dispose={null}
            >
                {/* Rendering pattern texture if isPatternTexture is true */}
                {snap.isPatternTexture && (
                    <Decal
                        position={[0,0,0]}
                        rotation={[0,0,0]}
                        scale={1}
                        map = {patternTexture}
                        />
                )}
                
                {snap.isLogoTexture && (
                    <Decal
                        position={[0,0.04,0.15]}
                        rotation={[0,0,0]}
                        scale={0.15}
                        map = {logoTexture}
                        depthTest={false}
                        depthWrite={true}
                        map-anisotropy={16}
                        />
                )}
        </mesh>
    </group>
  )
}

export default Product
