import React from 'react';
import { styles } from '../styles';
import separator from '/src/assets/separator.svg';
import service1 from '/src/assets/service-1.jpg';
import service3 from '/src/assets/service-3.jpg';
import service2 from '/src/assets/service-2.jpg';
import shape2 from '/src/assets/shape-2.png';
import shape1 from '/src/assets/shape-1.png';


const Service = () => {
  return (
    <section id='#' className='relative bg-bgprimary'>
      <div className={`max-w-7xl mx-auto ${styles.paddingX}`}>
        <div className='flex flex-col items-center justify-center pt-10'>
          <p className='text-sm text-accent font-semibold tracking-wide'>FLAVORS FOR ROYALTY</p>
          <div className='mt-2'>
            <img src={separator} alt='separator' className='h-3 w-20' />
          </div>
          <h1 className='mt-5 tracking-wide text-6xl text-center'>We Offer Top Notch</h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-20 mt-10'>
          <div className='flex flex-col items-center relative'>
            <img src={service1} alt='services' className='object-contain w-full' />
            <p className='text-3xl mt-5 tracking-wide text-italic'>Breakfast</p>
            <button className='mt-2 bg-transparent border border-transparent text-sm text-accent px-4 py-2 rounded-lg hover:bg-accent hover:border-transparent hover:text-primary'>VIEW MENU</button>
          </div>
          <div className='flex flex-col items-center'>
          <p className='text-sm font-semibold/90 tracking-wide my-20'>Lorem Ipsum is simply dummy text of the printing and <br /> typesetting industry lorem Ipsum has been the <br /> industrys standard dummy text ever.</p>
            <img src={service2} alt='services' className='object-contain w-full' />
            <p className='text-3xl mt-5 tracking-wide text-italic'>Appetizers</p>
            <button className='mt-2 bg-transparent border border-transparent text-sm text-accent px-4 py-2 rounded-lg hover:bg-accent hover:border-transparent hover:text-primary'>VIEW MENU</button>
          </div>
          <div className='flex flex-col items-center'>
            <img src={service3} alt='services' className='object-contain w-full' />
            <p className='text-3xl mt-5 tracking-wide text-italic'>Drinks</p>
            <button className='mt-2 bg-transparent border border-transparent text-sm text-accent px-4 py-2 rounded-lg hover:bg-accent hover:border-transparent hover:text-primary'>VIEW MENU</button>
          </div>
        </div>
      </div>

      <div className='hidden md:block absolute top-0 right-0 animate-bounce-slow'>
        <img src={shape2} alt='shape2' />
      </div>
      <div className='hidden md:block absolute bottom-0 left-0 animate-bounce-slow'>
        <img src={shape1} alt='shape1' />
      </div>
    </section>
  );
}

export default Service;
