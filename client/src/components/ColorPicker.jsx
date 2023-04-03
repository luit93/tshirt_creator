// Import required packages and modules
import React from 'react'
import {SketchPicker} from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'

// Define a functional component named ColorPicker
const ColorPicker = () => {
  // Retrieve the current state of the app using the useSnapshot hook from valtio
  const snap = useSnapshot(state)

  // Return the color picker component on the screen along with its properties
  return (
    <div className='absolute left-full mml-3'>
      <SketchPicker 
        color={snap.color}
        disableAlpha
        presetColors={[
          '#000000', '#ffffff','#ff0000','#00ff00','#0000ff','#fff000','#ff00ff'
        ]}
        onChange={(color)=> state.color= color.hex}
      />
    </div>
  )
}

// Export the ColorPicker component so that it can be used in other parts of the application
export default ColorPicker
