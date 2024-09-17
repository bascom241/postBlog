import React, { useState, useContext } from 'react';
import { BlogContext } from '../components/context/BlogContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'
import { toast } from 'react-toastify';

const CreatePost = () => {
  const navigate = useNavigate();
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const { url,token } = useContext(BlogContext);
  const [formData, setFormData] = useState({ tittle: '', author: '', text: '' });
  const [image, setImage] = useState(null);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(prev => ({
      ...prev, [name]: value
    }));
  };

  const handleTextChange = (value) => {
    setFormData(prev => ({
      ...prev, text: value
    }));
  };


  const processedText = formData.text.replace(/<\/?p>/g, '');


  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const formDataToSend = new FormData();
    formDataToSend.append('tittle', formData.tittle);
    formDataToSend.append('text', processedText);
    formDataToSend.append('author', formData.author);

    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      const response = await axios.post(`${url}/api/list/posts/addPost`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", Authorization:`Bearer ${token}`}
      });
      console.log('success', response);
      navigate('/');
      toast.success('Post added successfully')
    } catch (e) {
      console.log('error', e.message);
      toast.error('Please Provide valid credentials')
    }
  };

  return (
    <div className='contento'>
      <form className='add-content' onSubmit={handleSubmit}>
        <input
          type='file'
          required
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type='text'
          placeholder='Blog tittle'
          name='tittle'
          value={formData.tittle}
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Author Name'
          name='author'
          value={formData.author}
          onChange={handleInputChange}
        />
        <ReactQuill
          className='text-edit'
          modules={modules}
          formats={formats}
          value={formData.text}
          onChange={handleTextChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
