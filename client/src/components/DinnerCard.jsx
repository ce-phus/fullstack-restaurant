import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn } from '../utils/motion';
import CartButton from './CartButton';
import BuyButton from './BuyButton';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const DinnerCard = ({ index, dinner, addToCart }) => {
  const baseUrl = 'http://localhost:8000';
  const fullImageUrl = baseUrl + dinner.image;
  const [quantity, setQuantity] = useState(1);
  const item_type = 'dinner';

  useEffect(() => {
    if (quantity > 0) {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [quantity]);

  return (
    <div className="w-3/4 bg-secondary">
      <motion.div
        variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
        className="w-full bg-gradient-to-br from-zinc-900 to-indigo-600 p-[1px] rounded-[20px] shadow-card"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Link to={`/dinner/${dinner.id}`}>
          <img
            src={fullImageUrl}
            className="w-full h-auto rounded-t-lg"
            alt="Dinner"
          />
        </Link>
        <div className="bg-secondary py-5 px-12 flex justify-evenly flex-col">
          <h3 className="text-white text-[20px] font-bold">{dinner.name}</h3>
          <h3 className="text-white text-[20px] font-bold">KSH {dinner.price}</h3>
          <div>
            <CartButton
              dinner={dinner}
              addToCart={addToCart}
              item_type={item_type}
              item_id={dinner.id}
              quantity={quantity}
            />
            <Link to={`/dinner/${dinner.id}`}>
              <BuyButton />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default connect(null, { addToCart })(DinnerCard);
