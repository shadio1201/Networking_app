import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import usePost from '../components/hooks/usePost';

export default function Verify() {

  let { state } = useLocation();
  const navigate = useNavigate();

  async function sendConfirmation(user_email, user_id) {
    await usePost('http://localhost:3000/services/v1/email/confirmation', { email: user_email, id: user_id});
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
