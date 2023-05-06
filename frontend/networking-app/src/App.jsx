import { useState } from 'react'
import Home  from './pages/Home'
import User from './pages/User'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Wrapper from './components/wrappers/AppWrapper'
import { SidebarProvider } from './contexts/SidebarContext'
import './index.css'
import { Route, Routes } from 'react-router-dom'

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
        <Route path="/user" element={<User />} /> 
      </Routes>
    </Wrapper>
    </>
  )
}

export default App
