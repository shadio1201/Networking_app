import React from 'react'
import Test from '../components/3d/Test'
import { Link } from 'react-router-dom'
import { useTrail, a } from '@react-spring/web'
import '../Trail.css'

const Trail = ({ children }) => {
  const items = Array.from(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    y: 0,
    height: 45,
    from: { opacity: 0, y: -10, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className='trailsText' style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
    <section className='w-full relative h-screen flex flex-col gap-2 justify-center items-center -mt-24'>
        <Trail>
        <h1 className=' text-4xl font-bold'>A new way of</h1>
        <h2 className=' text-4xl font-bold'>connecting</h2>
        </Trail>
        <Test />

        <div id="buttons" className='px-8 flex flex-col gap-4 w-full'>
        <button className='flex justify-center px-4 py-4 rounded-md border-2 bg-gradient-to-r from-[#06beb6] to-[#48b1bf] w-full font-bold mt-4;'>Login</button>
        <Link to="/user/signup" className='flex justify-center px-4 py-4 rounded-md bg-slate-600 w-full font-bold mt-4;'>Register</Link>
        </div>
    </section>
    </>
  )
}
