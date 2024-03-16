import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import Error from '../components/Error'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [username, setUsername] = useState("")
  const [first_name, setFirstname] = useState("")
  const [last_name, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()

    // reducer
    const userRegisterReducer = useSelector(state => state.userRegisterReducer)
    const { error, userInfo } = userRegisterReducer

    const router = useNavigate()

    useEffect(() => {
        if (userInfo) {
            router('/login') // homepage
        }
    }, [router, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(username,first_name, last_name, email, password, confirmPassword))
        }
    }

  return (
    <div className='justify-items-center text-light mt-10'>
            <div className='grid h-screen place-items-center'>
                <div className=' '>
                    <h1 className='text-2xl font-semibold mb-10 grid justify-items-center'>Sign Up</h1>
                    {message && <Error variant='danger'>{message}</Error>}
                    {error && <Error variant='danger'>{error}</Error>}
                    <form onSubmit={submitHandler} className='max-w-md mx-auto'>
                        <div className='relative z-0 w-full mb-5 group'>
                            <input type='text' placeholder='' value={username} onChange={(e) => setUsername(e.target.value)} className='block py-2.5 w-full text-lg text-gray-400 bg-transparent border-0 border-b-2 border-gray-600 appearance-none text-light focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'></input>
                            <label for='floating_username' className='peer-focus:font-medium absolute  text-xl text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-focus:text-blue-500 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6' required>Username</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>
                            <input type='text' placeholder='' value={first_name} onChange={(e) => setFirstname(e.target.value)} className='block py-2.5 w-full text-lg text-gray-400 bg-transparent border-0 border-b-2 border-gray-600 appearance-none text-light focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' required ></input>
                            <label for='floating_firstname' className='peer-focus:font-medium absolute text-xl text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-focus:text-blue-500 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>First Name</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>
                            <input type='text' placeholder='' value={last_name} onChange={(e) => setLastname(e.target.value)} className='block py-2.5 w-full text-lg text-gray-400 bg-transparent border-0 border-b-2 border-gray-600 appearance-none text-light focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' required ></input>
                            <label for='floating_lastname' className='peer-focus:font-medium absolute text-xl text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-focus:text-blue-500 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Last Name</label>
                        </div>
                        <div className='relative z-0 w-full mb-5 group'>
                            <input type='text' placeholder='' value={email} onChange={(e) => setEmail(e.target.value)} className='block py-2.5 w-full text-lg text-gray-400 bg-transparent border-0 border-b-2 border-gray-600 appearance-none text-light focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' required ></input>
                            <label for='floating_username' className='peer-focus:font-medium absolute text-xl text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-focus:text-blue-500 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Email Address</label>
                        </div>
                        <div className='grid md:grid-cols-2 md:gap-6'>
                            <div className='relative z-0 w-full mb-5 group'>
                            <input type="password" name="password"  className="block py-2.5 px-0 w-full text-sm text-light bg-transparent border-0 border-b-2 appearance-none dark:text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={password}
                                onChange={(e) => setPassword(e.target.value)} placeholder=" " required />
                        
                            <label for="Password" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform  -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">Password</label>
                            </div>
                            <div className='relative z-0 w-full mb-5 group'>
                            <input type="password" name="password"  className="block py-2.5 px-0 w-full text-sm text-light bg-transparent border-0 border-b-2  appearance-none dark:text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}placeholder=" " required />
                        
                            <label for="Password" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                            </div>
                        </div>
                        <button type='submit' className='text-light focus:ring-blue-800 hover:bg-blue-700 bg-blue-600 text-center px-5 py-2.5 sm:auto rounded-lg'>
                        Sign Up
                        </button>
                    </form>

                    <div className='flex flex-col grid justify-items-center'>

            <div className='mt-5'>
              Already Have An Account ? 
            </div>
            <div className='flex flex-row-reverse mt-3'>

              <Link to='/login'>
              <button className='text-light bg-blue-600  hover:bg-blue-700 text-center rounded-lg p-3 sm:auto'>
              Login
            </button>
              </Link>
            
            </div>
            
          </div>
                </div>
            </div>
        </div>
  )
}

export default RegisterPage