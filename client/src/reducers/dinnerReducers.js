import {
    DINNER_LIST_REQUEST,
    DINNER_LIST_SUCCESS,
    DINNER_DETAILS_FAIL,

    DINNER_DETAILS_REQUEST,
    DINNER_DETAILS_SUCCESS,
    DINNER_LIST_FAIL,

    CREATE_DINNER_REQUEST,
    CREATE_DINNER_SUCCESS,
    CREATE_DINNER_FAIL,
    CREATE_DINNER_RESET,

    UPDATE_DINNER_REQUEST,
    UPDATE_DINNER_SUCCESS,
    UPDATE_DINNER_FAIL,
    UPDATE_DINNER_RESET,

    DELETE_DINNER_REQUEST,
    DELETE_DINNER_SUCCESS,
    DELETE_DINNER_FAIL,
    DELETE_DINNER_RESET,

    CHANGE_DELIVERY_STATUS_REQUEST,
    CHANGE_DELIVERY_STATUS_SUCCESS,
    CHANGE_DELIVERY_STATUS_FAIL,
    CHANGE_DELIVERY_STATUS_RESET,

} from "../constants/index"

// dinner list
export const dinnerListReducer = (state = { dinner: [] }, action) => {
    switch (action.type) {
        case DINNER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                dinner: [],   // always pass the object during the request
                error: ""
            }
        case DINNER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                dinner: action.payload,
                error: ""
            }
        case DINNER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


// dinner details
export const dinnerDetailsReducer = (state = { dinner: {} }, action) => {
    switch (action.type) {
        case DINNER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                dinner: {},        // always pass the object during the request
                error: ""
            }
        case DINNER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
            dinner: action.payload,
                error: ""
            }
        case DINNER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

// create dinner reducer
export const createDinnerReducer = (state = {dinner: {} }, action) => {
    switch (action.type) {
        case CREATE_DINNER_REQUEST:
            return {
                ...state,
                loading: true,
                dinner: {},
                success: false,
                error: ""
            }
        case CREATE_DINNER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                dinner: action.payload,
                error: ""
            }
        case CREATE_DINNER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                dinner: {},
                error: action.payload
            }
        case CREATE_DINNER_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                dinner: {},
                error: ""
            }
        default:
            return state
    }
}

// update dinner reducer
export const updateDinnerReducer = (state = { dinner: {} }, action) => {
    switch (action.type) {
        case UPDATE_DINNER_REQUEST:
            return {
                ...state,
                loading: true,
                dinner: {},
                success: false,
                error: ""
            }
        case UPDATE_DINNER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                dinner: action.payload,
                error: ""
            }
        case UPDATE_DINNER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
            dinner: {},
                error: action.payload
            }
        case UPDATE_DINNER_RESET:
            return {
                ...state,
                loading: false,
                success: false,
            dinner: {},
                error: ""
            }
        default:
            return state
    }
}


// delete delete reducer
export const deleteDinnerReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_DINNER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: ""
            }
        case DELETE_DINNER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: ""
            }
        case DELETE_DINNER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case DELETE_DINNER_RESET:
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