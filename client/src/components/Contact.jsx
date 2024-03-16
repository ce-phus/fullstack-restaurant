import React from 'react';
import { styles } from '../styles';
import testiavatar from "/src/assets/testi-avatar.jpg";
import formpattern from "/src/assets/form-pattern.png";

const Contact = () => {
  return (
    <section id="contact" className="relative bg-hero-bg mx-auto">
      <div className={`max-w-7xl mx-auto ${styles.paddingX}`}>
        <div className="pt-20 flex flex-col relative">
          <q className="text-7xl tracking-wide">I wanted to thank you for inviting me down for that amazing dinner the other night. The food was extraordinary.</q>
        </div>
        <div className="pt-20 flex justify-center">
          <img
            src={testiavatar}
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div className="flex justify-center pt-5">
          <p className="font-semibold text-accent tracking-wide">SAM JOHNSON</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-5 md:pl-10 bg-secondary border border-transparent mt-10">
          <div className='flex flex-col'>
            <h1 className="text-5xl tracking-wide mt-10">Online Reservation</h1>
            <p className="mt-3 tracking-wide font-normal">Booking request <span className="text-accent">+88-123-123456</span> or fill out the order form</p>
            <form className="max-w-lg mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-6">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                    Your Name
                  </label>
                  <input className="appearance-none block w-full bg-primary text-white border border-[#808080] mb-3 py-3 px-4 mr-5 leading-tight focus:outline-none focus:bg-white " id="grid-first-name" type="text" placeholder="Jane" />
                </div>
                <div className="mb-6">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-phone-number">
                    Phone Number
                  </label>
                  <input className="appearance-none block w-full bg-primary text-white border border-gray-500 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phone-number" type="text" placeholder="+2540113898547" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="mb-6">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
                    Persons
                  </label>
                  <select className="block appearance-none w-full bg-primary border border-gray-500 text-white py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-gray focus:border-accent" id="grid-state">
                    <option>1 Person</option>
                    <option>2 Person</option>
                    <option>4 Person</option>
                    <option>5 Person</option>
                    <option>6 Person</option>
                    <option>7 Person</option>
                  </select>
                </div>
                <div className="mb-6 relative">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-date">
                    Date
                  </label>
                  <input datepicker type="text" className="border border-gray-500 text-gray-900 text-sm focus:border-accent block w-full py-3 px-4 pr-8 bg-primary dark:placeholder-gray-400 text-white focus:border-accent" placeholder="Select date" />
                  <div className="absolute top-3 right-3 pointer-events-none text-gray-700">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M13.707 9.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 11.586l3.293-3.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="mb-6 relative">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-time">
                    Time
                  </label>
                  <select className="block appearance-none w-full bg-primary border border-gray-500 text-white py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-gray focus:border-accent" id="grid-time">
                    <option>8:00 am</option>
                    <option>9.00 am</option>
                    <option>10:00 am</option>
                    <option>11:00 am</option>
                    <option>12:00 pm</option>
                    <option>01:00 pm</option>
                    <option>02:00 pm</option>
                    <option>03:00 pm</option>
                    <option>04:00 pm</option>
                    <option>05:00 pm</option>
                    <option>06:00 pm</option>
                    <option>07:00 pm</option>
                    <option>08:00 pm</option>
                    <option>09:00 pm</option>
                    <option>10:00 pm</option>
                  </select>
                  <div className="absolute top-3 right-3 pointer-events-none text-gray-700">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M13.707 9.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 11.586l3.293-3.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='mb-6'>
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea id='message' rows="7" className='block w-full text-sm text-gray-900 border border-gray-500 shadow-sm-light focus:ring-primary-500 focus:border-accent bg-primary text-white border-gray-600 placeholder-gray-400'></textarea>
              </div>
              <button type='submit' className='text-center text-sm text-secondary font-bold w-full tracking-wide border border-accent py-5 bg-accent hover:bg-secondary hover:text-white hover:border-accent border-4'>BOOK A TABLE</button>
            </form>
          </div>
          <div className='flex flex-col items-center relative pb-20 mb-10'>
            <img src={formpattern} className='max-w-[590px] object-cover md:w-[570px]' alt="pattern" />
            <div className='pt-20 ml-10 mb-10 absolute'>
              <h1 className='text-8xl tracking-wide'>Contact Us</h1>
              <p className='font-bold tracking-wide mt-10'>Booking Request</p>
              <p className='font-bold tracking-wide mt-3 text-2xl text-accent cursor-pointer'>+88-123-123456</p>
              <p className='font-bold tracking-wide mt-10'>Location</p>
              <p className='font-normal tracking-wide mt-3 text-sm italic text-accent'>Restaurant St, Delicious City,<br />London 9578, UK</p>
              <p className='font-bold tracking-wide mt-10'>Lunch Time</p>
              <p className='font-normal tracking-wide mt-3 text-sm italic text-accent'>Monday to Sunday<br />11.00 am - 2.30pm</p>
              <p className='font-bold tracking-wide mt-10'>Dinner Time</p>
              <p className='font-normal tracking-wide mt-3 text-sm italic text-accent'>Monday to Sunday<br />05.00 pm - 10.00 pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
