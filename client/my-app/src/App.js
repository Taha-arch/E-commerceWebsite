  import './styles/main.css'; // Include your CSS file here
  import React from 'react';
  import { BrowserRouter, Route, Routes } from 'react-router-dom';
  import SignInForm from './components/SignIn';
  import RegisterForm from './components/Register';

  function App() {
    return (
      <div className='App'>
        <BrowserRouter>
        <Routes>
          <Route path='/SignIn' element={<SignInForm />}></Route>
          <Route path='/Register' element={<RegisterForm />}></Route>
        </Routes>
        </BrowserRouter>
      
      </div>
    );
  }

  export default App;
