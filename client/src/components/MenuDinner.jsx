import React from 'react'
import { motion } from 'framer-motion';
import { styles } from '../styles';
import SectionWrapper from '../hoc/SectionWrapper';
import { fadeIn, textVariant } from '../utils/motion';
import DinnerCard from './DinnerCard';

const MenuDinner = ({ dinnerList}) => {
    return (
        <>
         <SectionWrapper>
          <motion.div variants={textVariant}>
            <p className={`${styles.heroHeadText} text-accent`}>Dinner Menu</p>
            <h2 className={styles.sectionHeadText}>Overview</h2>
          </motion.div>
    
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className='mt-4 text-white text-[17px] max-w-3xl leading-[30px]'
          >
            Indulge in a delightful evening culinary experience with our exquisite dinner menu. Crafted with passion and expertise, each dish is a symphony of flavors and textures, carefully curated to tantalize your taste buds and leave you craving for more. From succulent grilled meats to savory pasta dishes, our menu offers a diverse selection to cater to every palate. Whether you're seeking a romantic dinner for two or a gathering with friends and family, our restaurant provides the perfect ambiance for a memorable dining experience. Join us for dinner and embark on a culinary journey that celebrates the art of fine dining.
          </motion.p>
    
          <div className='mt-20 flex grid grid-cols-1 md:grid-cols-3 gap-5'>
            {dinnerList.map((dinner, index) => (
              <DinnerCard key={dinner.id} index={index} dinner={dinner} />
            ))}
          </div>
         </SectionWrapper>
        </>
      );
    };
    
    export default MenuDinner