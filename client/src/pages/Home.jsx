import React from 'react'
// import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Footer, Hero, Menu, Special, Service, Event } from '../components'

const index = () => {
  return (
    <div className='z-0'>
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center bg-primary'>
      <Hero/>
      </div>
      <Service/>
      <About/>
      <Special/>
      <Menu/>
      <Contact/>
      <Event/>
      <Footer/>
    </div>
    
    
  )
}

export default index