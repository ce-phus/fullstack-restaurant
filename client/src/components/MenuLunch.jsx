// MenuLunch.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import SectionWrapper from '../hoc/SectionWrapper';

import { fadeIn, textVariant } from '../utils/motion';

import LunchCard from './LunchCard';

const MenuLunch = ({ lunchList }) => {
  
  return (
    <>
     <SectionWrapper>
      <motion.div variants={textVariant}>
        <p className={`${styles.heroHeadText} text-accent`}>Lunch Menu</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-white text-[17px] max-w-3xl leading-[30px]'
      >
        Explore our delicious lunch options below. Whether you're in the mood for a light salad or a hearty bowl, our lunch menu has something for everyone.
      </motion.p>

      <div className='mt-20 flex grid grid-cols-1 md:grid-cols-3 gap-5'>
        {lunchList.map((lunch, index) => (
          <LunchCard key={lunch.id} index={index} lunch={lunch} />
        ))}
      </div>
     </SectionWrapper>
    </>
  );
};

export default MenuLunch;
