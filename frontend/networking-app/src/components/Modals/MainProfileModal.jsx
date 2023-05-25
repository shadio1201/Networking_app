import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { XMarkIcon, QuestionMarkCircleIcon, PhotoIcon } from '@heroicons/react/24/outline'
import '../../editingModal.css';
import useUserUpdate from '../hooks/useUserUpdate';
import toast from 'react-hot-toast'
import { login } from '../../redux/user'
import { useDispatch } from 'react-redux'

export default function MainProfileModal({ data, closeModal, user, update }) {

    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [title, setTitle] = useState('');
    const [birthday, setBirthday] = useState('');
    const [location, setLocation] = useState('');
    const [picture, setPicture] = useState(null)

    const imageUploader = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null)

    const [isPending, setIsPending] = useState(false);

    const addProfileImage = async (e) => {
        const notification = toast.loading('Uploading image..', {
          iconTheme: {
              primary: '#45afa7',
              secondary: '#fff',
            },
        })
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
          setPicture(readerEvent.target.result);
          setSelectedImage(readerEvent.target.result);
        }
  
        toast.success('Image uploaded', {
          id: notification
        })
      }

    let date = `${data.birthday}`.split('T')[0];

    useEffect(() => {
        setFirstname(data.first_name);
        setLastname(data.last_name);
        setTitle(data.titel);
        setBirthday(date)

    }, [])

    const updatedData = {
        first_name: (firstname ? firstname : null),
        last_name: (lastname ? lastname : null),
        profile_pic: picture,
        birthday: (birthday ? birthday : null),
        titel: (title ? title : null),
        location: (location ? location : null)
    }

    const ModalAnimations = {
        initial: {
            y: "100vh",
        },
        visible:  {
            y: "0",
            transition: {
                stifness: 120,
                damping: 30
            }
        },
        exit: {
            y: "100vh"
        }
    }

    const updateElems = async () => {
        setIsPending(true)
        const notification = toast.loading('Updating...', {
            iconTheme: {
                primary: '#45afa7',
                secondary: '#fff',
              },
          })
        await useUserUpdate(user.id, updatedData)
        update();
        dispatch(
        login({
            id: user.id,
            email: user.email,
            first_name: firstname,
            profile_pic: (selectedImage ? selectedImage : user.profile_pic)
        }))
        closeModal();
        toast.success('Update success', {
            id: notification
          })
        setIsPending(false)
    }

  return (
    <motion.section
    onClick={(e) => e.stopPropagation()}
    variants={ModalAnimations}
    initial="initial"
    animate="visible"
    className='fixed inset-0 h-screen w-full bg-white dark:bg-slate-900 z-50 grid grid-cols-1'
    id="modalGrid"
    >
        <div id="ModalHeader"
        className='flex justify-between items-center p-4 border-b-2'
        >
            <p className='text-2xl '>Edit Profile</p>
            <button
            onClick={closeModal}
            >
                <XMarkIcon className='h-8 w-8' />
            </button>
        </div>
        <div id="editingSection" className='p-4'>
            <p className='text-sm text-slate-600 dark:text-slate-200 flex gap-1 items-center mb-2'>Missing information <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon></p>
            <div className='grid grid-cols-1 gap-4'>
                <div id="imgContainer" className=' w-full h-fit flex justify-center'>
                    <div 
                        onClick={() => imageUploader.current.click()}
                        className='rounded-full overflow-hidden w-32 h-32 shadow-md shadow-black relative border-[#06beb6] border-2 flex justify-center group cursor-pointer'>
                        <span className='absolute text-sm bottom-0 font-bold text-slate-50 bg-[#06beb57c] w-full h-full hidden group-hover:flex justify-center items-center'><PhotoIcon className='h-12 w-12'/></span>
                        <img src={!selectedImage ? (data.profile_pic ? data.profile_pic : img_default) : selectedImage} className='object-cover w-full' />
                        <input type="file" accept='image/*' hidden ref={imageUploader} onChange={addProfileImage} />
                    </div>
                </div>
                <p className='text-sm text-center text-slate-600 dark:text-slate-200 mb-2'>Click to change image</p>

                <span className='flex flex-col gap-1'>
                <label htmlFor="firstName">First name { !data?.first_name && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={firstname} onChange={(e) => setFirstname(e.target.value)}
                className='input-edit' placeholder='Enter first name' type="text" name="firstName" />
                </span>
                <span className='flex flex-col gap-1'>
                <label htmlFor="lastName">Last name { !data?.last_name && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={lastname} onChange={(e) => setLastname(e.target.value)}
                className='input-edit' placeholder='Enter last name' type="text" name="lastName" />
                </span>
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="title">Title { !data?.titel && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={title} onChange={(e) => setTitle(e.target.value)}
                className='input-edit' placeholder='Enter title' type="text" name="title" />
                </span>
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="age">Age { !data?.birthday && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={birthday} onChange={(e) => setBirthday(e.target.value)}
                className='input-edit dark:darkScheme lightScheme' placeholder='Enter age' type="date" name="age" />
                </span>
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="location">Location { Object.keys(data.location).length == 0 && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={location} onChange={(e) => setLocation(e.target.value)}
                className='input-edit' placeholder='Enter location' type="text" name="location" />
                </span>
            </div>
        </div>
        <div className='p-4'>
        <button onClick={updateElems} className='updateBtn'>Update</button>
        </div>
    </motion.section>
  )
}
