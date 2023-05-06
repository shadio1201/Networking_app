import React from 'react'

export default function AppWrapper(props) {
  return (
    <main className='mt-24'>
        {props.children}
    </main>
  )
}
