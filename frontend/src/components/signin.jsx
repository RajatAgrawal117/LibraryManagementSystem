import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`http://localhost:4000/api/auth/login`, {
        username,
        password
      }, {  withCredentials: true,});

      // Assuming your response contains user data and a token
      const { data } = response;

      // Handle successful login here (e.g., store the token, redirect user, etc.)
      console.log('Login successful:', data);


      // For example, you could store the token in localStorage
      localStorage.setItem('token', data.token);

      // Redirect to another page if needed
      window.location.href = '/';
    } catch (err) {
      console.log(err)
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <label htmlFor="username" className="block font-medium text-gray-700 text-2xl">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 mb-3 p-2 w-full border rounded-md"
        />
        <label htmlFor="password" className="block text-2xl font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 mb-3 p-2 w-full border rounded-md"
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Login</button>
      </form>
      <div className="mt-6">
        <button className="w-full bg-blue-500 text-white py-2 rounded-md mb-2 hover:bg-blue-600">Signup using Google</button>
        <Link to="/signup">
        <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">Signup using email address</button>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
