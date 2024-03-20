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
    <div className='text-light mt-10 flex items-center justify-center'>
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
                              <span>
                                  <b>Name: </b>
                                  {address.name}
                              </span>
                              <span>
                                  <b>Phone No: </b>+254 {address.phone_number}
                              </span>
                              <span>
                                  <b>Address: </b>
                                  {address.house_no}, near {address.landmark}, {address.city},{' '}
                                  {address.state}, {address.pin_code}
                                  <span
                                      onClick={() => deleteAddressHandler(address)}
                                      className="mt-2 cursor-pointer"
                                  >
                                      <i
                                          title="delete address"
                                          className="ml-2 fas fa-trash-alt fa-lg"
                                      ></i>
                                  </span>
                                  <span
                                      onClick={() => history.push(`/AllAddressesOfUserPage/${address.id}/`)}
                                      className="mt-2 cursor-pointer"
                                  >
                                      <i
                                          title="edit address"
                                          className="ml-2 fas fa-edit fa-lg"
                                      ></i>
                                  </span>
                              </span>
                          </div>
                      </div>
                  ))
                : ''}
    </div>
  )
}

export default AllAddressessOfUserPage