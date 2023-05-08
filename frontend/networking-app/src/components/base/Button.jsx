import React from 'react'

export default function Button(props) {
  return (
    <button className='flex gap-2 px-4 py-4 rounded-md border-2 bg-gradient-to-r from-[#06beb6] to-[#48b1bf] w-full'>
        {props.children}
    </button>
  )
}
