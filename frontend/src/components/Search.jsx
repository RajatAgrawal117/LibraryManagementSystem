// src/components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      // console.log(response.data.items);
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="book-search-container">
      <h1>Public Library</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="book-results">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <div className="book-details">
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.description}</p>
              <p>{book.saleInfo.isEbook ? 'Available' : 'Not Available'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
