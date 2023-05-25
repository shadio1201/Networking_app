import React, { useState, useEffect } from 'react'
import { BookmarkIcon as BookmarkUnsaved } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSaved } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import usePost from '../components/hooks/usePost';

export default function SaveComponent({ user, id, list }) {

    const [hasSaved, setHasSaved] = useState(false);

    useEffect(() => {

      if(list?.users.includes(id)) {
        setHasSaved(true);
      } else {
        setHasSaved(false);
      }

    }, [])


      const saveProfile = async () => {
        await usePost('http://localhost:3000/services/v1/saveUser', { logged_in_user: user.id, user_id: id });
        setHasSaved(state => state = !state)
        toast.success('Saved', {
          iconTheme: {
            primary: '#45afa7',
            secondary: '#fff',
          },
        })
      }
    
      const unsaveProfile = async () => {
        await usePost('http://localhost:3000/services/v1/unsaveUser', { logged_in_user: user.id, user_id: id });
        setHasSaved(state => state = !state)
        toast.success('Unsaved', {
        iconTheme: {
            primary: '#45afa7',
            secondary: '#fff',
          },
      })
      }


  return (
    <>
    {
      user?.id != id && 
      <button
      className={` absolute right-4 top-4 cursor-pointer flex gap-1 transition-all duration-150 text-slate-800 dark:text-slate-50`}
      onClick={hasSaved ? unsaveProfile : saveProfile}
      >
        {
          hasSaved ?
          <BookmarkSaved className="h-6 w-6"></BookmarkSaved>
          :
          <BookmarkUnsaved className="h-6 w-6"></BookmarkUnsaved>
        } 
      </button>
    }
    </>
  )
}
