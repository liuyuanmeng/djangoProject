import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
const Login = () => {
  // Navigate to user's account
  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    email: '',
    password: '',

  })
  const [errors, setErrors] = useState(false)

  // ? Save to local storage
  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('daisy-shop', token)
  }

  // ? Submit request
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('testing console')
      const response = await axios.post('/api/auth/login/', formData)
      console.log(response)
      setTokenToLocalStorage(response.data.token)
      navigate('/account')
    } catch (error) {
      console.log(error)

      setErrors(error.response.data.message)
    }


  }

  // ? Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
  }

  return (
    <section className='section-login'>
      <Form className='auth-login' onSubmit={handleSubmit}>
        <Row className="mb-3 form-label">
          <Row>
            <h3 className='login-heading'>LOGIN</h3>
          </Row>
          <Row>
            <p className='login-paragraph'>Haven&apos;t signed up for an account yet? Simply <a href="/register">Register</a> and we can get you up and started!</p>
          </Row>
          <Row>
            <p className='login-paragraph-2'>Denotes required field *</p>
          </Row>
          <Form.Group as={Col}>
            <Form.Label>Email*</Form.Label>
            <Form.Control type="email" name='email' value={formData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Password*</Form.Label>
            <Form.Control type="password" name='password' value={formData.password} onChange={handleChange} />
            {errors && <p className='text-danger'>{errors}</p>}
          </Form.Group>
          <Form.Group>
            <Button className='button-login' type="submit">
              Login
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </section>
  )




}
export default Login