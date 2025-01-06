import React, { useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

function Login() {
    const login = () => {
       localStorage.setItem('login', 'true')
       navigate('/')
    }
    const navigate = useNavigate();
    
    useEffect(() => {
        let login = localStorage.getItem('login')
        if(login){
           navigate('/')
        }
    })
  return (
    <>
     <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Text</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => login()}>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default Login