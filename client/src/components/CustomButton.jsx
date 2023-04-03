// Importing React and useSnapshot hook from Valtio library
import React from 'react'
import { useSnapshot } from 'valtio'

// Importing state from the store file
import state from '../store'
import { getContrastingColor } from '../config/helpers'
// Defining a new component named CustomButton which receives title, type, customStyles, and handleOnClick as its props
const CustomButton = ({title,type,customStyles,handleOnClick}) => {
    // Using useSnapshot to access the current state of the application
    const snap = useSnapshot(state)
   
    // Defining generateStyle function which takes a single argument "type"
    const generateStyle=(type)=>{
        // Checking if type is equal to filled
        if(type ==='filled'){
            return {
                // If true, returning an object with some CSS properties for styling the button
                backgroundColor:snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if(type === 'outline') {
            return {
              borderWidth: '1px',
              borderColor: snap.color,
              color: getContrastingColor(snap.color)
            }
        }
   } 

   // Returning a button element with some classes, inline styles, and onClick event handler function passed down as props
   // The style property calls the generateStyle function with a type prop that was passed into the component
  return (
    <button 
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleOnClick}
    >
      {/* Rendering the title prop passed into the component */}
      {title}
    </button>
  )
}

// Exporting the CustomButton component as the default export of this module.
export default CustomButton
