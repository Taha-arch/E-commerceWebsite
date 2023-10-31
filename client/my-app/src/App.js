  import './styles/main.css';
  import React from 'react';
  import { BrowserRouter, Route, Routes } from 'react-router-dom';
  import AdminLogin from './components/AdminLogin';
  import Users from './components/Users';


  




  function App() {
    return (
      
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/Login' element={<AdminLogin />}></Route>
          <Route path='/Users' element={<Users />}></Route>
        </Routes>
        </BrowserRouter>
        
      </div>
        

    );
  }

  export default App;
