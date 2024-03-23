import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { checkTokenValidation, logout } from '../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import { getDinnerDetails, updateDinner } from '../actions/dinnerActions';
import { UPDATE_DINNER_RESET } from '../constants';
import Error from './Error';



const DInnerUpdate = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useNavigate()

  // as our errors will be displayed at the top of the webpage
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
  }
  const dinnerDetailsReducer = useSelector(state=> state.dinnerDetailsReducer)
  const { loading: loadingPageDetails, dinner } = dinnerDetailsReducer;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(dinner.stock);
  const [image, setImage] = useState("");

  const [newImage, setNewImage] = useState(false);

  const userLoginReducer = useSelector(state => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  const updateDinnerReducer = useSelector(state=> state.updateDinnerReducer)
  const { success: dinnerUpdationSuccess, loading: loadingdinnerupdation, error: dinnerUpdationError } = updateDinnerReducer;

  const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer);
  const { error: tokenError } = checkTokenValidationReducer;

  useEffect(() => {
    if (!userInfo || userInfo.admin) {
        router("/login");
    }
    dispatch(checkTokenValidation());
    dispatch(getDinnerDetails(id));
  }, [dispatch, userInfo, router, id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const dinnerId = dinner.id;
    let form_data = new FormData();
    form_data.append('name', name);
    form_data.append('description', description);
    form_data.append('price', price);
    form_data.append('stock', stock);
    form_data.append('image', image);

    dispatch(updateDinner(dinnerId, form_data));
  };

  if (dinnerUpdationSuccess) {
    alert("Dinner successfully updated.");
    dispatch({ type: UPDATE_DINNER_RESET });
    router(`/dinner/${dinner.id}`);
  }

  if (userInfo && tokenError === "Request failed with status code 401") {
      alert("Session expired, please login again.");
      dispatch(logout());
      router("/login");
      window.location.reload();
  }

  return (
    <div className='flex items-center justify-center flex-col pt-10'>
            <span className="flex justify-center text-info">
                <em>Edit Product</em>
            </span>
            {dinnerUpdationError && (
                <div>
                    {scrollToTop()}
                    <Error variant='danger'>{dinnerUpdationError.image[0]}</Error>
                </div>
            )}
            {loadingPageDetails && (
                <span className="flex">
                    <h5>Getting Product Details</h5>
                    <span className="ml-2">
                        <Spinner />
                    </span>
                </span>
            )}
            <form onSubmit={onSubmit}>

                <div className='mt-4'>
                    <label className='block'>
                        <b>Product Image</b>
                    </label>
                    <p>
                        <img src={dinner.image} alt={dinner.name} height="200" />
                    </p>

                    {newImage ? (
                        <div>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <button
                                onClick={() => {
                                    setNewImage(!newImage);
                                    setImage("");
                                    dispatch({ type: UPDATE_DINNER_RESET });
                                }}
                                className="bg-red-500 px-1.5 py-1.2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <p>
                            <button
                                onClick={() => setNewImage(!newImage)}
                                className="btn btn-success btn-sm"
                            >
                                choose different image
                            </button>
                        </p>
                    )}
                </div>

                <div className='mt-4'>
                    <label className='block'>
                        <b>Product Name</b>
                    </label>
                    <input
                        autoFocus={true}
                        type="text"
                        defaultValue={dinner.name}
                        placeholder="product name"
                        onChange={(e) => setName(e.target.value)}
                        className='text-gray-900 bg-gray-400 rounded-lg'

                    />
                </div>

                <div className='mt-4'>
                    <label className='block'>
                        <b>Product Description</b>
                    </label>
                    <input
                        type="text"
                        defaultValue={dinner.description}
                        placeholder="product description"
                        onChange={(e) => setDescription(e.target.value)}
                        className='text-gray-900 bg-gray-400 rounded-lg'

                    />
                </div>

                <div className='mt-4'>
                    <label className='block'>
                        <b>Price</b>
                    </label>
                    <input
                        type="text"
                        pattern="[0-9]+(\.[0-9]{1,2})?%?"
                        defaultValue={dinner.price}
                        placeholder="199.99"
                        step="0.01"
                        maxLength="8"
                        onChange={(e) => setPrice(e.target.value)}
                        className='text-gray-900 bg-gray-400 rounded-lg'
                    />
                </div>

                <div className='mt-4'>
                    <label className='block'>
                        <b>In Stock</b>
                    </label>
                    <input
                        type="checkbox"
                        defaultChecked={dinner.stock}
                        onChange={() => setStock(!stock)}
                    />
                </div>

                <button
                    type="submit"
                    className="py-1.5 rounded-lg px-1.5 bg-green-500 text-white mt-4 mr-2 focus:outline-none"
                >
                    Save Changes
                </button> 
                <button
                    onClick={() => router(`/dinner/${dinner.id}`)}
                    className="py-1.5 rounded-lg px-1.5  bg-blue-500 text-white mt-4 focus:outline-none"
                >
                    Cancel
                </button>
            </form>
        </div>
  )
}

export default DInnerUpdate