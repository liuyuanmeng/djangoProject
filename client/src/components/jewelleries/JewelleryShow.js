import React,  { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Spinner from '../../utilities/Spinner'

const JewelleryShow = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [ jewellery, setJewllery ] = useState(null)
  const [ errors, setErrors ] = useState(false)

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
    <Container className='mt-4'>
      <Row>
        { jewellery ?
          <>
           
            <Col md="6">
              <img src={jewellery.image} alt={jewellery.name} />
              
            </Col>
            <Col md="6">
              <h1>{jewellery.name}</h1>
              <hr />
              <h4>View Product Details</h4>
              <p>{jewellery.product_details}</p>
              <hr />
              <h5>£{jewellery.price}</h5>
              <hr />
              
              <Link to="/jewelleries" className='btn btn-warning'>Add to Your Wishlist</Link>
            </Col>
          </>
          :
          <h2 className='text-center'>
            {errors ? 'Something went wrong! Please try again later!' : <Spinner />}
          </h2>
        }
       
      </Row>

    </Container>
  )



}
export default JewelleryShow