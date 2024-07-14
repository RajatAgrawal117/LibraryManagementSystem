import React, { useState, useEffect } from 'react';
import './HomeBook.css';

const HomeBook = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookDetails, setBookDetails] = useState(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const [trending, setTrending] = useState([]);

  const fetchBookDetails = async (isbn) => {
    const response = await fetch(`  `);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      setBookDetails(data.items[0].volumeInfo);
    } else {
      setBookDetails(null);
    }
  };

  const fetchNewArrivals = async () => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=science&orderBy=newest&maxResults=5`);
    const data = await response.json();
    setNewArrivals(data.items || []);
  };

  const fetchTrending = async () => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=science&orderBy=relevance&maxResults=5`);
    const data = await response.json();
    setTrending(data.items || []);
  };

  useEffect(() => {
    fetchNewArrivals();
    fetchTrending();
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      fetchBookDetails(searchTerm);
    }
  };

  return (
    <div className="home-page">
    

      <div className="search-section">
        <h2>Search the books available in Library</h2>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Enter ISBN number" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {bookDetails && (
        <div className="book-details">
          <h3>{bookDetails.title}</h3>
          <p>{bookDetails.authors && bookDetails.authors.join(', ')}</p>
          <p>{bookDetails.publishedDate}</p>
          <p>{bookDetails.description}</p>
        </div>
      )}

      <div className="content">
        <div className="new-arrivals">
          <h2>New Arrivals</h2>
          <ul>
            {newArrivals.map((book) => (
              <li key={book.id}>
                {book.volumeInfo.imageLinks && (
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                )}
                <div>
                  <h3>{book.volumeInfo.title}</h3>
                  <p>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
                  <p>{book.volumeInfo.publishedDate}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="trending">
          <h2>Trending</h2>
          <ul>
            {trending.map((book) => (
              <li key={book.id}>
                {book.volumeInfo.imageLinks && (
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                )}
                <div>
                  <h3>{book.volumeInfo.title}</h3>
                  <p>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
                  <p>{book.volumeInfo.publishedDate}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeBook;