
import { createRoot } from 'react-dom/client'
import LayOut from './components/LayOut'
import Detail from './pages/Detail'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import Edit from './pages/Edit'

import './index.css'
import {createBrowserRouter,RouterProvider } from 'react-router-dom'
import BlogContextProvider from './components/context/BlogContext'



const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<LayOut/>,
      children:[
        {index:true, element:<Home/>},
        {path:'login', element:<Login/>},
        {path:'register', element:<Register/>},
        {path:'detail/:id', element:<Detail/>},
        {path:'createPost', element:<CreatePost/>},
        {path:'detail/:id/editPost/:id', element:<Edit/>}
      ]
    }
  ]
)


createRoot(document.getElementById('root')).render(

  <BlogContextProvider>
  <RouterProvider router= {router}/>
  </BlogContextProvider>


)
