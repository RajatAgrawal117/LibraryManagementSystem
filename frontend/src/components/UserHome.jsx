import React, { useEffect, useState } from 'react';
import axios from 'axios';
import myBooks from './myBooks'; // Assuming you have a component for displaying individual books
import { useSelector } from 'react-redux';

const UserHome = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [searchbooks, setSearchBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Fetching user data from Redux state
  const user = useSelector((state) => state.currentUser);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/books');
        setBooks(response.data.items); // Assuming response structure has an items array
        console.log(borrowedBooks)
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        // Replace with your actual API endpoint to fetch borrowed books for the user
        const response = localStorage.getItem("user");
        setBorrowedBooks(response.data); // Assuming response data is an array of borrowed books
        console.log(response)
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };
    fetchBorrowedBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    // Add your search logic here if needed
  };

  return (
    <div className="">
      <div className=" pl-4">
        <h1 className="text-2xl font-bold ">User Home Page</h1>
        <div className=" flex">
          <div>
            <div className=" pr-6 relative ">
              <h1 className=" text text-3xl">Search Books</h1>
              <div className=" border-black border-2  w-" />
              <div className=" flex gap-3 w-auto ">
                <input
                  type="text"
                  className="border-2 border-black w-5/6  h-10 mt-2 p-2"
                  onChange={handleSearch}
                />
                <button className="bg-blue-500 text-white p-2 rounded-md mt-2 w-1/6">
                  Search
                </button>
              </div>
            </div>
            <div className=" pl-2">
              <h1 className=" text text-3xl py-2">My Books</h1>
              <div className=" border-black border-2  " />
              {borrowedBooks.map((book) => (
                <myBooks
                  key={book._id}
                  title={book.title}
                  image={book.thumbnail}
                  info={book.description}
                />
              ))}
            </div>
          </div>
          <div className=" w-1/2 pr-2">
            <h1 className=" text text-3xl">User Profile</h1>
            <div className=" border-black border-2  " />
            <div>
              <h1 className=" text text-2xl">Name: {user.username}</h1>
              <h1 className=" text text-2xl">Email: <span>{user.email}</span></h1>
              {/* Add more user details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
