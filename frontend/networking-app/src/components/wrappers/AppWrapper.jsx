import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { login, logout, removeToken, setToken } from '../../redux/user'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast';

export default function AppWrapper(props) {

  const token = localStorage.getItem('accessToken');

  const dispatch = useDispatch();


  const checkAuth = async () => {
    const auth = await fetch('http://localhost:3000/auth/v1/refreshCheck',
    { method: 'POST',
      headers: { "content-type" : "application/json"},
      body: JSON.stringify({token})
    });

    

    const { id, email, first_name, profile_pic, error, expired } = await auth.json();

    if(expired) {
      throw expired
    }

    if(error) {
      throw error
    }

    return { id, email, first_name, profile_pic }
  }

  useEffect(() => {

    if(!token) {
      dispatch(removeToken())
      dispatch(logout());
      return
    } else {

      checkAuth()
      .then((data) => {
        dispatch(setToken());
        dispatch(
          login({
              id: data.id,
              email: data.email,
              first_name: data.first_name,
              profile_pic: data.profile_pic
          }))
      }).catch((error) => {
        toast.error(error, {
          style: {
            textAlign: 'center'
          }
        })
      })  
    }
  }, []);


  return (
    <main className='mt-24'>
        {props.children}
    </main>
  )
}
