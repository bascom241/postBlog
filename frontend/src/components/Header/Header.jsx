import React, { useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import { BlogContext } from '../context/BlogContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AiOutlineClose } from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'
const Header = () => {


  const menuRef = useRef();
  const openMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.right = '-50px';
    }
  }

  const closeMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.right = '-400px';
    }
  }




  const { token, setToken } = useContext(BlogContext);

  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
    toast.success('🤝 its not a bye bye but see you again!!')
    closeMenu();
  }
  return (
    <div className='nav-container '>
      <NavLink to='/'> <h2>Healthify</h2></NavLink>

      

      
      
        <FaBars className='nav-open' onClick={openMenu} />
    
      {!token ?
        <ul ref={menuRef} className='navlink-container'>
       
        <p className='cancel' onClick={closeMenu}>X</p>
          <NavLink to='login' onClick={closeMenu}>Login</NavLink>
          <NavLink to='register' onClick={closeMenu}>Register</NavLink>


        </ul>

        :
        <ul ref={menuRef} className='navlink-container'>

        <p className='cancel' onClick={closeMenu}>X</p>
          <NavLink to='createpost' onClick={closeMenu}>CreatePost</NavLink>
          <NavLink onClick={logOut}>Log Out</NavLink>

        </ul>
      }






    </div>
  )
}

export default Header
