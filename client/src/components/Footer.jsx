import React from 'react';
import { styles } from '../styles';
import footerform from '/src/assets/footer-form-bg.png';
import logo from "/src/assets/logo.svg";

const Footer = () => {
  return (
    <section id='footer' className='relative bg-hero-footer md:bg-auto mx-auto'>
      <div className={`max-w-7xl mx-auto grid place-items-center h-screen`}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-20 mt-10 pb-20'>
          <div className='flex flex-col items-center justify-center mr-12'>
            <p className='uppercase tracking-wide font-bold text-gray-500 text-sm mb-5 cursor-pointer hover:text-accent'>Home</p>
            <p className='uppercase tracking-wide font-bold text-gray-500 text-sm mb-5 cursor-pointer hover:text-accent'>Menus</p>
            <p className='uppercase tracking-wide font-bold text-gray-500 text-sm mb-5 cursor-pointer hover:text-accent'>About us</p>
            <p className='uppercase tracking-wide font-bold text-gray-500 text-sm mb-5 cursor-pointer hover:text-accent'>our chefs</p>
            <p className='uppercase tracking-wide font-bold text-gray-500 text-sm mb-5 cursor-pointer hover:text-accent'>contact</p>
          </div>

          <div className='flex flex-col items-center relative md:col-span-2 gap-20'>
            <div className='border border-transparent bg-primary relative w-full w-[590px] pb-10'>
              <img src={footerform} alt='footerform' className='' />
            </div>
            <div className='pt-10 ml-10 absolute'>
              <img src={logo} alt='logo' />
              <p className='text-gray-500 tracking-wide text-sm w-full mt-10 mb-5'>Restaurant St, Delicious City, London 9578, UK</p>
              <a href='#' className='text-gray-500 hover:text-accent tracking-wide text-sm w-full cursor-pointer'>booking@gmail.com</a>
              <p className='text-gray-500 hover:text-accent tracking-wide text-sm w-full mt-5'>Booking Request: +88-123-456789</p>
              <p className='text-gray-500 tracking-wide text-sm w-full mt-5'>Open : 09:00 am - 01:00 pm</p>
              <h1 className='text-3xl mt-10 tracking-wide'>Get News & Offers</h1>
              <p className='mt-3 tracking-wide text-gray-500 text-sm mb-5'> Subscribe us & Get <span className='text-accent'>25% Off</span></p>
              <form action="#">
              <div class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div class="relative w-full">
                      <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                      </div>
                      <input class="block p-3 pl-10 w-full text-sm text-white bg-secondary rounded-lg border border-gray-600 sm:rounded-none sm:rounded-l-lg focus:ring-accent focus:border-primary-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required=""/>
                  </div>
                  <div>
                      <button type="submit" class="py-3 px-5 w-full text-sm font-medium text-center text-gray-600 rounded-lg border cursor-pointer bg-accent border-accent sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-accent dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
                  </div>
              </div>
              <div class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
          </form>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center mr-12 md:col-start-4'>
            <p className='uppercase tracking-wide font-bold text-gray-500 text-sm mb-5 cursor-pointer hover:text-accent'>Facebook</p>
            <p className='uppercase tracking-wide font-bold text-gray-500 text-sm mb-5 cursor-pointer hover:text-accent'>Instagram</p>
            <p className='uppercase tracking-wide font-bold text-gray-500 text-sm mb-5 cursor-pointer hover:text-accent'>Twitter</p>
            <p className='uppercase tracking-wide font-bold text-gray-500 text-sm mb-5 cursor-pointer hover:text-accent'>Youtube</p>
            <p className='uppercase tracking-wide font-bold text-gray-500 text-sm mb-5 cursor-pointer hover:text-accent'>Google Map</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
