import { useState } from 'react'
import Home  from './pages/Home'
import User from './pages/User'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Wrapper from './components/wrappers/AppWrapper'
import { SidebarProvider } from './contexts/SidebarContext'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Succes from './pages/Succes'
import Verify from './pages/Verify'
import Confirm from './pages/Confirm'
import Verification from './pages/SentVerification'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { selectUser } from './redux/user'

function App() {

  const user = useSelector(selectUser);

  return (
    <>
    <Toaster position='bottom-center' />
    <SidebarProvider>
      <Navbar />
      <Sidebar />
    </SidebarProvider>
    <Wrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/succes" element={<Succes />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/account/verify" element={<Verification />} /> 
        <Route path="/account/confirm" element={<Confirm />} /> 
      </Routes>
    </Wrapper>
    </>
  )
}

export default App
