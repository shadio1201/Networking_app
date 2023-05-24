import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import '../../editingModal.css';

export default function EducationModal({ children, closeModal, edu }) {

    const [text, setText] = useState('');

    const textInput = (e) => {

        let newText = e.target.value
        if(text.length >= 1300) {
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
                <input className='input-edit' placeholder='Enter name of education' type="text" name="education" />
                </span>

                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="school">School { !edu?.school && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input className='input-edit' placeholder='Enter school' type="text" name="school" />
                </span>

                <p>Period of education</p>
                <span className='flex gap-4'>
                <span className='w-full'>
                <label className='flex items-center gap-1' htmlFor="startdate">Start date { !edu?.period[0] && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input className='input-edit dark:darkScheme lightScheme' placeholder='Start date' type="month" name="startdate" />
                </span>
                <span className='w-full'>
                <label className='flex items-center gap-1' htmlFor="enddate">End date { !edu?.period[1] && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input className='input-edit dark:darkScheme lightScheme' placeholder='End date' type="month" name="enddate" />
                </span>
                </span>

                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="location">Location { !edu?.location && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <input className='input-edit' placeholder='Enter location' type="text" name="location" />
                </span>
                
                
                <span className='flex flex-col gap-1'>
                <label className='flex items-center gap-1' htmlFor="description">Description { !edu?.description && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <textarea 
                value={text}
                onChange={textInput} 
                onPaste={(e) => e.clipboardData.getData('text/plain').slice(0, 1300)}
                className='textarea-edit' placeholder='Describe your education' type="textarea" name="description" />
                <p className={ text.length >= 1300 ? 'text-[#06beb6]' : '' }>{ text.length } / 1300</p>
                </span>

                {/* Upload pdf til anbefaling */}

            </div>
        </div>
        <div className='p-4'>
        <button className='updateBtn'>Update</button>
        </div>
    </motion.section>
  )
}
