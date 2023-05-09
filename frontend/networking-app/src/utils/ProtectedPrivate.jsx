import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user'
import { useNavigate } from 'react-router-dom'

export default function ProtectedPrivate({ children }) {
  
    const user = useSelector(selectUser);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) return navigate('/login', { replace: true });
      }, [])
  
    return children
}
