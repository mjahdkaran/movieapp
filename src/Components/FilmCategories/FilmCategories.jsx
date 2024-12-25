import React, { useEffect, useState } from 'react';
import PosterCard from '../PosterCard/PosterCard';
import { Rdirection } from '../../utils/icon';
import { fetchMovieByCategory, fetchGenreOfMovie } from '../../utils/api'
import './FilmCategories.css'
import { useNavigate } from 'react-router-dom';

export default function FilmCategories({ title }) {
    const [movies, setMovies] = useState([]); // ذخیره فیلم‌ها
    const [isLoading, setIsLoading] = useState(true); // مدیریت وضعیت بارگذاری
    const navigate = useNavigate()
    const endpoints = {
        'up coming': 'upcoming',
        'Top Rated': 'top_rated',
        'Popular': 'popular',
        'Now Playing': 'now_playing',
    };

    const endpoint = endpoints[title] || 'upcoming'; // مقدار پیش‌فرض

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);

                // نقشه‌دهی عنوان به مسیر API


                // ارسال درخواست به API
                const data = await fetchMovieByCategory(endpoint, 1)
                // console.log(data)
                // ذخیره داده‌ها
                let sliceData = data.slice(0, 6)
                setMovies(sliceData);
                // console.log(data)
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };


        fetchMovies();

    }, [title]);

    return (
        <div className=" scroll-container bg-black bg-opacity-95 text-white px-10 py-4">
            {/* عنوان دسته‌بندی */}
            <div className="flex justify-between">
                <p className="font-medium text-2xl hover:text-pink-500 cursor-pointer"
                    onClick={() => navigate('/movieapp/' + endpoint)}
                >{title}</p>
                <div className="flex items-center font-medium text-lg text-pink-500 hover:text-pink-600 cursor-pointer"
                    onClick={() => navigate('/movieapp/' + endpoint, { state: title })}
                >

                    See All
                    <span className="m-2">
                        <Rdirection />
                    </span>
                </div>
            </div>

            {/* نمایش فیلم‌ها */}
            <div className="flex overflow-x-auto justify-start space-x-4 py-4">
                {isLoading ? (
                    <>
                        <p className='text-center'>Loading...</p>
                        <div className="animate-spin border-4 border-t-4 border-gray-300 rounded-full w-14 h-14 border-t-pink-500"></div>
                    </>

                ) : (
                    movies.map((movie) => (
                        <PosterCard
                            key={movie.id}
                            movieobj={movie} // ارسال آبجکت فیلم به PosterCard
                        />
                    ))
                )}
            </div>
        </div>
    );
}




