import React from 'react'
import separator from '/src/assets/separator.svg';
import features1 from '/src/assets/features-icon-1.png'
import features2 from '/src/assets/features-icon-2.png'
import features3 from '/src/assets/features-icon-3.png'
import features4 from '/src/assets/features-icon-4.png'

import event1 from '/src/assets/event-1.jpg'
import event2 from '/src/assets/event-2.jpg'
import event3 from '/src/assets/event-3.jpg'

import shape8 from "/src/assets/shape-8.png"
import shape7 from "/src/assets/shape-7.png"

import { styles } from '../styles'

const Event = () => {
  return (
    <section id='event' className='relative bg-primary '>
      <div className={`max-w-7xl mx-auto ${styles.paddingX}`}>
        <div className='flex flex-col items-center justify-center pt-20'>
          <p className='text-sm text-accent font-semibold tracking-wide uppercase'>
            why choose us
          </p>
          <div className='mt-2'>
            <img src={separator} alt='separator' className='h-3 w-20' />
          </div>
          <h1 className='mt- tracking-wide text-6xl text-center'>Our Strength</h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-20 mt-10 pb-20'>
          <div className='flex border flex-col border-primary bg-secondary items-center justify-center relative'>
            <img 
            src={features1}
            alt='feature1'
            className='mt-10'/>
            <p className='text-lg tracking-wide mt-5'>Hygienic Food</p>
            <p className='w-full ml-10 flex justify-center mt-3 text-gray-500 text-sm mb-20 tracking-wide'>Lorem Ipsum is simply dummy printing and typesetting.</p>
          </div>
          <div className='flex border flex-col border-primary bg-secondary items-center justify-center relative'>
            <img 
            src={features2}
            alt='feature1'
            className='mt-10'/>
            <p className='text-lg tracking-wide mt-5'>Fresh Environment</p>
            <p className='w-full ml-10 flex justify-center mt-3 text-gray-500 text-sm mb-20 tracking-wide'>Lorem Ipsum is simply dummy printing and typesetting.</p>
          </div>
          <div className='flex border flex-col border-primary bg-secondary items-center justify-center relative'>
            <img 
            src={features3}
            alt='feature1'
            className='mt-10'/>
            <p className='text-lg tracking-wide mt-5'>Skilled Chefs</p>
            <p className='w-full ml-10 flex justify-center mt-3 text-gray-500 text-sm mb-20 tracking-wide'>Lorem Ipsum is simply dummy printing and typesetting.</p>
          </div>
          <div className='flex border flex-col border-primary bg-secondary items-center justify-center relative'>
            <img 
            src={features4}
            alt='feature1'
            className='mt-10'/>
            <p className='text-lg tracking-wide mt-5'>Event & Party</p>
            <p className='w-full ml-10 flex justify-center mt-3 text-gray-500 text-sm mb-20 tracking-wide'>Lorem Ipsum is simply dummy printing and typesetting.</p>
          </div>
        </div>
      </div>

      <div className='bg-secondary'>
        <div className={`max-w-7xl mx-auto ${styles.paddingX}`}>
          <div className='flex flex-col items-center justify-center pt-20'>
            <p className='text-sm text-accent font-semibold tracking-wide'>RECENT UPDATES</p>
            <div className='mt-2'>
              <img src={separator} alt='separator' className='h-3 w-20' />
            </div>
            <h1 className='mt-5 tracking-wide text-6xl text-center'>Upcoming Event</h1>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-20 mt-20'>
            <div className='relative flex items-center justify-center'>
              <img 
              src={event1}
              alt="event"
              className='w-full'/>
              <div className='absolute bottom-5 left-8'>
              <h1 className='text-accent tracking-wide text-sm text-lg font-bold'>FOOD, FLAVOUR</h1>
              <p className='text-2xl tracking-wide mt-3'>Flavour so good you’ll try to eat with your eyes.</p>
            </div>
            </div>
            <div className='relative flex items-center justify-center'>
              <img 
              src={event2}
              alt="event"
              className='w-full'/>
              <div className='absolute bottom-5 left-8'>
              <h1 className='text-accent tracking-wide text-sm text-lg font-bold'>HEALTHY FOOD</h1>
              <p className='text-2xl tracking-wide mt-3'>Flavour so good you’ll try to eat with your eyes.</p>
            </div>
            </div>
            <div className='relative flex items-center justify-center'>
              <img 
              src={event3}
              alt="event"
              className='w-full'/>
              <div className='absolute bottom-5 left-8'>
              <h1 className='text-accent tracking-wide text-sm text-lg font-bold'>RECIPE</h1>
              <p className='text-2xl tracking-wide mt-3'>Flavour so good you’ll try to eat with your eyes.</p>
            </div>
            </div>
          </div>
          <div className='mt-5 flex justify-center mb-20'>
          <button type='submit' className='text-center text-sm text-accent font-bold w-1/2 tracking-wide border border-accent py-5 bg-transparent hover:bg-accent hover:text-primary hover:border-accent border-4 uppercase'>view our blog</button>
          </div>
        </div>
      </div>

      <div className='absolute -top-10 left-0 hidden md:block'>
        <img
        src={shape8}
        alt='shape8'
        className=''/>
      </div>
      <div className='absolute bottom-12 right-0 hidden md:block'>
        <img
        src={shape7}
        alt='shape7'
        className=''/>
      </div>
    </section>
  )
}

export default Event