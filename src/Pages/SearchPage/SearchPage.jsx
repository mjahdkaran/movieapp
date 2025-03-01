import React, { useEffect, useRef, useState } from 'react';
import PageLayout from '../../Layout/PageLayout';
import { Search } from '../../utils/icon';
import { useNavigate } from 'react-router-dom';
import { fetchGenreOfMovie, searchingFunction } from '../../utils/api';
import { useDebounce } from '../../utils/Hooks/useDebounce.jsx';

export default function SearchPage() {
    const searchInputRef = useRef(null);
    const [query, setQuery] = useState('');
    const [endpoint, setEndPoint] = useState('all'); // مقدار پیش‌فرض را "all" قرار دهید
    const [movies, setMovies] = useState([]);
    const [defaultGenres, setDefaultGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const debounceQuery = useDebounce(query, 500);

    const navigate = useNavigate();
    if (searchInputRef.current) { searchInputRef.current.focus(); }

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const allGenres = await fetchGenreOfMovie();
                setDefaultGenres(allGenres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        if (debounceQuery.trim() === '') {
            setMovies([]);
            return;
        }

        const fetchMovies = async () => {
            setLoading(true);
            try {
                
                let response = [];

                switch (endpoint) {
                    case 'all':
                        const moviesResponse = await searchingFunction(debounceQuery, 'movie');
                        const seriesResponse = await searchingFunction(debounceQuery, 'tv');
                        response = [...moviesResponse, ...seriesResponse];
                        break;
                    case 'movie':
                        response = await searchingFunction(debounceQuery, 'movie');
                        break;
                    case 'series':
                        response = await searchingFunction(debounceQuery, 'tv');
                        break;
                    default:
                        console.warn('Invalid endpoint:', endpoint);
                        return;
                }

                const moviesWithGenres = response.map(movie => ({
                    ...movie,
                    genres: movie.genre_ids?.map(id =>
                        defaultGenres.find(genre => genre.id === id)?.name
                    ).filter(name => name !== undefined) || []
                }));

                setMovies(moviesWithGenres);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [debounceQuery, defaultGenres, endpoint]); // افزودن `endpoint` به `dependencies`

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleChange = (e) => {
        setEndPoint(e.target.value);
    };

    return (
        <PageLayout>
            <div className='mt-28 px-10 text-white'>
                <div className='flex border-b p-2 w-full lg:w-1/3'>
                    <Search />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder='Write the name of movie or series'
                        className='w-full bg-inherit outline-none px-2'
                        value={query}
                        onChange={handleSearchChange}
                    />
                    <select
                        name="movieType"
                        id="movieType"
                        className='bg-inherit outline-none border-none rounded-none'
                        onChange={handleChange}
                        value={endpoint}
                    >
                        <option value="all" className='bg-black outline-none border-none rounded-none'>All</option>
                        <option value="series" className='bg-black outline-none border-none rounded-none'>Series</option>
                        <option value="movie" className='bg-black outline-none border-none rounded-none'>Movie</option>
                    </select>
                </div>
                <ul className='mt-10'>
                    {loading ? (
                        <li>Loading...</li>
                    ) : (
                        movies.map((movie) => (
                            <li key={movie.id} className='flex border-b flex-col md:flex-row border-gray-500 p-4'
                                onClick={() => navigate('/m/' + movie.id, { state: movie.id })}
                            >
                                <img className='w-full md:w-28 h-40 min-w-28 object-cover rounded-md'
                                    src={`http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${movie.backdrop_path}`} alt="Poster" />
                                <div className='p-2'>
                                    <p className='font-bold text-md md:text-lg'>
                                        {movie.title || movie.name} -
                                        <span className='text-sm md:text-md font-normal'>
                                            ({movie.original_title || movie.original_name}) - {movie.release_date || movie.first_air_date}
                                        </span>
                                    </p>
                                    <div className='my-3 flex flex-wrap'>
                                        {movie.genres && movie.genres.map((g, index) =>
                                            <span key={index} className='bg-white rounded-full text-sm bg-opacity-30 p-1 mr-2 mt-1'>{g}</span>
                                        )}
                                    </div>
                                    <p className='my-2'>
                                        <span className='font-bold text-pink-500'>IMDB:</span>
                                        {movie.vote_average?.toFixed(1).replace(/\.0$/, '')} <span className='text-gray-500'>/10</span>
                                    </p>
                                    <p className='w-full lg:w-2/3 text-sm'>
                                        {movie.overview?.length > 100 ? movie.overview.slice(0, 100) + ' ...' : movie.overview}
                                    </p>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </PageLayout>
    );
}
