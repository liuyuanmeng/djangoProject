import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import Spinner from '../../utilities/Spinner'
import { userIsAuthenticated, getTokenFromLocalStorage, getPayload } from '../helpers/auth'
import { handleFavouriteButton } from '../helpers/favourite'


const JewelleryShow = () => {

  const [addButtonText, setAddButtonText] = useState('Add to Favourite')


  const [likeArray, setLikeArray] = useState([])


  
  const { id } = useParams()
  const [jewellery, setJewllery] = useState(null)
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getJewellery = async () => {
      try {
        const { data } = await axios.get(`/api/jewelleries/${id}/`)
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


              </Col>
            </>
            :
            <h2 className='text-center'>
              {errors ? 'Something went wrong! Please try again later!' : <Spinner />}
            </h2>
          }

        </Row>

        {userIsAuthenticated() ?
        /* Add to  Favourite Button */

          <Button onClick={() => handleFavouriteButton(getTokenFromLocalStorage(), id, getPayload().sub, addButtonText, setAddButtonText)}>{addButtonText}</Button>



          :
          <><Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link></>


        }


      </Card>


    </Container>
  )



}
export default JewelleryShow