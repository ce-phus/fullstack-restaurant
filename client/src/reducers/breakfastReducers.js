import {
    BREAKFAST_LIST_REQUEST,
    BREAKFAST_LIST_SUCCESS,
    BREAKFAST_LIST_FAIL,

    BREAKFAST_DETAILS_REQUEST,
    BREAKFAST_DETAILS_SUCCESS,
    BREAKFAST_DETAILS_FAIL,

    CREATE_BREAKFAST_REQUEST,
    CREATE_BREAKFAST_SUCCESS,
    CREATE_BREAKFAST_FAIL,
    CREATE_BREAKFAST_RESET,

    UPDATE_BREAKFAST_REQUEST,
    UPDATE_BREAKFAST_SUCCESS,
    UPDATE_BREAKFAST_FAIL,
    UPDATE_BREAKFAST_RESET,

    DELETE_BREAKFAST_REQUEST,
    DELETE_BREAKFAST_SUCCESS,
    DELETE_BREAKFAST_FAIL,
    DELETE_BREAKFAST_RESET,

    CHANGE_DELIVERY_STATUS_REQUEST,
    CHANGE_DELIVERY_STATUS_SUCCESS,
    CHANGE_DELIVERY_STATUS_FAIL,
    CHANGE_DELIVERY_STATUS_RESET,

} from "../constants/index"

// breakfast list
export const breakfastListReducer =( state ={ breakfast: [] }, action) => {
    switch (action.type) {
        case BREAKFAST_LIST_REQUEST:
            return {
                ...state,
                loading:true,
                breakfast: [],  //always pass the object during the request
                error: ""
            }
            case BREAKFAST_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                breakfast: action.payload,
                error: ""
            }
        case BREAKFAST_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

// breakfast details
export const breakfastDetailReducer =( state ={ breakfast: {} }, action) => {
    switch (action.type) {
        case BREAKFAST_DETAILS_REQUEST:
            return {
                ...state,
                loading:true,
                breakfast: {},  //always pass the object during the request
                error: ""
            }
            case BREAKFAST_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                breakfast: action.payload,
                error: ""
            }
        case BREAKFAST_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

// Create breakfast reducer
export const createbreakfastReducer =( state ={ breakfast: {} }, action) => {
    switch (action.type) {
        case CREATE_BREAKFAST_REQUEST:
            return {
                ...state,
                loading:true,
                breakfast: {},  //always pass the object during the request
                success: false,
                error: ""
            }
            case CREATE_BREAKFAST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                breakfast: action.payload,
                error: ""
            }
        case CREATE_BREAKFAST_FAIL:
            return {
                ...state,
                loading: false,
                success:false,
                breakfast: {},
                error: action.payload
            }
        case CREATE_BREAKFAST_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                breakfast: {},
                error: ""
            }
        default:
            return state
    }
}

// update breakfast reducer
export const updatebreakfastReducer =( state ={ breakfast: {} }, action) => {
    switch (action.type) {
        case UPDATE_BREAKFAST_REQUEST:
            return {
                ...state,
                loading:true,
                breakfast: {},  //always pass the object during the request
                success: false,
                error: ""
            }
            case UPDATE_BREAKFAST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                breakfast: action.payload,
                error: ""
            }
        case UPDATE_BREAKFAST_FAIL:
            return {
                ...state,
                loading: false,
                success:false,
                breakfast: {},
                error: action.payload
            }
        case UPDATE_BREAKFAST_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                breakfast: {},
                error: ""
            }
        default:
            return state
    }
}

// delete product reducer
export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_BREAKFAST_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: ""
            }
        case DELETE_BREAKFAST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: ""
            }
        case DELETE_BREAKFAST_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case DELETE_BREAKFAST_RESET:
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