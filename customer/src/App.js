import './styles/main.css';
import React from 'react';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductCard from './components/ProductCard';
import ProductsList from './containers/ProductsList';
import ProductDetails from './containers/ProductDetails';
import OrderSummary from './components/OrderSummary';
import CartItems from './components/CartItems';
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
import CollectionPerCategory from "./components/CollectionPerCategory";
import CheckoutSuccess from "./components/CheckoutSuccess" ;
import ScrollToTop from './components/ScrollToTop';
function App() {
  
  return (
    <Router>
      <ScrollToTop>
      <Routes>
        <Route path='/login' element={<SignInForm />}></Route>
        <Route path='/register' element={<RegisterForm />}></Route>
        <Route path='/' element={<Layout />}>
          <Route path='/Cart' element={<Cart/>}></Route>
          <Route path='/Favorites' element={<Favorites/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/product/:id' element={<ProductDetails/>}> </Route>
          <Route path='/collections' element={<Collections/>}></Route>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/checkout-success' element={<CheckoutSuccess/>}></Route>
          <Route path="/collections/:categoryURL" element={<CollectionPerCategory/>} />
          <Route path="/:category/:subcategory" element={<Products/>} />
          <Route path='/Home' element={<LandingPage/>}></Route>
          <Route path="/profile/:id" element={<Profile/>} />
        </Route>
      </Routes>
      </ScrollToTop>
    </Router>
  );
}


export default App;
