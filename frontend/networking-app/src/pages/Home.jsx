import React from 'react'
import Test from '../components/3d/Test'
import { Link } from 'react-router-dom'
import '../Trail.css'

export default function Home() {
  return (
    <>
    <section className='w-full relative h-screen flex flex-col gap-2 justify-center items-center -mt-24'>
        <h1 className=' text-4xl font-bold'>A new way of</h1>
        <h2 className=' text-4xl font-bold'>connecting</h2>
        <Test />

        <div id="buttons" className='px-8 flex flex-col gap-4 w-full text-slate-50'>
        <Link to="/login" className='flex justify-center px-4 py-4 rounded-md border-2 bg-gradient-to-r from-[#06beb6] to-[#48b1bf] w-full font-bold mt-4;'>Login</Link>
        <Link to="/user/signup" className='flex justify-center px-4 py-4 rounded-md bg-slate-800 dark:bg-slate-600 w-full font-bold mt-4;'>Register</Link>
        </div>
    </section>
    </>
  )
}
