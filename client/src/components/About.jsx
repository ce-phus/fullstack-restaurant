import React from 'react';
import { styles } from '../styles';
import aboutabs from "/src/assets/about-abs-image.jpg";
import aboutbanner from "/src/assets/about-banner.jpg"; 
import separator from '/src/assets/separator.svg';
import shape3 from "/src/assets/shape-3.png"


const About = () => {
  return (
    <section id='#about' className='relative min-h-screen bg-primary mt-20'>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto ${styles.paddingX} items-start`}>
        <div className='flex flex-col justify-end'>
          <div className='flex'>
            <h3 className='text-accent text-sm font-bold tracking-wide mt-20'>OUR STORY</h3>
          </div>
          <div className='mt-3'>
            <img src={separator} alt='separator' className='h-3 w-20' />
          </div>
          <div className='mt-10'>
            <h1 className='text-7xl tracking-wide'>Every Flavor <br/>Tells A Story</h1>
          </div>
          <div className='mt-10'>
            <p className='tracking-wide md:w-1/2 font-normal'>Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries, but also the leap into.</p>
          </div>

          <div className='mt-5 ml-12 font-bold text-lg'>
            <p className='font-normal'>Book Through Call</p>
          </div>

          <div className='mt-5'>
            <p className='ml-10 text-3xl text-accent'>+254789654230</p>
          </div>

          <div className='mt-7'>
            <button className='block px-8 py-5 leading-loose text-2xl text-center font-normal leading-none border border-accent bg-transparent hover:bg-secondary  hover:text-white text-accent'>READ MORE</button>
          </div>
        </div>

        <div className='relative mt-20'>
          <img src={aboutbanner} alt='about-banner' className='w-full' />
          <div className='absolute -left-12 -bottom-12'>
            <img
            src={aboutabs}
            alt='aboutabs'
            className='w-full'/>
          </div>
        </div>
        <div className='hidden md:block absolute bottom-10 left-0'>
          <img
          src={shape3}/>
        </div>
      </div>
    </section>
  );
}

export default About;
