import {
    DINNER_LIST_REQUEST,
    DINNER_LIST_SUCCESS,
    DINNER_LIST_FAIL,

    DINNER_DETAILS_REQUEST,
    DINNER_DETAILS_SUCCESS,
    DINNER_DETAILS_FAIL,

    CREATE_DINNER_REQUEST,
    CREATE_DINNER_SUCCESS,
    CREATE_DINNER_FAIL,

    UPDATE_DINNER_REQUEST,
    UPDATE_DINNER_SUCCESS,
    UPDATE_DINNER_FAIL,

    DELETE_DINNER_REQUEST,
    DELETE_DINNER_SUCCESS,
    DELETE_DINNER_FAIL,

    CHANGE_DELIVERY_STATUS_REQUEST,
    CHANGE_DELIVERY_STATUS_SUCCESS,
    CHANGE_DELIVERY_STATUS_FAIL
} from "../constants/index"

import axios from "axios"

// DINNER LIST
export const getDinnerList =() => async (dispatch) => {
    try {
        dispatch({
            type:DINNER_LIST_REQUEST
        })

        // call api
        const { data } = await axios.get("http://127.0.0.1:8000/menu/dinner/", {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-type': 'application/json'
            }
        })
        console.log("Dinner data: ", data)
        dispatch({
            type:DINNER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DINNER_LIST_FAIL,
            payload: error.message
        })
    }
}

// dinner details
export const getDinnerDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DINNER_DETAILS_REQUEST
        })

        // CALL API
        const { data } = await axios.get(`http://127.0.0.1:8000/menu/lunch/${id}/`)
        dispatch({
            type: DINNER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:DINNER_DETAILS_FAIL,
            payload: error.message
        })
    }
}

// create Dinner 
export const createDinner = (dinner) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_DINNER_REQUEST
        })

        // login reducer
        const {
            userLoginReducer: {userInfo},
        } =getState()

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            "http://127.0.0.1:8000/menu/dinner-create/",
            dinner,
            config
        )
        dispatch({
            type: CREATE_DINNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_DINNER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// Delete dinner
export const deleteDinner = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_DINNER_REQUEST
        })

        // login reducer
        const {
            userLoginReducer: {userInfo},
        } =getState()

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `http://127.0.0.1:8000/menu/dinner-delete/${id}/`,
            config
        )
        dispatch({
            type: DELETE_DINNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_DINNER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// update Dinner
export const updateDinner = (id, dinner) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_DINNER_REQUEST
        })

        // login reducer
        const {
            userLoginReducer: {userInfo},
        } =getState()

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/menu/dinner-update/${id}/`,
            dinner,
            config
        )
        dispatch({
            type: UPDATE_DINNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_DINNER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// change ordered product delivery status
export const changeDeliveryStatus = (id, dinner) => async (dispatch, getState) => {

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
            dinner,
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
