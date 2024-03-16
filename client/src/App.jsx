import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import { AccountPage, AccountUpdate, AddressUpdatePage, AllAddressesOfUserPage, CartPage, DeleteUserAccountPage, Home, Login, CheckoutPage, MenuListPage, MenuCreatePage, MenuDetailsPage, MenuUpdatePage, NotFoundPage, OrderListPage, PaymentStatus, RegisterPage } from './pages';

const App = () => {
  return (
    <Router> {/* Wrap everything inside a Router */}
      <div className='z-0 bg-secondary font-noto'>
        <Navbar/>
        
          <Routes>
            <Route path='/' element={<Home />} exact/>
            <Route path='/menu/' element={<MenuListPage/>} exact/>
            <Route path='/create-menu/' element={<MenuCreatePage/>} exact/>
            <Route path='/menu/:id/' element={ <MenuDetailsPage/> } exact/>
            <Route path='/menu-update/:id/' element={<MenuUpdatePage/>} exact/>
            <Route path='/menu/:id/checkout' element={<CheckoutPage/>} exact/>
            <Route path='/payment-status' element={<PaymentStatus/>} exact/>
            <Route path='/login' element={<Login/>} exact/>
            <Route path='/register' element={<RegisterPage/>} exact/>
            <Route path='/account' element={<AccountPage/>} exact/>
            <Route path='/account/update/' element={<AccountUpdate/>} exact/>
            <Route path='/all-addresses/' element={<AllAddressesOfUserPage/>} exact/>
            <Route path='/account/delete' element={<DeleteUserAccountPage/>} exact/>
            <Route path='/all-addresses/:id/' element={<AddressUpdatePage/>} exact/>
            <Route path='/all-orders/' element={<OrderListPage/>} exact/>
            <Route path='/cart' element={<CartPage/>} exact/>
            <Route element={<NotFoundPage/>} /> {/* No path specified for NotFoundPage */}
          </Routes>
      </div>
    </Router>
  );
};

export default App;
