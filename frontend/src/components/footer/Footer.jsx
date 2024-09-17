import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer-container'>
     <ul className='footer-cat'>
      <NavLink>Gastrointestinal</NavLink>
      <NavLink>NeuroScience</NavLink>
      <NavLink>Cardiovascular</NavLink>
      <NavLink>Endocrinology</NavLink>
      <NavLink>Others</NavLink>
     </ul>
    </div>
  )
}

export default Footer
