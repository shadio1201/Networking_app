import React, { useRef, useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import '../signup.css';
import Button from '../components/base/button.jsx';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import usePost from '../components/hooks/usePost';

export default function Signup() {

  const navigate = useNavigate();

  const inputEmail = useRef();
  const inputUsername = useRef();
  const inputPassword = useRef();

  // Password confirmation
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [picture, setPicture] = useState(null)
  
  const imageUploader = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null)

  const [isPending, setIsPending] = useState(false);

  const form = new FormData();

  const addProfileImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setPicture(readerEvent.target.result);
      setSelectedImage(readerEvent.target.result);
    }
    toast.success('Profile picture uploaded!', {
      iconTheme: {
        primary: '#45afa7',
        secondary: '#fff',
      },
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user_data = {
      username,
      email,
      password,
      firstname,
      lastname,
      birthday,
    }

    if(isPending) return;

    if(Object.values(user_data).some(x => x == '')) return toast.error('Please fill all fields');
    
    if(password != confirmpassword) {
      toast.error('Passwords dont match');
      return
    }

    const passValidator = /[a-zA-Z0-9]/g;

    if(!passValidator.test(password) || password.length < 8) {
      inputPassword.current.focus();
      toast.error('Password is not matching the minimum requirements');
      return
    }

    setIsPending(true)

    const notification = toast.loading('Signing up...', {
      iconTheme: {
          primary: '#45afa7',
          secondary: '#fff',
        },
    })

    const data = await usePost('http://192.168.1.19:3000/api/v1/users/postUser', user_data);
    
    const { id, error, error_type } = data;

    if(error) {

      switch(error_type) {
        case 'email':
          setEmail('');
          inputEmail.current.focus();
          break;
        case 'username':
          setUsername('');
          inputUsername.current.focus();
          break;
        default:
          break;
      }

      setIsPending(false)
      toast.error(error, {
        id: notification,
        iconTheme: {
          primary: "#FF4B4B",
          secondary: '#ffffff'
        }
      })

      return
    }

    if(picture) {
    await usePost('http://192.168.1.19:3000/api/v1/users/picture', { id, picture });
    }

    toast.success('Success', {
      id: notification
    })

    setIsPending(false)

    navigate('/account/verify', { state: { email, id }, replace: true });

  }


  return (
    <section>
        <h2 className='text-center text-2xl font-bold'>Create User</h2>
        <form
        className='grid grid-cols-1 md:grid-cols-2 mt-4 mb-8 px-8 gap-4'>

          <div id="uploadProfilePic" className='flex flex-col gap-2- items-center justify-center md:col-span-2 py-2'>
                <h3 className='font-bold mb-2'>Profile Picture</h3>
                  <div 
                  onClick={() => imageUploader.current.click()}
                  className={selectedImage ? 'hide' : 'uploadButton'}>
                    {!selectedImage && 
                      <span className='flex flex-col justify-center items-center'>
                      Upload
                      <PhotoIcon className='h-12 w-12' />
                      </span>
                    }
                  </div>
                  <img onClick={() => 
                    imageUploader.current.click()} className={selectedImage ? 'imagePreview' : 'hide'} src={selectedImage} />
                <input type="file" accept='image/*' hidden ref={imageUploader} onChange={addProfileImage} />
            </div>


            <div className='flex flex-col md:col-span-2'>
                <label>Username</label>
                <input 
                onChange={(e) => setUsername(e.target.value)}
                value={username} ref={inputUsername} required placeholder='Username' className={username ? 'input checkIfvalid' : 'input'} type="text" name="Username" id="Username" />
            </div>
            <div className='flex flex-col md:col-span-2'>
                <label>Email</label>
                <input 
                onChange={(e) => setEmail(e.target.value)}
                value={email} ref={inputEmail} required placeholder='Email' className={email ? 'input checkIfvalid' : 'input'} type="email" name="email" id="email" />
            </div>
            <div className='flex flex-col'>
                <label>Password</label>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password} ref={inputPassword} required placeholder='Password' className={password ? 'input checkIfvalid' : 'input'} type="password" name="email" id="password" />
                <p className='text-sm text-slate-600 dark:text-slate-200 flex gap-1 items-center my-2'>Minimum password requirements: <br /> 8 characters long, one uppercase letter, one lowercase letter, one number</p>
            </div>
            <div className='flex flex-col'>
                <label>Confirm Password</label>
                <input 
                onChange={(e) => setConfirmpassword(e.target.value)}
                value={confirmpassword} required placeholder='Confirm password' className={confirmpassword ? 'input checkIfvalid' : 'input'} type="password" name="email" id="password_confirm" />
            </div>
            <div className='flex flex-col'>
                <label>First name</label>
                <input 
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname} required placeholder='First name' className={firstname ? 'input checkIfvalid' : 'input'} type="text" max="20" name="firstname" id="firstname" />
            </div>
            <div className='flex flex-col'>
                <label>Last name</label>
                <input 
                onChange={(e) => setLastname(e.target.value)}
                value={lastname} required placeholder='Last name' className={lastname ? 'input checkIfvalid' : 'input'} type="text" max="20" name="lastname" id="lastname" />
            </div>
            <div className='flex flex-col'>
                <label>Birthday</label>
                <input 
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday} required className={birthday ? 'input checkIfvalid' : 'input'} type="date" name="birthday" id="birthday" />
            </div>
            
            {!isPending && <button onClick={handleSubmit} className='registerBtn'>Register</button>}
            {isPending && <button disabled className='registerBtn'>Creating user...</button>}
        </form>

    </section>
  )
}
