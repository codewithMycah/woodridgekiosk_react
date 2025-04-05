import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from "./components/Navbar"
import Home from './pages/Home';
import BusinessDetails from './components/BusinessDetails';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';


function App() {
  
  return (
    <>
      <Router>
        <div className='w-full bg-white'>
          <Navbar />
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/aboutus' element={<AboutUs />}></Route>
              <Route path='/contact' element={<ContactUs />}></Route>
              <Route path='/business/:business_id' element={<BusinessDetails />}></Route>
            </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
