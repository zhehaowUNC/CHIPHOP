import React from 'react'
import M from 'materialize-css'
import './Background.css'
import { useState } from 'react'
export const Background = (isVisible) => {
  return (
    isVisible.isVisible?
      <div id='blackshit' className='isVisible'>

      </div>:null
  )
}
