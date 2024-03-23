import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mpesastkpush } from '../actions/mpesaActions'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { getSingleAddress } from '../actions/userActions'

const ChargeMpesaComponent = ({ id, itemlist, match, selectedAddressId, item_type, itemPrice }) => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  // const [amount, setAmount] = useState('');
  const [amount, setAmount] = useState(itemPrice ? itemPrice.toString() : '');


  const mpesaStkPushReducer = useSelector(state => state.mpesaStkPushReducer)
  const { success: chargeSuccessfull, error: chargeError, loading: chargingStatus} = mpesaStkPushReducer

  // get single address reducer    
  const getSingleAddressReducer = useSelector(state => state.getSingleAddressReducer)
  const { address } = getSingleAddressReducer
  console.log("Address: ", address)

  const csrfTokenElement = document.querySelector('input[name="csrfmiddlewaretoken"]');
  const csrfToken = csrfTokenElement ? csrfTokenElement.value : '';

  useEffect(() => {
    // Fetch the address details when the selected address ID changes
    if (selectedAddressId) {
      dispatch(getSingleAddress(selectedAddressId));
    }
  }, [dispatch, selectedAddressId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    

    // Check if the entered amount is equal to the menu price
  //   if (parseFloat(amount) !== parseFloat(itemPrice)) {
  //     alert("Please enter an amount equal to the menu price.");
  //     return;
  // }
    const address_detail = `${address.house_no}, near ${address.landmark}, ${address.city}, 
    ${address.state}, ${address.pin_code}`
    const payload = {
      csrfmiddlewaretoken: csrfToken,
      first_name: "Peter",
      last_name: "Nakitare",
      phone_number: phoneNumber,
      amount: amount,
      reference: "Grill Restaurant",
      description: "Grill Restaurant",
      item_type: item_type,
    };

    dispatch(mpesastkpush(payload, id, item_type));

    if (chargeSuccessfull) {
      router({
      pathname:'/payment-status/',
      state: {detail:itemlist}})
    }
  };
  

  return (
    <>
      <div className='text-light'>
          <h2 className='max-w-sm mx-auto mb-6'>MPesa</h2>
          <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
              <div className='mb-5'>
                  <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='bg-gray-700 border focus:ring-blue-500 focus:border-blue500 rounded-lg p-2.5 w-full' />
              </div>

              <div className='mb-5'>
                  <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className='bg-gray-700 border focus:ring-blue-500 focus:border-blue500 rounded-lg p-2.5 w-full' />
              </div>

              <button type="submit" className='bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 rounded-lg font-medium text-sm px-5 py-2.5 text-center'>Charge</button>
          </form>

          {chargingStatus && <Spinner />}
          {chargeError && <p className='text-danger font-bold text-2xl'>Error: {chargeError}</p>}
      </div>
      <div className="p-2 mt-2 mb-2 border-1 border-solid border-gray-300">
      {address ?
          <div>
              <span className="text-info font-bold italic">Will be delivered at this address</span>
              <div className="mt-2">
                  <p><span className="font-bold">Name:</span> {address.first_name && address.last_name}</p>
                  <p><span className="font-bold">Phone Number:</span> {address.phone_number}</p>
                  <p><span className="font-bold">House Number:</span> {address.house_no}</p>
                  <p><span className="font-bold">Landmark:</span> {address.landmark}</p>
                  <p><span className="font-bold">City:</span> {address.city}</p>
                  <p><span className="font-bold">State:</span> {address.state}</p>
                  <p><span className="font-bold">Pin Code/Zip Code:</span> {address.pin_code}</p>
              </div>
          </div>
          :
          ""
      }
  </div>
  
    </>
      
  );
};

// With these modifications, the STK push action will include the item type in the payload, and the ChargeMpesaComponent component will use this item type when making the payment request. Make sure to adjust the item type accordingly for different checkout pages (e.g., "breakfast", "lunch", or "dinner").
// // 

export default ChargeMpesaComponent;
