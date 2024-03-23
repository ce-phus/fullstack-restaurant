import React from 'react'
import BreakfastUpdate from '../components/BreakfastUpdate'
import LunchUpdate from '../components/LunchUpdate'
import DInnerUpdate from '../components/DInnerUpdate'

const MenuUpdatePage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 pb-20'>
      <div className=''>
      <BreakfastUpdate/>
      </div>

      <div>
      <LunchUpdate/>
      </div>
      
      <div>
        <DInnerUpdate />
      </div>
    </div>
    
  )
}

export default MenuUpdatePage