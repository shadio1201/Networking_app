import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user'

export default function Saved() {

    const user = useSelector(selectUser);

    useEffect(() => {

        setLoading(true);
    
        async function fetchUser() {
    
          const response = await fetch(`http://localhost:3000/api/v1/users/selected?id=${user?.id}`);
    
          const data = await response.json();
    
          console.log(data[0]);
          
          setProfile(() => data[0])
    
        }
        fetchUser()
    
        setLoading(false);
      }, [])

  return (
    <div>Saved</div>
  )
}
