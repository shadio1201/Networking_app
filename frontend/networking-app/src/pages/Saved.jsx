import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user'
import img_default from '../../assets/imgs/DefaultPicture.jpg'
import { NavLink } from 'react-router-dom'
import { ArrowUturnRightIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Lottie from 'react-lottie'
import LoadingAnimation from '../lotties/search-clean.json'
import { motion, AnimatePresence, useIsPresent } from 'framer-motion'

export default function Saved() {

  const user = useSelector(selectUser);
  const [profiles, setProfiles] = useState([])

  useEffect(() => {

    setLoading(true);

    async function fetchUser() {

      const response = await fetch(`http://192.168.1.19:3000/api/v1/users/selected?id=${user?.id}`);

      const data = await response.json();

      if(data.error) return

      console.log(data);
      
      setProfiles(() => data)

    }
    fetchUser()

    setLoading(false);

  }, [])

  const options = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };



    const [query, setQuery] = useState("");

      const filteredList = profiles.filter(item => {
        let name = item.first_name + ' ' + item.last_name
        return name.toLowerCase().includes(query.toLowerCase()) || item.titel?.toLowerCase().includes(query.toLowerCase());
      })


    const [loading, setLoading] = useState(false);






  if(loading) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center -mt-24'>
      <Lottie options={options}
              height={250}
              width={250} />
      <p>Loading saved profiles...</p>
      </div>
    )
  }

  const IsPresent = useIsPresent();

  const listAnimations = {
    initial: {
      opacity: 0,
      y: -5
    },
    enter:  {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -5
    },
  }

  ///////////////////////////////////////////////////
  // Look up how to make swipe remove with react
  ///////////////////////////////////////////////////

  return (
    <>
      { /* Search field */ }
      <div className='flex relative justify-between items-center w-full p-4'>
        <input value={query} onChange={ e => setQuery(e.target.value)}
        type="text" spellCheck="false" placeholder='Search profiles..' className='w-full h-full p-4 rounded-md bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md focus-within:outline-1 focus-within:outline-slate-700/80 dark:focus-within:outline-white' />
        {
          query.length ?
          <XMarkIcon onClick={() => {
            setQuery("")
          }} className='h-6 w-6 absolute right-8' />
          :
          <MagnifyingGlassIcon className='h-6 w-6 absolute right-8'  />
        }
        
      </div>
      { /* Userlist from saved profiles */
      filteredList &&
      <ul id="savedProfiles" className="w-full h-fit flex flex-col items-center justify-center px-4 gap-4">
        <AnimatePresence>
      {
        filteredList.length <= 0 ?
        <motion.li
        variants={listAnimations}
        initial="initial"
        animate="enter"
        exit="exit"
        >No matches..</motion.li>
        :
        filteredList.map((profile, id) => (
          <motion.li
          style={{ position: IsPresent ? 'static' : 'absolute'}}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          layout
          transition={{ stiffness: 700, damping: 40 }}
          className='w-full' key={id}>
          <NavLink to={`/user/${profile.user_id}`} className='flex p-4 rounded-md justify-start items-center bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md '>
            <img src={ profile.profile_pic ? profile.profile_pic : img_default} className='h-12 w-12 rounded-full mr-4 object-cover'/>
            <span className='text-sm'>
            <p className='text-lg'>{ profile.first_name } { profile.last_name }</p>
            <p>{ profile.titel }</p>
            </span>
            <ArrowUturnRightIcon className="h-6 w-6 ml-auto" />
          </NavLink>
        </motion.li>
        ))
      }
      </AnimatePresence>
      </ul>
    }
    </>

  )
}