import React, { useState } from 'react'
import { PlusIcon, MinusIcon, BriefcaseIcon } from '@heroicons/react/24/solid'

export default function AccordionExp({ position, company, periode, location, text, recommendation }) {
  
    const [isOpen, setIsOpen] = useState(false);

    const openAccordion = () => {
        setIsOpen((state) => state = !state);
    }

    return (
    <li className='my-2 relative'>
        {
            (text || recommendation) &&
            <button onClick={openAccordion} className='absolute right-2 top-2 text-slate-800 dark:text-slate-50'>
                { isOpen ? <MinusIcon className='h-6 w-6' /> :  <PlusIcon className='h-6 w-6' /> }
            </button>
        }

        <span className='flex items-center gap-2'>
            <p className='bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-50 px-2 py-1 rounded-md flex gap-2 items-center'>
                <BriefcaseIcon className='h-4 w-4' />
                {position}
            </p>
        </span>
        <p className='pt-1'>
            {company}
        </p>
        <p className='pb-1 text-slate-400'>
        { periode[0] } - { periode[1] } {location}
        </p>
        {
        (text || recommendation) &&
        <div className={`pb-1 overflow-hidden transition-all duration-150 ease-in-out ${isOpen ? 'h-fit' : 'h-0'}`}>
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
