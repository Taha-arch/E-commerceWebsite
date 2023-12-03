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



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/Cart' element={<Cart/>}></Route>
          <Route path='/collections' element={<Collections/>}></Route>
          <Route path='/Home' element={<LandingPage/>}></Route>
          <Route path="/profile/:id" element={<Profile/>} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
