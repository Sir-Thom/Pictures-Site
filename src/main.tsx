import React from 'react'
import ReactDOM from 'react-dom/client'
import { fetchImages } from './Pages/Picture'
import './index.css'
import { QueryClient, QueryClientProvider } from "react-query"; // Import QueryClient and QueryClientProvider

import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Pages/Login.tsx'
import SignUp from './Pages/SignUp.tsx'
import SkeletonGallery from './components/Skeleton/SkeletonGallery.tsx'
import PicturesPages from './Pages/Picture.tsx';
const queryClient = new QueryClient()
function Main() {
  
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <PicturesPages />
    </QueryClientProvider>
  )
}
const router = createBrowserRouter([
  { path: "/", element:<Main />, loader: () => {
    return fetchImages(1, 12);

  }},
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/load", element: <SkeletonGallery /> },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />

  </React.StrictMode>,
)
