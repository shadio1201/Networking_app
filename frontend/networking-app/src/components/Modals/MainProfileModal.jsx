import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import '../../editingModal.css';
import useUserUpdate from '../hooks/useUserUpdate';

export default function MainProfileModal({ data, closeModal, user }) {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [title, setTitle] = useState('');
    const [birthday, setBirthday] = useState('');
    const [location, setLocation] = useState('');
    const [picture, setPicture] = useState(null)

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
                <span className='flex flex-col gap-1'>
                <label htmlFor="firstName">First name</label>
                <input 
                value={firstname} onChange={(e) => setFirstname(e.target.value)}
                className='input-edit' placeholder='Enter first name' type="text" name="firstName" />
                </span>
                <span className='flex flex-col gap-1'>
                <label htmlFor="lastName">Last name</label>
                <input 
                value={lastname} onChange={(e) => setLastname(e.target.value)}
                className='input-edit' placeholder='Enter last name' type="text" name="lastName" />
                </span>
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="title">Title { !user?.title && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={title} onChange={(e) => setTitle(e.target.value)}
                className='input-edit' placeholder='Enter title' type="text" name="title" />
                </span>
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="age">Age { !user?.age && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={birthday} onChange={(e) => setBirthday(e.target.value)}
                className='input-edit dark:darkScheme lightScheme' placeholder='Enter age' type="date" name="age" />
                </span>
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="location">Location { !user?.location && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={location} onChange={(e) => setLocation(e.target.value)}
                className='input-edit' placeholder='Enter location' type="text" name="location" />
                </span>
            </div>
        </div>
        <div className='p-4'>
        <button onClick={() => useUserUpdate(user.id, updatedData)} className='updateBtn'>Update</button>
        </div>
    </motion.section>
  )
}
