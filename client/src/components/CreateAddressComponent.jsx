import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUserAddress, getAllAddress } from '../actions/userActions'
import { CREATE_USER_ADDRESS_RESET } from '../constants'
import Error from './Error'
import SectionWrapper from '../hoc/SectionWrapper'
import { styles } from '../styles'

const CreateAddressComponent = ({ toggleCreateAddress }) => {

    const dispatch = useDispatch()

    const [username, setName] = useState("")
    const [first_name, setFirstname] = useState("")
    const [last_name, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [houseNumber, setHouseNumber] = useState("")
    const [landmark, setLandmark] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    // Create User Address Reducer
    const createUserAddressReducer = useSelector(state =>state.createUserAddressReducer)
    const { success:addressCreationSuccess, error:errorCreatingAddress } = createUserAddressReducer

    const addressSubmitHandler = (e) => {
        e.preventDefault()
        const addressData = {
            "username": username,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "phone_number": phoneNumber,
            "pin_code": pinCode,
            "house_no": houseNumber,
            "landmark": landmark,
            "city": city,
            "state": state,
        }
        dispatch(createUserAddress(addressData))
    }

    if (addressCreationSuccess) {
        alert("Address successfully created.")
        toggleCreateAddress()
        dispatch({
            type: CREATE_USER_ADDRESS_RESET
        })
        dispatch(getAllAddress())
    }
  return (
    <SectionWrapper>
        <div className='flex items-center justify-center pt-15 flex-col'>
            <p className={`${styles.heroSubText}`}>New Address</p>
            {errorCreatingAddress
            ? <Error>{errorCreatingAddress}</Error>
            : ""}
            <div className='mt-10'> 
                <form className='w-full max-w-lg' onSubmit={addressSubmitHandler}>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-1/2 px-3 pl-10 mb-6 md:mb-0'>
                            <label className='block uppercase tracking-wide text-light-700 text-xs font-bold' for="gird-username">Username</label>
                            <input className='appearance-none block w-full bg-gray-400 text-gray-700 border border-red-500 rounded py-3 px-4 pl-10 mb-3 mt-3 leading-tight focus:outline-none focus:bg-white' id='grid-first-name' type='text' placeholder='Jane' value={username}
                            onChange={(e)=> setName(e.target.value)}></input>
                            <p className='text-red-500 text-xs italic'>Please fill out this field.</p>
                        </div>
                        <div className='w-full md:w-1/2 px-3 pl-10'>
                            <label className='block uppercase tracking-wide text-light-700 text-xs font-bold mb-2' for='first-name'>
                                First Name
                            </label>
                            <input className='appearance-none block w-full px-4 py-3 bg-gray-400 text-gray-700 border mt-3 border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-first-name' type='text' placeholder='First name' onChange={(e) => setFirstname(e.target.value)} value={first_name}></input>
                        </div>
                    </div>
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3 pl-10'>
                            <label className='block uppercase tracking-wide text-light-700 text-xs font-bold mb-2' for='grid-last-name'>
                                Last Name
                            </label>
                            <input className='appearance-none block w-full bg-gray-400 mt-3 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type='text' placeholder='Last Name' value={last_name} onChange={(e) => setLastname(e.target.value)}></input>
                        </div>
                        <div class="w-full  px-3 mb-6 md:mb-0 pl-10">
                        <label className='block uppercase tracking-wide text-light-700 text-xs font-bold mb-2' for='grid-phone-number'>
                                Email
                            </label>
                            <input className='appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type='text' placeholder='email' value={email}  onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div class="w-full  px-3 mb-6 md:mb-0 pl-10">
                        <label className='block uppercase tracking-wide text-light-700 text-xs font-bold mb-2' for='grid-phone-number'>
                                PhoneNumber
                            </label>
                            <input className='appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type='text' placeholder='+254' value={phoneNumber}  onChange={(e) => setPhoneNumber(e.target.value)}></input>
                        </div>
                        <div class="w-full  px-3 mb-6 md:mb-0 pl-10">
                        <label className='block uppercase tracking-wide text-light-700 text-xs font-bold mb-2' for='grid-pin-code'>
                                Pin Code
                            </label>
                            <input className='appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type='text' placeholder='pin code' value={pinCode} pattern='[0-9]+' maxLength='6' onChange={(e) => setPinCode(e.target.value)}></input>
                        </div>
                        <div class="w-full  px-3 mb-6 md:mb-0 pl-10">
                            <label class="block uppercase tracking-wide text-light-700 text-xs font-bold mb-2" for="grid-zip">
                                landmark
                            </label>
                            <input class="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="landmark" value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 pl-10">
                            <label class="block uppercase tracking-wide text-light-700 text-xs font-bold mb-2" for="grid-zip">
                                House No./Address
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" value={houseNumber}
                            onChange={(e) => setHouseNumber(e.target.value)}/>
                        </div>

                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 pt-4 pl-10">
                            <label class="block uppercase tracking-wide text-light-700 text-xs font-bold mb-2" for="grid-city">
                            STATE
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Nairobi" value={state}
                            onChange={(e) => setState(e.target.value)}/>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 pt-4 pl-10">
                            <label class="block uppercase tracking-wide text-light-700 text-xs font-bold mb-2" for="grid-state">
                                City
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Nairobi" value={city}
                            onChange={(e) => setCity(e.target.value)}/>
                        </div>
                    </div>
                    <button 
                    className='bg-sky-500/50 hover:bg-blue-700 text-light font-bold py-2 px-4 rounded-lg mt-3' type='submit'>Save Address</button>
                    <button className='bg-sky-500/50 hover:bg-blue-700 text-light font-bold rounded-lg py-2 px-4 ml-20' onClick={() => router("/all-addresses/")}>Cancel</button>
                </form>
            </div>
        </div>
    </SectionWrapper>
  )
}

export default CreateAddressComponent