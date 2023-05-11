import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Verify() {

  let { state } = useLocation();
  const navigate = useNavigate();

  async function sendConfirmation(user_email, user_id) {

    await fetch('http://localhost:3000/services/v1/email/confirmation',
      { method: 'POST',
      headers: { "content-type" : "application/json"},
      body: JSON.stringify({
        email: user_email, 
        id: user_id
      })
    })


  }

  useEffect(() => {
    if(!state) return navigate('/');

    const { email, id } = state;

    sendConfirmation(email, id);
    navigate('/verify', { state: { email }, replace: true });


  }, [])

  return (
    <div className='flex flex-col justify-center items-center px-8 cursor-default'>
      Sending...
    </div>
  )
}
