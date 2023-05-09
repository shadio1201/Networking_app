import { UserCircleIcon, HomeIcon, PlusCircleIcon ,Cog8ToothIcon, BookmarkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';


const routeLinks = {

    Private: [
    {
        Name: 'Home',
        Path: '/',
        Icon: HomeIcon,
        Button: false
    },
    {
        Name: 'Profile',
        Path: `/user/`,
        Icon: UserCircleIcon,
        Button: false
    },
    {
        Name: 'Saved',
        Path: '/test',
        Icon: BookmarkIcon,
        Button: false
    },
    {
        Name: 'Settings',
        Path: '/user/signup',
        Icon: Cog8ToothIcon,
        Button: false
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