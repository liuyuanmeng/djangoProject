import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Like = () => {
  const [like, setLike] = useState(false) 
  console.log(like)

  useEffect(() => {
    const data = window.localStorage.getItem('LIKE_STATUS')
    console.log(data)
    if (data !== null) {
      setLike(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('LIKE_STATUS', JSON.stringify(like))
  }, [like])

  return (

    <section className='add-to-wishlist'>
      <button onClick={() => setLike(!like)}>{like ? '❤️' : '🤍'}</button>
    </section>



  )
}

export default Like