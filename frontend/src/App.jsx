import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import SignIn from './components/Signin'
import Navbar from './components/Navbar'
import UserHome from './components/UserHome'
import Search from './components/Search'
import HomeBook from './components/HomeBook'
import Signup from './components/Signup'
import Book from './components/Book'
import AdminDashboard from './components/AdminDashboard'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomeBook/>} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/user" element={<UserHome />} />
      <Route path="/search" element={<Search />}/>
      <Route path ="/signup" element={<Signup />} />
      <Route path="/book/:id" element={<Book />} />
      <Route path="/admin" element={<AdminDashboard/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
