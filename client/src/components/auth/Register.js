import React from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col'
import { useState, useEffect } from 'react'

import { Container, Card } from 'react-bootstrap'



const Register = () => {


  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
  })

  const [errors, setErrors] = useState({})

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formData)
      navigate('/login')
    } catch (error) {
      console.log(error)

      setErrors(error)
      console.log('checking setErrors')

    }
  }






  return (

    <section className='section-register'>
      <Container fluid className='mt-5 '>
        <div className='masthead  d-flex justify-content-center'>
          {/* // <div className=" color-overlay d-flex justify-content-center align-items-center "> */}


          <Form className='rounded p-4 p-sm-3 text-secondary w-50 mt-5 color-overlay ' onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Row className="mb-3 form-label">
                <Row>
                  <h3 className='login-heading create-account'>CREATE AN ACCOUNT</h3>
                </Row>

                <Form.Group className='mb-3'>

                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name='email' value={formData.email} onChange={handleChange} />
                  {errors.email && <p className='text-danger'>{errors.email}</p>}
                </Form.Group>

                <Form.Group className='mb-3'>

                  <Form.Label>User Name</Form.Label>
                  <Form.Control type="username" name='username' value={formData.username} onChange={handleChange} />
                  {errors.username && <p className='text-danger'>{errors.username}</p>}

                </Form.Group>

                <Form.Group className='mb-3'>

                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="firstname" name='first_name' value={formData.first_name} onChange={handleChange} />
                  {errors.firstName && <p className='text-danger'>{errors.firstName}</p>}
                </Form.Group>

                <Form.Group className='mb-3'>

                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="lastname" name='last_name' value={formData.last_name} onChange={handleChange} />
                  {errors.lastName && <p className='text-danger'>{errors.lastName}</p>}

                </Form.Group>

                <Form.Group className='mb-3'>

                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name='password' value={formData.password} onChange={handleChange} />
                  {errors.password && <p className='text-danger'>{errors.password}</p>}
                </Form.Group>

                <Form.Group className='mb-3'>

                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} />
                  {errors.passwordConfirmation && <p className='text-danger'>{errors.password_Confirmation}</p>}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Button className='button-register' type="submit">
                    Register
                  </Button>
                </Form.Group>

              </Row>
            </Form.Group>
          </Form>


        </div>
      </Container>
    </section>








  )

}


export default Register