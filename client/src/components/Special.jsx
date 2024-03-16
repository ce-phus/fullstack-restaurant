import React from 'react';
import specialdish from "/src/assets/special-dish-banner.jpg";
import badge1 from "/src/assets/badge-1.png";
import separator from '/src/assets/separator.svg';
import shape9 from '/src/assets/shape-9.png';
import shape4 from '/src/assets/shape-4.png';

const Special = () => {
  return (
    <section id='/' className='relative bg-bgprimary mt-20 md:mt-0'>
      <div className='px-4 md:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-start'>
          <div className='w-full flex'>
            <img src={specialdish} alt='special-dish' />
          </div>
          <div className='mt-10 md:mt-20'>
            <div className='flex items-center'>
              <img src={badge1} alt='badge1' className='mr-5 w-6 animate-bounce' />
              <h3 className='text-accent text-sm font-bold tracking-wide'>SPECIAL DISH</h3>
            </div>
            <div className='mt-3 md:ml-11'>
              <img src={separator} alt='separator' className='h-3 w-20' />
            </div>
            <div className='mt-5 md:mt-10 md:ml-11'>
              <h1 className='text-4xl md:text-7xl tracking-wide'>Lobster <br />Tortellini</h1>
            </div>
            <div className='mt-5 md:mt-10 md:ml-11'>
              <p className='tracking-wide font-normal md:w-1/2'>Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries, but also the leap into.</p>
            </div>
            <div className='flex items-center mt-5 md:mt-10 md:ml-11'>
              <p className='text-accent text-xl font-bold'>KSH 4000</p>
              <p className='font-normal ml-3'>KSH 2000</p>
            </div>
            <div className='mt-5 md:mt-10 md:ml-11 mb-10'>
              <button className='px-8 py-3 text-sm md:text-base font-bold border border-accent bg-transparent text-accent hover:bg-secondary hover:text-white'>VIEW ALL MENU</button>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden md:block absolute bottom-0 right-0'>
        <img src={shape9} alt='shape9' />
      </div>

      <div className='hidden md:block absolute right-0 top-0'>
      <img src={shape4} alt='shape9' />
      </div>
    </section>
  );
}

export default Special;
