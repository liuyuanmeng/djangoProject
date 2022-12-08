import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

// Bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const Home = () => {
 

  const [jewelleries, setJewelleries] = useState([])
  const navigate = useNavigate()
  const [visible, setVisible] = useState(6)
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6)
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/jewelleries/')
      setJewelleries(data)
    }
    getData()
  }, [navigate])
  console.log(jewelleries)

  return (

    <>
      <div className='main-image mb-4'>
        <img src="https://cdn.shopify.com/s/files/1/0277/6262/2567/files/DESKTOP_MP_1_1920x960.jpg?v=1667404772" alt="Home-Image" />
      </div>
      <Container className='mt-4'>
        <Row>
          {jewelleries.slice(0, visible).map(jewellery => {
            const { id, name, price, image } = jewellery


            return (
              <Col key={id} md="6" lg="4" className='jewellery mb-4'>
                <Link className='link-dark' to={`/jewelleries/${id}`}>
                  <Card className='card'>
                    <Card.Img variant="top" src={image} />
                    <Card.Body className='bg-light'>
                      <Card.Title className='text-center mb-0 cardTitle'>{name}  </Card.Title>
                      <Card.Text className='text-center mb-0 text'>£{price}</Card.Text>
                     

                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )

          })}
          <div className='row justify-content-center'></div>
          <button className='btn btn-outline-dark align-items: center' onClick={showMoreItems}>Load More</button>
          
          
        </Row>

      </Container>
    </>

  )


}
export default Home