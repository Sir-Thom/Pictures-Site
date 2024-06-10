import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import SkeletonGallery from './components/Skeleton/SkeletonGallery';
import PicturesPages from './Pages/Picture';

const queryClient = new QueryClient();

function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <PicturesPages />
    </QueryClientProvider>
  );
}

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/load" element={<SkeletonGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);