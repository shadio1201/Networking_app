const useUserUpdate = async (id, user_data) => {

    const res = await fetch(`http://localhost:3000/api/v1/users/update/${id}`, 
    { method: 'PUT',
    headers: { "content-type" : "application/json"},
    body: JSON.stringify(user_data)
    })

    const { success, error } = await res.json()

    if(error) {
        console.log('Error')
        return 
    }

    return { success }

}

export default useUserUpdate;