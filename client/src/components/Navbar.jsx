import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../actions/userActions'
import { styles } from '../styles';
import { Link } from 'react-router-dom';
import logo from "/logo.svg"
import { addToCart } from "../actions/cartActions"
import { useNavigate } from 'react-router-dom'
import CartDropdown from './CartDropdown';

const Navbar = () => {

  let router = useNavigate()
  const dispatch = useDispatch()

  // Menu dropdown
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  // Cart dropdown
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

  const handleCartDropdownToggle = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen)
  }

  // login reducer
  const userLoginReducer = useSelector(state => state.userLoginReducer)
  const { userInfo } = userLoginReducer

  // logout
  const logoutHandler = () => {
    dispatch(logout()) //action
    router("/login")
    window.location.reload()
  }


    const [active, setActive] = useState("");
    const [scrolled, setScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        // Cleanup function to remove the event listener when component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    

  useEffect(()=>{
    const burgerClickHandler = () => {
        setIsMenuOpen(prevState => !prevState);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const menuBackdropClickHandler = () => {
        setIsMenuOpen(false);
    };

    document.querySelectorAll('.navbar-burger').forEach(burger => {
        burger.addEventListener('click', burgerClickHandler);
    });

    document.querySelectorAll('.navbar-close').forEach(closeButton => {
        closeButton.addEventListener('click', closeMenu);
    });

    document.querySelectorAll('.navbar-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', menuBackdropClickHandler);
    });

    return () => {
        document.querySelectorAll('.navbar-burger').forEach(burger => {
            burger.removeEventListener('click', burgerClickHandler);
        });

        document.querySelectorAll('.navbar-close').forEach(closeButton => {
            closeButton.removeEventListener('click', closeMenu);
        });

        document.querySelectorAll('.navbar-backdrop').forEach(backdrop => {
            backdrop.removeEventListener('click', menuBackdropClickHandler);
        });
    };
}, []);
  return (

    <>
    <nav className={`${styles.paddingX} relative w-full flex items-center justify-between py-5 top-0 z-10 ${scrolled ? "bg-primary" : "bg-transparent"}`}>
        <Link to='/' className='flex items-center gap-2'
        onClick={()=> {
            setActive("")
            window.scrollTo(0,0)
        }}>
            <img
            src={logo}
            className='object-contain'/>
        </Link>

        <div className='md:hidden'>
        <div className="relative mx-3">
        {/* Cart Dropdown */}
        <CartDropdown isOpen={isCartDropdownOpen} toggleDropdown={handleCartDropdownToggle} />
    </div>
        </div>

        <div className="lg:hidden">
			<button className="navbar-burger flex items-center text-dark-600 p-3">
				<svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<title>Mobile menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
				</svg>
			</button>
		</div>

        <ul className='hidden absolute left-[50%] transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6'>
        <li><a className="text-sm text-gray-400 hover:text-gray-500" href="/">Home</a></li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><a className="text-sm text-blue-600 font-bold" href="/menu">Menu</a></li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><a className="text-sm text-gray-400 hover:text-gray-500" href="/about">About Us</a></li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><a className="text-sm text-gray-400 hover:text-gray-500" href="/">Our Chefs</a></li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><a className="text-sm text-gray-400 hover:text-gray-500" href="/contact">Contact</a></li>
		</ul>
		<div className="hidden lg:flex items-center">
          {userInfo ? (
            <div className="relative">
              <button onClick={handleUserMenuToggle}>
              <svg class="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-light" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               

              </button>
              {isUserMenuOpen && (
                <ul className="absolute right-0 mt-2 py-2 w-48 bg-gray-500 rounded-lg shadow-lg">
                  <li><Link to="/account" className='ml-4 hover:text-accent tracking-wide text-lg font-semibold'>Account Settings</Link></li>
                  <li><Link to="/all-addresses" className='ml-4 hover:text-accent tracking-wide text-lg font-semibold'>Address Settings</Link></li>
                  <li><Link to="/all-orders" className='ml-4 hover:text-accent tracking-wide text-lg font-semibold'>All Orders</Link></li>
                  <li><button onClick={logoutHandler} className='block px-4 py-2 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl ml-4 mt-5'>Sign Out</button></li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <a className="lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200" href="/login">Sign In</a>
              <a className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="/register">Sign up</a>
            </>
          )}
          <div className="relative mx-3">
          <CartDropdown isOpen={isCartDropdownOpen} toggleDropdown={handleCartDropdownToggle} />
          </div>
        </div>
    
    </nav>

    <div className={`navbar-menu relative z-50  ${isMenuOpen ? "": "hidden"}`}>
        <div className='navbar-backdrop fixed inset-0 bg-gray-800 opacity-25'></div>
        <nav className='fixed top-0 left-o bottom-0  flex flex-col w-5/6 max-w-sm py-6 px-6 bg-secondary border-r overflow-y-auto'>
            <div className='flex items-center mb-8'>
                <a className='mr-auto text-3xl font-bold' href='#'>
                    <img
                    src={logo}/>
                </a>
                <button class="navbar-close">
					<svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
                </div>
                
                <div>
                
				<ul>
					<li className="mb-1">
						<a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/">Home</a>
					</li>
					<li className="mb-1">
						<a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/menu">Menu</a>
					</li>
					<li className="mb-1">
						<a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/about">About Us</a>
					</li>
					<li className="mb-1">
						<a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/">Our Chefs</a>
					</li>
					<li className="mb-1">
						<a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/contact">Contact</a>
					</li>
				</ul>
			</div>
			<div className="flex items-center lg:hidden">
    <div className="relative mx-3">
        {/* User SVG Dropdown */}
        {userInfo ? (
            <div className="relative">
                <button onClick={handleUserMenuToggle}>
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-light" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                    </svg>
                </button>
                {isUserMenuOpen && (
                    <ul className="absolute left-0 mt-2 py-2 w-48 bg-gray-500 rounded-lg shadow-lg">
                    <li><Link to="/account-settings" className='ml-4 hover:text-accent tracking-wide text-lg font-semibold'>Account Settings</Link></li>
                    <li><Link to="/address-settings" className='ml-4 hover:text-accent tracking-wide text-lg font-semibold'>Address Settings</Link></li>
                    <li><Link to="/all-orders" className='ml-4 hover:text-accent tracking-wide text-lg font-semibold'>All Orders</Link></li>
                    <li><button onClick={logoutHandler} className='block px-4 py-2 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl ml-4 mt-5'>Sign Out</button></li>
                  </ul>
                )}
            </div>
        ) : (
          <>
            {/* Render login/signup buttons if user is not logged in */}
            
                <a className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl text-secondary hover:bg-secondary hover:text-white  border hover:border-accent" href="#">Sign in</a>
                <a className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" href="#">Sign Up</a>
                </> 
        )}
    </div>

    
</div>
    <p className="my-4 text-xs text-center text-gray-400">
					<span>Copyright © 2024</span></p>
        </nav>
    </div>
    </>
  )
}

export default Navbar
