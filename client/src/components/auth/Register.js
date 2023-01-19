import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col'
import { useState } from 'react'

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
    setFormData({ ...FormData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault()
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
      {/* Heading */}
      <Form className='auth-register' onSubmit={handleSubmit}>
        <Row>
          <h3 className='create-account'>CREATE AN ACCOUNT</h3>
        </Row>

        <Row>
          <p className='create-account-paragraph-2'>Denotes required field *</p>
        </Row>
        {/* Title */}
        <Row className='form-label'>
          <Form.Group className='mb-3'>

            <Form.Label>User Name</Form.Label>
            <Form.Control type="username" name='username'  value={formData.username} onChange={handleChange} />
          </Form.Group>

        </Row>
        {/* Name */}
        <Row className="mb-3 form-label">
          <Form.Group as={Col}>
            <Form.Label>First name*</Form.Label>
            <Form.Control type="text" name='firstName' value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <p className='text-danger'>{errors.firstName}</p>}
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last name*</Form.Label>
            <Form.Control type="text" name='lastName' value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <p className='text-danger'>{errors.lastName}</p>}
          </Form.Group>
        </Row>
        {/* Email */}
        <Row className="mb-3 form-label">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control type="email" name='email' value={formData.email} onChange={handleChange} />
            {errors.email && <p className='text-danger'>{errors.email}</p>}
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Confirm email*</Form.Label>
            <Form.Control type="email" name='confirmEmail' value={formData.confirmEmail} onChange={handleChange} />
            {errors.confirmEmail && <p className='text-danger'>{errors.confirmEmail}</p>}
          </Form.Group>
        </Row>
        {/* Password */}
        <Row className="mb-3 form-label">
          <Form.Group as={Col}>
            <Form.Label>Choose a password*</Form.Label>
            <Form.Control type="password" name='password' value={formData.password} onChange={handleChange} />
            {errors.password && <p className='text-danger'>{errors.password}</p>}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Confirm password*</Form.Label>
            <Form.Control type="password" name='passwordConfirmation' value={formData.passwordConfirmation} onChange={handleChange} />
            {errors.passwordConfirmation && <p className='text-danger'>{errors.passwordConfirmation}</p>}
          </Form.Group>
        </Row>
        {/* Checkboxes and register button */}
        <Form.Group className="mb-3 form-label" id="formGridCheckbox">
          <Form.Check className='checkbox' type="checkbox" label="Recieve reading recommendations and be the first to hear about our special editions and author events, straight to your inbox" />
        </Form.Group>
        <Row>
          <Form.Group as={Col} className="mb-3 form-label" id="formGridCheckbox">
            <Form.Check className='checkbox2' type="checkbox" label="I agree to the Waterstones.com Terms and Conditions." />
          </Form.Group>
          <Form.Group as={Col}>
            <Button className='button-register' type="submit">
              REGISTER
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </section>
  )











}

export default Register