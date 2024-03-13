import axios from 'axios';
import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAIL,
    GET_TOTAL_PRICE_REQUEST,
    GET_TOTAL_PRICE_SUCCESS,
    GET_TOTAL_PRICE_FAIL
} from '../constants/index';

export const addToCart = (product, quantity, override_quantity) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });
        

        const { data } = await axios.post('http://127.0.0.1:8000/api/cart/', {
            product: product,
            quantity: quantity,
            override_quantity: override_quantity
        });
        console.log("Data:", data)

        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: data
        });

        dispatch(getTotalPrice());
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch({
                type: ADD_TO_CART_FAIL,
                payload: error.response.data.detail || error.message
            });
        } else {
            dispatch({
                type: ADD_TO_CART_FAIL,
                payload: 'An error occurred while processing your request.'
            });
        }
    }
};

export const removeFromCart = (productId) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_FROM_CART_REQUEST });

        console.log("Removing product with ID:", productId);

        const payload = {
            remove: true,
            product_id: productId
        };

        console.log("Request payload:", payload);

        const { data } = await axios.post('http://127.0.0.1:8000/api/cart/', payload);

        console.log("Remove from cart response:", data);

        if (data && data.hasOwnProperty('cart_total_price')) {
            dispatch({
                type: REMOVE_FROM_CART_SUCCESS,
                payload: data
            });

            dispatch(getTotalPrice());
        } else {
            console.log("Invalid response data received:", data);
            dispatch({
                type: REMOVE_FROM_CART_FAIL,
                payload: 'Invalid response data received'
            });
        }
    } catch (error) {
        console.error("Error removing from cart:", error);

        dispatch({
            type: REMOVE_FROM_CART_FAIL,
            payload: error.response.data.detail || error.message
        });
    }
};



// export const getTotalPrice = () => async (dispatch) => {
//     try {
//         dispatch({ type: GET_TOTAL_PRICE_REQUEST });

//         const { data } = await axios.get('http://127.0.0.1:8000/api/cart/');

//         dispatch({
//             type: GET_TOTAL_PRICE_SUCCESS,
//             payload: data.cart_total_price
//         });
//     } catch (error) {
//         dispatch({
//             type: GET_TOTAL_PRICE_FAIL,
//             payload: error.response.data.detail || error.message
//         });
//     }
// };
