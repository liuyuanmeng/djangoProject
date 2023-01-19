// This components is going to display all cheeses in a list
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

// Import bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
// slider
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


const Materials = () => {
  // Navigate
  const navigate = useNavigate()
  const [materials, setMaterials] = useState([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/materials/')
      setMaterials(data)
    }
    getData()
  }, [navigate])

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
  }

  return (
    <>
      <div className='jewellery-show'>
        {materials.map(material => {
          const { id, name, jewelleries } = material
          return (
            <div key={id}>
              <h2>{name}</h2>

              <Slider {...settings} className='carousel-wrapper'>
                {jewelleries.map(jewellery => {
                  const { id, name, price, image } = jewellery
                  return (
                    <div key={id}>
                      <Link to={`/jewelleries/${id}`}>
                        <div className="image-wrapper">
                          <img src={image} />
                        </div>
                        <div className='card-body-home'>
                          <div className='card-title'>
                            <h4>{name}</h4>
                          </div>
                          <div className='jewellery-details'>
                            <h4>£{price}</h4>
                          </div>

                        </div>
                      </Link>
                    </div>
                  )
                })}


              </Slider>



            </div>


          )

        })}
      </div>
    </>
  )
}

export default Materials

