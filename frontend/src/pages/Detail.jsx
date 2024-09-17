import React, { useEffect, useState } from 'react'
import { BlogContext } from '../components/context/BlogContext'
import { useContext } from 'react'
import './Detail.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
const Detail = () => {
  const { posts, url, setPosts,token } = useContext(BlogContext);
  const { id } = useParams();

const navigate = useNavigate();

  const [post ,setPost] = useState({});
  console.log(post._id)
  console.log(post.name)

  const [isLoading, setIsLoading] = useState(true)

  const fetchPost = async () => {
    try {
      setIsLoading(true)
      if(token){


      const response = await axios.get(`${url}/api/list/posts/post/${id}`,{headers:{
      
        Authorization:`Bearer ${token}`
      }});
      console.log(response.data.post)
      setPost(response.data.post);
    }else{
      toast.error('Please Login or Register to view posts')
      setPost(false)
    }
    } catch (err) {
      console.log(err.message)
    } finally{
      setIsLoading(false)
    }
  }
  const handleDelete = async () => {
    try {
        const response = await axios.delete(`${url}/api/list/posts/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Post deleted successfully:', response.data.post);
        navigate('/')
        toast.success('🗑️ Post deleted successfully')
    } catch (error) {
        console.error('Error deleting post:', error.message);
        toast.error('🚫 Only authorized users can delete their posts');
        navigate('/')
    }
};


  useEffect(()=>{
    fetchPost();
  },[id])






  return (
    <div className='container-detail'>

   
   {isLoading? (<LoadingSpinner/>): post? (
    
     <div key={post._id} className='detail-container'>
        <div className='detail-1'>
          <h1>{post.tittle}</h1>
        
          <Link className='edit-link' to={`editPost/${post._id}`} >
          
          <FaEdit/>
            Edit Post
          </Link>
          <p>By{post.author}</p>
          <p>{post.date}</p>
      
        </div>


        <div className='detail-2'>
          <img src={`${url}/images/` + post.image} />
          <p>{post.text}</p>
          <button className='delete' onClick={handleDelete}>Delete</button>
        </div>
      </div>
      ):null
      }
     

    </div>
  )
}

export default Detail
