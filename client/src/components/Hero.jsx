import React from 'react'
import { styles } from '../styles'
import { motion } from 'framer-motion'
// import { fadeIn, textVariant } from "../utils/motion"

const Hero = () => {
  return (
    <section id='/' className='relative h-screen mx-auto'>
        <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>

          <div className='flex flex-col justify-center items-center mt-10'>
            <div className='animate-pulse w-5 h-5 rounded-full bg-[#e69b00]'/>
            <div className='w-1 sm:h-80 h-40 bg-gradient-to-r from-amber-900 to-red-400'/>
          </div>

          <div>
            <h1 
            // variants={textVariant()}
            className={`${styles.heroHeadText} `}>Where Every Flavor tells A Story</h1>
            <p 
            // variants={textVariant()}
            className={`${styles.heroSubText} mt-2 text-white-200`}>Come with Family and feel the joy of mouthwatering Food</p>
          </div>
        </div>
        <div className='mt-auto'>
            <div className='pt-6 flex items-center justify-center absolute left-0 right-0 bottom-7'>
                <button className='block bg-transparent border border-4 border-accent tracking-wide px-3 py-4 text-4xl hover:text-secondary hover:bg-accent font-bold'>View All Menu</button>
            </div>
        </div>
    </section>
  )
}

export default Hero