import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUserAddress, getAllAddress, checkTokenValidation, logout } from '../actions/userActions'
import { DELETE_USER_ADDRESS_RESET, GET_SINGLE_ADDRESS_RESET } from '../constants'
import { useNavigate } from 'react-router-dom'
import SectionWrapper from '../hoc/SectionWrapper'
import { CreateAddressComponent } from '../components'


const AllAddressessOfUserPage = () => {

  let router = useNavigate()
  // Redux state and dispatch
  const dispatch = useDispatch();
  const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer);
  const { error: tokenError } = checkTokenValidationReducer;
  const userLoginReducer = useSelector(state => state.userLoginReducer);
  const { userInfo } = userLoginReducer;
  const getAllAddressesOfUserReducer = useSelector(state => state.getAllAddressesOfUserReducer);
  const { addresses, loading: loadingAllAddresses } = getAllAddressesOfUserReducer;
  const deleteUserAddressReducer = useSelector(state => state.deleteUserAddressReducer);
  const { success: addressDeletionSuccess } = deleteUserAddressReducer;

  const [deleteAddress, setDeleteAddress] = useState('');
  const [createAddress, setCreateAddress] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!userInfo) {
        router('/login');
    } else {
        dispatch(checkTokenValidation());
        dispatch(getAllAddress());
        dispatch({ type: GET_SINGLE_ADDRESS_RESET });
    }
  }, [dispatch, router, userInfo, addressDeletionSuccess]);

  useEffect(() => {
    if (addressDeletionSuccess) {
        alert('Address successfully deleted.');
        dispatch({ type: DELETE_USER_ADDRESS_RESET });
        dispatch(getAllAddress());
    }
  }, [addressDeletionSuccess, dispatch]);

  if (userInfo && tokenError === 'Request failed with status code 401') {
    alert('Session expired, please login again.');
    dispatch(logout());
    router('/login');
    window.location.reload();
  }

  const deleteAddressHandler = (address) => {
    setDeleteAddress(address);
    setShow(true);
};

const confirmDelete = (id) => {
    dispatch(deleteUserAddress(id));
    setShow(false);
};

const toggleCreateAddress = () => {
    setCreateAddress(!createAddress);
};

  return (
    <div className='text-light mt-10 flex items-center justify-center pl-5 mr-5'>
      <div className='text-light'>
        {loadingAllAddresses && (
          <div>
            <h5>Getting Addressess...</h5>
            <span className="ml-2 text-light">
              <div className="animate-spin h-5 w-5 mr-3 border-b-2 border-gray-900"></div>
              </span>
          </div>
        )}
      </div>
       <div className='flex flex-col justify-center items-center pt-10'>
       {createAddress ? (

        <div className="text-light">
            <CreateAddressComponent toggleCreateAddress={toggleCreateAddress} />
        </div>
        ) : (
        <div className="grid text-2xl items-center">
            <button
                className="focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={toggleCreateAddress}
            >
                Add new address +
            </button>
        </div>
        )}
        {addresses && !createAddress
        ? addresses.map((address, idx) => (
            <div key={idx}>
                <div
                    className="p-2 mb-2 text-light border-2 border-gray-700 rounded-md"
                >
                    <span className='mr-5'>
                        <b>Name: </b>
                        {address.first_name}
                    </span>
                    <span className='mr-5'>
                        <b>Phone No: </b>+254 {address.phone_number}
                    </span>
                    <span>
                        <b>Address: </b>
                        {address.house_no}, near {address.landmark}, {address.city},{' '}
                        {address.state}, {address.pin_code}
                        <button
                            onClick={() => deleteAddressHandler(address)}
                            className="mt-2 cursor-pointer mr-3 ml-3"
                        >
                            <i>
                               
                                <svg className='w-6 h-6 bg-white rounded-lg p-1.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16z"/></svg> </i>
                        </button>
                        <button
                            onClick={() => router(`/all-addresses/${address.id}/`)}
                            className="mt-2 cursor-pointer"
                        >
                            <svg className='w-6 h-6 bg-gray-300 rounded-lg flex items-center justify-center p-1.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/></svg>
                        </button>
                    </span>
                </div>
            </div>
        ))
        : ''}
        </div> 
      
    </div>
  )
}

export default AllAddressessOfUserPage