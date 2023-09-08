import React, {useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Pizza from './Components/Pizza';
import YourOrder from './Components/YourOrder';


function App() {
  return (
    <>
    <h1 className='header'>Lambda Eats</h1>
      <nav>
        <div className='nav-links'>
          <Link to='/'> Home </Link>
          <Link to='/pizza' id='order-pizza'>Build Your Pizza!</Link>
          <Link to='/YourOrder'>See Your Order</Link>
          <Routes> 
            <Route path = '/' element={<></>}/>
            <Route path='/pizza' element={<Pizza />} />
            <Route path='/YourOrder' element={<YourOrder />}/>
          </Routes>
        </div>  
      </nav>
    </>
)
}
export default App;
