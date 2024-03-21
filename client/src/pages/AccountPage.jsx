import React, { useEffect } from 'react'
import SectionWrapper from '../hoc/SectionWrapper'
import { Link, Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails, logout, checkTokenValidation } from '../actions/userActions'
import Error from '../components/Error'
import { Spinner } from '../components'
import { useNavigate } from 'react-router-dom'


const AccountPage = () => {

  let router = useNavigate()
  const dispatch = useDispatch()

  // check token validation reducer
  const checkTokenValidationReducer = useSelector(state =>state.checkTokenValidationReducer)
  const { error:tokenerror } = checkTokenValidationReducer

  // login reducer
  const userLoginReducer = useSelector(state=> state.userLoginReducer)
  const { userInfo } = userLoginReducer

  // user Details reducer
  const userDetailsReducer = useSelector(state => state.userDetailsReducer)
  const { user:userAccDetails, loading } = userDetailsReducer
  console.log("User Account: ", userAccDetails)

  useEffect(() => {
    if (!userInfo) {
      router("/login")
    }else{
      try{
        dispatch(checkTokenValidation())
        dispatch(userDetails(userInfo))
      } catch (error) {
        router('/')
      }
    }
  }, [router, userInfo, dispatch])
  

  // logout
  const logoutHandler= () => {
    dispatch(logout())
  }

  if (userInfo && tokenerror == "Request failed with status 401") {
    alert("Session expired, please login again.")
    dispatch(logout())
    router('/login')
    window.location.reload()
  }

  const renderData = () => {
        try {

            return (
              <SectionWrapper>
                  <div className=''>
                  {loading && <span style = {{ display: "flex" }}><h5>Getting User Information</h5><span className = "ml-2"><Spinner/></span></span>}
                  <div className='container mx-auto items-center grid justify-items-center border border-2 rounded-md bg-gray-700 w-1/2'>
                      <div className='flex '>
                          <div className='text-light p-3 text-semibold'>Name:</div>
                          <div className='p-3 text-accent'>{userInfo.username}</div>
                      </div>
                      <div className='flex flex-row '>
                          <div className='text-light p-3 text-semibold'>Email:</div>
                          <div className='p-3 text-accent'>{userInfo.email}</div>
                      </div>
                      <div className='flex mb-3'>
                          <div className='text-light p-3 text-semibold'>Admin Priviledges:</div>
                          <div className='p-3 text-accent'>{userAccDetails.admin ? "Yes" : "No"}</div>
                      </div>
                      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to={`/account/update/`} className='text-accent pb-5'>Update Account details</Link>
                        <span className="ml-1 text-primary pb-5">| </span>
                        <span className="ml-1"></span>

                        <Link to={`/account/delete/`} className='text-primary pb-5'>Delete Account</Link>
                    </span>
                </div>
            </div>
              </SectionWrapper>
              
            )
        } catch (error) {
            return <Error>Something went wrong, go back to <Link to='/login'
                onClick={logoutHandler}
            > Login</Link> page.</Error>
        }
    }


    return renderData()

}
export default AccountPage