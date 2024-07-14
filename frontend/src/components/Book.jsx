import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null); // Initialize book as null initially

  const user = useSelector((state) => state.currentUser); // Assuming currentUser is properly set in Redux
  const isLoggedIn = !!localStorage.getItem("token");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please Login to borrow a book");
    } else {
      try {
        if (!user || !user._id) {
          toast.error("User information not available");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        // Assuming borrowData is structured correctly from localStorage
        const borrowData = JSON.parse(localStorage.getItem("user")); // Parse the stored string into an object

        // Ensure borrowData contains necessary fields like userId
        if (!borrowData._id) {
          toast.error("User information not available in localStorage");
          return;
        }

        // Add bookId to borrowData
        borrowData.bookId = id;

        const res = await axios.post("http://localhost:4000/api/borrow", borrowData, config);
        toast.success("Book borrowed successfully");
        console.log(res.data); // Assuming you want to log the response data
      } catch (err) {
        toast.error("Error borrowing book");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(response.data.volumeInfo);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div className="pt-4">
      {book ? (
        <>
          <h1 className="text-3xl font-bold text-left pl-4 pb-3">Title: {book.title}</h1>
          <div className="flex items-center gap-4 h-full relative">
            <div className="p-3 h-full w-1/6">
              <div>
                <img
                  src={book.imageLinks?.thumbnail}
                  alt="book"
                  className="h-15 w-full"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                className="pt-4"
                onClick={onSubmit}
              >
                Borrow
              </Button>
            </div>
            <div className="flex gap-2 flex-col w-5/6">
              <h1 className="text-left text-2xl font-bold">Description:</h1>
              <p className="w-full text-md">{book.description}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Book;
