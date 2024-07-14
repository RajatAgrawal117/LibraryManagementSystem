import React, { useState, useEffect } from 'react';
import './HomeBook.css';

const HomeBook = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookDetails, setBookDetails] = useState(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const [trending, setTrending] = useState([]);

<<<<<<< HEAD
const HomeBook = ({title,image ,info}) => {
=======
  const fetchBookDetails = async (isbn) => {
    const response = await fetch(`  `);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      setBookDetails(data.items[0].volumeInfo);
    } else {
      setBookDetails(null);
    }
  };
>>>>>>> 4e2f551e5e78a003ede1ce2ab69caae0bd02f79b

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
<<<<<<< HEAD
    <div className=' flex  p-3'>
            <div className=' w-1/2 '>
           <img src={image} alt="book" className=' h-23 w-auto' />

            </div>
           <div className=' '>
            <h1 className=' text-xl font-bold'>

           {title}
            </h1>
            <p className=' w-full text-sm'>
                {info.substring(0,350)}
            </p>
           </div>

    </div>
  )
}


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
