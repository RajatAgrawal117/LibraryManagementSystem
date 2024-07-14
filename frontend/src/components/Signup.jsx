import React, { useEffect, useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add your login logic here, for example, sending a request to the backend
    
  };

 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text text-xl">
      
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <select className=' text-2xl pb-1' onChange={(e)=>{ setRole(e.target.value)}}>
            <option value="user">User</option>
            <option value="librarian">Librarian</option>
        </select>
        <label htmlFor="username" className="block  font-medium text-gray-700 text-2xl">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 mb-3 p-2 w-full border rounded-md "
        />
         <label htmlFor="email" className="block  font-medium text-gray-700 text-2xl">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Signup</button>
      </form>
      <div className="mt-6">
        <button className="w-full bg-blue-500 text-white py-2 rounded-md mb-2 hover:bg-blue-600">Signup using Google</button>
      </div>
    </div>
  );
};

export default Signup;
