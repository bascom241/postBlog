import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BlogContext } from '../components/context/BlogContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Edit.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Edit = () => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': +1 }],
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

  const { id } = useParams();
  const { url ,token} = useContext(BlogContext);
  const [postEdit, setPostEdit] = useState({});
  const [editTitle, setEditTitle] = useState('');
  const [image, setImage] = useState(null);

  const fetchEdit = async () => {
    try {
      const response = await axios.get(`${url}/api/list/posts/post/${id}`, {headers:{
        Authorization:`Bearer ${token}`
      }})
      setPostEdit(response.data.post);
      setEditTitle(response.data.post.tittle);
      setImage(null); // Clear the image preview
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleTitleChange = (e) => {
    setEditTitle(e.target.value);
    setPostEdit(prev => ({ ...prev, tittle: e.target.value }));
  };

  useEffect(() => {
    fetchEdit();
  }, [id]);


  const navigate = useNavigate();
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const processedText = postEdit.text.replace(/<\/?p>/g, '');
    const formData = new FormData();
    formData.append('tittle', postEdit.tittle);
    formData.append('text', processedText);

    // Only append the image if it is selected
    if (image) {
        formData.append('image', image);
    }

    try {
        const response = await axios.patch(
            `${url}/api/list/posts/editPost/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('Post updated successfully:', response.data);
        toast.success('Post updated successfully');
        navigate('/');
    } catch (error) {
        if (error.response && error.response.status === 404) {
            toast.error('Error updating post');
        } else {
            toast.error('🚫 Only authorized users can edit their posts');
            navigate('/');
        }
        console.log('Error:', error.message);
    }
};

  // Generate image URL for preview
  const imageUrl = image ? URL.createObjectURL(image) : `${url}/images/` + postEdit.image;

  return (
    <div>
      <form className='edit-post-container' onSubmit={handleEditSubmit}>
        <label htmlFor='image'>
          <img
            className='upload-img'
            src={imageUrl}
            alt='Upload Preview'
          />
        </label>
        <input
          type='file'
          id='image'
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type='text'
          value={postEdit.tittle}
          onChange={handleTitleChange}
          placeholder='Title'
        />
        <ReactQuill
          className='text-edit'
          modules={modules}
          formats={formats}
          value={postEdit.text}
          onChange={(text) => setPostEdit(prev => ({ ...prev, text }))}
        />
        <button type='submit' className='editPost-submit'>Submit</button>
      </form>
    </div>
  );
};

export default Edit;
