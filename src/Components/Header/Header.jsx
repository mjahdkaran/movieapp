import React, { useEffect, useRef, useState } from 'react';
import { Movie, Search } from '../../utils/icon';
import { useAuth } from '../../Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isLogedIn, setIsLogedIn] = useState(!!user);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const menuRef = useRef(null); // مرجع به منو

    useEffect(() => {
        setIsLogedIn(!!user);
    }, [user]);

    const clickHandler = () => {
        if (isLogedIn) logout();
        else navigate('/login');
    };

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
                <div className='flex items-center border-e-2 border-gray-400' onClick={() => navigate('/')}>
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
                <div className='flex items-center text-sm md:text-lg mx-4'>
                    <p>About</p>
                </div>
                <button
                    className={`rounded-lg ${isLogedIn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-pink-700 hover:bg-pink-800'} h-8 px-1 text-sm md:text-lg`}
                    onClick={clickHandler}
                >
                    {isLogedIn ? 'Logout' : 'Login'}
                </button>

                {isLogedIn && (
                    <div ref={menuRef} className='relative'>
                        <div
                            className='rounded-full w-11 h-11 p-1 border-2 mx-3 border-white cursor-pointer'
                            onClick={() => setIsShowMenu(!isShowMenu)}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img className='rounded-full w-full h-full object-cover' src="/image/Frame.png" alt="User" />
                            </div>


                        </div>

                        {isShowMenu && (
                            <div className='bg-gray-950 shadow-sm shadow-gray-700 absolute top-16 right-0 h-52 w-36 py-3'>
                                <ul className='h-full flex flex-col justify-evenly'>
                                    <li className='hover:bg-pink-700 transition-all px-3 py-1'>Profile</li>
                                    <li className='hover:bg-pink-700 transition-all px-3 py-1' onClick={() => navigate('/WatchList')}>WatchList</li>
                                    <li className='hover:bg-pink-700 transition-all px-3 py-1' onClick={() => navigate('/liked')}>Favorite</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>


            {showTooltip && (
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-sm px-2 py-1 rounded shadow-lg">
                    {`Logged in as ${user}`}
                </div>
            )}
        </div>
    );
}
