import React, { useState } from 'react'
import { PlusIcon, MinusIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

export default function EduAccordion({ education, school, periode, location, text, recommendation }) {
  
    const [isOpen, setIsOpen] = useState(false);

    const openAccordion = () => {
        setIsOpen((state) => state = !state);
    }

    return (
    <li className='my-2 relative'>
        {
            (text || recommendation) &&
            <button onClick={openAccordion} className='absolute right-2 top-2'>
                { isOpen ? <MinusIcon className='h-6 w-6 text-slate-50' /> :  <PlusIcon className='h-6 w-6 text-slate-50' /> }
            </button>
        }

        <span className='flex items-center gap-2'>
            <p className='bg-slate-600 text-slate-50 px-2 py-1 rounded-md flex gap-2 items-center'>
                <AcademicCapIcon className='h-4 w-4' />
                {education}
            </p>
        </span>
        <p className='pt-1'>
            {school}
        </p>
        <p className='pb-1 text-slate-400'>
            {periode} - {location}
        </p>
        {
        (text || recommendation) &&
        <div className={`pb-1 text-slate-400 overflow-hidden transition-all duration-150 ease-in-out ${isOpen ? 'h-fit' : 'h-0'}`}>
            {
                text &&
            <p>
                {text}
            </p>
            }
            {
                recommendation &&
                <button>
                { recommendation }
                </button>
            }
            
        </div>
        }
    </li>
  )
}