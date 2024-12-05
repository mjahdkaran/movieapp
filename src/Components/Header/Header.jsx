import React from 'react'
import { Movie, Search } from '../../utils/icon'

export default function Header() {
    return (
        <div className='sticky top-0 z-50 w-full p-1    md:p-4 flex  justify-between bg-black bg-opacity-90 text-white' >
            <div className='flex'>
                <div className='flex  items-center border-e-2 border-gray-400'>
                    <span className='text-pink-600'><Movie /></span>
                    <p className='font-normal md:font-bold md:text-lg m-1  md:m-2 ' >MovieLand</p>
                </div>
                <div className='flex  items-center mx-3 text-white hover:text-pink-600 '>
                    <Search />

                </div>
            </div>

            <div className='flex'>
                <button className='rounded-lg bg-pink-700 hover:bg-pink-800 p-1 h-10 text-xs  md:text-lg  md:font-medium mx-2'>Subscribe</button>
                <button className='rounded-lg bg-gray-700 hover:bg-gray-600 p-1 h-10 text-xs  md:text-lg  md:p-2 '>Sign in</button>
            </div>
        </div >
    )
}
