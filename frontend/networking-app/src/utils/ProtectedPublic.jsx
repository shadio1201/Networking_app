import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user'
import { useNavigate } from 'react-router-dom'

export default function ProtectedPublic({ children }) {
  
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    

    useEffect(() => {
        if(user) return navigate(`/user/${user.id}`, { replace: true });
      }, [])

  
    return children;
}
