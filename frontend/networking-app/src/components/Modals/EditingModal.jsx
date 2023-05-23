import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import '../../editingModal.css';

export default function EditingModal({ children, closeModal, user }) {

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
    className='fixed inset-0 h-screen w-full bg-white dark:bg-slate-900 z-50 flex flex-col'
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
                <input className='input-edit' placeholder='Enter first name' type="text" name="firstName" />
                </span>
                <span className='flex flex-col gap-1'>
                <label htmlFor="lastName">Last name</label>
                <input className='input-edit' placeholder='Enter last name' type="text" name="lastName" />
                </span>
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="title">Title { !user?.title && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input className='input-edit' placeholder='Enter title' type="text" name="title" />
                </span>
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="age">Age { !user?.age && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input className='input-edit dark:darkScheme lightScheme' placeholder='Enter age' type="date" name="age" />
                </span>
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="location">Location { !user?.location && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input className='input-edit' placeholder='Enter location' type="text" name="location" />
                </span>
            </div>
            <button className='updateBtn'>Update</button>
        </div>

    </motion.section>
  )
}
