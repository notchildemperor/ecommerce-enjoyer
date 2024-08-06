import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Login from './pages/login';
import Register from './pages/register';
import Cart from './pages/cart';
import Loader from './components/loader';
import Home from './pages/home';
import Shoes from './pages/shoes';
import Shirt from './pages/shirt';

// Admin
import LoginAdmin from './admin/loginAdmin';
import SideBar from './admin/sideBar';
import DashboardAdmin from './adminPage/dashboard';
import Product from './adminPage/product';
import Category from './adminPage/category';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();
    const timer = setTimeout(handleComplete, 500);
    return () => clearTimeout(timer); 
  }, [location]);

  // Kondisi untuk mengecek apakah di halaman admin
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div>
      {isAdminPath && <SideBar />}
      {!isAdminPath && <Navbar />}
      {loading && <Loader />}
      <Routes>
        <Route path='/admin/login' element={<LoginAdmin/>}/>
        <Route path='/admin/dashboard' element={<DashboardAdmin/>}/>
        <Route path='/admin/upload/product' element={<Product/>}/>
        <Route path='/admin/allCategory' element={<Category/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/' element={<Home />} />
        <Route path='/shoes' element={<Shoes />} />
        <Route path='/shirt' element={<Shirt />} />
      </Routes>
      {!isAdminPath && <Footer/>}
    </div>
  );
}

export default App;
