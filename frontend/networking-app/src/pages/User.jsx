import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import img_default from '../../assets/imgs/DefaultPicture.jpg'
import { HandThumbUpIcon as ThumpUpOutline } from '@heroicons/react/24/outline'
import { AcademicCapIcon, HandThumbUpIcon as ThumpUpSolid} from '@heroicons/react/24/solid'
import AccordionExp from '../components/AccordionExp'
import EduAccordion from '../components/EduAccordion'
import Lottie from 'react-lottie'
import likeEffect from '../lotties/like-particle.json'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user'
import LikeComponent from '../components/LikeComponent'
import SaveComponent from '../components/SaveComponent'

export default function User() {

  const user = useSelector(selectUser);
  
  const { id } = useParams();
  const [profile, setProfile] = useState(null)

  const [loading, setLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  

  function calcAge(date) {
    const ageDif = new Date() - date.getTime();
    const currentAge = new Date(ageDif);
    return Math.abs(currentAge.getUTCFullYear() - 1970);
  }

  useEffect(() => {

    setLoading(true);

    async function fetchUser() {

      const response = await fetch(`http://localhost:3000/api/v1/users/${id}`);

      const data = await response.json();

      console.log(data[0]);
      
      setProfile(() => data[0])

    }
    fetchUser()

    setLoading(false);
  }, [])

  return (
    <>
    { profile &&
    <section id='profile' className=' m-4 mt-32 flex flex-col gap-4'>
      <div className='flex flex-col gap-4 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md p-4 pt-0 rounded-xl relative'>
        <div id="imgContainer" className=' w-full h-16 flex justify-center relative'>
        <img src={profile.profile_pic ? profile.profile_pic : img_default} alt="test" className=' w-32 h-32 rounded-full object-cover shadow-md shadow-black absolute -translate-y-16' />
        </div>
        <div id="infoHeader" className='flex flex-col justify-center items-start'>
          <h1 className="text-[1.5rem]">{profile.first_name} {profile.last_name}</h1>
          <h2 className="text-[1rem]">{profile.titel} <em></em></h2>
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
        <SaveComponent user={user} id={id} />
        {
          profile.approvals &&
        <LikeComponent hasLiked={hasLiked} list={profile.approvals.users} user={user} id={id} />
        }
      </div>

      {
      profile.description &&
      <article className=' grid grid-cols-1 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Description</h2>
        <p className='text-slate-600 dark:text-slate-200'>
          {profile.description}
        </p>
      </article>
      }

      { /* Experience section */

      Object.keys(profile.experience).length != 0 &&
      <article className=' grid grid-cols-1 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Experience</h2>
        <ul className='text-slate-600 dark:text-slate-200 text-[14px]'>
          {
          profile.experience.map((item, i)=> (
            <AccordionExp
            key={i} 
            position={item.position}
            company={item.company}
            periode={item.periode}
            location={item.location}
            text={item.text}
            recommendation={item.recom}  />
          ))}
        </ul>
      </article>
      }

      { /* Education section */ 

      Object.keys(profile.educations).length != 0 &&
      <article className=' grid grid-cols-1 p-4 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md rounded-xl'>
        <h2 className='font-bold pb-2'>Educations</h2>
        <ul className='text-slate-600 dark:text-slate-200 text-[14px]'>
          {
            profile.educations.map((item, i) => (
              <EduAccordion
              key={i} 
              education={item.education}
              school={item.school}
              periode={item.periode}
              location={item.location}
              text={'Hej med dig 123'}
              recommendation={item.recom}  />
            ))
          }

        </ul>
      </article>
      }
      { /* Skills section */ 
      Object.keys(profile.skills).length != 0 &&
      
      <article className=' grid grid-cols-1 p-4 bg-white shadow-lg dark:bg-slate-700/80 dark:shadow-md rounded-xl'>
        <h2 className='font-bold pb-2'>Skills</h2>
        <ul className='text-[14px] flex flex-1 flex-wrap gap-2'>
          {
          profile.skills.list.map((item, i) => (
            <li key={i} className='bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-50 px-2 py-1 rounded-md'>{item}</li>
          ))}
        </ul>
      </article>
      }
    </section>
    }
    
    </>
  )
}
