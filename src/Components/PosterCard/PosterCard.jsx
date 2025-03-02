import React from 'react';
import { useNavigate } from 'react-router-dom';

const defaultStyle = {
    width: 'w-44',
    mdWidth: 'w-44',
    height: 'h-56',
    mdHeight: 'h-56',
    textSize: 'text-md',
    mdTextSize: 'text-md',
    detailTextSize:'text-sm'
};
export default function PosterCard({ movieobj, type, style = defaultStyle }) {

    const navigate = useNavigate()

    const navigateHandler = () => {
        type === 'movie' ? navigate('/m/' + movieobj.id, { state: movieobj.id }) : navigate('/s/' + movieobj.id, { state: movieobj.id })
    }
    // ساخت آدرس کامل برای تصویر
    const imageUrl = movieobj.backdrop_path
        ? `http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${movieobj.backdrop_path}` // ترکیب URL پایه با مسیر تصویر
        : 'https://via.placeholder.com/500x750?text=No+Image'; // اگر تصویر وجود نداشت، یک تصویر پیش‌فرض نمایش می‌دهیم

    return (
        <div className='flex flex-col mr-4' onClick={navigateHandler}>
            <div className={`relative ${style.height} ${style.width} md:${style.mdHeight} md:${style.mdWidth} rounded-md   `}>

                {/* تصویر اصلی */}
                <img
                    src={imageUrl}
                    alt="Poster"
                    className="w-full h-full rounded-md object-cover"
                />

                {/* پوشش شفاف و اطلاعاتی که روی عکس می‌آید */}
                <div className="absolute top-0 left-0 w-full h-full rounded-md p-2  bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-start justify-end">
                    <p className={`text-white font-bold ${style.detailTextSize} `}>IMDB:{movieobj.vote_average} </p>
                    <p className={`text-white font-bold ${style.detailTextSize}`}>ReleaseDate:{movieobj.release_date || movieobj.first_air_date} </p>
                    {/* <p className="text-white font-bold text-lg">info3 </p>
                    <p className="text-white font-bold text-lg">info4 </p> */}

                </div>


            </div>
            <p className={`text-white ${style.textSize} md:${style.mdTextSize} font-bold my-2 flex flex-wrap justify-center ${style.width} md:${style.mdWidth}`} > {movieobj.title || movieobj.name}</p>
        </div>

    );
}
