import React from 'react'
import Lottie from 'react-lottie'
import SuccesAnimation from '../lotties/success-clean.json'

export default function Succes() {

  const options = {
    loop: false,
    autoplay: true, 
    animationData: SuccesAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className='flex flex-col justify-center items-center px-8'>
        <Lottie options={options}
              height={250}
              width={250} />
        <h2 className='text-2xl font-bold mb-2'>Welcome on board!</h2>
        <p className='text-center mb-2'>Your account is now verified</p>

        <button className='flex justify-center px-4 py-4 rounded-md border-2 bg-gradient-to-r from-[#06beb6] to-[#48b1bf] w-full font-bold mt-8'>Go to your profile</button>
    </div>
  )
}
