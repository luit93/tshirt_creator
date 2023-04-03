import React from 'react'
import CustomButton from './CustomButton'
const AIPicker = ({prompt,setPrompt, genImg, handleOnSubmit}) => {
  return (
    <div className='aipicker-container'>
      <textarea 
    className='aipicker-textarea'
    placeholder='Generate an image'
    rows={5}
    value={prompt}
    onChange={(e)=> setPrompt(e.target.value)}
      />
      <div className='flex flex-wrap gap-3'>
       {genImg? (
        <CustomButton 
        type='outline'
        title='Generating Image...'
        customStyles='text-xs' 
         />
       ): (
        <>
         <CustomButton 
              type="outline"
              title="AI Logo"
              handleOnClick={() => handleOnSubmit('logo')}
              customStyles="text-xs"
            />
        <CustomButton
          type='filled'
          title="AI Pattern"
          handleOnClick={()=> {
            handleOnSubmit('pattern')}}
          customStyles='text-xs'


        />
        </>
       )} 
      </div>
    </div>
  )
}

export default AIPicker