import React from 'react'

export default function SaveComponent({ user,  }) {

    async function SaveUser(logged_in_user, user_id) {

    const [hasSaved, setHasSaved] = useState(false);

    useEffect(() => {
        if(list?.includes(user?.id)) {
            setHasSaved(true);
        } else {
            setHasSaved(false);
        }
    }, [])

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

  return (
    <button>
        
    </button>
  )
}
