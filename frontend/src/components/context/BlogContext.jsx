import React, { createContext,useState, useEffect} from 'react'

export const BlogContext = createContext(null)

const BlogContextProvider = (props) => {
  const url = BACKEND_URL;
  const [posts, setPosts] = useState([])
  // const [token,setToken] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


    const contextValue= {
      url,
      posts,
      setPosts,
      token,
      setToken
    }
  return (

   
 <BlogContext.Provider value={contextValue}>
    {props.children}
 </BlogContext.Provider>
  )
}

export default BlogContextProvider
