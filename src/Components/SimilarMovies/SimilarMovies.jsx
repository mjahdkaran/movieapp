import React, { useEffect, useState, useRef } from 'react';
import { fetchSimilarMovie } from '../../utils/api';
import PosterCard from '../PosterCard/PosterCard';
import { Left, Right } from '../../utils/icon';

export default function SimilarMovies({ movieType, movieId }) {
    const [similarMovieArray, setSimialrMovieArray] = useState([]);
    const scrollRef = useRef(null);
    
    useEffect(() => {
        const fetchSimilarMovies = async () => {
            try {
                const response = await fetchSimilarMovie(movieType, movieId);
                setSimialrMovieArray(response);
                console.log(response);
            } catch (error) {
                console.error('error fetching similar movies', error);
            }
        };
        fetchSimilarMovies();
    }, [movieType, movieId]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="relative">
            <h1 className='font-bold text-3xl text-pink-400 py-5 mx-2 '>Similar</h1>
            <div className='absolute left-2 top-1/2 transform -translate-y-1/2 z-50 '>
                <button onClick={scrollLeft} className="bg-black bg-opacity-50 rounded-full text-pink-700  p-1 "><Left  /></button>
            </div>
            <div className='flex overflow-x-scroll scrollbar-hide mx-2 py-2 ' ref={scrollRef}>
                {similarMovieArray.map(movie => (
                    <PosterCard
                        key={movie.id}
                        movieobj={movie} // ارسال آبجکت فیلم به PosterCard
                        type='movie'
                        style={{ 
                            width: 'w-32',
                            height: 'h-40',
                            mdWidth: 'w-44',
                            mdHeight: 'h-56',
                            textSize: 'text-xs',
                            mdTextSize: 'text-md',
                            detailTextSize: 'text-xs'
                        }}
                    />
                ))}
            </div>
            <div className='absolute right-2 top-1/2 transform -translate-y-1/2 z-50'>
                <button onClick={scrollRight} className="bg-black bg-opacity-50 rounded-full text-pink-700 text-8xl p-1  "><Right /></button>
            </div>
        </div>
    );
}
