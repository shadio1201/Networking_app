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
import ProtectedPrivate from './utils/ProtectedPrivate'
import ProtectedPublic from './utils/ProtectedPublic'

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

        // Public routes
        <Route exact path="/" element={
          <ProtectedPublic>
            <Home />
          </ProtectedPublic>
        } />
        <Route path="/login" element={
          <ProtectedPublic>
            <Login />
          </ProtectedPublic>
        } />
        <Route path="/user/signup" element={
          <ProtectedPublic>
            <Signup />
          </ProtectedPublic>
        } />
        <Route path="/succes" element={
          <ProtectedPublic>
            <Succes />
          </ProtectedPublic>
        } />
        <Route path="/verify" element={
          <ProtectedPublic>
            <Verify />
          </ProtectedPublic>
        } />        
        <Route path="/user/:id" element={<User />} />

        // Private routes
        <Route path="/test" element={
          <ProtectedPrivate>
            <Home />
          </ProtectedPrivate>
        } />  
        // Util routes
        // is already protected by code in component
        <Route path="/account/verify" element={<Verification />} /> 
        <Route path="/account/confirm" element={<Confirm />} /> 
      </Routes>
    </Wrapper>
    </>
  )
}

export default App
