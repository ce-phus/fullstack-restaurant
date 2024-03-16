import { combineReducers } from "redux"
import {
    breakfastListReducer,
    breakfastDetailReducer,
    createbreakfastReducer,
    updatebreakfastReducer,
    deleteProductReducer,
    changeDeliveryStatusReducer,
} from "./breakfastReducers"

import {
    dinnerListReducer,
    dinnerDetailsReducer,
    createDinnerReducer,
    updateDinnerReducer,
    deleteDinnerReducer,
} from "./dinnerReducers"

import {
    lunchListReducer,
    lunchDetailsReducer,
    createLunchReducer,
    updateLunchReducer,
    deleteLunchReducer
} from "./lunchReducers"

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userDetailsUpdateReducer,
    deleteUserAccountReducer,
    checkTokenValidationReducer,
    getSingleAddressReducer,
    getAllAddressesOfUserReducer,
    createUserAddressReducer,
    updateUserAddressReducer,
    deleteUserAddressReducer,
    getAllOrdersReducer,
} from "./userReducers";

import {
    mpesaCallbackHandlerReducer,
    mpesaStkPushReducer
} from "./mpesaReducers"

import {
    cartReducer,
} from "./cartReducers"

const allReducers =combineReducers({
    breakfastListReducer,
    breakfastDetailReducer,
    createbreakfastReducer,
    updatebreakfastReducer,
    deleteProductReducer,
    changeDeliveryStatusReducer,
    dinnerListReducer,
    dinnerDetailsReducer,
    createDinnerReducer,
    updateDinnerReducer,
    deleteDinnerReducer,
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userDetailsUpdateReducer,
    deleteUserAccountReducer,
    checkTokenValidationReducer,
    getSingleAddressReducer,
    getAllAddressesOfUserReducer,
    createUserAddressReducer,
    updateUserAddressReducer,
    deleteUserAddressReducer,
    getAllOrdersReducer,
    mpesaCallbackHandlerReducer,
    mpesaStkPushReducer,
    cart: cartReducer,
    lunchListReducer,
    lunchDetailsReducer,
    createLunchReducer,
    updateLunchReducer,
    deleteLunchReducer,
})

export default allReducers