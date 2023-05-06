import React from 'react'
import Logo from '../../assets/imgs/Logo_active_white.svg'
import { Bars3BottomRightIcon } from '@heroicons/react/24/outline'
import { useUpdateSidebar } from '../contexts/SidebarContext'

export default function Navbar() {

  const toggleSidebar = useUpdateSidebar()

  return (
    <header className='w-full py-4 flex items-center bg-slate-800/50 fixed top-0 z-40 backdrop-blur-sm'>
      <nav className='w-full flex justify-between px-8'>
        <img src={Logo} className='w-12' alt="Linked logo" />
        <button onClick={toggleSidebar}>
          <Bars3BottomRightIcon className='w-6 h-6 text-slate-50' />
        </button>
      </nav>
    </header>
  )
}
