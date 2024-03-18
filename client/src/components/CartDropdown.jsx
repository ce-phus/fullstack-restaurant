import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import BuyButton from './BuyButton';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartReducer = useSelector(state => state.cart);
  const cartItems = cartReducer.cartItems || [];

  console.log("Cart Items:", cartItems)

  // Calculate total price by summing up cart_total_price of each entry in cartItems
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.cart_total_price, 0);
  console.log("Cart Total Price: ", totalPrice)

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className="">
      {/* SVG for toggling dropdown */}
      <svg
        onClick={handleToggleDropdown}
        fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mt-4 h-6 w-6 bg-gray-600 rounded-lg mb-5 cursor-pointer"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      
      {cartItems.length > 0 && (
        <span className='absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full'>
          {cartItems.length}
        </span>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bottom right-0 w-56 bg-white rounded-lg shadow-lg cursor-pointer">
          <ul className="py-2">
          {cartItems.map((cartItem, index) => (
            <React.Fragment key={index}>
              <li className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm text-gray-800">{cartItem.item.name || 'Product Name Not Available'}</p>
                <p className="text-xs text-gray-500">Price: ${cartItem.item.price || 'Price Not Available'}</p>
                <button
                  type="button"
                  className="text-xs text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFromCart(cartItem.item.id)} // Accessing item.id
                >
                  Remove
                </button>
              </li>
            </React.Fragment>
          ))}
          </ul>
          <div className="px-4 py-2 border-t border-gray-200">
            <p className="text-sm text-gray-800">Total: Ksh {totalPrice}</p>
          </div>
          {/* Checkout Button */}
          <Link to='/cart' className='mx-3'><BuyButton /></Link>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
