import React, { useEffect, useState } from 'react';
import PosterCard from '../PosterCard/PosterCard';
import { Rdirection } from '../../utils/icon';
import { useNavigate } from 'react-router-dom';

export default function FilmCategories({ title, endpoint, fetchMoviesFunction,type }) {
    const [movies, setMovies] = useState([]); // ذخیره فیلم‌ها
    const [isLoading, setIsLoading] = useState(true); // مدیریت وضعیت بارگذاری
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const data = await fetchMoviesFunction(endpoint, 1); // دریافت داده‌ها با استفاده از تابع ورودی
                let sliceData = data.slice(0, 6); // برش داده‌ها
                setMovies(sliceData); // ذخیره داده‌ها
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false); // غیرفعال کردن بارگذاری
            }
        };

        fetchMovies(); // فراخوانی تابع
    }, [title, endpoint, fetchMoviesFunction]); // زمانی که title، endpoint یا fetchMoviesFunction تغییر کند، دوباره اجرا می‌شود

    return (
        <div className="scroll-container bg-black bg-opacity-95 text-white px-10 py-4">
            {/* عنوان دسته‌بندی */}
            <div className="flex justify-between">
                <p
                    className="font-bold text-2xl text-pink-400 hover:text-pink-500 cursor-pointer"
                    onClick={() => navigate('/' + endpoint, { state: {title,type}})}
                >
                    {title}
                </p>
                <div
                    className="flex items-center font-medium text-lg text-pink-500 hover:text-pink-600 cursor-pointer"
                    onClick={() => navigate('/' + endpoint, { state: {title,type} })}
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
                        <p className="text-center">Loading...</p>
                        <div className="animate-spin border-4 border-t-4 border-gray-300 rounded-full w-14 h-14 border-t-pink-500"></div>
                    </>
                ) : (
                    movies.map((movie) => (
                        <PosterCard
                            key={movie.id}
                            movieobj={movie} // ارسال آبجکت فیلم به PosterCard
                            type={type}
                            
                        />
                    ))
                )}
            </div>
        </div>
    );
}
