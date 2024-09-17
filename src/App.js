import Main from './mainPages/main.tsx';
import './App.css';
import React from 'react';
import { fetchUser } from './slice.ts';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Products from './mainPages/products.tsx';
import { useDispatch, useSelector } from "react-redux";
import Dark from './mainPages/dark.tsx';
import Product from './mainPages/product.tsx';
import CartPage from './cart/cartPage.tsx';
import Favorites from './mainPages/favorites.tsx';
import Competition from './filters/competition.tsx';
import Profile from './auth/profile.tsx';
import Orders from './delivery/orders.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import DeliveryOptions from './delivery/deliveryOptions.tsx';
import ProductsCategory from './products/productsCategory.tsx';

function App() {
  const dark = useSelector((state)=> state.slice.dark);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
    React.useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token]);
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-right'/>  
        {dark && <Dark></Dark>}
          <Routes>
            <Route path='/' element={<Main></Main>}></Route>
            <Route path='/products' element={<Products></Products>}></Route>
            <Route path='/product/:id' element={<Product></Product>}></Route>
            <Route path='/products/:category' element={<ProductsCategory></ProductsCategory>}></Route>
            <Route path='/cart' element={<CartPage></CartPage>}></Route>
            <Route path='/favorites' element={<Favorites></Favorites>}></Route>
            <Route path='/competition' element={<Competition></Competition>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/orders' element={<Orders></Orders>}></Route>
            <Route path='/delivery' element={<DeliveryOptions></DeliveryOptions>}></Route>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
