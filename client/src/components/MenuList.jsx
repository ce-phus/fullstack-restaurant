import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from "../utils/motion";
import BreakfastCard from './BreakfastCard'; 
import { styles } from '../styles';
import SectionWrapper from "../hoc/SectionWrapper"; // Correct import for SectionWrapper

const MenuList = ({ breakfastList, lunchList }) => {
  return (
    <>
     <SectionWrapper>
      <motion.div variants={textVariant}>
        <p className={`${styles.heroHeadText} text-accent`}>Breakfast Menu</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-white text-[17px] max-w-3xl leading-[30px]'
      >
        Indulge in a delectable morning feast with our exquisite breakfast menu. From hearty classics to tantalizing specialties, our carefully crafted dishes are designed to awaken your taste buds and set the perfect tone for your day. Whether you prefer sweet or savory, there's something to satisfy every craving. Join us for a culinary journey that celebrates the art of breakfast.
      </motion.p>

      <div className='mt-20 flex grid grid-cols-1 lg:grid-cols-3 gap-5'>
        {breakfastList.map((breakfast, index) => (
          <BreakfastCard key={breakfast.id} index={index} breakfast={breakfast} />
        ))}
      </div>
      
      
     </SectionWrapper>
    </>
  );
};

export default MenuList;
