import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PosterCard({ movieobj,width='w-44' }) {

    const navigate = useNavigate()
    // ساخت آدرس کامل برای تصویر
    const imageUrl = movieobj.backdrop_path
        ? `http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${movieobj.backdrop_path}` // ترکیب URL پایه با مسیر تصویر
        : 'https://via.placeholder.com/500x750?text=No+Image'; // اگر تصویر وجود نداشت، یک تصویر پیش‌فرض نمایش می‌دهیم

    return (
        <div className='flex flex-col mr-4' onClick={() => navigate('/m/' + movieobj.id, { state: movieobj.id })}>
            <div className={`relative h-56 ${width} md:h-56 md:w-44 rounded-md   `}>

                {/* تصویر اصلی */}
                <img
                    src={imageUrl}
                    alt="Poster"
                    className="w-full h-full rounded-md object-cover"
                />

                {/* پوشش شفاف و اطلاعاتی که روی عکس می‌آید */}
                <div className="absolute top-0 left-0 w-full h-full rounded-md p-2  bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-start justify-end">
                    <p className="text-white font-bold text-sm ">IMDB:{movieobj.vote_average} </p>
                    <p className="text-white font-bold text-sm">ReleaseDate:{movieobj.release_date||movieobj.first_air_date} </p>
                    {/* <p className="text-white font-bold text-lg">info3 </p>
                    <p className="text-white font-bold text-lg">info4 </p> */}

                </div>


            </div>
            <p className={`text-white font-bold my-2 flex flex-wrap justify-center ${width} md:w-44`} > {movieobj.title||movieobj.name}</p>
        </div>

    );
}
