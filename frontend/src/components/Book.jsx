import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const isLoggedIn = !!localStorage.getItem('token');
const Book = () => {
  const { id } = useParams();

  const [book, setBook] = useState([]);

  const user = useSelector((state) => state.currentUser);

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    if(isLoggedIn){
        toast.error("Please Login to borrow a book")
    }

    await axios.post("http://localhost:5000/borrow", {}).then((res) => {
        toast.success("Book borrowed successfully")
        console.log(res);
    }).catch((err) => {
        toast.error("Error borrowing book")
      console.log(err);
    });
   
  }


  useEffect(() => {
        const fetchBooks = async () => {
        await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`).then((data)=>{
            console.log(data)
            setBook(data.data.volumeInfo)
        }).catch((err)=>{
            console.log(err)

        })
    }
    fetchBooks()

   
  }, []);

  return (
    <div className="pt-4">
      <h1 className=" text-3xl font-bold text-left pl-4 pb-3">
        Title : {book.title}
      </h1>
      <div className=" flex items-center gap-4 h-full relative">
        <div className="p-3 h-full w-1/6     ">
          <div>
            <img
              src={book.imageLinks?.thumbnail}
              alt="book"
              className=" h-15 w-full"
            />
          </div>
          <Button variant="contained" color="primary" className="pt-4 " onClick={onsubmit} >
          Borrow
        </Button>
        </div>
        
        <div className="flex gap-2  flex-col w-5/6">
          {/* <h1 className=" text-xl font-bold">{book.title}</h1> */}
          <h1 className=" text-left text-2xl font-bold">Description :</h1>
          <p className=" w-full text-md">{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
