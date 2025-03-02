import React, { useEffect, useState } from 'react';

export default function DownLoadLinks({ downloadLinksArray }) {
    const [copyMessage, setCopyMessage] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        downloadLinksArray.length > 0 ? setIsLoading(false) : setIsLoading(true)
    })
    // مرتب‌سازی کیفیت از کم به زیاد
    const sortedLinks = [...downloadLinksArray].sort((a, b) => parseInt(a.quality) - parseInt(b.quality));

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

    return (
        <div className='p-1 relative'>
            {isLoading ? <p className='text-white font-bold flex justify-center p-2 '>is Loading...</p> :
                <ul className='flex flex-wrap justify-start md:justify-between text-gray- text-xs'>
                    {sortedLinks.map((link, index) => (
                        <li
                            onClick={(e) => handleLinkClick(e, link.link)}
                            key={index}
                            className="w-fit bg-pink-800 md:p-2 p-1 rounded-lg hover:bg-pink-900 m-1 md:min-w-72 transition-colors duration-500 relative"
                        >
                            <a
                                href={link.link}

                                className="cursor-pointer block"
                            >
                                <span className='md:inline hidden'>DownLoad - </span>
                                <span className='font-bold text-white'> {link.quality} </span>
                                - {link.type} -
                                <span className='font-bold text-white'> {link.size} </span>
                            </a>
                        </li>
                    ))}
                </ul>
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
