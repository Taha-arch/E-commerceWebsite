  import './styles/main.css';
  import React from 'react';
  import { BrowserRouter, Route, Routes } from 'react-router-dom';
  import AdminLogin from './components/AdminLogin';




  function App() {
    return (
      
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/Login' element={<AdminLogin />}></Route>
        </Routes>
        </BrowserRouter>
        
      </div>
        

    );
  }

  export default App;
