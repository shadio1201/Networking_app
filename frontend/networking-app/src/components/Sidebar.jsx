import React from 'react'
import { useSidebar, useUpdateSidebar } from '../contexts/SidebarContext'
import '../sidebar.css'
import { XMarkIcon, SunIcon, MoonIcon, UserCircleIcon, HomeIcon, Cog8ToothIcon, BookmarkIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Button from './base/button.jsx';


export default function Sidebar() {

    const sidebarState = useSidebar()
    const toggleSidebar = useUpdateSidebar()

  return (

    <>
    <div className={sidebarState ? 'sidebar-container translate-x-0' : 'sidebar-container translate-x-[100%]'}>
        <div id="sidebarHeader">
            <button onClick={toggleSidebar}>
                <XMarkIcon className='w-6 h-6 text-slate-50' />
            </button>
            <button id="themeToggler">
                <SunIcon className='z-10 w-6 h-6 text-slate-400' />
                <MoonIcon className='z-10 w-6 h-6 text-slate-50' />
            </button>
        </div>
        <ul className='text-slate-50 px-8 flex-1 flex flex-col pb-4'>
            <li id="sidebarMenuItem" className='active'><HomeIcon className='h-6 w-6' />Home</li>
            <li id="sidebarMenuItem"><UserCircleIcon className='h-6 w-6' />Profile</li>
            <li id="sidebarMenuItem"><BookmarkIcon className='h-6 w-6' />Saved</li>
            <li id="sidebarMenuItem"><Cog8ToothIcon className='h-6 w-6' />Settings</li>
            <li id="sidebarMenuItem">
                <Link to="/user/signup" onClick={toggleSidebar}>
                Create User
                </Link>
            </li>
            <li id="nearbySearchItem">
                <Button>
                    <ViewfinderCircleIcon className='h-6 w-6' />Nearby Search
                </Button>
            </li>
        </ul>
    </div>
    <div className={sidebarState ? 'sidebar-backdrop opacity-100 pointer-events-auto' : 'sidebar-backdrop opacity-0 pointer-events-none'}
        onClick={toggleSidebar}>
    </div>
    </>
  )
}
