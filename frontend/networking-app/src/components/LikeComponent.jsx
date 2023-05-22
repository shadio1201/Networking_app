import React, { useEffect, useState} from 'react'
import Lottie from 'react-lottie'
import likeEffect from '../lotties/like-particle.json'
import { HandThumbUpIcon as ThumpUpOutline } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as ThumpUpSolid} from '@heroicons/react/24/solid'

export default function LikeComponent({list, user, id}) {

  const [hasLiked, setHasLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(null);
  
  useEffect(() => {
      if(list?.includes(user?.id)) {
        setHasLiked(true);
      } else {
        setHasLiked(false);
      }
      setTotalLikes(list?.length)
  }, [])

  async function LikeUser(logged_in_user, user_id) {

    await fetch('http://localhost:3000/services/v1/like',
      { 
      method: 'POST',
      headers: { "content-type" : "application/json"},
      body: JSON.stringify({
        logged_in_user,
        user_id
      })
    })
  }

  async function dislikeUser(logged_in_user, user_id) {

    await fetch('http://localhost:3000/services/v1/dislike',
      { 
      method: 'POST',
      headers: { "content-type" : "application/json"},
      body: JSON.stringify({
        logged_in_user,
        user_id
      })
    })
  }

  // function to fetch api and like post 
  const likeProfile = () => {
    LikeUser(user.id, id);
    setTotalLikes((state) => state + 1);
    setHasLiked(true);
  }

  const dislikeProfile = () => {
    dislikeUser(user.id, id);
    setTotalLikes((state) => state - 1);
    setHasLiked(false);
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
    <div className='absolute bottom-4 right-4 overflow-hidden'>
    <div className='flex justify-center items-center z-10'>
      <span className=' absolute -top-[56px] bottom-0 pointer-events-none'>
        <Lottie 
          options={LikeAnimation}
          height={150}
          width={150} 
          isClickToPauseDisabled={true}
          isStopped={!hasLiked}
          />
      </span>
    {
    (user?.id === id || !user) ?
    <div 
    className={`relative z-20 p-2 text-[#06beb6] bg-slate-50 dark:bg-slate-800 rounded-full flex gap-1`}>
      {
      list ?
      new Intl.NumberFormat('da-US', { notation: 'compact'}).format(totalLikes)
      :
      0
      }
      <ThumpUpSolid className='h-6 w-6' />
    </div>
    :
    <button 
    onClick={hasLiked ? dislikeProfile : likeProfile}
    className={`relative z-20 p-2 bg-slate-50 dark:bg-slate-800 rounded-full cursor-pointer flex gap-1 transition-all duration-150 ${hasLiked ? 'bg-gradient-to-r from-[#06beb6] to-[#48b1bf] shadow-xl text-slate-50' : 'text-slate-800 dark:text-slate-50'}`}>
      {
      list ?
      new Intl.NumberFormat('da-US', { notation: 'compact'}).format(totalLikes)
      :
      0 + totalLikes
      }
      { hasLiked ? <ThumpUpSolid className='h-6 w-6' /> : <ThumpUpOutline className='h-6 w-6' />}
    </button>
    }
    </div>  
    </div>
  )
}
