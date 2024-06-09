import axios from 'axios'

import {
    BREAKFAST_LIST_REQUEST,
    BREAKFAST_LIST_SUCCESS,
    BREAKFAST_LIST_FAIL,

    CREATE_BREAKFAST_FAIL,
    CREATE_BREAKFAST_REQUEST,
    CREATE_BREAKFAST_SUCCESS,

    DELETE_BREAKFAST_FAIL,
    DELETE_BREAKFAST_REQUEST,
    DELETE_BREAKFAST_SUCCESS,

    CHANGE_DELIVERY_STATUS_FAIL,
    CHANGE_DELIVERY_STATUS_REQUEST,
    CHANGE_DELIVERY_STATUS_SUCCESS,

    BREAKFAST_DETAILS_REQUEST,
    BREAKFAST_DETAILS_FAIL,
    BREAKFAST_DETAILS_SUCCESS,

    UPDATE_BREAKFAST_FAIL,
    UPDATE_BREAKFAST_REQUEST,
    UPDATE_BREAKFAST_SUCCESS

} from '../constants/index'

// breakfast list
export const getBreakfastList = () => async (dispatch) => {
    try {
        dispatch({
            type: BREAKFAST_LIST_REQUEST
        })

        // call api
        const { data } = await axios.get("http://127.0.0.1:8000/menu/breakfast/", {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-type': 'application/json'
            }
        })
        dispatch({
            type: BREAKFAST_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BREAKFAST_LIST_FAIL,
            payload: error.message
        })
    }
}

export const getBreakfastDetails = (id) => async (dispatch) =>{
    try {
        dispatch ({
            type: BREAKFAST_DETAILS_REQUEST
        })

        // call api
        const { data } = await axios.get(`http://127.0.0.1:8000/menu/breakfast/${id}/`)
        dispatch({
            type: BREAKFAST_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BREAKFAST_DETAILS_FAIL,
            payload: error.message
        })
    }
}
 
export const createbreakfast = (breakfast) => async (dispatch, getState) => {
    try {
        dispatch({
            type:CREATE_BREAKFAST_REQUEST,
        })

        // login reducer
        const {
            userLoginReducer: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            "http://127.0.0.1:8000/menu/breakfast-create/",
            breakfast,
            config
        )

        dispatch({
            type: CREATE_BREAKFAST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_BREAKFAST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// delete breakfast
export const deletebreakfast = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type:DELETE_BREAKFAST_REQUEST,
        })

        // login reducer
        const {
            userLoginReducer: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "multipart/form-dat",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `http://127.0.0.1:8000/menu/breakfast-delete/${id}/`,
            config
        )

        dispatch({
            type: DELETE_BREAKFAST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_BREAKFAST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// update Breakfast
export const updatebreakfast = (id, breakfast) => async (dispatch, getState) => {
    try {
        dispatch({
            type:UPDATE_BREAKFAST_REQUEST,
        })

        // login reducer
        const {
            userLoginReducer: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `http://127.0.0.1:8000/menu/breakfast-update/${id}/`,
            breakfast,
            config
        )

        dispatch({
            type: UPDATE_BREAKFAST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_BREAKFAST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// change ordered product delivery status
export const changeDeliveryStatus = (id, breakfast) => async (dispatch, getState) => {

    try {
        dispatch({
            type: CHANGE_DELIVERY_STATUS_REQUEST
        })

        // login reducer
        const {
            userLoginReducer: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // api call
        const { data } = await axios.put(
            `http://127.0.0.1:8000/account/change-order-status/${id}/`,
            breakfast,
            config
        )

        dispatch({
            type: CHANGE_DELIVERY_STATUS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CHANGE_DELIVERY_STATUS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}