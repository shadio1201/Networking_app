import React, { useState } from 'react'
import Spinner from '../lotties/spinner.json'
import toast from 'react-hot-toast'
import '../login.css';
import { Link } from 'react-router-dom';

export default function Login() {

    const [isNotVerified, setIsNotVerified] = useState(false);

    const [password, setPassword] = useState('');
  
    const [username, setUsername] = useState('');

    const [isPending, setIsPending] = useState(false);

      const toggle = async (e)=> {
        e.preventDefault();
        if(username == '' || password == '') return toast.error('Please fill out all fields!');
        setIsPending(true);
        const notification = toast.loading('Authenticating...', {
            iconTheme: {
                primary: '#45afa7',
                secondary: '#fff',
              },
        })

        const user_data = {
            username,
            password
        };

        setIsNotVerified(false);

        const res = await fetch('http://localhost:3000/auth/v1/login',
        { method: 'POST',
          headers: { "content-type" : "application/json"},
          body: JSON.stringify(user_data)
        });

        const { message, error, token, isNotVerified } = await res.json();

        if(error) {

            setPassword('');
            setIsPending(false)
            toast.error(error, {
                id: notification,
                iconTheme: {
                    primary: "#FF4B4B",
                    secondary: '#ffffff'
                  }
            })
            if(isNotVerified) {
                setIsNotVerified(isNotVerified);
            } 
        } else {
            window.localStorage.setItem('accessToken', token);
            setIsPending(false)
            toast.success(message, {
                id: notification
            })
        }

        
      }

  return (
    <section className='flex flex-col justify-center items-center'>
        <h2 className='text-center text-2xl font-bold'>Login</h2>
        <form
        className='grid grid-cols-1 mt-4 w-full sm:w-[500px] mb-8 px-8 gap-4'>

            <div className='flex flex-col'>
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
            {isNotVerified && <p className='text-center'>Please check your email for a verification link</p>}
            {isNotVerified && <p className='text-center'>Or <Link to="/" className='px-2 py-1 rounded-md bg-gradient-to-r from-[#06beb6] to-[#48b1bf]' href="#">click here</Link> to get a new link</p>}
        </form>
    </section>
  )
}
