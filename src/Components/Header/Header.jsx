import React, { useEffect, useState } from 'react'
import { Movie, Search } from '../../utils/icon'
import { useAuth } from '../../Context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [showTooltip, setShowTooltip] = useState(false)
    const location = useLocation()
    const [isLogedIn, setIsLogedIn] = useState(false)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const isSearchPage = location.pathname === '/search'
    useEffect(() => {
        if (user) {
            setIsLogedIn(true);
        } else {
            setIsLogedIn(false);
        }
    }, [user]);
    const clickeHandler = () => {
        if (isLogedIn) {
            logout()
        } else {
            navigate('/login')
        }
    }

    return (
        <div className='fixed top-0 z-50 w-full p-1    md:p-4 flex  justify-between bg-black bg-opacity-90 text-white font-mono' >
            <div className='flex'>
                <div className='flex  items-center border-e-2 border-gray-400'
                    onClick={() => navigate('/')}>
                    <span className='text-pink-600'><Movie /></span>
                    <p className='font-normal text-sm md:font-bold md:text-lg m-1  md:m-2 font-mono ' >MovieScope</p>
                </div>
                {!isSearchPage &&
                    <div
                        onClick={() => (navigate('/search'))}
                        className='flex  items-center mx-3 text-white hover:text-pink-600  '>

                        <Search />

                        <p className='ml-2 hidden sm:block ' >Search</p>

                    </div>}

            </div>

            <div className='flex items-center'>

                <div className='flex items-center text-sm md:text-lg mx-4'>
                    <p>About</p>
                </div>
                <button className={`rounded-lg  ${isLogedIn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-pink-700 hover:bg-pink-800'}  h-8 px-1  text-sm md:text-lg `}
                    onClick={clickeHandler}>{isLogedIn ? 'logout' : 'Login'}</button>

                {isLogedIn &&
                    <div
                        className={`rounded-full w-11 h-11 p-1 border-2 mx-3  border-pink-400  `}
                        onMouseEnter={() => {setIsShowMenu(!isShowMenu)
                            setShowTooltip(true)
                        }
                            
                            }
                        onMouseLeave={() => 
                            setShowTooltip(false)
                        }
                      

                    >

                        <div className="w-full h-full rounded-full overflow-hidden">

                            <img className=' rounded-full w-full h-full object-cover' src="./image/solar_user-broken.jpg" alt=""
                                title={isLogedIn ? `Logged in as ${user}` : 'Not logged in'}
                            />
                        </div>

                        {showTooltip && isLogedIn && (
                            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-sm px-2 py-1 rounded shadow-lg">
                                {`Logged in as ${user}`}
                            </div>)}
                    </div>

                }


                {isShowMenu &&
                    <div
                    onMouseLeave={()=>setIsShowMenu(false)}
                     className=' bg-gray-950 shadow-sm shadow-gray-700 absolute top-16 right-6 h-52 w-36 py-3'>
                        <ul className=' h-full flex flex-col justify-evenly '>
                            <li className='hover:bg-pink-700 transition-all hover:text-with px-3  py-1' > profile</li>
                            <li className='hover:bg-pink-700 transition-all  hover:text-with px-3 py-1' onClick={()=>navigate('/WatchList')}>WatchList  </li>
                            <li className='hover:bg-pink-700 transition-all  hover:text-with px-3 py-1' onClick={()=>navigate('/liked')}> Favorite </li>
                        </ul>
                    </div>}



            </div>
        </div >
    )
}

//Bugs-Error
//مشکل عدم نمایش عکس پروفایل در صفحه اصلی