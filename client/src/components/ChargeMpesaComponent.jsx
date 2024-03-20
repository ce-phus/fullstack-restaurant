import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mpesastkpush } from '../actions/mpesaActions'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

const ChargeMpesaComponent = ( {id} ) => {
    const router = useNavigate()
    const dispatch = useDispatch()

    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const mpesaStkPush = useSelector((state) => state.mpesaStkPushReducer);
    const { loading, success, error } = mpesaStkPush;

    const csrfTokenElement = document.querySelector('input[name="csrfmiddlewaretoken"]');
    const csrfToken = csrfTokenElement ? csrfTokenElement.value : '';

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const payload = {
          csrfmiddlewaretoken: csrfToken,
          phone_number: phoneNumber,
          amount: amount,
          reference: "Peter",
          description: "test"
        };
    
        dispatch(mpesastkpush(payload, id));
      };

  return (
    <div className='text-light'>
      <h2 className='max-w-sm mx-auto mb-6'>MPesa</h2>
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-5'>
          <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='bg-gray-700 border focus:ring-blue-500 focus:border-blue500 rounded-lg p-2.5 w-full'/>
        </div>
        
        <div className='mb-5'>
          <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className='bg-gray-700 border focus:ring-blue-500 focus:border-blue500 rounded-lg p-2.5 w-full'/>
        </div>
        
        
        <button type="submit" className='bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 rounded-lg font-medium text-sm px-5 py-2.5 text-center'>Charge</button>
      </form>
      
      {loading && <p>Loading...</p> ? <Spinner/> : ""}
      {error && <p className='text-danger forn-bold text-2xl'>Error: {error}</p>}
      {success && <p>Payment successful!</p>}
    </div>
  )
}

export default ChargeMpesaComponent