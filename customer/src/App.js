import React from 'react';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductCard from './components/ProductCard';
import ProductsList from './containers/ProductsList';
import ProductDetails from './containers/ProductDetails';
import OrderSummary from './components/OrderSummary';
import CartItems from './components/CartItems';
import Cart from './containers/Cart';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Cart/>} />
      </Routes>
      </Router>
  );
}

export default App;
