import React from 'react'
import Logo from '../../assets/imgs/Logo_active_white.svg'
import { Bars3BottomRightIcon } from '@heroicons/react/24/outline'
import { useUpdateSidebar } from '../contexts/SidebarContext'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user'
import img_default from '../../assets/imgs/DefaultPicture.jpg'

export default function Navbar() {

  const user = useSelector(selectUser);

  const toggleSidebar = useUpdateSidebar()

  return (
    <header className='w-full py-4 flex items-center bg-slate-800/50 fixed top-0 z-40 backdrop-blur-sm'>
      <nav className='w-full flex justify-between items-center px-8 h-8'>
        <Link to="/">
          <img src={Logo} className='w-12' alt="Linked logo" />
        </Link>
        <div className='flex justify-center items-center gap-4'>
          {
          user &&
          <span className='flex justify-center items-center gap-2'>
            <img src={user ? user.profile_pic : img_default} className=' w-8 h-8 rounded-full object-cover shadow-md shadow-black' />
            <p>{user.first_name}</p>
          </span>}
        <button onClick={toggleSidebar}>
          <Bars3BottomRightIcon className='w-8 h-8 text-slate-50' />
        </button>
        </div>
      </nav>
    </header>
  )
}
