import React, { useState} from 'react'
import Lottie from 'react-lottie'
import likeEffect from '../lotties/like-particle.json'



export default function LikeComponent({list, user, id}) {

    const [like, setLike] = useState(false);

const likeProfile = () => {
  setLike((state) => state = !state);
}

    const LikeAnimation = {
        loop: false,
        autoplay: false, 
        animationData: likeEffect,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

  return (
    <div className='absolute bottom-4 right-4'>
    <div className='flex justify-center items-center z-10'>
      <span className=' absolute -top-[56px] bottom-0 pointer-events-none'>
        <Lottie 
          options={LikeAnimation}
          height={150}
          width={150} 
          isClickToPauseDisabled={true}
          isStopped={!like}
          />
      </span>
    {
    (user?.id === id || !user) ?
    <div 
    className={`relative z-20 p-2 text-[#06beb6] bg-slate-50 dark:bg-slate-800 rounded-full flex gap-1`}>
      {
      list ?
      new Intl.NumberFormat('da-US', { notation: 'compact'}).format(list.length)
      :
      0
      }
      <ThumpUpSolid className='h-6 w-6' />
    </div>
    :
    <button 
    onClick={likeProfile}
    className={`relative z-20 p-2 bg-slate-50 dark:bg-slate-800 rounded-full cursor-pointer flex gap-1 transition-all duration-150 ${like ? 'bg-gradient-to-r from-[#06beb6] to-[#48b1bf] shadow-xl text-slate-50' : 'text-slate-800 dark:text-slate-50'}`}>
      {
      list ?
      new Intl.NumberFormat('da-US', { notation: 'compact'}).format(list.length)
      :
      0
      }
      { like ? <ThumpUpSolid className='h-6 w-6' /> : <ThumpUpOutline className='h-6 w-6' />}
    </button>
    }
    </div>  
    </div>
  )
}
