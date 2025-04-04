import React, { useEffect, useState } from 'react';
import { Bottom, Up } from '../../utils/icon';
import { getDownloadLinks, getSubTitlesLinks } from '../../utils/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export default function DownLoadLinks({ movieName, movieId, movieType }) {
    const [copyMessage, setCopyMessage] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(true)
    const [showLinks, setShowLinks] = useState({ movie: true, subtitle: false })
    const [subtitleArray, setSubtitleArray] = useState([])
    const[downloadLinksArray,setDownloadLinksArray]=useState([])
    
    const {token}=useAuth()
    useEffect(() => {
        fetchingSubtitle()
        fetchDownloadLinks()
        console.log('token in Download',token)
    }, [])
  
   
    const handleLinkClick = (event, url) => {
        event.preventDefault();

        // ذخیره موقعیت موس
        setMousePos({ x: event.clientX, y: event.clientY });

        // کپی کردن لینک در کلیپ‌بورد
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopyMessage(true); // نمایش پیام Copy

                // بعد از 1.5 ثانیه مخفی شود
                setTimeout(() => setCopyMessage(false), 1500);
            })
            .catch((err) => console.error("خطا در کپی کردن لینک:", err));
    };
    //گرفتن لینک های دانلود
  const fetchDownloadLinks = async () => {
setIsLoading(true)
        try {
            const response = await getDownloadLinks(token,movieName)
            console.log('fetched download links', response)
            const sortedLinks = [...response].sort((a, b) => parseInt(a.quality) - parseInt(b.quality));

            setDownloadLinksArray(sortedLinks)
        }
        
         catch (error) {
            setDownloadLinksArray([])
            console.error('Error fetching download links in movieDetails', error)
        }finally{
            setIsLoading(false)
        }
    }

    //گرفتن لینک های زیر نویس
    const fetchingSubtitle = async () => {
        try {
            const data = await getSubTitlesLinks(token, movieId, movieType)

            setSubtitleArray(data)
            console.log('subtitle', data)
        } catch (error) {
            setSubtitleArray([])
            console.error('error fetching subtitles', error)
        }

    }
    const clickHandler = (e) => {
        const buttonName = e.currentTarget.name;
        console.log(buttonName);
        if (buttonName === 'movie') {
            setShowLinks((prev) => ({ ...prev, movie: !prev.movie }));
        } else if (buttonName === 'subtitle') {
            setShowLinks((prev) => ({ ...prev, subtitle: !prev.subtitle }));
        }
    };
    return (
        <div className='p-1 relative'>
            {isLoading ?
                <p className='text-white font-bold flex justify-center p-2 '>is Loading...</p> :

                <div>
                    <div >
                        {/* لینک های فیلم */}
                        <button name='movie' onClick={clickHandler} className='flex justify-between  text-white  hover:bg-blue-black border border-pink-600 rounded-md p-1  mb-5 w-full' >DownLoad Links  {showLinks.movie ? <Bottom /> : <Up />}</button>
                        <ul className={` flex-wrap  ${showLinks.movie ? 'flex' : 'hidden'} justify-start  text-gray- text-xs`}>
                            {downloadLinksArray.map((link, index) => (
                                <li
                                    onClick={(e) => handleLinkClick(e, link.link)}
                                    key={index}
                                    className="w-fit bg-pink-800 md:p-2 p-1 rounded-lg hover:bg-pink-900 m-1 md:min-w-72 transition-colors duration-500 relative"
                                >
                                    <a
                                        to={link.link}

                                        className="cursor-pointer block"
                                    >
                                        <span className='font-bold text-white'> {link.quality} </span>
                                        - {link.type} -
                                        <span className='font-bold text-white'> {link.size} </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {/* لینک های زیر نویس  */}

                    </div>

                    <button name='subtitle' onClick={clickHandler} className='flex justify-between w-full text-white  hover:bg-blue-black border border-pink-600 rounded-md p-1 mb-5' >Subtitle Links  {showLinks.subtitle ? <Bottom /> : <Up />}</button>
                    <ul className={` flex-wrap  ${showLinks.subtitle ? 'flex' : 'hidden'} justify-start  text-gray- text-xs`}>
                        {subtitleArray.map((link) => (
                            <li
                            
                                key={link.id}
                                className="w-fit bg-pink-500 md:p-2 p-1 rounded-lg hover:bg-pink-900 m-1 md:min-w-72 transition-colors duration-500 relative"
                            >
                                <a
                                    href={link.uri}
                                    download
                                    className="cursor-pointer block"
                                >
                                    <span className='font-bold text-white'> {link.title} </span>
                                    -
                                    <span className='font-bold text-white'> {link.size} </span>
                                </a>
                            </li>
                        ))}
                    </ul>

                </div>

            }


            {/* پیام کوچک "Copy" که کنار موس نمایش داده می‌شود */}
            {copyMessage && (
                <span
                    className="fixed bg-black text-white text-xs px-2 py-1 rounded-md opacity-90 transition-opacity duration-300"
                    style={{
                        left: `${mousePos.x + 10}px`,
                        top: `${mousePos.y - 20}px`,
                        pointerEvents: "none",
                        zIndex: 50,
                    }}
                >
                    Copy
                </span>
            )}
        </div>
    );
}
