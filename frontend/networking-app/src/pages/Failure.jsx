import React from 'react'
import Lottie from 'react-lottie'
import SuccesAnimation from '../lotties/success-clean.json'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Succes() {

  const { state } = useLocation();

  const { error } = state;

  return (
    <div className='flex flex-col justify-center items-center px-8'>
        <h2 className='text-2xl font-bold mb-2'>Ops...</h2>
        <p className='text-center mb-2'>{error}</p>

        <button className='flex justify-center px-4 py-4 text-slate-50 rounded-md border-2 bg-gradient-to-r from-[#06beb6] to-[#48b1bf] w-full sm:w-[300px] font-bold mt-8'>Send new link</button>
    </div>
  )
}
