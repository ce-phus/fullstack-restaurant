import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllAddress } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
const UserAddressComponent = ( {handleAddressId }) => {
    const dispatch = useDispatch()
    const router = useNavigate()

    const updateHandleAddressId = (id) => {
        handleAddressId(id);
    };

    const userLoginReducer = useSelector(state => state.userLoginReducer);
    const { userInfo } = userLoginReducer;

    const getAllAddressesOfUserReducer = useSelector(state => state.getAllAddressesOfUserReducer);
    const { addresses } = getAllAddressesOfUserReducer;

    useEffect(() => {
        if (!userInfo) {
            router.push("/LoginPage");
        } else {
            dispatch(getAllAddress());
        }
    }, [dispatch, router, userInfo]);
  return (
    <div className="text-light mt-10 grid place-items-center">
            {addresses ? (
                addresses.map((address, idx) => (
                    <div key={idx}>
                        <div className="p-2  border border-purple-500 rounded-lg">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="addressId"
                                    value={0}
                                    onClick={() => updateHandleAddressId(address.id)}
                                    className="mr-2"
                                />
                                <div>
                                    <p><b>Name: </b>{address.name}</p>
                                    <p><b>Address: </b>{address.house_no}, {address.landmark}, {address.city}, {address.state}, {address.pin_code}</p>
                                </div>
                            </label>
                        </div>
                    </div>
                ))
            ) : (
                "empty"
            )}
        </div>
  )
}

export default UserAddressComponent