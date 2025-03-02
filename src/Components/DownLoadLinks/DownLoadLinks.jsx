import React from 'react';

export default function DownLoadLinks({ downloadLinksArray }) {
    const sortedLinks = [...downloadLinksArray].sort((a, b) => {
        const qualityA = parseInt(a.quality); 
        const qualityB = parseInt(b.quality);
        return qualityA - qualityB; // مرتب‌سازی صعودی
    });
    const handleLinkClick = (event, url) => {
        event.preventDefault(); // جلوگیری از باز شدن لینک مستقیم
        navigator.clipboard.writeText(url)
            .then(() => alert("لینک دانلود در کلیپ‌بورد کپی شد!"))
            .catch((err) => console.error("خطا در کپی کردن لینک:", err));
    };

    return (
        <div className='p-1'>
            <ul className='flex flex-wrap justify-start md:justify-beween text-gray- text-xs'>
                {sortedLinks.map((link, index) => (
                    <li key={index} className=' w-fit  bg-pink-800 md:p-2 p-1 rounded-lg hover:bg-pink-900 m-1 md:min-w-72  '>
                        <a
                            href={link.link}
                            onClick={(e) => handleLinkClick(e, link.link)}
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


            
        </div>
    );
}
