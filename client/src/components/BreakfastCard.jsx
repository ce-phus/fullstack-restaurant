import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn } from "../utils/motion";
import CartButton from './CartButton';
import BuyButton from './BuyButton';
import { connect } from 'react-redux';
import { addToCart } from "../actions/cartActions";

const BreakfastCard = ({ index, breakfast, addToCart }) => {
    const baseUrl = 'http://localhost:8000';
    const fullImageUrl = baseUrl + breakfast.image;
    const [quantity, setQuantity] = useState(1); // State to manage quantity
    // const [overrideQuantity, setOverrideQuantity] = useState(false); // State to manage override quantity
    const item_type = 'breakfast'

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
                <Link to={`/breakfast/${breakfast.id}`}>
                    <img
                        src={fullImageUrl}
                        className="rounded-t-lg w-[500px] h-[500px]" // Set image width to full width and height to auto
                        alt="Breakfast"
                    />
                </Link>
                <div
                    className="bg-secondary py-5 px-12 flex justify-evenly  flex-col"
                >

                    <h3 className="text-white text-[20px] font-bold">{breakfast.name}</h3>
                    <h3 className="text-white text-[20px] font-bold">KSH {breakfast.price}</h3>
                    <div>
                        <CartButton  addToCart={addToCart} item_type={item_type} item_id={breakfast.id} quantity={quantity}  />
                        <Link to={`/breakfast/${breakfast.id}`}>
                            <BuyButton />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default connect(null, { addToCart })(BreakfastCard);
