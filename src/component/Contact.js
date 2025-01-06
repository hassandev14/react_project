import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Contact() {
  return (
    <div className='app'>
        <h1>Contact Page</h1>
        <h3>Others</h3>
        <li><Link to="form">Email</Link></li>
       <li><Link to="about">About</Link></li>
        <Outlet/>
    </div>
  )
}

export default Contact
  