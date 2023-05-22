import React, { useState, useEffect } from 'react'
import { BookmarkIcon as BookmarkUnsaved } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSaved } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

export default function SaveComponent({ user,  }) {

    const [hasSaved, setHasSaved] = useState(false);

    async function SaveUser(logged_in_user, user_id) {

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
    
      async function UnsaveUser(logged_in_user, user_id) {
    
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
      const saveProfile = () => {
        SaveUser(user.id, id);
        setHasLiked(true);
      }
    
      const unsaveProfile = () => {
        UnsaveUser(user.id, id);
        setHasLiked(false);
      }

/*       useEffect(() => {
        if(list?.includes(user?.id)) {
            setHasSaved(true);
        } else {
            setHasSaved(false);
        }
    }, []) */

    function testSaveFunction() {
      setHasSaved(state => state = !state)
      toast.success('Profile saved!')
    }

    function testUnSaveFunction() {
      setHasSaved(state => state = !state)
      toast.success('Profile removed!')
    }


  return (
    <button
    className={` absolute right-4 top-4 cursor-pointer flex gap-1 transition-all duration-150 text-slate-800 dark:text-slate-50`}
    onClick={hasSaved ? testSaveFunction : testUnSaveFunction}
    >
      {
        hasSaved ?
        <BookmarkSaved className="h-6 w-6"></BookmarkSaved>
        :
        <BookmarkUnsaved className="h-6 w-6"></BookmarkUnsaved>
      } 
    </button>
  )
}
