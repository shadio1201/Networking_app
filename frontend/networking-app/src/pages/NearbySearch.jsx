import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user'
import img_default from '../../assets/imgs/DefaultPicture.jpg'
import { NavLink } from 'react-router-dom'
import { } from '@heroicons/react/24/outline'
import Lottie from 'react-lottie'
import LoadingAnimation from '../lotties/search-clean.json'
import { motion, AnimatePresence, useIsPresent } from 'framer-motion'
import io from 'socket.io-client';

export default function NearbySearch() {

  const user = useSelector(selectUser);
  const [profiles, setProfiles] = useState([])

  /* useEffect(() => {
    const socket = io('http://localhost:3200'); // Replace with your server URL
    
    const sendLocation = (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit('geolocation', { userId: user?.id, latitude, longitude });
    };

    const handleLocationChange = (position) => {
      // Access the geolocation API and send the updated location to the server
      sendLocation(position);
    };

    const handleError = (error) => {
      console.error('Error accessing geolocation:', error);
    };

    // Request geolocation updates when the component mounts
    navigator.geolocation.watchPosition(handleLocationChange, handleError);

    // Clean up the geolocation watcher when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(handleLocationChange);
      socket.close();
    };
  }, []); */


  function showPosition(position) {
    setLat(position.coords.latitude)
    setLong(position.coords.longitude)
    
  }

  const options = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const [loading, setLoading] = useState(false);

  if(loading) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center -mt-24'>
      <Lottie options={options}
              height={250}
              width={250} />
      <p>Searching for nearby profiles...</p>
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
      <h2 className='text-center'>Nearby Search - under development...</h2>
    </>

  )
}