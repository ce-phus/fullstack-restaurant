import React, { useEffect, useState } from 'react'
import SectionWrapper from '../hoc/SectionWrapper'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../components/Error'
import { deleteDinner, getDinnerDetails } from '../actions/dinnerActions'
import { Link } from 'react-router-dom'
import { CREATE_DINNER_RESET, DELETE_DINNER_RESET, UPDATE_DINNER_RESET, MPESA_STK_PUSH_REQUEST } from '../constants'

const DinnerDetailsPage = () => {

  const router = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const {id} = useParams()
  
  // modal state and functions
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  const dinnerDetailsReducer = useSelector(state => state.dinnerDetailsReducer);
  const { loading, error, dinner } = dinnerDetailsReducer

  const baseUrl = 'http://localhost:8000';
  const fullImageUrl = baseUrl + dinner.image;

  const userLoginReducer =useSelector(state =>state.userLoginReducer);
  const{ userInfo } = userLoginReducer

  const deleteDinnerReducer = useSelector(state =>state.deleteDinnerReducer);
  const { success: dinnerDeletionSuccess} = deleteDinnerReducer

  useEffect(()=>{
    if (id) {
      dispatch(getDinnerDetails(id))
    }
    dispatch({
      type: UPDATE_DINNER_RESET
    });
    dispatch({
      type: CREATE_DINNER_RESET
    });
    dispatch({
      type: MPESA_STK_PUSH_REQUEST
    });
  }, [dispatch, id])

  const confirmDelete = () => {
    dispatch(deleteDinner(id));
    handleClose()
  }

  if (dinnerDeletionSuccess) {
    alert("Dinner Menu successfully deleted.");
    router('/');
    dispatch({
      type: DELETE_DINNER_RESET
    })
  }
    
  return (
    <SectionWrapper>
      <div className=''>
            {loading && <div className="spinner"></div>}
            {error ? <Error variant='danger'>{error}</Error> :
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow'>
                        <img className='rounded-t-lg w-full' src={fullImageUrl} alt={dinner.name} />
                        {userInfo && userInfo.admin &&
                            <div className='flex justify-between p-4'>
                                <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded' onClick={handleShow}>Delete Product</button>
                                <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded' onClick={() => router(`/product-update/${dinner.id}/`)}>Edit Product</button>
                            </div>
                        }
                    </div>
                    <div>
                        <p className='font-semibold text-3xl text-gray-400'>{dinner.name}</p>
                        <hr className='my-8 bg-gray-700 rounded'></hr>
                        <p className='text-gray-500 text-lg'>{dinner.description}</p>
                        <p className='text-lg text-gray-200 mt-10'>Price: <span className="text-accent ml-2">Ksh {dinner.price}</span></p>
                    </div>
                    <div className='mb-5'>
                        <h2 className='text-3xl text-gray-400 font-semibold'>Buy</h2>
                        <hr className='my-8 bg-gray-700 rounded'></hr>
                        {dinner.stock ?
                            <Link href={`/checkout/${dinner.id}`}>
                                <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded '>Pay with Mpesa</button>
                            </Link>
                            :
                            <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <p className="font-bold">Out of Stock</p>
                            <p>Will Restock</p>
                            </div> 
                            
                        }
                    </div>
                </div>
            }
            <div className={`fixed top-0 left-0 w-full h-full ${show ? 'block' : 'hidden'}`}>
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div className="modal-header flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">Delete Confirmation</p>
                            <button className="modal-close" onClick={handleClose}>
                                <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <path d="M6.46875 0.53125C6.6875 0.3125 6.98438 0.3125 7.20312 0.53125L9 2.32812L10.7969 0.53125C11.0156 0.3125 11.3125 0.3125 11.5312 0.53125C11.75 0.75 11.75 1.04688 11.5312 1.26562L9.73438 3.0625L11.5312 4.85938C11.75 5.07812 11.75 5.375 11.5312 5.59375C11.3125 5.8125 11.0156 5.8125 10.7969 5.59375L9 3.79688L7.20312 5.59375C6.98438 5.8125 6.6875 5.8125 6.46875 5.59375C6.25 5.375 6.25 5.07812 6.46875 4.85938L8.26562 3.0625L6.46875 1.26562C6.25 1.04688 6.25 0.75 6.46875 0.53125ZM0.53125 6.46875C0.3125 6.6875 0.3125 6.98438 0.53125 7.20312L2.32812 9L0.53125 10.7969C0.3125 11.0156 0.3125 11.3125 0.53125 11.5312C0.75 11.75 1.04688 11.75 1.26562 11.5312L3.0625 9.73438L4.85938 11.5312C5.07812 11.75 5.375 11.75 5.59375 11.5312C5.8125 11.3125 5.8125 11.0156 5.59375 10.7969L3.79688 9L5.59375 7.20312C5.8125 6.98438 5.8125 6.6875 5.59375 6.46875C5.375 6.25 5.07812 6.25 4.85938 6.46875L3.0625 8.26562L1.26562 6.46875C1.04688 6.25 0.75 6.25 0.53125 6.46875ZM13.1406 6.98438L9 11.125L4.85938 6.98438C4.64062 6.76562 4.64062 6.46875 4.85938 6.25C5.07812 6.03125 5.375 6.03125 5.59375 6.25L9 9.65625L12.4062 6.25C12.625 6.03125 12.9219 6.03125 13.1406 6.25C13.3594 6.46875 13.3594 6.76562 13.1406 6.98438Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body py-4 text-gray-500">
                            <p className="text-base leading-relaxed">
                                Are you sure you want to delete this product <span className="font-bold">{dinner.name}</span>?
                            </p>
                        </div>
                        <div className="modal-footer flex justify-end p-4 border-t border-gray-700">
                            <button onClick={() => confirmDelete()} className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded mr-2">
                                Confirm Delete
                            </button>
                            <button onClick={handleClose} className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </SectionWrapper>
  )

}

export default DinnerDetailsPage