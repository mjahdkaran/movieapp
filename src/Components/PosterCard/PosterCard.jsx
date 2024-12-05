import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PosterCard({ movieobj }) {
    const { adult, backdrop_path, genre_ids, id, original_language, original_title, popularity, poster_path,
        release_date, title, vote_average } = movieobj
    const navigate = useNavigate()
    // ساخت آدرس کامل برای تصویر
    const imageUrl = backdrop_path
        ? `https://image.tmdb.org/t/p/w500${backdrop_path}` // ترکیب URL پایه با مسیر تصویر
        : 'https://via.placeholder.com/500x750?text=No+Image'; // اگر تصویر وجود نداشت، یک تصویر پیش‌فرض نمایش می‌دهیم

    return (
        <div className='flex flex-col' onClick={() => navigate('/movieapp/m' + id, { state: movieobj })}>
            <div className="relative h-56 w-44 rounded-md ">

                {/* تصویر اصلی */}
                <img
                    src={imageUrl}
                    //{imageUrl}
                    // "../Bad_Boys_for_Life_poster.jpg"
                    alt="Poster"
                    className="w-full h-full rounded-md object-cover"
                />

                {/* پوشش شفاف و اطلاعاتی که روی عکس می‌آید */}
                <div className="absolute top-0 left-0 w-full h-full rounded-md p-2  bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-start justify-end">
                    <p className="text-white font-bold text-sm ">IMDB:{vote_average} </p>
                    <p className="text-white font-bold text-sm">ReleaseDate:{release_date} </p>
                    {/* <p className="text-white font-bold text-lg">info3 </p>
                    <p className="text-white font-bold text-lg">info4 </p> */}

                </div>


            </div>
            <p> {title}</p>
        </div>

    );
}
