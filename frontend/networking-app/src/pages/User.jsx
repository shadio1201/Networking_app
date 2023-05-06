import React from 'react'
import img from '../../assets/imgs/template-pic.jpg'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

export default function User() {
  return (
    <>
    <section id='profile' className=' m-4 mt-32 flex flex-col gap-4'>
      <div className='flex flex-col gap-4 bg-slate-700/80 p-4 pt-0 rounded-xl relative'>
        <div id="imgContainer" className=' w-full h-16 flex justify-center relative'>
        <img src={img} alt="test" className=' w-32 h-32 rounded-full object-cover shadow-md shadow-black absolute -translate-y-16' />
        </div>
        <div id="infoHeader" className='flex flex-col justify-center items-start'>
          <h1 className="text-[1.5rem]">Lasse Kjellerup</h1>
          <h2 className="text-[1rem]">Markting Ansvarlig <em>at CCTV Nordic</em></h2>
          <span className='mt-2 text-slate-200'>
          <p className="text-[14px]">26 år</p>
          <p className="text-[14px]">Kolding, Syddanmark, Danmark</p>
          </span>
        </div>
        <button className='absolute bottom-4 right-4 p-2 bg-slate-400 rounded-full cursor-pointer flex gap-1'>
          52
          <HandThumbUpIcon className='h-6 w-6 text-slate-50' />
        </button>
      </div>

      <article className=' grid grid-cols-1 p-4 bg-slate-700/80 p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Description</h2>
        <p className='text-slate-200'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Asperiores, praesentium voluptatum impedit neque accusantium culpa perferendis rerum, 
           aut consequuntur quisquam obcaecati distinctio vel cumque ex excepturi amet maxime repellat magni!
        </p>
      </article>

      { /* Experience section */ }
      <article className=' grid grid-cols-1 p-4 bg-slate-700/80 p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Experience</h2>
        <ul className='text-slate-200 text-[14px]'>
          <li className='my-2'>
            <span className='flex items-center gap-2'>
              <p className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md flex gap-2 items-center'>
                <BriefcaseIcon className='h-4 w-4' />
                Key Account Manager
              </p>
            </span>
            <p className='pt-1'>
              Salesforce a/s
            </p>
            <p className='pb-1 text-slate-400'>
              2018-2020 - Kolding, Danmark
            </p>
          </li>
          <li className='my-2'>
            <span className='flex items-center gap-2'>
              <p className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md flex gap-2 items-center'>
                <BriefcaseIcon className='h-4 w-4' />
                Intern salgsbackup
              </p>
            </span>
            <p className='pt-1'>
              CCTV Nordic
            </p>
            <p className='pb-1 text-slate-400'>
              2016-2018 - Kolding, Danmark
            </p>
          </li>
          <li className='my-2'>
            <span className='flex items-center gap-2'>
              <p className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md flex gap-2 items-center'>
                <BriefcaseIcon className='h-4 w-4' />
                Praktikant
              </p>
            </span>
            <p className='pt-1'>
              WeMarket Kolding
            </p>
            <p className='pb-1 text-slate-400'>
              2020-2023 - Kolding, Danmark
            </p>
          </li>
        </ul>
      </article>


      { /* Education section */ }
      <article className=' grid grid-cols-1 p-4 bg-slate-700/80 p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Educations</h2>
        <ul className='text-slate-200 text-[14px]'>
          <li className='my-2'>
            <span className='flex items-center gap-2'>
              <p className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md flex gap-2 items-center'>
                <AcademicCapIcon className='h-4 w-4' />
                BA i webudvikling
              </p>
            </span>
            <p className='pt-1'>
              IBA, Erhvervsakademi Kolding
            </p>
            <p className='pb-1 text-slate-400'>
              2022-2024 - Kolding, Danmark
            </p>
          </li>
          <li className='my-2'>
            <span className='flex items-center gap-2'>
              <p className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md flex gap-2 items-center'>
                <AcademicCapIcon className='h-4 w-4' />
                Multimediedesigner, AP
              </p>
            </span>
            <p className='pt-1'>
                IBA, Erhvervsakademi Kolding
            </p>
            <p className='pb-1 text-slate-400'>
              2020-2022 - Kolding, Danmark
            </p>
          </li>
          <li className='my-2'>
            <span className='flex items-center gap-2'>
              <p className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md flex gap-2 items-center'>
                <AcademicCapIcon className='h-4 w-4' />
                STX
              </p>
            </span>
            <p className='pt-1'>
              Thisted gymnasium og HF
            </p>
            <p className='pb-1 text-slate-400'>
              2014-2017 - Thisted, Danmark
            </p>
          </li>
        </ul>
      </article>

      { /* Skills section */ }
      <article className=' grid grid-cols-1 p-4 bg-slate-700/80 p-4 rounded-xl'>
        <h2 className='font-bold pb-2'>Skills</h2>
        <ul className='text-slate-200 text-[14px] flex flex-1 flex-wrap gap-2'>
          <li className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md'>HTML</li>
          <li className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md'>CSS</li>
          <li className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md'>Javascript</li>
          <li className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md'>React</li>
          <li className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md'>Vue</li>
          <li className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md'>Express</li>
          <li className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md'>Nodejs</li>
        </ul>
      </article>

    </section>
    
    </>
  )
}
