import {
    MPESA_STK_PUSH_SUCCESS,
    MPESA_STK_PUSH_REQUEST,
    MPESA_STK_PUSH_FAIL,
    MPESA_CALLBACK_HANDLER_REQUEST,
    MPESA_CALLBACK_HANDLER_SUCCESS,
    MPESA_CALLBACK_HANDLER_FAIL,
} from '../constants/index';
import axios from 'axios';

export const mpesastkpush = (payload, item_type, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MPESA_STK_PUSH_REQUEST,
        });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`http://127.0.0.1:8000/payments/checkout/${item_type}/${id}/`, payload, config);


        dispatch({
            type: MPESA_STK_PUSH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error('Error in mpesastkpush action:', error); // Log any errors
        dispatch({
            type: MPESA_STK_PUSH_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const mpesaCallbackHandler = (callbackData) => async (dispatch) => {
    try {
        dispatch({
            type: MPESA_CALLBACK_HANDLER_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('http://127.0.0.1:8000/api/callback/', callbackData, config);

        dispatch({
            type: MPESA_CALLBACK_HANDLER_SUCCESS,
            payload: data,
        });

        const response = await axios.get('/api/some-data', config);

        dispatch({
            type: SOME_DATA_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: MPESA_CALLBACK_HANDLER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
