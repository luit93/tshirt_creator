import React,{useState, useEffect} from 'react'
import {AnimatePresence,motion} from 'framer-motion'
import {useSnapshot} from 'valtio'
import state from '../store'
import config from '../config/config'
import {download} from '../assets'
import { downloadCanvasToImage,reader } from '../config/helpers'
import {EditorTabs,FilterTabs,DecalTypes} from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { AIPicker, ColorPicker, FilePicker, CustomButton, Tab } from '../components'




const Customizer = () => {
    // Using Valtio to access the state of the application
  const snap = useSnapshot(state)
// Declare state variables using the useState hook.
const [file, setFile]= useState('')
const [prompt, setPrompt]=useState('')
const [genImg, setGenImg]=useState(false)
const [activeEditTab, setActiveEditTab]= useState("")
const [activeFilterTab, setActiveFilterTab]= useState({
  logo:true,
  pattern:false
})

// Function to generate a tab based on the value of 'activeEditTab'
const generateTab=()=>{
  switch(activeEditTab){
    case "colorpicker":
      return <ColorPicker />
    case "filepicker":
      return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
      />
    case "aipicker":
      return <AIPicker
              prompt={prompt}
              setPrompt={setPrompt}
              genImg={genImg}
              handleOnSubmit={handleOnSubmit}      
      
            />
    default:
      return null 
  }
}

const handleOnSubmit= async(type)=>{
  if(!prompt) return alert('Enter a prompt')
  try {
    //call backend to generate AI image
    setGenImg(true)
    const response = await fetch('https://tshirt-creator-server.vercel.app/api/v1/dalle',{
      method:'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
      })
    })
    const data = await response.json()
    handleDecals(type, `data:image/png;base64,${data.photo}`)
  } catch (error) {
    alert(error)
  } finally {
      setGenImg(false)
      setActiveEditTab("")
  }
}

// Function to handle decals that filters characters or logos from an image, depending on whether the user is currently viewing a logo or pattern filter.
const handleDecals = (type, result)=>{
  const decalType= DecalTypes[type]
  state[decalType.stateProperty]= result

  if(!activeFilterTab[decalType.filterTab]){
    handleActiveFilterTab(decalType.filterTab)
  }
}

// Function to handle the active texture filter tab.
const handleActiveFilterTab=(tabName)=>{
  switch (tabName) {
    case 'logo':
      state.isLogoTexture= !activeFilterTab[tabName]
      break;
    case "pattern":
      state.isPatternTexture= !activeFilterTab[tabName]
      break;
  
    default:
      state.isPatternTexture = false
      state.isLogoTexture = true
      break;
      
  }
  //update activeFilterTab after setting state
  setActiveFilterTab((prev)=> {
    return {
      ...prev,
      [tabName]: !prev[tabName]
    }
  })
}

// Function to read a file and handle any resulting characters or logos.
const readFile=(type)=>{
  reader(file)
    .then((result)=>{
      handleDecals(type,result)
      setActiveEditTab("")
    })
}

  return (
        // AnimatePresence is used for animating presence transitions. If snap.intro is false, something will animate in
    <AnimatePresence>{!snap.intro && (
      <>
       <motion.div
        key='custom'
        className='absolute top-0 left-0 z-10'
        {...slideAnimation('left')}
       >
        <div className='flex items-center min-h-screen'>
          <div className='editortabs-container tabs'>
            {EditorTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleOnClick={()=> setActiveEditTab(tab.name)}
              />
            ))}
            {generateTab()}
          </div>
        </div>
       </motion.div>
       <motion.div className='top-5 right-5 absolute z-10' {...fadeAnimation}>
         <CustomButton 
         title="Back"
         handleOnClick={()=> state.intro = true}
         customStyles="w-fit px-4 py-2.5 font-bold text-sm"
         type='filled' />
       </motion.div>

       <motion.div 
        className='filtertabs-container'
        {...slideAnimation('up')}
       >
         {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleOnClick={()=> handleActiveFilterTab(tab.name)}
              />
            ))}
       </motion.div>
      
      </>
    )}</AnimatePresence>
  )
}

export default Customizer