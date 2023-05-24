import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import '../../editingModal.css';

export default function DescriptionModal({ data, closeModal, user }) {

    const [text, setText] = useState('');

    const textInput = (e) => {

        let newText = e.target.value
        if(text.length >= 2600) {
            newText = newText.substring(0, 2600);
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
            <p className='text-2xl '>Edit Description</p>
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
                <label className='flex items-center gap-1' htmlFor="description">Description { !user?.description && <QuestionMarkCircleIcon className='w-4 h-4'></QuestionMarkCircleIcon> }</label>
                <textarea 
                value={text}
                onChange={textInput} 
                onPaste={(e) => e.clipboardData.getData('text/plain').slice(0, 2600)}
                className='textarea-edit h-64' placeholder='Create a description' type="textarea" name="description" />
                <p className={ text.length >= 2600 ? 'text-[#06beb6]' : '' }>{ text.length } / 2600</p>
                </span>
            </div>
        </div>
        <div className='p-4'>
        <button
        onClick={() => console.log(descriptionText.current.value)}
        className='updateBtn'>Update</button>
        </div>
    </motion.section>
  )
}
