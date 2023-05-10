import React, { useState } from 'react'
import { useSidebar, useUpdateSidebar } from '../contexts/SidebarContext'
import '../sidebar.css'
import { XMarkIcon, SunIcon, MoonIcon, UserCircleIcon, HomeIcon, Cog8ToothIcon, BookmarkIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import Button from './base/button.jsx';
import routeLinks from '../RouterLinks'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user'
import { selectColormode, setColormode } from '../redux/colormode'
import { useDispatch } from 'react-redux'
import { logout, removeToken } from '../redux/user';
import { useNavigate } from 'react-router-dom'


export default function Sidebar() {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectUser);
    const colormode = useSelector(selectColormode);

    const sidebarState = useSidebar()
    const toggleSidebar = useUpdateSidebar()

    const [darkmode, setDarkmode] = useState(colormode);

    const toggleColormode = () => {
        setDarkmode((state) => state = !state);
        localStorage.setItem('darkmode', darkmode);
        dispatch(setColormode());
    }

    const signout = () => {
        dispatch(removeToken());
        dispatch(logout())
        toggleSidebar();
        navigate('/');
        localStorage.removeItem('accessToken');
    }

  return (

    <>
    <div className={sidebarState ? 'sidebar-container translate-x-0' : 'sidebar-container translate-x-[100%]'}>
        <div id="sidebarHeader">
            <button onClick={toggleSidebar}>
                <XMarkIcon className='w-6 h-6 text-slate-800 dark:text-slate-50' />
            </button>
            <button onClick={toggleColormode} id="themeToggler" className={colormode ? 'before:right-0' : 'before:right-[36px]'}>
                <SunIcon className='z-10 w-6 h-6 text-slate-600 dark:text-slate-400' />
                <MoonIcon className='z-10 w-6 h-6 text-slate-400 dark:text-slate-50' />
            </button>
        </div>
        <ul className='text-slate-50 px-8 flex-1 flex flex-col pb-4'>
            {
                user ?  
                routeLinks.Private.map((item, i) => (
                <li id="sidebarMenuItem" key={i}>
                    <item.Icon className='h-6 w-6' />
                    {
                    item.LogOut ?
                    <button to={item.Path} onClick={signout}>
                        {item.Name}
                    </button>   
                    :
                    <NavLink to={item.Path} onClick={toggleSidebar}>
                        {item.Name}
                    </NavLink>
                    }
                </li>
                ))     
                :
                routeLinks.Public.map((item, i) => (
                    <li id="sidebarMenuItem" key={i}>     
                    <item.Icon className='h-6 w-6' />
                    <NavLink to={item.Path} onClick={toggleSidebar}>
                        {item.Name}
                    </NavLink>
                    </li>
                    ))
            }
            {
            user &&
            <li id="nearbySearchItem">
                <Button>
                    <ViewfinderCircleIcon className='h-6 w-6' />Nearby Search
                </Button>
            </li>}
        </ul>
    </div>
    <div className={sidebarState ? 'sidebar-backdrop opacity-100 pointer-events-auto' : 'sidebar-backdrop opacity-0 pointer-events-none'}
        onClick={toggleSidebar}>
    </div>
    </>
  )
}
