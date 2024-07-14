import { Home } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import HomeBook from './HomeBook'
import axios from 'axios'


const UserHome = () => {

    const [books, setBooks] = useState([{}])
    useEffect(() => {
        const fetchBooks = async () => {
           await axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:9781787123427').then((res)=>{
                setBooks(res.data.items[0].volumeInfo)
                console.log(res.data.items[0].volumeInfo)
               
            }).catch(()=>{
                console.log('error')
            })
            
        }
        fetchBooks()
    },[])

    console.log(books)

  return (
    <div>
       <div>
        <h1 className='text-2xl'>User Home Page</h1>
        <div className=' pl-2'>
            <h1 className=' text text-3xl py-2'>My Books</h1>
            <div className=' border-black border-2 w-1/2 ' />
        </div>
{    books.title && <HomeBook title={books.title} image={books.imageLinks.smallThumbnail } />
}
       </div>
    </div>
  )
}

export default UserHome