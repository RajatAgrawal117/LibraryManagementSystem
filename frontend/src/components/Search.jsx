import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import { Link, useLocation } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('q');
    if (searchTerm) {
      fetchBooks(searchTerm);
    }
  }, [location.search]);

  const fetchBooks = async (searchTerm) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    if (query) {
      fetchBooks(query);
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
          <Link to={`/book/${book.id}`} key={book.id}>
            <div className="book-item">
              {book.volumeInfo.imageLinks && (
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
              )}
              <div className="book-details">
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.description}</p>
                <p>{book.saleInfo.isEbook ? 'Available' : 'Not Available'}</p>
              </div>
            </div>
          </Link>
        ))}
        {books.length === 0 && <p>No books found.</p>}
      </div>
    </div>
  );
};

export default Search;
