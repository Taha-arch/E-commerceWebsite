import React from 'react';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductCard from './components/ProductCard';
import ProductsList from './containers/ProductsList';
import ProductDetails from './components/ProductDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductDetails/>} />
      </Routes>
      </Router>
  );
}

export default App;
