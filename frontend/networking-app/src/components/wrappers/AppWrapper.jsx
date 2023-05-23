import React, { useEffect, useState } from 'react'
import { login, logout, removeToken, setToken } from '../../redux/user'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast';
import Loading from '../Loading'

export default function AppWrapper(props) {

  const dispatch = useDispatch();

  const [wait, setWaiting] = useState(true);

  useEffect(() => {
      fetch('http://localhost:3000/auth/v1/refresh',
        { method: 'POST',
        credentials: 'include',
        }).then(async data => {
          const { token, id, email, first_name, profile_pic, error, noToken } = await data.json();


          if(error) {
            dispatch(removeToken());
            dispatch(logout())
            if(!noToken) {
            toast.error(error, {
              style: {
                textAlign: 'center'
              }
            })
            setWaiting(false)
          }
            return
          }
          dispatch(
            login({
                id: id,
                email: email,
                first_name: first_name,
                profile_pic: profile_pic
            }))

            dispatch(setToken({ token }));
        })
        setWaiting(false)
  }, []);

  if(wait) return ( <Loading /> )

  return (
    <main className='mt-24 overflow-x-clip'>
        {props.children}
    </main>
  )
}
