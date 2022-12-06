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

  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
  })
  const [ errors, setErrors ] = useState({})
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
      setErrors(error)
    }
  }

  return (


    <Container fluid className='mt-5 '>
      <div className='masthead  d-flex justify-content-center'>
        {/* // <div className=" color-overlay d-flex justify-content-center align-items-center "> */}


        <Form className='rounded p-4 p-sm-3 text-secondary w-50 mt-5 color-overlay ' onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Row className="mb-3 form-label">
              <Row>
                <h3 className='login-heading'>REGISTER</h3>
              </Row>

              <Form.Group className='mb-3'>

                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Form.Group className='mb-3'>

                <Form.Label>User Name</Form.Label>
                <Form.Control type="username" name='username' placeholder="Username" value={formData.username} onChange={handleChange} />
              </Form.Group>

              <Form.Group className='mb-3'>

                <Form.Label>First Name</Form.Label>
                <Form.Control type="firstname" name='first_name' placeholder="Enter First Name" value={formData.first_name} onChange={handleChange} />
              </Form.Group>
 
              <Form.Group className='mb-3'>

                <Form.Label>Last Name</Form.Label>
                <Form.Control type="lastname" name='last_name' placeholder="Enter Last Name" value={formData.last_name} onChange={handleChange} />
              </Form.Group>

              <Form.Group className='mb-3'>

                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Enter Password" value={formData.password} onChange={handleChange} />
              </Form.Group>

              <Form.Group className='mb-3'>

                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password_Confirmationv" name='password_confirmation' placeholder="Enter Password Again" value={formData.password_confirmation} onChange={handleChange} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Button className='button-register btn btn-secondary' type="submit">
                  Register
                </Button>
              </Form.Group>

            </Row>
          </Form.Group>
        </Form>


      </div>
    </Container>








  )


}

export default Register