import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap'
// import { userIsAuthenticated } from '../helpers/auth'
import { VStack, IconButton, useColorMode } from '@chakra-ui/react'
import { FaRegSun, FaRegMoon } from 'react-icons/fa'
import Button from 'react-bootstrap/esm/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
// import icons
import {
  BsFillHeartFill,
  BsFillPersonFill,
  BsBagFill,
  BsFillBasket3Fill
} from 'react-icons/bs'

import Slider from 'react-slick'
import { userIsAuthenticated } from '../helpers/auth'

const PageNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [term, setTerm] = useState('')
  const [errors, setErrors] = useState(false)

  const [cartProducts, setCartProducts] = useState([])
  // console.log(likeArray)

  useEffect(() => {
    const data = window.localStorage.getItem('cart')
    if (data !== null) {
      setCartProducts(JSON.parse(data))
    }
  }, [cartProducts])

  const totalQuantity = cartProducts
    .map(item => item.quantity)
    .reduce((acc, currentValue) => acc + currentValue, 0)

  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('daisy-shop')

    navigate('/jewelleries')
  }

  const navDropdownTitle = <BsFillPersonFill color="white" size={30} />
  // cartshow
  const [cartshow, setCartShow] = useState(false)
  const handleCartClose = () => setCartShow(false)
  const handleCartShow = () => setCartShow(true)

  // const checkout = async () => {
  //   await fetch('http://localhost:4000/checkout', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ items: cart.items }),
  //   })
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(response => {
  //       if (response.url) {
  //         window.location.assign(response.url) // Forwarding user to Stripe
  //       }
  //     })
  // }

  return (
    <>
      <div className="alert bg-yellow">
        <div className="message animate">
          <ul
            style={{
              animation:
                '90s linear 0s infinite normal none running banner-scroll',
            }}
          >
            <li className="text msg-0  ">
              GET 10% OFF YOUR FIRST ORDER - SIGN UP HERE
            </li>
            <li className="text msg-1  ">
              FREE UK SHIPPING & EXTENDED RETURNS
            </li>
            <li className="text msg-2  ">KLARNA | PAY IN INSTALMENTS</li>
          </ul>
        </div>
      </div>

      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Button variant="secondary mt-1" onClick={handleShow}>
          {' '}
          <span className="navbar-toggler-icon"></span>
        </Button>{' '}
        <Offcanvas show={show} onHide={handleClose} placement="start">
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Nav className="me-auto">
              <>
                <Nav.Link as={Link} to="/jewelleries">
                  Shop
                </Nav.Link>
                <Nav.Link as={Link} to="/categories">
                  Categories
                </Nav.Link>
                <Nav.Link as={Link} to="/materials">
                  Materials
                </Nav.Link>

                <Nav.Link as={Link} to="/contact-us">
                  Contact Us
                </Nav.Link>
                <Nav.Link as={Link} to="/story">
                  Story
                </Nav.Link>
              </>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        <div className="mx-auto">
          <Navbar.Brand
            className="align-items: center"
            as={Link}
            to="/jewelleries/"
          >
            Jewellery
          </Navbar.Brand>
        </div>
        <div className="icons">
          <div
            className="box"
            style={{
              width: '3rem',
              height: '3rem',
              position: 'relative',
              marginRight: '10px',
            }}
          >
            <NavDropdown title={navDropdownTitle} id="collasible-nav-dropdown">
              {userIsAuthenticated() ? (
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">
                    Register
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </div>
          <div
            className="box"
            style={{
              width: '3rem',
              height: '3rem',
              position: 'relative',
              marginRight: '10px',
            }}
          >
            <Nav.Link as={Link} to="/favourite">
              <BsFillHeartFill color="white" size={30} className="me-3" />
            </Nav.Link>
          </div>

          {/* cart-model */}

          <div className="box">
            <Navbar.Collapse className="justify-content-end">
              {/* <Button onClick={handleShow}> */}
              <span style={{ color: 'white' }}>
                {' '}
                <BsFillBasket3Fill color="white" size={30} className="me-3" />
                Cart ({totalQuantity} items)
              </span>
              {/* </Button> */}
            </Navbar.Collapse>
            {/* <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {totalQuantity > 0 ? (
                  <>
                    <p>Items in your cart:</p>
                    {cartProducts.map((currentProduct, idx) => (
                       (
                        <>
                          <h3>{productData.title}</h3>
                          <p>{quantity} total</p>
                          <p>${(quantity * productData.price).toFixed(2)}</p>
                          <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
                            Remove
                          </Button>
                          <hr></hr>
                        </>
                      )
                    ))}

                    <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                    <Button variant="success" onClick={checkout}>
                      Purchase items!
                    </Button>
                  </>
                ) : (
                  <h1>There are no items in your cart!</h1>
                )}
              </Modal.Body>
            </Modal> */}
          </div>

          <div
            className="box"
            style={{
              width: '3rem',
              height: '3rem',
              position: 'relative',
              marginRight: '10px',
            }}
          >
            <div>
              <IconButton
                icon={colorMode === 'light' ? <FaRegSun /> : <FaRegMoon />}
                isRound="true"
                size="sm"
                alignSelf="flex-end"
                me="3"
                mb="2"
                onClick={toggleColorMode}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </>
  )
}

export default PageNavbar
