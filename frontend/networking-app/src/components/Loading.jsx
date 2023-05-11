import React from 'react'
import Lottie from 'react-lottie'
import SuccesAnimation from '../lotties/search-clean.json'

const options = {
    loop: true,
    autoplay: true, 
    animationData: SuccesAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

export default function Loading() {
  return (
    <div className='bg-slate-50 dark:bg-slate-800 flex flex-col justify-center items-center h-screen w-full fixed'>
        <Lottie options={options}
              height={250}
              width={250} 
              isClickToPauseDisabled={true}
              />

    </div>
  )
}
