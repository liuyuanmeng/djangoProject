import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'

import { useParams, Link, useNavigate } from 'react-router-dom'

import { userIsAuthenticated, getTokenFromLocalStorage, getPayload } from '../helpers/auth'
import Spinner from '../../utilities/Spinner'

const Account = () => {
  const payload = getPayload()
  const id = payload.sub
  const navigate = useNavigate()
  const [account, setAccount] = useState('')
  const [errors, setErrors] = useState(false)

  console.log(id)

  useEffect(() => {


    const getAccount = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })

        setAccount(data)
        console.log(data)


      } catch (error) {
        console.log(error)

      }
    }
    getAccount()

  }, [])
  console.log(account)

  return (
    <section>
      <Card className="bg-dark text-white mt-5" >
        <Card.Title>Account Dashboard</Card.Title>
        <Card.Text>Hi {account.first_name}, welcome to your account dashboard </Card.Text>
        <Card.Title>Personal Information</Card.Title>
        <div className="col-md-6"><h4>Name: <span>{account.first_name}</span></h4></div>
        <div className="col-md-6"><h4>Surname: <span>{account.last_name}</span></h4></div>
        <div className="col-md-6"><h4>Email: <span>{account.email}</span></h4></div>





      </Card>


    </section>

  )
}



export default Account