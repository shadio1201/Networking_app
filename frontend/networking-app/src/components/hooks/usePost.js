const usePost = async (url, user_data) => {

    const res = await fetch(url, 
    { method: 'POST',
    credentials: 'include',
    headers: { "content-type" : "application/json"},
    body: JSON.stringify(user_data)
    })

    const data = await res.json();

    return data

}

export default usePost;