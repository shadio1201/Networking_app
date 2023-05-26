import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import '../../editingModal.css';
import toast from 'react-hot-toast'

export default function EducationModal({ user, closeModal, edu, update }) {

    const [education, setEducation] = useState('');
    const [school, setSchool] = useState('');
    const [period, setPeriod] = useState(['', '']);
    const [location, setLocation] = useState('');

    const [isPending, setIsPending] = useState(false);

    const [text, setText] = useState('');

    const textInput = (e) => {

        let newText = e.target.value
        if(text?.length >= 1300) {
            newText = newText.substring(0, 1300);
        }
        setText(newText)
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

    const updatedData = {
        education: (education ? education : null),
        school: (school ? school : null),
        period: (period.length ? period : null),
        location: (location ? location : null),
        description: (text ? text : null)
    }

    const updateElems = async () => {
        setIsPending(true)
        const notification = toast.loading('Updating...', {
            iconTheme: {
                primary: '#45afa7',
                secondary: '#fff',
              },
          })
        await fetch(`http://localhost:3000/api/v1/users/update/educations/${user.id}`, 
          { method: 'PUT',
          headers: { "content-type" : "application/json"},
          body: JSON.stringify(updatedData)
        })
        update();
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
    className='fixed inset-0 h-screen w-full overflow-y-scroll pb-8 bg-white dark:bg-slate-900 z-50 grid grid-cols-1'
    id="modalGrid"
    >
        <div id="ModalHeader"
        className='flex justify-between items-center p-4 border-b-2'
        >
            <p className='text-2xl '>Edit Education</p>
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
                <label className='flex items-center gap-1' htmlFor="education">Education name { !edu?.education && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={education} onChange={(e) => setEducation(e.target.value)}
                className='input-edit' placeholder='Enter name of education' type="text" name="education" />
                </span>

                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="school">School { !edu?.school && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={school} onChange={(e) => setSchool(e.target.value)}
                className='input-edit' placeholder='Enter school' type="text" name="school" />
                </span>

                <p>Period of education</p>
                <span className='flex gap-4'>
                <span className='w-full'>
                <label className='flex items-center gap-1' htmlFor="startdate">Start date { !edu?.period[0] && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                onChange={(e) => setPeriod([new Intl.DateTimeFormat('en-US', { year: "numeric", month: "short" }).format(new Date(e.target.value)), period[1]])}
                className='input-edit dark:darkScheme lightScheme' placeholder='Start date' type="month" name="startdate" />
                </span>
                <span className='w-full'>
                <label className='flex items-center gap-1' htmlFor="enddate">End date { !edu?.period[1] && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                onChange={(e) => setPeriod([period[0], new Intl.DateTimeFormat('en-US', { year: "numeric", month: "short" }).format(new Date(e.target.value))])}
                className='input-edit dark:darkScheme lightScheme' placeholder='End date' type="month" name="enddate" />
                </span>
                </span>

                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="location">Location { !edu?.location && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input 
                value={location} onChange={(e) => setLocation(e.target.value)}
                className='input-edit' placeholder='Enter location' type="text" name="location" />
                </span>
                
                
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="description">Description { !edu?.description && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <textarea 
                value={text}
                onChange={textInput} 
                onPaste={(e) => e.clipboardData.getData('text/plain').slice(0, 1300)}
                className='textarea-edit h-32' placeholder='Describe your education' type="textarea" name="description" />
                <p className={ text?.length >= 1300 ? 'text-[#06beb6]' : '' }>{ text?.length ? text.length : 0 } / 1300</p>
                </span>

                {/* Upload pdf til anbefaling */}

            </div>
        </div>
        <div className='p-4'>
        <button 
        onClick={ updateElems } 
        className='updateBtn'>Update</button>
        </div>
    </motion.section>
  )
}
