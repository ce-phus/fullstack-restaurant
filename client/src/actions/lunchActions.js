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

    DELETE_LUNCH_REQUEST,
    DELETE_LUNCH_SUCCESS,
    DELETE_LUNCH_FAIL,

    UPDATE_LUNCH_REQUEST,
    UPDATE_LUNCH_SUCCESS,
    UPDATE_LUNCH_FAIL,

    CHANGE_DELIVERY_STATUS_REQUEST,
    CHANGE_DELIVERY_STATUS_SUCCESS,
    CHANGE_DELIVERY_STATUS_FAIL,


} from "../constants/index"

import axios from "axios"

// lunch list
export const getLunchList = () => async (dispatch) => {
    try {
        dispatch({
            type:LUNCH_LIST_REQUEST
        })

        // call api
        const { data } = await axios.get("http://127.0.0.1:8000/menu/lunch/", {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-type': 'application/json'
            }
        })

        dispatch({
            type:LUNCH_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LUNCH_LIST_FAIL,
            payload: error.message
        })
    }
}

// lunch detail
export const getLunchDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type: LUNCH_DETAILS_REQUEST
        })

        // call api
        const { data } = await axios.get(`/menu/lunch/${id}/`)

        dispatch({
            type: LUNCH_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LUNCH_DETAILS_FAIL,
            payload:error.message
        })
    }
}

// create lunch
export const createlunch = (lunch) => async (dispatch, getstate) => {

    try {
        dispatch({
            type: CREATE_LUNCH_REQUEST
        })

        // login reducer
        const {
            userLoginReducer: { userInfo },
        } = getstate()

        const config = {
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // api call
        const { data } = await axios.post(
            '/menu/lunch-create/',
            lunch,
            config
        )

        dispatch({
            type: CREATE_LUNCH_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_LUNCH_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// delete lunch
export const deletelunch = (id) => async (dispatch, getstate) => {

    try {
        dispatch({
            type: DELETE_LUNCH_REQUEST
        })

        // login reducer
        const {
            userLoginReducer: { userInfo },
        } = getstate()

        const config = {
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // api call
        const { data } = await axios.delete(
            `/menu/lunch-delete/${id}`,
            config
        )

        dispatch({
            type: DELETE_LUNCH_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_LUNCH_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// update lunch
export const updatelunch = (id, lunch) => async (dispatch, getstate) => {

    try {
        dispatch({
            type: UPDATE_LUNCH_REQUEST
        })

        // login reducer
        const {
            userLoginReducer: { userInfo },
        } = getstate()

        const config = {
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // api call
        const { data } = await axios.post(
            `/menu/lunch-create/${id}/`,
            lunch,
            config
        )

        dispatch({
            type: UPDATE_LUNCH_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_LUNCH_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// change ordered product delivery status
export const changeDeliveryStatus = (id, lunch) => async (dispatch, getState) => {

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
            `/account/change-order-status/${id}/`,
            lunch,
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
