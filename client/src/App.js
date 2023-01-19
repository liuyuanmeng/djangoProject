import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageNavbar from './components/common/PageNavbar'
import Category from './components/jewelleries/Categories'
import JewelleryShow from './components/jewelleries/JewelleryShow'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Account from './components/user/Account'
import Favourite from './components/user/Favourite-List'
import NotFound from './components/common/NotFound'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Home from './components/jewelleries/Home'
import Landing from './components/jewelleries/Landing'

const App = () => {
  return (
    // <ShoppingCartProvider>
    <BrowserRouter>
      <PageNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jewelleries" element={<Home />} />
        <Route path="/jewelleries/:id" element={<JewelleryShow />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    // </ShoppingCartProvider>
  )
}

export default App
