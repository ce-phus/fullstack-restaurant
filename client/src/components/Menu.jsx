import React from 'react';
import { styles } from '../styles';
import separator from '/src/assets/separator.svg';
import menu1 from "/src/assets/menu-1.png";
import menu2 from "/src/assets/menu-2.png";
import menu3 from "/src/assets/menu-3.png";
import menu4 from "/src/assets/menu-4.png";
import menu5 from "/src/assets/menu-5.png";
import menu6 from "/src/assets/menu-6.png";
import shape5 from "/src/assets/shape-5.png";
import shape6 from "/src/assets/shape-6.png";

const Menu = () => {
  return (
    <section id='/menu' className='relative bg-primary'>
      <div className={`max-w-7xl mx-auto ${styles.paddingX} pt-24`}>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-sm text-accent font-semibold tracking-wide'>SPECIAL SELECTION</p>
          <div className='mt-5'>
            <img src={separator} alt='separator' className='h-3 w-20' />
          </div>
          <h1 className='mt-5 tracking-wide text-6xl text-center'>Delicious Menu</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-20 gap-10 md:gap-20'>
          {/* Menu 1 */}
          <div className='flex flex-col items-center relative'>
            <img src={menu1} className='w-40 h-30' alt='menu1' />
            <div className='flex flex-col'>
              <div className='ml-4 flex flex-row mt-3'>
                <h4 className='italic tracking-wide mt-1'>Greek Salad</h4>
                <p className='ml-3 block px-4 py-2 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-accent text-secondary'>SEASONAL</p>
                <p className='pl-3 text-accent'>===== </p>
                <p className='pl-3'>KSH 2000</p>
              </div>
              <div className='ml-4 mt-4'>
                <p className='font-medium'>Tomatoes, green bell pepper, sliced cucumber onion, olives, and feta cheese.</p>
              </div>
            </div>
          </div>
          
          {/* Menu 2 */}
          <div className='flex flex-col items-center relative'>
            <div className='flex flex-row '>
              <img src={menu2} className='w-40 h-30' alt='menu2' />
              <div className='flex flex-col'>
                <div className='ml-4 flex flex-row'>
                  <h4 className='italic tracking-wide mt-1 mr-2'>Butter Pumpkin</h4>
                  <p className=' text-accent'>===== </p>
                  <p className='pl-3'>KSH 2000</p>
                </div>
                <div className='ml-4 mt-4'>
                  <p>Typesetting industry lorem Lorem Ipsum is simply dummy text of the priand.</p>
                </div>
              </div>
            </div>
            {/* Additional content for Menu 2 if needed */}
          </div>
          
          {/* Menu 3 */}
          <div className='flex flex-col items-center relative'>
            <div className='flex flex-row '>
              <img src={menu3} className='w-40 h-30' alt='menu3' />
              <div className='flex flex-col'>
                <div className='ml-4 flex flex-row'>
                  <h4 className='italic tracking-wide mt-1 mr-2'>Butter Pumpkin</h4>
                  <p className=' text-accent'>===== </p>
                  <p className='pl-3'>KSH 2000</p>
                </div>
                <div className='ml-4 mt-4'>
                  <p>Avocados with crab meat, red onion, crab salad stuffed red bell pepper and green bell pepper.</p>
                </div>
              </div>
            </div>
            {/* Additional content for Menu 3 if needed */}
          </div>
          
          {/* Menu 4 */}
          <div className='flex flex-col items-center relative'>
            <div className='flex flex-row '>
              <img src={menu4} className='w-40 h-30' alt='menu4' />
              <div className='flex flex-col'>
                <div className='ml-4 flex flex-row'>
                  <h4 className='italic tracking-wide mt-1'>Tokusen Wagyu</h4>
                  <p className='ml-3 block px-4 py-2 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-accent text-secondary'>NEW</p>
                  <p className='pl-3 text-accent'>===== </p>
                  <p className='pl-3'>KSH 2000</p>
                </div>
                <div className='ml-4 mt-4'>
                  <p className='font-medium'>Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.</p>
                </div>
              </div>
            </div>
            {/* Additional content for Menu 4 if needed */}
          </div>
          
          {/* Menu 5 */}
          <div className='flex flex-col items-center relative'>
            <div className='flex flex-row '>
              <img src={menu5} className='w-40 h-30' alt='menu5' />
              <div className='flex flex-col'>
                <div className='ml-4 flex flex-row'>
                  <h4 className='italic tracking-wide mt-1 mr-2'>Lasagne</h4>
                  <p className=' text-accent'>===== </p>
                  <p className='pl-3'>KSH 2000</p>
                </div>
                <div className='ml-4 mt-4'>
                  <p>Typesetting industry lorem Lorem Ipsum is simply dummy text of the priand.</p>
                </div>
              </div>
            </div>
            {/* Additional content for Menu 5 if needed */}
          </div>
          
          {/* Menu 6 */}
          <div className='flex flex-col items-center relative'>
            <div className='flex flex-row '>
              <img src={menu6} className='w-40 h-30' alt='menu6' />
              <div className='flex flex-col'>
                <div className='ml-4 flex flex-row'>
                  <h4 className='italic tracking-wide mt-1 mr-2'>Opu Fish</h4>
                  <p className=' text-accent'>===== </p>
                  <p className='pl-3'>KSH 2000</p>
                </div>
                <div className='ml-4 mt-4'>
                  <p>Avocados with crab meat, red onion, crab salad stuffed red bell pepper and green bell pepper.</p>
                </div>
              </div>
            </div>
            {/* Additional content for Menu 6 if needed */}
          </div>
        </div>
        
        {/* Open Daily div */}
        <div className='flex flex-col items-center mt-10'>
          <p className='text-lg font-normal max-w-2xl'>Open daily from <span className='text-accent'>7.00 am</span> to <span className='text-accent'>9.00 pm</span></p>
          <div className='mt-5 md:mt-10 md:ml-11 mb-10'>
            <button className='px-8 py-3 text-sm md:text-base font-bold border border-accent bg-transparent text-accent hover:bg-secondary hover:text-white'>VIEW ALL MENU</button>
          </div>
        </div>
      </div>
      
      {/* Animated shapes */}
      <div className='absolute top-0 left-0 hidden md:block w-1/3'>
        <img src={shape5} alt='shape-5'/>
      </div>
      <div className='absolute bottom-0 right-0 hidden md:block w-1/3'>
        <img src={shape6} alt='shape-5'/>
      </div>
    </section>
  );
};

export default Menu;
