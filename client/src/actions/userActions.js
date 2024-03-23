import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
  
    MPESA_TRANSACTION_RESET,
  
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
  
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
  
    UPDATE_USER_DETAILS_REQUEST,
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_DETAILS_FAIL,
  
    DELETE_USER_ACCOUNT_REQUEST,
    DELETE_USER_ACCOUNT_SUCCESS,
    DELETE_USER_ACCOUNT_FAIL,
  
    GET_USER_ALL_ADDRESSES_REQUEST,
    GET_USER_ALL_ADDRESSES_SUCCESS,
    GET_USER_ALL_ADDRESSES_FAIL,
  
    GET_SINGLE_ADDRESS_REQUEST,
    GET_SINGLE_ADDRESS_SUCCESS,
    GET_SINGLE_ADDRESS_FAIL,
  
    CREATE_USER_ADDRESS_REQUEST,
    CREATE_USER_ADDRESS_SUCCESS,
    CREATE_USER_ADDRESS_FAIL,
  
    UPDATE_USER_ADDRESS_REQUEST,
    UPDATE_USER_ADDRESS_SUCCESS,
    UPDATE_USER_ADDRESS_FAIL,
  
    DELETE_USER_ADDRESS_REQUEST,
    DELETE_USER_ADDRESS_SUCCESS,
    DELETE_USER_ADDRESS_FAIL,
  
    CHECK_TOKEN_VALID_REQUEST,
    CHECK_TOKEN_VALID_SUCCESS,
    CHECK_TOKEN_VALID_FAIL,
  
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
  
  } from '../constants/index'
  
  import axios from 'axios'
  
  // Login
  export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
  
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
  
        const { data } = await axios.post(
            'http://127.0.0.1:8000/account/login/',
            { 'username': username, 'password': password },
            config
        )
  
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
  
        localStorage.setItem('userInfo', JSON.stringify(data)) // will create a new key-value pair in localStorage
        // also see store.js file
  
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
  }
  
  // logout
  export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
      type: USER_LOGOUT
    })
    dispatch({
      type: MPESA_TRANSACTION_RESET
    })
  }
  
  // Register
  export const register = (username, first_name, last_name, email, password, confirm_password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
  
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
  
        const { data } = await axios.post(`http://127.0.0.1:8000/account/register/`,
            { 'username': username, 'first_name': first_name, 'last_name': last_name, 'email': email, 'password': password, "confirm_password":confirm_password},
            config
        )
        // console.log("User Info: ",data)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
  
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
  
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
  }
  
  // check token validation
  export const checkTokenValidation = () => async (dispatch, getState) => {
    try {
  
        dispatch({
            type: CHECK_TOKEN_VALID_REQUEST
        })
  
        const {
            userLoginReducer: { userInfo }
        } = getState()
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // call api
        const { data } = await axios.get("http://127.0.0.1:8000/payments/check-token/", config)
  
        dispatch({
            type: CHECK_TOKEN_VALID_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: CHECK_TOKEN_VALID_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        })
    }
  }
  
  
  export const userDetails = (id) => async (dispatch, getState) => {
    try {
      // Check if id and id.userId are defined
      if (!id || !id.userId) {
        throw new Error('Invalid user ID');
      }
  
      // Extract the userId from the id object
      const { userId } = id;
    //   console.log(`Requesting details for user ID: ${userId}`);

  
      dispatch({
        type: USER_DETAILS_REQUEST
      });
  
      const {
        userLoginReducer: { userInfo }
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        }
      };
    //   console.log(`Using token: ${userInfo.token}`);

      // Construct the URL using userId
      const { data } = await axios.get(`http://127.0.0.1:8000/account/user/${userId}/`, config);
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data
      });
  
    } catch (error) {
    // console.error('Error fetching user details:', error.response ? error.response.data : error.message);

      dispatch({
        type: USER_DETAILS_FAIL,
        payload: error.response && error.response.data.details ? error.response.data.details : error.message
      });
    }
  };
  
  
  
  // user update details
  export const userUpdateDetails = (userData) => async (dispatch, getState) => {
  
    try {
  
        dispatch({
            type: UPDATE_USER_DETAILS_REQUEST
        })
  
        const {
            userLoginReducer: { userInfo }
        } = getState()
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // call api
        const { data } = await axios.put(
            `http://127.0.0.1:8000/account/user_update/${userInfo.id}/`,
            {
                "username": userData.username,
                "email": userData.email,
                "password": userData.password
            },
            config
        )
  
        dispatch({
            type: UPDATE_USER_DETAILS_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: UPDATE_USER_DETAILS_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        })
    }
  }
  
  
  // user account delete
  export const userAccountDelete = (userData) => async (dispatch, getState) => {
  
    try {
  
        dispatch({
            type: DELETE_USER_ACCOUNT_REQUEST
        })
  
        const {
            userLoginReducer: { userInfo }
        } = getState()
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // call api
        const { data } = await axios.post(
            `http://127.0.0.1:8000/account/user_delete/${userData.id}/`,
            {
                "password": userData.password
            },
            config
        )
  
        dispatch({
            type: DELETE_USER_ACCOUNT_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: DELETE_USER_ACCOUNT_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        })
    }
  }
  
  
  // get user address
  export const getAllAddress = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_USER_ALL_ADDRESSES_REQUEST
        })
  
        const {
            userLoginReducer: { userInfo }
        } = getState()
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // call api
        const { data } = await axios.get(
            "http://127.0.0.1:8000/account/all-address-details/",
            config
        )
  
        dispatch({
            type: GET_USER_ALL_ADDRESSES_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: GET_USER_ALL_ADDRESSES_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        })
    }
  }
  
  
  // get user single address
  export const getSingleAddress = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_SINGLE_ADDRESS_REQUEST
        })
  
        const {
            userLoginReducer: { userInfo }
        } = getState()
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // call api
        const { data } = await axios.get(
            `http://127.0.0.1:8000/account/address-details/${id}/`,
            config
        )
  
        dispatch({
            type: GET_SINGLE_ADDRESS_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: GET_SINGLE_ADDRESS_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        })
    }
  }
  
  
  // create user address
  export const createUserAddress = (addressData) => async (dispatch, getState) => {
  
    try {
        dispatch({
            type: CREATE_USER_ADDRESS_REQUEST
        })
  
        const {
            userLoginReducer: { userInfo }
        } = getState()
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // call api
        const { data } = await axios.post(
            "http://127.0.0.1:8000/account/create-address/",
            addressData,
            config
        )
  
        dispatch({
            type: CREATE_USER_ADDRESS_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: CREATE_USER_ADDRESS_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        })
    }
  }
  
  
  // update user address
  export const updateUserAddress = (id, addressData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_USER_ADDRESS_REQUEST
        })
  
        const {
            userLoginReducer: { userInfo }
        } = getState()
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // call api
        const { data } = await axios.put(
            `http://127.0.0.1:8000/account/update-address/${id}/`,
            addressData,
            config
        )
  
        dispatch({
            type: UPDATE_USER_ADDRESS_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: UPDATE_USER_ADDRESS_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        })
    }
  }
  
  
  // delete user address
  export const deleteUserAddress = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_USER_ADDRESS_REQUEST
        })
  
        const {
            userLoginReducer: { userInfo }
        } = getState()
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // call api
        const { data } = await axios.delete(
            `http://127.0.0.1:8000/account/delete-address/${id}/`,
            config
        )
  
        dispatch({
            type: DELETE_USER_ADDRESS_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: DELETE_USER_ADDRESS_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        })
    }
  }
  
  // get all orders
  export const getAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_ORDERS_REQUEST
        })
  
        const {
            userLoginReducer: { userInfo }
        } = getState()
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
  
        // call api
        const { data } = await axios.get(
            `http://127.0.0.1:8000/account/all-orders-list/`,
            config
        )
  
        dispatch({
            type: GET_ALL_ORDERS_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: GET_ALL_ORDERS_FAIL,
            payload: error.response && error.response.data.details ? error.response.data.details : error.message
        })
    }
  }