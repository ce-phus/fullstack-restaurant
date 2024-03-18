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

export const addToCart = (item_type, item_id, quantity) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });
        
        const payload = {
            action: 'add_item',       // Specify the action as 'add_item'
            type: item_type,          // Pass the item_type to the payload
            id: item_id,              // Assuming item_id is the ID of the item to be added
            quantity: quantity,
            // override_quantity: override_quantity
        };

        const { data } = await axios.post('http://127.0.0.1:8000/menu/cart/', payload);
        
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: data
        });

        dispatch(getTotalPrice());
    } catch (error) {
        // Error handling code
    }
};


export const removeFromCart = (item_id) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_FROM_CART_REQUEST });

        const payload = {
            action: 'remove_item',  // Specify the action as 'remove_item'
            id: item_id           
        };

        const { data } = await axios.post('http://127.0.0.1:8000/menu/cart/', payload);

        dispatch({
            type: REMOVE_FROM_CART_SUCCESS,
            payload: data
        });

        dispatch(getTotalPrice());
    } catch (error) {
        // Error handling code
        dispatch({ type: REMOVE_FROM_CART_FAILURE, payload: error.message });
    }
};




export const getTotalPrice = () => async (dispatch) => {
    try {
        dispatch({ type: GET_TOTAL_PRICE_REQUEST });

        const { data } = await axios.get('http://127.0.0.1:8000/menu/cart/');

        dispatch({
            type: GET_TOTAL_PRICE_SUCCESS,
            payload: data.total_price
        });
    } catch (error) {
        dispatch({
            type: GET_TOTAL_PRICE_FAIL,
            payload: error.response.data.detail || error.message
        });
    }
};
