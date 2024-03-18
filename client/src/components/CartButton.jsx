import React from 'react';

const CartButton = ({ addToCart, item_type, item_id, quantity }) => {
    const handleAddToCart = () => {
        addToCart( item_type, item_id, quantity); // Pass 'item_type' to addToCart
    };

    return (
        <button
            onClick={handleAddToCart}
            className="bg-gradient-to-t from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-medium border rounded-lg p-3 mt-10 w-1/2 mb-3 w-full cursor-pointer"
        >
            Add to Cart
        </button>
    );
};

export default CartButton;
