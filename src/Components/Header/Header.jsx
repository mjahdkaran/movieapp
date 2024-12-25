import React, { useState } from 'react'
import { Movie, Search } from '../../utils/icon'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [showTooltip, setShowTooltip] = useState(false)
    const clickeHandler = () => {
        if (user) {
            logout()
        } else {
            navigate('/movieapp/login')
        }
    }
    return (
        <div className='fixed top-0 z-50 w-full p-1    md:p-4 flex  justify-between bg-black bg-opacity-90 text-white' >
            <div className='flex'>
                <div className='flex  items-center border-e-2 border-gray-400'>
                    <span className='text-pink-600'><Movie /></span>
                    <p className='font-normal md:font-bold md:text-lg m-1  md:m-2 ' >MovieLand</p>
                </div>
                <div className='flex  items-center mx-3 text-white hover:text-pink-600 '>
                    <Search />

                </div>
            </div>

            <div className='flex items-center'>

                <div className='flex items-center mx-1'>
                    <p>About</p>
                </div>
                <button className={`rounded-lg  ${user ? 'bg-gray-700 hover:bg-gray-600' : 'bg-pink-700 hover:bg-pink-800'}  h-8 px-1  text-md `}
                    onClick={clickeHandler}>{user ? 'Logoute' : 'Login'}</button>

                <div className={`rounded-full w-11 h-11 p-1 border-2 mx-3 ${user ? 'border-pink-400' : 'border-white mx-3'} `}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <div className="w-full h-full rounded-full overflow-hidden">

                        <img className=' rounded-full w-full h-full object-cover' src="./image/solar_user-broken.jpg" alt=""
                            title={user ? `Logged in as ${user}` : 'Not logged in'}
                        />
                    </div>
                    {showTooltip && user && (
                        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-sm px-2 py-1 rounded shadow-lg">
                            {`Logged in as ${user}`}
                        </div>)}
                </div>





            </div>
        </div >
    )
}
