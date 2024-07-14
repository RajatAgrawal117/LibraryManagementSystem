import { Home } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import HomeBook from "./HomeBook";
import axios from "axios";
import MyBooks from "./myBooks";

const UserHome = () => {
  const [books, setBooks] = useState([{}]);
  const [search, setSearch] = useState("");
  const [searchbooks, setSearchBooks] = useState([{}]);
  useEffect(() => {
    const fetchBooks = async () => {
      await axios
        .get("https://www.googleapis.com/books/v1/volumes?q=isbn:9781787123427")
        .then((res) => {
          setBooks(res.data.items[0].volumeInfo);
          console.log(res);
          console.log(res.data.items[0].volumeInfo);
        })
        .catch(() => {
          console.log("error");
        });
    };
    fetchBooks();
  }, []);

  //   console.log(books);

  useEffect(() => {}, [search, books]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className="">
      <div className=" pl-4">
        <h1 className="text-2xl">User Home Page</h1>
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
            </div>
            {books.title && (
              <MyBooks
                title={books.title}
                image={books.imageLinks.smallThumbnail}
                info={books.description}
              />
            )}
          </div>
          <div className=" w-1/2 pr-2">
            <h1 className=" text text-3xl">User Profile</h1>
            <div className=" border-black border-2  " />
            <div>
                <h1 className=" text text-2xl">Name: John Doe</h1>
                <h1 className=" text text-2xl">Email:<span> p1@gmail</span></h1>
                
            </div>
          </div>
        </div>
  console.log(books);

  return (
    <div>
      <div>
        <h1 className="text-2xl">User Home Page</h1>
        <div className=" pl-2">
          <h1 className=" text text-3xl py-2">My Books</h1>
          <div className=" border-black border-2 w-1/2 " />
        </div>
        {books.title && (
          <HomeBook
            title={books.title}
            image={books.imageLinks.smallThumbnail}
            // description={books.volumeInfo.description}
          />
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default UserHome;
