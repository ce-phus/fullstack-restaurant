import { 
    MPESA_STK_PUSH_REQUEST,
    MPESA_STK_PUSH_SUCCESS,
    MPESA_STK_PUSH_FAIL,

    MPESA_CALLBACK_HANDLER_REQUEST,
    MPESA_CALLBACK_HANDLER_SUCCESS,
    MPESA_CALLBACK_HANDLER_FAIL,

    // MPESA_TRANSACTION_RESET,
} from '../constants/index'

// Reducer for STK push action
export const mpesaStkPushReducer = (state = { success: false, loading: false, error: null }, action) => {
    switch (action.type) {
        case MPESA_STK_PUSH_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case MPESA_STK_PUSH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            };
        case MPESA_STK_PUSH_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

// Reducer for callback handler action
export const mpesaCallbackHandlerReducer = (state = { success: false, loading: false, error: null, data: null }, action) => {
    switch (action.type) {
        case MPESA_CALLBACK_HANDLER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
                data: null,
            };
        case MPESA_CALLBACK_HANDLER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: action.payload,
            };
        case MPESA_CALLBACK_HANDLER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
                data: null,
            };
        default:
            return state;
    }
};
