import React, { useEffect, useState } from 'react'

import axios from 'axios'

const MyBooks = ({title,image ,info}) => {

    console.log(title)

  return (
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

export default MyBooks