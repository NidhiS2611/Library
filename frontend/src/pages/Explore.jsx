import React from 'react'
import Navbar from '../component/Navbar'
import Books from '../pages/user/Books'

const Explore = () => {
  return (
    <div className='w-full bg-white dark:bg-gray-900 min-h-screen'>
        <Navbar/>
        <Books/>
      
    </div>
  )
}

export default Explore
