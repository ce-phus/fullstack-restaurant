import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails, userUpdateDetails, checkTokenValidation, logout } from '../actions/userActions'
import Error from '../components/Error'
import { Spinner } from '../components'
import { useNavigate } from 'react-router-dom'
import { UPDATE_USER_DETAILS_RESET } from '../constants'
import SectionWrapper from '../hoc/SectionWrapper'

const AccountUpdate = () => {
  const router = useNavigate()
  const dispatch = useDispatch()
  // check token validation reducer
  const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
  const { error: tokenError } = checkTokenValidationReducer

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // login reducer
  const userLoginReducer = useSelector(state => state.userLoginReducer)
  const { userInfo } = userLoginReducer

  // user details reducer
  const userDetailsReducer = useSelector(state => state.userDetailsReducer)
  const { user: userAccDetails, loading } = userDetailsReducer

  // user update details reducer
  const userDetailsUpdateReducer = useSelector(state => state.userDetailsUpdateReducer)
  const { success } = userDetailsUpdateReducer

  useEffect(() => {
    if (!userInfo) {
        router("/login")
    }
    dispatch(checkTokenValidation())
    dispatch(userDetails(userInfo.id))
  }, [dispatch, router, userInfo])

  if (userInfo && tokenError === "Request failed with status code 401") {
    alert("Session expired, please login again.")
    dispatch(logout())
    router("/LoginPage")
    window.location.reload()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const updatedUsername = username === "" ? userAccDetails.username : username
    const updatedEmail = email === "" ? userAccDetails.email : email

    if (password !== confirmPassword) {
        alert("Passwords do not match")
    } else {
        const userData = {
            'username': updatedUsername,
            'email': updatedEmail,
            'password': password,
        }
        dispatch(userUpdateDetails(userData))
    }
  }

  // logout
  const logoutHandler = () => {
    router("/login")
    dispatch(logout()) // action        
  }

  if(success) {
      alert("Account successfully updated.")
      dispatch({
          type: UPDATE_USER_DETAILS_RESET
      })
      router("/account")
      dispatch(userDetails(userInfo.id))
  }

  const renderData =() => {
    try {
      return (
        <SectionWrapper>
          <div>
          {loading && <Spinner />}
          </div>
          <form className='max-w-sm mx-auto' onSubmit={onSubmit}>
              <div className='mb-5'>
                  <label for='username' className='block mb-2 text-sm font-medium text-light'>
                                        Username
                  </label>
                  <input type='text' autoFocus={true} defaultValue={userAccDetails.username} placeholder='username' onChange={(e) => setUsername(e.target.value)} className='bg-gray-700 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'></input>
              </div>
              <div className='mb-5'>
                  <label for='email-address' className='block mb-2 text-sm font-medium text-light'>
                                        Email Address
                  </label>
                  <input type='text' autoFocus={true} defaultValue={userAccDetails.email} placeholder='enter email' onChange={(e) => setEmail(e.target.value)} className='bg-gray-700 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'></input>
              </div>
              <div className='mb-5'>
                  <label for='username' className='block mb-2 text-sm font-medium text-light'>
                                        Reset Password
                  </label>
                  <input type='text' autoFocus={true}  placeholder='password' onChange={(e) => setPassword(e.target.value)} className='bg-gray-700 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'></input>
              </div>
              <div className='mb-5'>
                  <label for='username' className='block mb-2 text-sm font-medium text-light'>
                                        Confirm Password
                  </label>
                  <input type='text' autoFocus={true} placeholder='confirm new password' onChange={(e) => setConfirmPassword(e.target.value)} className='bg-gray-700 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'></input>
              </div>
              <button type='submit' variant='success' className='text-light bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-center px-5 py-2.5 sm:w-auto w-1/2 text-sm fornt-medium rounded-lg'>Save Changes</button>
              <Link to={`/account`}>
                  <button className="font-medium bg-purple-600 rounded-lg px-5 py-2.5 ml-5 hover:bg-purple-700 focus:ring-purple-900 text-sm text-light" type="button">
                      Cancel
                  </button>
              </Link>
            </form>
        </SectionWrapper>
      )
    } catch (error) {
      return <Error>Something went wrong, go back to <Link onClick={logoutHandler}>Login</Link> page.</Error>
    }
  }

    return renderData()
}

export default AccountUpdate