import React, { useEffect, useState } from 'react';
import PosterCard from '../PosterCard/PosterCard';
import { Rdirection } from '../../utils/icon';
import axios from 'axios';

export default function FilmCategories({ title }) {
    const [movies, setMovies] = useState([]); // ذخیره فیلم‌ها
    const [isLoading, setIsLoading] = useState(true); // مدیریت وضعیت بارگذاری

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);

                // نقشه‌دهی عنوان به مسیر API
                const endpoints = {
                    'up coming': 'upcoming',
                    'Top Rated': 'top_rated',
                    'Popular': 'popular',
                    'Now Playing': 'now_playing',
                };

                const endpoint = endpoints[title] || 'upcoming'; // مقدار پیش‌فرض

                // ارسال درخواست به API
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${endpoint}`,
                    {
                        params: { language: 'en-US', page: 1 },
                        headers: {
                            Authorization:
                                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQ5MjcxOTA3ZGE1NzQ3MWYzZDY5MDc2OTQzMDMzNCIsIm5iZiI6MTczMjgxOTM1Ni4zNDYwODA1LCJzdWIiOiI2NzQ4YjdlNzE5OTJkNzEwZDNhY2JlNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tEStAp_pn_ylRIQ7ldJUWTqBJagt4tJF7gayvkQVLl8',
                        },
                    }
                );

                // ذخیره داده‌ها
                setMovies(response.data.results || []);
                console.log(response.data.results)
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [title]);

    return (
        <div className="bg-black bg-opacity-95 text-white px-10 py-4">
            {/* عنوان دسته‌بندی */}
            <div className="flex justify-between">
                <p className="font-medium text-2xl hover:text-pink-500">{title}</p>
                <div className="flex items-center font-medium text-lg text-pink-500 hover:text-pink-600">
                    See All
                    <span className="m-2">
                        <Rdirection />
                    </span>
                </div>
            </div>

            {/* نمایش فیلم‌ها */}
            <div className="flex overflow-x-auto justify-start space-x-4 py-4">
                {isLoading ? (
                    <p>Loading...</p>
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
