import React from 'react'
import LoaderEffect from './LoaderEffect'
import { createPortal } from 'react-dom'

const Loader: React.FC  = () => {
  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-white dark:bg-opacity-20 bg-opacity-50" style={{ zIndex: 10000 }}>
      <LoaderEffect />
    </div>

  
  )
}

export default Loader