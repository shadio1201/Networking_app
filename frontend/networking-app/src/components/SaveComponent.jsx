import React, { useState, useEffect } from 'react'
import { BookmarkIcon as BookmarkUnsaved } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSaved } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

export default function SaveComponent({ user, id, list }) {

    const [hasSaved, setHasSaved] = useState(false);

    useEffect(() => {

      if(list?.users.includes(id)) {
        setHasSaved(true);
      } else {
        setHasSaved(false);
      }

    }, [])

    async function SaveUser(logged_in_user, user_id) {

      await fetch('http://localhost:3000/services/v1/saveUser',
          { 
          method: 'POST',
          headers: { "content-type" : "application/json"},
          body: JSON.stringify({
            logged_in_user,
            user_id
          })
        })
      }
    
      async function UnsaveUser(logged_in_user, user_id) {
    
        await fetch('http://localhost:3000/services/v1/unsaveUser',
          { 
          method: 'POST',
          headers: { "content-type" : "application/json"},
          body: JSON.stringify({
            logged_in_user,
            user_id
          })
        })
      }
      const saveProfile = () => {
        
        setHasLiked(true);
      }
    
      const unsaveProfile = () => {
        setHasLiked(false);
      }

    function testSaveFunction() {
      SaveUser(user.id, id);
      setHasSaved(state => state = !state)
      toast.success('Saved', {
        iconTheme: {
            primary: '#45afa7',
            secondary: '#fff',
          },
    })
    }

    function testUnSaveFunction() {
      UnsaveUser(user.id, id);
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
      onClick={hasSaved ? testUnSaveFunction : testSaveFunction}
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
