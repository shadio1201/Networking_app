import { UserCircleIcon, HomeIcon, PlusCircleIcon ,Cog8ToothIcon, BookmarkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const routeLinks = {

    Private: [
    {
        Name: 'Dashboard',
        Path: '/dashboard',
        Icon: HomeIcon,
    },
    {
        Name: 'Profile',
        Path: `/user/`,
        Icon: UserCircleIcon,
        isProfile: true
    },
    {
        Name: 'Saved',
        Path: '/saved',
        Icon: BookmarkIcon,
    },
    {
        Name: 'Settings',
        Path: '/edit/',
        Icon: Cog8ToothIcon,
        isProfile: true
    },
    {
        Name: 'Logout',
        Path: '/user/',
        Icon: ArrowLeftOnRectangleIcon,
        LogOut: true,
    }
    
    ],

    Public: [
    {
        Name: 'Home',
        Path: '/',
        Icon: HomeIcon
    },
    {
        Name: 'Login',
        Path: '/login',
        Icon: UserCircleIcon
    },
    {
        Name: 'Create User',
        Path: '/user/signup',
        Icon: PlusCircleIcon
    },

    ]

}

export default routeLinks;