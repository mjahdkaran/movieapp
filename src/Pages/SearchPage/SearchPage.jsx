import React, { useEffect, useState } from 'react';
import PageLayout from '../../Layout/PageLayout';
import { Search } from '../../utils/icon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchGenreOfMovie } from '../../utils/api';
import { useDebounce } from '../../utils/Hooks/useDebounce.jsx';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQ5MjcxOTA3ZGE1NzQ3MWYzZDY5MDc2OTQzMDMzNCIsIm5iZiI6MTczMjgxODkxOS4yODcwMDAyLCJzdWIiOiI2NzQ4YjdlNzE5OTJkNzEwZDNhY2JlNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Eu9JxWvD7U5Y34dHgMC9JpHHtbeI9NJgZAnz7oa1spY';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [defaultGenres, setDefaultGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const debounceQuery = useDebounce(query, 500);

    const navigate = useNavigate()
    useEffect(() => {
        const fetcheGenres = async () => {
            try {
                let allGenres = await fetchGenreOfMovie()
                setDefaultGenres(allGenres)

            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        }
        fetcheGenres()
    }, [])
    useEffect(() => {
        if (debounceQuery.trim() === '') {
            setMovies([])
            return
        };

        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        query: debounceQuery,
                        include_adult: false
                    },
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`,
                        'Accept': 'application/json'
                    }
                });
                const moviesWithGenres = response.data.results.map(movie => (
                    {
                        ...movie,
                        genres: movie.genre_ids//خودش یک آرایه از id ها است
                            .map(id => defaultGenres.find(genre => genre.id === id)?.name)
                            .filter(name => name !== null)
                    }
                ))

                setMovies(moviesWithGenres);
                console.log('moviegnre', moviesWithGenres[1].genres.join(','))
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();

    }, [debounceQuery, defaultGenres]);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };
    return (
        <PageLayout>
            <div className='mt-28 px-10 text-white'>
                <div className='flex border-b p-2 w-full lg:w-1/3'>
                    <Search />
                    <input
                        type="text"
                        placeholder='write the name of movie or series'
                        className='w-full bg-inherit outline-none px-2'
                        value={query}
                        onChange={handleSearchChange}
                    />
                </div>
                <ul className='mt-10'>
                    {loading ? (
                        <li>Loading...</li>
                    ) : (
                        movies.map((movie) => (

                            <li key={movie.id} className='flex border-b border-gray-500 p-4'
                                onClick={() => navigate('/m/' + movie.id, { state: movie })}
                            >
                                <img className='w-28 h-40 min-w-28 object-cover rounded-md'
                                    src={`http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${movie.backdrop_path}`} alt=" Posther" />
                                <div className='p-2'>
                                    <p className='font-bold text-lg'> {movie.title} - <span className='font-normal'>({movie.original_title}) - {movie.release_date}</span> </p>
                                    <div className='my-3'>
                                        {movie.genres && movie.genres.map(g =>
                                            <span key={movie.id} className='bg-white rounded-full text-sm bg-opacity-30 p-1 mr-2'>{g}</span>)}
                                    </div>
                                    <p className='my-2'><span className='font-bold  text-pink-500'>IMDB  : </span> {movie.vote_average}</p>

                                    <p className=' w-full lg:w-2/3'>{movie.overview} </p>


                                    <div className='flex'>

                                    </div>




                                </div>
                            </li>


                        ))
                    )}
                </ul>
            </div>
        </PageLayout>
    );
}
