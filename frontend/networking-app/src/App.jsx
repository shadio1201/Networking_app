import { useState } from 'react'
import Home  from './pages/Home'
import User from './pages/User'
import './index.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
    </Routes>
  )
}

export default App
