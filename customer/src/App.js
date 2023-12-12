import './styles/main.css';
import './styles/index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './containers/ProductDetails';
import Cart from './containers/Cart';
import Layout from './components/Layout';
import Collections from './containers/Collections';
import LandingPage from './containers/LandingPage';
import Profile from './containers/Profile';
import SignInForm from './containers/SignIn';
import RegisterForm from './containers/Register';
import Checkout from './containers/Checkout';
import Favorites from './containers/Favorites';
import Orders from './containers/Orders';
import Products from "./containers/Products";
import PreLoader from './components/PreLoader/PreLoader';
import CollectionPerCategory from "./components/CollectionPerCategory";
import ScrollToTop from './components/ScrollToTop';

function App() {
  
  return (
    <Router>
      <ScrollToTop>
      <Routes>
        <Route path='/loader' element={<PreLoader />}></Route>
        <Route path='/register' element={<RegisterForm />}></Route>
        <Route path='/login' element={<SignInForm />}></Route>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/Home' element={<LandingPage/>}></Route>
          <Route path='/Cart' element={<Cart/>}></Route>
          <Route path='/Favorites' element={<Favorites/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/product/:id' element={<ProductDetails/>}> </Route>
          <Route path='/collections' element={<Collections/>}></Route>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path="/collections/:categoryURL" element={<CollectionPerCategory/>} />
          <Route path="/:category/:subcategory" element={<Products/>} />
          <Route path="/profile/:id" element={<Profile/>} />
        </Route>
      </Routes>
      </ScrollToTop>
    </Router>
  );
}


export default App;
