  import './styles/main.css'; // Include your CSS file here
  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
  import Dashboard from './components/Dashboard';
  import Layout from './components/shared/Layout';
import Customers from './components/Customers';
 
  function App() {
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='customers' element={<Customers />} />
        </Route>
        <Route path='login' element={<div>this is the login page</div>} />
      </Routes>
      </Router>
    );
  }

  export default App;
