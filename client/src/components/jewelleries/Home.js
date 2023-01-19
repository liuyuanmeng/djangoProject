import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../utilities/formatCurrency'
// Bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Home = () => {
  const [likeArray, setLikeArray] = useState([])

  const [cartProducts, setCartProducts] = useState([])
  // console.log(likeArray)

  useEffect(() => {
    const data = window.localStorage.getItem('cart')
    if (data !== null) {
      setCartProducts(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cartProducts))
  }, [cartProducts])

  useEffect(() => {
    const data = window.localStorage.getItem('LIKED_JEWELLERIES')
    // console.log(data)
    if (data !== null) {
      setLikeArray(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('LIKED_JEWELLERIES', JSON.stringify(likeArray))
  }, [likeArray])

  const [jewelleries, setJewelleries] = useState([])
  const navigate = useNavigate()
  const [visible, setVisible] = useState(6)
  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 6)
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/jewelleries/')
      setJewelleries(data)
      console.log(data)
    }
    getData()
  }, [navigate])

  // cart

  function getProductQuantity(id) {
    const quantity = cartProducts.find(product => product.id === id)?.quantity

    if (quantity === undefined) {
      return 0
    }

    return quantity
  }

  function addOneToCart(id, name, price) {
    const quantity = getProductQuantity(id)

    if (quantity === 0) {
      // product is not in cart
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          name: name,
          price: price,
          quantity: 1,
        }
      ])
      console.log({
        id: id,
        name: name,
        price: price,
        quantity: 1,
      })
    } else {
      // product is in cart
      // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]    add to product id of 2
      setCartProducts(
        cartProducts.map(
          product =>
            product.id === id // if condition
              ? { ...product, quantity: product.quantity + 1 } // if statement is true
              : product // if statement is false
        )
      )
    }
  }

  function deleteFromCart(id) {
    // [] if an object meets a condition, add the object to array
    // [product1, product2, product3]
    // [product1, product3]
    setCartProducts(cartProducts =>
      cartProducts.filter(currentProduct => {
        return currentProduct.id !== id
      })
    )
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id)

    if (quantity === 1) {
      deleteFromCart(id)
    } else {
      setCartProducts(
        cartProducts.map(
          product =>
            product.id === id // if condition
              ? { ...product, quantity: product.quantity - 1 } // if statement is true
              : product // if statement is false
        )
      )
    }
  }

  return (
    <>
      <div className="main-image mb-4">
        <img
          src="https://cdn.shopify.com/s/files/1/0277/6262/2567/files/DESKTOP_MP_1_1920x960.jpg?v=1667404772"
          alt="Home-Image"
        />
      </div>
      <Container className="mt-4">
        <Row>
          {jewelleries.slice(0, visible).map(jewellery => {
            const { id, name, price, image } = jewellery

            const productQuantity = getProductQuantity(id)

            return (
              <Col key={id} md="6" lg="4" className="jewellery mb-4">
                <Card className="card h-100">
                  <Col>
                    <Link className="link-dark" to={`/jewelleries/${id}`}>
                      {' '}
                      <Card.Img variant="top" src={image} />
                    </Link>
                  </Col>
                  <Card.Body className="bg-light">
                    <Card.Title className="text-center mb-0 cardTitle">
                      {name}{' '}
                    </Card.Title>
                    <Card.Title className="text-center mb-0 text">
                      {formatCurrency(price)}
                    </Card.Title>
                    <div
                      style={{ color: 'white' }}
                      onClick={() =>
                        likeArray.includes(id)
                          ? setLikeArray(likeArray.filter(item => item !== id))
                          : setLikeArray([...likeArray, id])
                      }
                    >
                      {likeArray.includes(id) ? '❤️' : '🤍'}
                    </div>
                    <div className="mt-auto">
                      {productQuantity > 0 ? (
                        <>
                          <div
                            className="d-flex align-items-center flex-column"
                            style={{ gap: '.5rem' }}
                          >
                            <Form as={Row}>
                              <Form.Label column="true" sm="6">
                                In Cart: {productQuantity}
                              </Form.Label>
                              <Col sm="6">
                                <Button
                                  sm="6"
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => addOneToCart(id, name, price)}
                                  className="mx-2"
                                >
                                  +
                                </Button>
                                <hr></hr>
                                <Button
                                  sm="6"
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => removeOneFromCart(id)}
                                  className="mx-2"
                                >
                                  -
                                </Button>
                              </Col>
                            </Form>
                          </div>
                          <div>
                            <Button
                              variant="warning"
                              onClick={() => deleteFromCart(id)}
                              className="my-2 d-flex align-items-center"
                            >
                              Remove from cart
                            </Button>
                          </div>
                        </>
                      ) : (
                        <Button
                          variant="secondary"
                          className="w-100"
                          onClick={() => addOneToCart(id)}
                        >
                          Add To Cart
                        </Button>
                      )}
                    </div>

                  </Card.Body>
                </Card>
              </Col>
            )
          })}

          <div className="row justify-content-center"></div>
          <button
            className="btn btn-outline-dark align-items: center"
            onClick={showMoreItems}
          >
            Load More
          </button>
        </Row>
      </Container>
    </>
  )
}
export default Home
