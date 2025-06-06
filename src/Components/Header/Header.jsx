import React, { useEffect, useRef, useState } from 'react';
import { Exit, Movie, Search } from '../../utils/icon';
import { useAuth } from '../../Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_Base_URL_AMIR = 'http://65.109.177.24:2024/api/'
export default function Header() {
    const { user,userImage, logout, token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isLogedIn, setIsLogedIn] = useState(!!user);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [userData, setUserData] = useState({});

    const menuRef = useRef(null); // مرجع به منو

    useEffect(() => {
        setIsLogedIn(!!user);

    }, [user]);

    useEffect(() => {
        if (!token) return;
        const getCurrentUser = async (token) => {
            try {
                const response = await axios.get(`${API_Base_URL_AMIR}user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                let details = response.data
                return setUserData(details);
            } catch (error) {
                console.error('Error getting user', error)
                throw error
            }
        }
        getCurrentUser(token)
    }, [])



    // بستن منو وقتی کاربر بیرون از آن کلیک کند
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsShowMenu(false);
            }
        }

        if (isShowMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isShowMenu]);

    return (
        <div className=' fixed top-0 z-50 w-full p-1 md:p-4 flex justify-between bg-black bg-opacity-90 text-white font-mono'>
            <div className='flex'>
                <div className='flex items-center border-e-2 border-gray-400 cursor-pointer' onClick={() => navigate('/')}>
                    <span className='text-pink-600'><Movie /></span>
                    <p className=' text-sm font-bold md:text-lg m-1 md:m-2'>MovieScope</p>
                </div>

                {location.pathname !== '/search' && (
                    <div onClick={() => navigate('/search')} className='flex items-center mx-3 text-white hover:text-pink-600'>
                        <Search />
                        <p className='ml-2 hidden sm:block'>Search</p>
                    </div>
                )}
            </div>

            <div className='flex items-center'>

                {!isLogedIn &&
                    <button
                        className='rounded-lg bg-pink-700 h-8 px-1 text-sm
                                   md:text-lg md:px-3 md:h-10 md:mr-3
                                  hover:bg-pink-800'
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                }


                {isLogedIn && (
                    <div ref={menuRef} className='relative'>
                        <div
                            className='rounded-full w-11 h-11 p-1 border-2 mx-3 border-white cursor-pointer'
                            onClick={() => setIsShowMenu(!isShowMenu)}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img className='rounded-full w-full h-full object-cover'
                                    src={userData.imageId ? `http://65.109.177.24:2024/api/user/profile-pic/${userData.imageId}` : "/image/Frame.png"}
                                    alt="User" />
                            </div>


                        </div>

                        {isShowMenu && (
                            <div className='bg-gray-950 shadow-sm shadow-gray-700 absolute top-16 right-0 h-52 w-36 py-3'>
                                <ul className='h-full flex flex-col justify-evenly'>
                                    <li className='hover:bg-pink-700 transition-all px-3 py-1' onClick={() => navigate('/profile')}>Profile</li>
                                    <li className='hover:bg-pink-700 transition-all px-3 py-1' onClick={() => navigate('/WatchList')}>WatchList</li>
                                    <li className='hover:bg-pink-700 transition-all px-3 py-1' onClick={() => navigate('/liked')}>Favorite</li>
                                    <hr />
                                    <li className=' flex  justify-between hover:bg-pink-700 transition-all px-3 py-1' onClick={() => {
                                        logout()
                                        navigate('/')
                                    }}>Logout <span><Exit/></span></li>

                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>


            {showTooltip && (
                <div className="absolute  left-1/2 transform -translate-x-1/2 bg-pink-500 text-white md:text-sm text-xs px-2 py-1 rounded shadow-lg">
                    {`Logged in as ${user}`}
                </div>
            )}
        </div>
    );
}
