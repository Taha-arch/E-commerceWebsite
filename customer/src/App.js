import './styles/main.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './component/Layout';
import CustomerSiderbar from './component/CustomerSiderbar';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/profile' element={<CustomerSiderbar/>}></Route>
          
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
