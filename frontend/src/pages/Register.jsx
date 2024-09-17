import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { BlogContext } from '../components/context/BlogContext'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
const Register = () => {
  
  const navigate = useNavigate();
  const {url,token,setToken} = useContext(BlogContext)

  const [formData, setFormData] = useState({name:"", email: "", password: "" })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/create`, formData ,{
        headers:{'Content-Type':'application/json', Authorization: `Bearer ${token}`}
      })
      if (response.status === 200){
        console.log(response.data.token)
        setToken(response.data.token);
        localStorage.setItem('token',response.data.token);
        toast.success('ahn ahn Opoor 🕺 Welcome to healthify 🛳️ ') 
     
        navigate('/')
      }
   
    } catch (err) {
      console.log(err)
      toast.error('Please provide valid credentials')
    }}
    return (
      <div className=' form-content'>
        <form className='form-container' onSubmit={handleSubmit}>
        <input
            type='text'
            placeholder='Full Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          <button type='submit'>Submit</button>
        </form>

      </div>
    )
  }

  export default Register
