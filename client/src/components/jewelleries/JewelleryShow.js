import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import Spinner from '../../utilities/Spinner'

const JewelleryShow = () => {

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

  

  const navigate = useNavigate()
  const { id } = useParams()
  const [jewellery, setJewllery] = useState(null)
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getJewellery = async () => {
      try {
        const { data } = await axios.get(`/api/jewelleries/${id}`)
        setJewllery(data)
        console.log(data)

      } catch (err) {
        setErrors(true)
      }
    }
    getJewellery()
  }, [id])

  return (
    <Container className='mt-4 container'>
      <Card className='card' style={{ width: '50rem' }}>
        <Row>
          {jewellery ?
            <>

              <Col md="6">
                <img src={jewellery.image} alt={jewellery.name} />

              </Col>
              <Col md="6">
                <h1 className='title'>{jewellery.name}</h1>
                <hr />
                <h4 className='details'>View Product Details</h4>
                <p>{jewellery.product_details}</p>
                <hr />
                <h5 className='price'>£{jewellery.price}</h5>
                <hr />
                <button onClick={() => setLike(!like)}>{like ? '❤️' : '🤍'}</button>

                
              </Col>
            </>
            :
            <h2 className='text-center'>
              {errors ? 'Something went wrong! Please try again later!' : <Spinner />}
            </h2>
          }

        </Row>

      </Card>


    </Container>
  )



}
export default JewelleryShow