import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();

  // reducer
  const userLoginReducer =useSelector((state) => state.userLoginReducer);
  const { error, userInfo } = userLoginReducer

  // use the useNavigate hook to access the router object
  const router = useNavigate();

  useEffect(() => {
    if (userInfo) {
      router('/') //homepage
    }
  }, [router, userInfo])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password))
  }

  return (
    <div className='text-light mt-12 grid h-screen place-items-center'>
      <div className='justify-content-md-center'>
      <div className='grid justify-items-center'>
          <h1 className='text-2xl mb-5 font-semibold text-light'>Sign In</h1>
          {error && <Error variant='danger'>{error}</Error>}
          <form className='max-w-sm mx-auto' onSubmit={submitHandler}>
            <div className='mb-5 mt-10'>
              <label for='username' className='block mb-2 text-sm font-medium text-light'>Username</label>
              <input className='bg-gray-700 block border border-gray-600 w-full placeholder-gray-400 text-light focus:ring-blue-500 focus:border-blue-500 rounded-lg text-sm p-4' type='username' placeholder='enter username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div className='mb-5'>
              <label for='username' className='block mb-2 text-sm font-medium text-light'>Password</label>
              <input className='bg-gray-700 block border border-gray-600 w-full placeholder-gray-400 text-light focus:ring-blue-500 focus:border-blue-500 rounded-lg text-sm p-4' type='password' placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button type='submit' className='text-light focus:ring-blue-800 hover:bg-blue-700 bg-blue-600 text-center px-5 py-2.5 sm:auto rounded-lg'>
              Sign In
            </button>
          </form>

          <div className='flex flex-col text-light'>

            <div className='mt-10'>
              Do not have an account?
            </div>
            <div className='flex flex-row-reverse mt-3'>

              <Link to='/register'>
              <button className='text-light bg-blue-600  hover:bg-blue-700 text-center rounded-lg p-3 sm:auto'>
              Register
            </button>
              </Link>
            
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Login