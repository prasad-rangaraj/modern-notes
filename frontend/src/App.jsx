import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Navbar from './components/navbar';
import Profile from './components/profile';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App