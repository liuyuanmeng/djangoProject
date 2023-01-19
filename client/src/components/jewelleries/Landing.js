import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <section className="home-page">
      <div className="home-text">
        <div className="title">
          <div className="home-btns">
            <Link
              className="explore-btn home-btn text-center"
              to={'/jewelleries'}
            >
              <h1 className="title-h1">ICONIC JEWELLERY</h1> <h1 className='blink'>Explore</h1>
            </Link>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/0277/6262/2567/files/HERO_DESKTOP_7_90468f64-469b-4ff8-abbb-1223e301e2d7_1920x960.jpg?v=1674057233"
            alt="landing"
          />
          {/* <h1></h1> */}
        </div>
      </div>
    </section>
  )
}

export default Landing
