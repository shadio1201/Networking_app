import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import img_default from '../../assets/imgs/DefaultPicture.jpg'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

export default function User() {

  const [user, setUser] = useState(null)
  const { id } = useParams();

  function calcAge(date) {
    const ageDif = new Date() - date.getTime();
    const currentAge = new Date(ageDif);
    return Math.abs(currentAge.getUTCFullYear() - 1970);
  }

  useEffect(() => {

    async function fetchUser() {

      const response = await fetch(`http://localhost:3000/api/v1/users/${id}`);

      const data = await response.json();

      console.log(data[0])
      
      setUser(() => data[0])

    }

    fetchUser()
  }, [])





  return (
    <>
    { user &&
    <section id='profile' className=' m-4 mt-32 flex flex-col gap-4'>
      <div className='flex flex-col gap-4 bg-slate-700/80 p-4 pt-0 rounded-xl relative'>
        <div id="imgContainer" className=' w-full h-16 flex justify-center relative'>
        <img src={user.profile_pic ? user.profile_pic : img_default} alt="test" className=' w-32 h-32 rounded-full object-cover shadow-md shadow-black absolute -translate-y-16' />
        </div>
        <div id="infoHeader" className='flex flex-col justify-center items-start'>
          <h1 className="text-[1.5rem]">{user.first_name} {user.last_name}</h1>
          <h2 className="text-[1rem]">{user.titel} <em></em></h2>
          <span className='mt-2 text-slate-200'>
          <p className="text-[14px]">
            { calcAge(new Date(user.birthday))} år
          </p>
          {
            Object.keys(user.location).length != 0 &&
            <p className="text-[14px]">{user.location.city}, {user.location.area}, {user.location.country}</p>
          }
          </span>
        </div>
        <button className='absolute bottom-4 right-4 p-2 bg-slate-400 rounded-full cursor-pointer flex gap-1'>
          {
          user.approvals.users &&
          new Intl.NumberFormat('da-US', { notation: 'compact'}).format(user.approvals.users.length)
          }
          <HandThumbUpIcon className='h-6 w-6 text-slate-50' />
        </button>
      </div>

      {
      user.description &&
      <article className=' grid grid-cols-1 bg-slate-700/80 p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Description</h2>
        <p className='text-slate-200'>
          {user.description}
        </p>
      </article>
      }

      { /* Experience section */

      Object.keys(user.experience).length != 0 &&
      <article className=' grid grid-cols-1 bg-slate-700/80 p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Experience</h2>
        <ul className='text-slate-200 text-[14px]'>
          {
          user.experience.map((item, i)=> (
              <li className='my-2' key={i}>
                  <span className='flex items-center gap-2'>
                      <p className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md flex gap-2 items-center'>
                        <BriefcaseIcon className='h-4 w-4' />
                        {item.position}
                      </p>
                  </span>
                      <p className='pt-1'>
                        {item.company}
                      </p>
                      <p className='pb-1 text-slate-400'>
                        {item.periode} - {item.location}
                      </p>
              </li>
          ))}
        </ul>
      </article>
      }

      { /* Education section */ 

      Object.keys(user.educations).length != 0 &&
      <article className=' grid grid-cols-1 p-4 bg-slate-700/80 rounded-xl'>
        <h2 className='font-bold pb-2'>Educations</h2>
        <ul className='text-slate-200 text-[14px]'>
          {
            user.educations.map((item, i) => (
              <li className='my-2' key={i}>
              <span className='flex items-center gap-2'>
                <p className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md flex gap-2 items-center'>
                  <AcademicCapIcon className='h-4 w-4' />
                  {item.education}
                </p>
              </span>
              <p className='pt-1'>
                {item.school}
              </p>
              <p className='pb-1 text-slate-400'>
                {item.periode} - {item.location}
              </p>
            </li>
            ))
          }

        </ul>
      </article>
      }
      { /* Skills section */ 
      Object.keys(user.skills).length != 0 &&
      
      <article className=' grid grid-cols-1 p-4 bg-slate-700/80 p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Skills</h2>
        <ul className='text-slate-200 text-[14px] flex flex-1 flex-wrap gap-2'>
          {
          user.skills.list.map((item, i) => (
            <li key={i} className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md'>{item}</li>
          ))}
        </ul>
      </article>
      }
    </section>
    }
    
    </>
  )
}
