import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userIsAuthenticated, getTokenFromLocalStorage, getPayload } from '../helpers/auth'
import { handleOrderButton } from '../helpers/order'
import { deleteOrder } from '../helpers/order'
import Nav from 'react-bootstrap/Nav'

// Bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


const Order = () => {


  const [addButtonText, setAddButtonText] = useState('Remove from oder')
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  // const routeChange = () => {
  //   const path = '/order'
  //   navigate(path)
  // }


  const payload = getPayload()
  const id = payload.sub

  function refreshPage() {
    window.location.reload(false)
  }

  useEffect(() => {

    const getOrders = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profile/${id}/`, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })

        setOrders(data.order)
        console.log(data)


      } catch (error) {
        console.log(error)

      }
    }
    getOrders()

  }, [])
  console.log(orders)





  return (
    <Container className='cheese-list'>
      <Row>
        <h1>Order-List</h1>
        {orders.map(order => {
          const { id, name, price, image } = order
          return (
            <Col key={id} md="6" lg="4" className='cheese mb-4'>
              <Link to={`/jewelleries/${id}`}>
                <Card>
                  <Card.Img variant="top" src={image} />
                  <Card.Body className='bg-light'>
                    <Card.Title className='text-center mb-0'> {name}</Card.Title>
                    <Card.Text className='text-center mb-0'>£{price} </Card.Text>
                  </Card.Body>
                </Card>
              </Link>

              {userIsAuthenticated() ?
              /* Add to  Favourite Button */

                <Button onClick={refreshPage}><Button onClick={() => handleOrderButton(getTokenFromLocalStorage(), id, getPayload().sub, addButtonText, setAddButtonText)}>{addButtonText}</Button></Button>

                :
                <><Nav.Link as={Link} to="/register">Register</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link></>


              }
            </Col>
          )
        })}
      </Row>



    </Container>

  )
}

export default Order