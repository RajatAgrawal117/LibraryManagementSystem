import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import SignIn from './components/signin'
import Navbar from './components/Navbar'
import UserHome from './components/UserHome'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/user" element={<UserHome />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
