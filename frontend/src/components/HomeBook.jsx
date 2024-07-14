import React, { useEffect, useState } from 'react'

import axios from 'axios'

const HomeBook = ({title,image ,info}) => {

    console.log(title)

  return (
    <div className=' flex'>
        <div>
           {title}
           <img src={image} alt="book" className=' h-23 w-auto' />
           <div>
            <p>
                {info}
            </p>
           </div>

        </div>
    </div>
  )
}

export default HomeBook