import React, { useEffect, useState, useRef } from 'react'
import img_default from '../../assets/imgs/DefaultPicture.jpg'
import { PlusIcon, PencilIcon, PhoneIcon, XMarkIcon} from '@heroicons/react/24/solid'
import AccordionExp from '../components/AccordionExp'
import EduAccordion from '../components/EduAccordion'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user'
import MainProfileModal from '../components/Modals/MainProfileModal'
import DescriptionModal from '../components/Modals/DescriptionModal'
import ExperienceModal from '../components/Modals/ExperienceModal'
import EducationModal from '../components/Modals/EducationModal'
import SkillsModal from '../components/Modals/SkillsModal'
import { AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import useFetch from '../components/hooks/useFetch'

export default function EditUser() {

    const [loading, setLoading] = useState(false);
    const user = useSelector(selectUser);
    const [profile, setProfile] = useState(null)
    const [update, setUpdate] = useState(false);


  
    const imageUploader = useRef(null);
    const [picture, setPicture] = useState(null)

    const [selectedImage, setSelectedImage] = useState(null)

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

      await fetch('http://localhost:3000/api/v1/users/picture',
        { method: 'POST',
          headers: { "content-type" : "application/json"},
          body: JSON.stringify({
            id: user.id,
            picture
          })
        })

      toast.success('Image uploaded', {
        id: notification
      })
    }

    const [modalOpen, setModalOpen] = useState('')

    const close = () => setModalOpen('');

    function calcAge(date) {
        const ageDif = new Date() - date.getTime();
        const currentAge = new Date(ageDif);
        return Math.abs(currentAge.getUTCFullYear() - 1970);
      }

      async function fetchUser() {
  
        const data = await useFetch(`http://localhost:3000/api/v1/users/${user.id}`)
    
        setProfile(() => data[0])
  
      }

    useEffect(() => {

        setLoading(true);
    

        fetchUser()
    
        setLoading(false);
      }, [update])

      // Make change img function
      const clearExperience = async () => {
        await useFetch(`http://localhost:3000/api/v1/users/update/experience/clear/${user.id}`)
        fetchUser();
      }

      const clearEducations = async () => {
        await useFetch(`http://localhost:3000/api/v1/users/update/educations/clear/${user.id}`)
        fetchUser();
      }

  return (
    <>
    { profile &&
    <section id='profile' className=' m-4 mt-32 flex flex-col gap-4'>
      <div className='flex flex-col gap-4 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md p-4 pt-0 rounded-xl relative'>
        <div id="imgContainer" className=' w-full h-16 flex justify-center'>
          <div className='rounded-full overflow-hidden w-32 h-32 shadow-md shadow-black -translate-y-16 relative flex justify-center'>
            <img src={profile.profile_pic ? profile.profile_pic : img_default} className='object-cover w-full' />
          </div>
        </div>
        <div id="infoHeader" className='flex flex-col justify-center items-start'>
          <h1 className="text-[1.5rem]">{profile.first_name} {profile.last_name}</h1>
          {
            profile.titel ?
            <h2 className="text-[1rem]">{profile.titel}</h2>
            :
            <h2 className="text-[1rem] text-slate-300 dark:text-slate-500">Add title</h2>
          }

          <span className='mt-2 text-slate-600 dark:text-slate-200'>
          <p className="text-[14px]">
            { calcAge(new Date(profile.birthday))} år
          </p>
          {
            Object.keys(profile.location).length != 0 &&
            <p className="text-[14px]">{profile.location.city}, {profile.location.area}, {profile.location.country}</p>
          }
          </span>
        </div>
        <button
        onClick={() => setModalOpen('1')}
        className={` absolute right-4 top-4 cursor-pointer flex gap-1 transition-all duration-150 text-slate-800 dark:text-slate-50`}
        >
            <PencilIcon className='h-6 w-6' />
        </button>
      </div>

      {
      profile.description ?
      <article className=' grid grid-cols-1 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Description</h2>
        <span className='text-slate-600 dark:text-slate-200 flex justify-between items-start'>
        {profile.description}
        <button
        onClick={() => setModalOpen('2')}
        >
            <PencilIcon className='h-6 w-6' />
        </button>
      </span>
      </article>
      :
      <article className=' grid grid-cols-1 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md p-4 rounded-xl'>
      <h2 className='font-bold pb-2'>Description</h2>
      <span className='text-slate-600 dark:text-slate-200 flex justify-between items-start'>
      <button className='flex justify-center items-center bg-white shadow-around dark:bg-slate-700/80 p-4 rounded-md w-full gap-4'
      onClick={() => setModalOpen('2')}
      >
            Add description
            <PlusIcon className='h-6 w-6' />
        </button>
      </span>
        </article>
      }

      { /* Experience section */

      Object.keys(profile.experience).length != 0 ?
      <article className=' grid grid-cols-1 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Experience</h2>
        <ul className='text-slate-600 dark:text-slate-200 text-[14px]'>
          {
          profile.experience.list.map((item, i)=> (
            <AccordionExp
            key={i} 
            position={item.position}
            company={item.company}
            periode={item.period}
            location={item.location}
            text={item.description}
            recommendation={item.recom}  />
          ))}
          <li>
          <button className='flex justify-center items-center bg-white shadow-around dark:bg-slate-700/80 p-4 rounded-md w-full gap-4'
          onClick={() => setModalOpen('3')}
          >
            Add new
            <PlusIcon className='h-6 w-6' />
          </button>
          <button className='flex justify-center items-center bg-white shadow-around dark:bg-slate-700/80 p-4 rounded-md w-full gap-4 mt-4'
          onClick={clearExperience}
          >
            Clear all
            <XMarkIcon className='h-6 w-6' />
          </button>
        </li>
        </ul>
      </article>
      :
      <article className=' grid grid-cols-1 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md p-4 rounded-xl'>
      <h2 className='font-bold pb-2'>Experience</h2>
      <ul className='text-slate-600 dark:text-slate-200 text-[14px]'>
        <li>
          <button className='flex justify-center items-center bg-white shadow-around dark:bg-slate-700/80 p-4 rounded-md w-full gap-4'
          onClick={() => setModalOpen('3')}
          >
            Add new
            <PlusIcon className='h-6 w-6' />
          </button>
        </li>
      </ul>
    </article>
      }

      { /* Education section */ 

      Object.keys(profile.educations).length != 0 ?
      <article className=' grid grid-cols-1 p-4 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md rounded-xl'>
        <h2 className='font-bold pb-2'>Educations</h2>
        <ul className='text-slate-600 dark:text-slate-200 text-[14px]'>
          {
            profile.educations.list.map((item, i) => (
              <EduAccordion
              key={i} 
              education={item.education}
              school={item.school}
              periode={item.period}
              location={item.location}
              text={item.description}
              recommendation={item.recom}  />
            ))
          }
        <li>
          <button className='flex justify-center items-center bg-white shadow-around dark:bg-slate-700/80 p-4 rounded-md w-full gap-4'
          onClick={() => setModalOpen('4')}
          >
            Add new
            <PlusIcon className='h-6 w-6' />
          </button>
          <button className='flex justify-center items-center bg-white shadow-around dark:bg-slate-700/80 p-4 rounded-md w-full gap-4 mt-4'
          onClick={clearEducations}
          >
            Clear all
            <XMarkIcon className='h-6 w-6' />
          </button>
        </li>
        </ul>
      </article>
      :
      <article className=' grid grid-cols-1 p-4 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md rounded-xl'>
      <h2 className='font-bold pb-2'>Educations</h2>
      <ul className='text-slate-600 dark:text-slate-200 text-[14px]'>
        <li>
          <button className='flex justify-center items-center bg-white shadow-around dark:bg-slate-700/80 p-4 rounded-md w-full gap-4'
          onClick={() => setModalOpen('4')}
          >
            Add new
            <PlusIcon className='h-6 w-6' />
          </button>
        </li>
      </ul>
    </article>
      }
      <article className=' grid grid-cols-1 p-4 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md rounded-xl relative'>
      <h2 className='font-bold pb-2'>Skills</h2>
      { /* Skills section */ 
      Object.keys(profile.skills).length != 0 ?
      <>
      <button onClick={() => setModalOpen('5')} className='absolute right-4 top-4'>
            <PencilIcon className='h-6 w-6' />
      </button>
      <ul className='text-[14px] flex flex-1 flex-wrap gap-2'>
        {
        profile.skills.list.map((item, i) => (
          <li key={i} className='bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-50 px-2 py-1 rounded-md'>{item}</li>
        ))}
      </ul>
      </>
      :
      <button className='flex justify-center items-center bg-white shadow-around dark:bg-slate-700/80 p-4 rounded-md w-full gap-4'
      onClick={() => setModalOpen('5')}
      >
            Add skills
            <PencilIcon className='h-6 w-6' />
      </button>
      }
    </article>
    </section>
    }
    <AnimatePresence>
    { modalOpen === '1' && <MainProfileModal closeModal={close} data={profile} user={user} update={() => setUpdate((state) => state = !state)} /> }
    { modalOpen === '2' && <DescriptionModal closeModal={close} data={profile} user={user} update={() => setUpdate((state) => state = !state)} /> }
    { modalOpen === '3' && <ExperienceModal closeModal={close} exp={profile.experience} user={user} update={() => setUpdate((state) => state = !state)} /> }
    { modalOpen === '4' && <EducationModal closeModal={close} edu={profile.education} user={user} update={() => setUpdate((state) => state = !state)} /> }
    { modalOpen === '5' && <SkillsModal closeModal={close} user={user} skills={ (profile.skills?.list ? [...profile.skills.list] : [] ) } update={() => setUpdate((state) => state = !state)} /> }
    </AnimatePresence>
    </>
  )
}
