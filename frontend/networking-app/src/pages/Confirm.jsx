import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import usePost from '../components/hooks/usePost';

export default function Confirm() {

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("id")

    async function verifyToken() {

        const data = await usePost('http://localhost:3000/services/v1/email/verify', { token });
    
        const { error } = data

        if(error) {
           return navigate('/failure', { state: { error }, replace: true });
        }
    
      }

      useEffect(() => {

        verifyToken();

        navigate('/succes', { replace: true });
  
      }, [])


  return (
    <div className='flex flex-col justify-center items-center px-8 h-screen -mt-24 cursor-default'>
        <h2 className='text-2xl font-bold mb-2'>Comfirming email...</h2>
        <p className='text-center mb-2'>Please wait</p>
    </div>
  )
}

