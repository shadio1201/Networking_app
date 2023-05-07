import { useState } from 'react'
import Home  from './pages/Home'
import User from './pages/User'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Wrapper from './components/wrappers/AppWrapper'
import { SidebarProvider } from './contexts/SidebarContext'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Succes from './pages/Succes'

function App() {
  return (
    <>
    <SidebarProvider>
      <Navbar />
      <Sidebar />
    </SidebarProvider>
    <Wrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/succes" element={<Succes />} /> 
      </Routes>
    </Wrapper>
    </>
  )
}

export default App
