  import './styles/main.css';
  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
  import Dashboard from './components/Dashboard';
  import Layout from './components/shared/Layout';
  import Customers from './components/Customers';
  import Products from './components/Product/Products';
  import Orders from './components/Orders/Orders';
  import Users from './components/Users/Users';
  import AddProduct from './components/Product/AddProduct';
  import ProductEdit from './components/Product/ProductEdit';
  import AdminLogin from './components/AdminLogin';
  // import AddUser from './components/Users/AddUser';
  import EditUser from './components/Users/EditUser';

  function App() {
    return (
      <Router>
      <Routes>
      <Route path='/Login' element={<AdminLogin />}></Route>
        <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='customers' element={<Customers />} />
        <Route path='products' element={<Products/>} />
        <Route path='orders' element={<Orders/>} />
        <Route path='/products/addProduct' element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
        <Route path='addProduct' element={<AddProduct/>} />
        <Route path='/users' element={<Users />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        </Route>
        <Route path='login' element={<div>this is the login page</div>} />

      </Routes>
      </Router>
    );
  }

  export default App;
