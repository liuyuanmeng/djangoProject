import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main>
      <div className="not-found__texts">
        <h1 className="not-found__title">¡Oops!</h1>
        <h2 className='not-found__subtitle'><Link className='link-dark' to="/jewelleries">Back to home</Link></h2>
        
      </div>
    </main>

  )
}

export default NotFound