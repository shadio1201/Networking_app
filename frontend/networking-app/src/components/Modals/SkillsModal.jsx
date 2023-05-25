import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import '../../editingModal.css';
import toast from 'react-hot-toast'
import useUserUpdate from '../hooks/useUserUpdate';

export default function SkillsModal({ user, closeModal, skills, update }) {

    const skillInput = useRef()
    const [skill, setSkill] = useState('')
    let [list, setList] = useState([...skills])

    const [isPending, setIsPending] = useState(false);

    const updatedData = {
        skills: {"list": list},
    }

    const addToList = (input) => {
        list = [...list];
        if(input == '') return
        if(list.includes(input.toUpperCase())) return toast.error('Skill already added', {
            duration: 2000,
            iconTheme: {
                primary: '#45afa7',
                secondary: '#fff',
              }
        })
        list.push(input.toUpperCase());
        setList(list);

        setSkill('');
        skillInput.current.focus();
    }

    const removeFromList = (key) => {
        list = [...list].filter((item, i) => {
            return item.toLowerCase() !== key.toLowerCase()
        })
        setList(list)
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
            <p className='text-2xl '>Edit Skills</p>
            <button
            onClick={closeModal}
            >
                <XMarkIcon className='h-8 w-8' />
            </button>
        </div>
        <div id="editingSection" className='p-4'>
            <p className='text-sm text-slate-600 dark:text-slate-200 flex gap-1 items-center mb-2'>* Required Field</p>
            <div className='grid grid-cols-1 gap-4'>
                <span className='flex flex-col gap-1'>
                <label htmlFor="skill">Skill*</label>
                <span className='w-full flex gap-4'>
                <input 
                onKeyUp={(e) => {
                    if(e.key === 'Enter') {
                        addToList(skill)
                    }
                }}
                ref={skillInput} value={skill} onChange={(e) => setSkill(e.target.value)} className='input-edit' placeholder='Enter skill' type="text" name="skill" />
                <button onClick={() => addToList(skill)} className='px-8 bg-[#06beb6] rounded-lg border-2 text-white'>Add</button>
                </span>
                </span>
                <div id="skillList" className='mt-4 h-fit flex flex-1 flex-wrap gap-2'>
                {
                    list.length ?
                    list.map((item, key) => (
                        <span key={key} onClick={() => removeFromList(item)} className='bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-50 px-2 py-1 rounded-md flex items-center justify-center gap-1 cursor-pointer'>
                            { item } <XMarkIcon className='h-6 w-6' />
                        </span>
                    ))
                    :
                    <p className='text-sm text-slate-600 dark:text-slate-200 flex gap-1 items-center mb-2'>No skills</p>
                }

                </div>
            </div>
        </div>
        <div className='p-4'>
        <button
        onClick={updateElems}
        className='updateBtn'>Save</button>
        </div>
    </motion.section>
  )
}
