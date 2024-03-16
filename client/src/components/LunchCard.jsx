import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn } from "../utils/motion";
import CartButton from './CartButton';
import BuyButton from './BuyButton';
import { connect } from 'react-redux';

const LunchCard = ({ index, lunch }) => {
  const baseUrl = 'http://localhost:8000';
  const fullImageUrl = baseUrl + lunch.image; // Corrected from breakfast.image

  return (
    <div className="w-3/4 bg-secondary">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="w-full bg-gradient-to-br from-zinc-900 to-indigo-600 p-[1px] rounded-[20px] shadow-card"
        style={{
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
        }}
      >
        <Link to={lunch.id}>
          <img
            src={fullImageUrl}
            className="w-full h-auto rounded-t-lg" // Set image width to full width and height to auto
            alt="Lunch" // Changed alt text from "Breakfast" to "Lunch"
          />
        </Link>
        <div
          className="bg-secondary py-5 px-12 flex justify-evenly  flex-col"
        >
          <h3 className="text-white text-[20px] font-bold">{lunch.name}</h3>
          <h3 className="text-white text-[20px] font-bold">KSH {lunch.price}</h3> {/* Changed from breakfast.price to lunch.price */}
          <div>
            <CartButton lunch={lunch} />
            <Link to={lunch.id}>
              <BuyButton />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default connect(null, {})(LunchCard);
