// Import necessary modules from React and other libraries
import React, { useRef } from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import {easing} from 'maath'
import { useFrame } from '@react-three/fiber'

// Define a functional component named CameraRig which accepts children as props
const CameraRig = ({children}) => {
  // Set up a reference to a mutable value (initially set to null) using the useRef hook
  const group = useRef()
  // Obtain a snapshot of the current state using the useSnapshot hook
  const snap =useSnapshot(state)
  
  // Execute the provided callback function on each animation frame using the useFrame hook
  useFrame((state,delta)=> {
    // Define some conditions based on screen width
    const isBreakpoint = window.innerWidth <= 1260
    const isMobile = window.innerWidth <= 600
    // Define the initial target model position
    let targetPosition = [-0.4, 0, 2]
    // Update the target model position based on the current state
    if(snap.intro){
      if(isBreakpoint) targetPosition = [0, 0, 2]
      if(isMobile) targetPosition= [0,0.2,2.5]
    } else {
      if(isMobile) targetPosition=[0, 0, 2.5]
      else targetPosition= [0, 0, 2]
    }
    // Smoothly update the camera position using the damp3 easing function
    easing.damp3(state.camera.position, targetPosition, 0.25,delta)
    // Smoothly update the model rotation using the dampE easing function
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })
 
  // Return a group of children with a reference to the mutable value for animation purposes
  return (
    <group ref={group}>{children}</group>
  )
}

export default CameraRig
