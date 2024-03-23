import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import { getBreakfastDetails, updatebreakfast } from '../actions/breakfastActions';
import { checkTokenValidation, logout } from '../actions/userActions';
import { UPDATE_BREAKFAST_RESET } from '../constants';
import Error from './Error';

const BreakfastUpdate = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const router = useNavigate();

    // as our errors will be displayed at the top of the webpage
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const breakfastDetailReducer = useSelector(state => state.breakfastDetailReducer);
    const { loading: loadingPageDetails, breakfast } = breakfastDetailReducer;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState(breakfast.stock);
    const [image, setImage] = useState("");

    const [newImage, setNewImage] = useState(false);

    const userLoginReducer = useSelector(state => state.userLoginReducer);
    const { userInfo } = userLoginReducer;

    const updatebreakfastReducer = useSelector(state => state.updatebreakfastReducer);
    const { success: breakfastupdationsuccess, loading: loadingbreakfastupdation, error: breakfastUpdationError } = updatebreakfastReducer;

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer);
    const { error: tokenError } = checkTokenValidationReducer;

    useEffect(() => {
        if (!userInfo || userInfo.admin) {
            router("/login");
        }
        dispatch(checkTokenValidation());
        dispatch(getBreakfastDetails(id));
    }, [dispatch, userInfo, router, id]);

    const onSubmit = (e) => {
        e.preventDefault();
        const breakfastId = breakfast.id;
        let form_data = new FormData();
        form_data.append('name', name);
        form_data.append('description', description);
        form_data.append('price', price);
        form_data.append('stock', stock);
        form_data.append('image', image);

        dispatch(updatebreakfast(breakfastId, form_data));
    };

    if (breakfastupdationsuccess) {
        alert("Breakfast successfully updated.");
        dispatch({ type: UPDATE_BREAKFAST_RESET });
        router(`/breakfast/${breakfast.id}`);
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.");
        dispatch(logout());
        router("/login");
        window.location.reload();
    }

    return (
        <div className='flex items-center  justify-center flex-col pt-10'>
            <span className="flex justify-center text-info">
                <em>Edit Product</em>
            </span>
            {breakfastUpdationError && (
                <div>
                    {scrollToTop()}
                    <Error variant='danger'>{breakfastUpdationError.image[0]}</Error>
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
                        <img src={breakfast.image} alt={breakfast.name} height="200" />
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
                                    dispatch({ type: UPDATE_BREAKFAST_RESET });
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
                        defaultValue={breakfast.name}
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
                        defaultValue={breakfast.description}
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
                        defaultValue={breakfast.price}
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
                        defaultChecked={breakfast.stock}
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
                    onClick={() => router(`/breakfast/${breakfast.id}`)}
                    className="py-1.5 rounded-lg px-1.5  bg-blue-500 text-white mt-4 focus:outline-none"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default BreakfastUpdate;
