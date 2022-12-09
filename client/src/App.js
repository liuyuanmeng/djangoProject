
import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageNavbar from './components/common/PageNavbar'
import Home from './components/jewelleries/Home'
import Category from './components/jewelleries/Categories'
import JewelleryShow from './components/jewelleries/JewelleryShow'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Account from './components/user/Account'
import Like from './components/user/Wishlist'
import NotFound from './components/common/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <PageNavbar />
      <Routes>
        <Route path="/jewelleries" element={<Home />} />
        <Route path="/jewelleries/:id" element={<JewelleryShow />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/like" element={<Like />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
