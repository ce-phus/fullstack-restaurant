import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, getTotalPrice } from '../actions/cartActions';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartReducer = useSelector(state => state.cart);
  const { cartItems } = cartReducer;
  console.log("Cart Items: ", cartItems)

  // Calculate total price by summing up total_price of each entry in cartItems
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.cart_total_price, 0);

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [dispatch]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const baseUrl = 'http://localhost:8000'; // Base URL of your backend server

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-semibold mt-6 mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((cartItem, index) => (
            <React.Fragment key={index}>
            <div key={cartItem.id} className="flex justify-between items-center border-b border-gray-200 py-4">
              <div className="flex flex-col md:flex-row items-center">
                <img src={`${baseUrl}${cartItem.item.image}`} alt={cartItem.item.name} className="w-[500px] h-[400px] mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{cartItem.item.name}</h2>
                  <p className="text-sm text-gray-500">Price: Ksh {cartItem.item.price}</p>
                  <p className="text-sm text-gray-500">Description: {cartItem.item.description}</p>
                </div>
              </div>
              <button
                className="text-sm text-red-500 hover:text-red-700"
                onClick={() => handleRemoveFromCart(cartItem.item.id)}
              >
                Remove
          </button>
        </div>

            </React.Fragment>
          ))}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-light">Total Price: Ksh{totalPrice}</h2>
          </div>
          <Link href="#">
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
