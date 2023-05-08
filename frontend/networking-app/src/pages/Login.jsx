import React, { useState } from 'react'
import Spinner from '../lotties/spinner.json'
import toast from 'react-hot-toast'
import '../login.css';

export default function Login() {

    const [password, setPassword] = useState('');
  
    const [username, setUsername] = useState('');

    const [isPending, setIsPending] = useState(false);

      const toggle = (e)=> {
        e.preventDefault();
        setIsPending(true);
        const notification = toast.loading('Authenticating...', {
            iconTheme: {
                primary: '#45afa7',
                secondary: '#fff',
              },
        })
        
        setTimeout(()=> {
            setIsPending(false);
            toast.success('Successfully authenticated', {
                id: notification
            })
        }, 5000)
        /* if(error) {
            toast.error('Something went wrong!')
        } */
      }

  return (
    <section>
        <h2 className='text-center text-2xl font-bold'>Login</h2>
        <form
        className='grid grid-cols-1 md:grid-cols-2 mt-4 mb-8 px-8 gap-4'>

            <div className='flex flex-col md:col-span-2'>
                <label>Username</label>
                <input 
                onChange={(e) => setUsername(e.target.value)}
                value={username} required placeholder='Username' className={username ? 'input checkIfvalid' : 'input'} type="text" name="Username" id="Username" />
            </div>
            <div className='flex flex-col'>
                <label>Password</label>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password} required placeholder='Password' className={password ? 'input checkIfvalid' : 'input'} type="password" name="email" id="password" />
            </div>
            
            {!isPending && <button onClick={toggle} className='registerBtn'>Login</button>}
            {isPending && <button disabled className='registerBtn'><span className='btn-loading'></span></button>}
        </form>
    </section>
  )
}
