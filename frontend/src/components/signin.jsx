import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInSuccess, signoutSuccess } from '../store/userSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
const user = useSelector((state) => state.currentUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username : "pop",
      email :"123@gmail.com"
    }

    dispatch(signInSuccess(user));

    // Add your login logic here, for example, sending a request to the backend
  };

  console.log(user);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text text-xl">
      
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <label htmlFor="username" className="block  font-medium text-gray-700 text-2xl">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 mb-3 p-2 w-full border rounded-md "
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

export default Login;
