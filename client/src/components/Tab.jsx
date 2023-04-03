// Import required packages and modules
import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'

// Define a functional component named Tab that takes several properties as input
const Tab = ({tab,isFilterTab, isActiveTab, handleOnClick}) => {
  // Retrieve the current state of the app using the useSnapshot hook from valtio
  const snap= useSnapshot(state)

  // Calculate styles for active tab based on whether it is a filter tab, and whether it is currently active
  const activeStyles= isFilterTab && isActiveTab
  ?{backgroundColor: snap.color, opacity:0.5}
  :{backgroundColor:'transparent', opacity:1}

  // Return a div element containing an image and some attributes
  return (
    <div key={tab.name} 
    className={`tab-btn ${isFilterTab? 'rounded-full glassmorphism': 'rounded-4'}`}
    onClick={handleOnClick}
    style={activeStyles}
    >
      <img
       src={tab.icon}
       alt={tab.name}
       className={`${isFilterTab? 'w-2/3 h-2/3': 'w-11/12 h-11/12 object-contain'}`}
       />
    </div>
  )
}

// Export the Tab component so that it can be used in other parts of the application
export default Tab
