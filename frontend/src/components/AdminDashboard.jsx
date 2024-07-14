import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get('http://localhost:4000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }   
      );
        
        console.log(response);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Account Type</th>
            <th>Borrowed Books</th>
            <th>Reserved Books</th>
            <th>Returned Books</th>
            <th>Lost Books</th>
            <th>Fine Amount</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.accountType}</td>
              <td>{user.no_borrowed_books}</td>
              <td>{user.no_reserved_books}</td>
              <td>{user.no_returned_books}</td>
              <td>{user.no_lost_books}</td>
              <td>{user.fine_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
