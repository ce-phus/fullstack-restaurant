import {
    LUNCH_LIST_REQUEST,
    LUNCH_LIST_SUCCESS,
    LUNCH_LIST_FAIL,

    LUNCH_DETAILS_REQUEST,
    LUNCH_DETAILS_SUCCESS,
    LUNCH_DETAILS_FAIL,
    
    CREATE_LUNCH_REQUEST,
    CREATE_LUNCH_SUCCESS,
    CREATE_LUNCH_FAIL,
    CREATE_LUNCH_RESET,

    UPDATE_LUNCH_REQUEST,
    UPDATE_LUNCH_SUCCESS,
    UPDATE_LUNCH_FAIL,
    UPDATE_LUNCH_RESET,

    DELETE_LUNCH_REQUEST,
    DELETE_LUNCH_SUCCESS,
    DELETE_LUNCH_FAIL,
    DELETE_LUNCH_RESET,

    CHANGE_DELIVERY_STATUS_REQUEST,
    CHANGE_DELIVERY_STATUS_SUCCESS,
    CHANGE_DELIVERY_STATUS_FAIL,
    CHANGE_DELIVERY_STATUS_RESET

} from "../constants/index"

// lunch list
export const lunchListReducer = (state = { lunch: [] }, action) => {
    switch (action.type) {
        case LUNCH_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                products: [],   // always pass the object during the request
                error: ""
            }
        case LUNCH_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: ""
            }
        case LUNCH_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

// Lunch details
export const lunchDetailsReducer = (state = { lunch: {} }, action) => {
    switch (action.type) {
        case LUNCH_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                product: {},        // always pass the object during the request
                error: ""
            }
        case LUNCH_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
                error: ""
            }
        case LUNCH_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

// create product reducer
export const createLunchReducer = (state = { lunch: {} }, action) => {
    switch (action.type) {
        case CREATE_LUNCH_REQUEST:
            return {
                ...state,
                loading: true,
                product: {},
                success: false,
                error: ""
            }
        case CREATE_LUNCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                product: action.payload,
                error: ""
            }
        case CREATE_LUNCH_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                product: {},
                error: action.payload
            }
        case CREATE_LUNCH_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                product: {},
                error: ""
            }
        default:
            return state
    }
}

// update lunch reducer
export const updateLunchReducer = (state = { lunch: {} }, action) => {
    switch (action.type) {
        case UPDATE_LUNCH_REQUEST:
            return {
                ...state,
                loading: true,
                product: {},
                success: false,
                error: ""
            }
        case UPDATE_LUNCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                product: action.payload,
                error: ""
            }
        case UPDATE_LUNCH_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                product: {},
                error: action.payload
            }
        case UPDATE_LUNCH_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                product: {},
                error: ""
            }
        default:
            return state
    }
}

// delete product reducer
export const deleteLunchReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_LUNCH_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: ""
            }
        case DELETE_LUNCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: ""
            }
        case DELETE_LUNCH_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case DELETE_LUNCH_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: ""
            }
        default:
            return state
    }
}

// change order delivery status reducer
export const changeDeliveryStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_DELIVERY_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: ""
            }
        case CHANGE_DELIVERY_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: ""
            }
        case CHANGE_DELIVERY_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case CHANGE_DELIVERY_STATUS_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: ""
            }
        default:
            return state
    }
}