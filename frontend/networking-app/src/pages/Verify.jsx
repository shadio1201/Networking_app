import React, { useEffect } from 'react'
import Lottie from 'react-lottie'
import SuccesAnimation from '../lotties/email-clean.json'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Verify() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const options = {
    loop: true,
    autoplay: true, 
    animationData: SuccesAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
      if(!state) {
        navigate('/');
      }
      const { email, id } = state;
      if(email === null || id === null) {
        navigate('/');
      }
      console.log(email, id)
  }, [])

  return (
    <div className='flex flex-col justify-center items-center px-8 cursor-default'>
        <Lottie options={options}
              height={250}
              width={250} 
              isClickToPauseDisabled={true}
              />
        <h2 className='text-2xl font-bold mb-2'>Verify your email</h2>
        <p className='text-center mb-2'>We have sent a confirmation link to:</p>
        <p className='text-center font-bold'>{ email }</p>
    </div>
  )
}
