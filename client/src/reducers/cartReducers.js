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

const initialState = {
    cartItems: [],
    totalPrice: 0,
    loading: false,
    error: null
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
        case REMOVE_FROM_CART_REQUEST:
        case GET_TOTAL_PRICE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case ADD_TO_CART_SUCCESS:
            // Ensure that action.payload contains the new item to be added to the cart
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                loading: false,
                error: null
            };

        case REMOVE_FROM_CART_SUCCESS:
            // Ensure that the item is correctly identified and filtered based on its ID
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
                loading: false,
                error: null
            };

        case GET_TOTAL_PRICE_SUCCESS:
            // Ensure that action.payload contains the updated total price
            return {
                ...state,
                totalPrice: action.payload,
                loading: false,
                error: null
            };

        case ADD_TO_CART_FAIL:
        case REMOVE_FROM_CART_FAIL:
        case GET_TOTAL_PRICE_FAIL:
            // Ensure that the payload contains relevant error messages
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
