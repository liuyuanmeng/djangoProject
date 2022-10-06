import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import { userIsAuthenticated } from '../helpers/auth'
import { VStack, IconButton, useColorMode } from '@chakra-ui/react'
import { FaRegSun, FaRegMoon } from 'react-icons/fa'
import Button from 'react-bootstrap/esm/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

const PageNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [term, setTerm] = useState('')
  const [errors, setErrors] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('daisy-shop')

    navigate('/jewelleries')
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        bg='dark'
        variant='dark'
        sticky='top'
      >
      
        <Button variant='secondary mt-1' onClick={handleShow}>
          {' '}
          <span className='navbar-toggler-icon'></span>
        </Button>{' '}
        <Offcanvas show={show} onHide={handleClose} placement='start'>
          <Offcanvas.Header closeButton>
          
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />

            <Nav className='me-auto'>
              <>
                <Nav.Link as={Link} to='/jewelleries'>
                  Shop
                </Nav.Link>
                <Nav.Link as={Link} to='/categories'>
                  Categories
                </Nav.Link>
                <Nav.Link as={Link} to='/materials'>
                  Materials
                </Nav.Link>

                <Nav.Link as={Link} to='/contact-us'>
                  Contact Us
                </Nav.Link>
                <Nav.Link as={Link} to='/story'>
                  Story
                </Nav.Link>
                <hr />
                <span className='d-inline d-sm-none'>
                  <Nav.Link as={Link} to='/register'>
                  Register
                  </Nav.Link>
                  <Nav.Link as={Link} to='/login'>
                  Login
                  </Nav.Link>
                </span>

               
              </>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        <div className='mx-auto'>
          <Navbar.Brand className='align-items: center' as={Link} to='/'>
          Jewellery
          </Navbar.Brand>
       
        </div>
        <IconButton
          icon={colorMode === 'light' ? <FaRegSun /> : <FaRegMoon />}
          isRound='true'
          size='sm'
          alignSelf='flex-end'
          ml='3.5'
          onClick={toggleColorMode}
        />
      </Navbar>
    </>
  )
}

export default PageNavbar
