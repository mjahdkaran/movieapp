import React, { useDeferredValue, useEffect, useState } from 'react';
import PageLayout from '../../Layout/PageLayout';
import { Search } from '../../utils/icon';
import axios from 'axios';
import PosterCard from '../../Components/PosterCard/PosterCard';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQ5MjcxOTA3ZGE1NzQ3MWYzZDY5MDc2OTQzMDMzNCIsIm5iZiI6MTczMjgxODkxOS4yODcwMDAyLCJzdWIiOiI2NzQ4YjdlNzE5OTJkNzEwZDNhY2JlNmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Eu9JxWvD7U5Y34dHgMC9JpHHtbeI9NJgZAnz7oa1spY';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const deferredQuery = useDeferredValue(query);  // استفاده از deferredQuery

    const navigate=useNavigate()

    useEffect(() => {
        if (deferredQuery.trim() === '') {
            setMovies([])
            return};

        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        query: deferredQuery,
                        include_adult: false
                    },
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`,
                        'Accept': 'application/json'
                    }
                });
                setMovies(response.data.results);
                console.log(response.data.results)
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [deferredQuery]);

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

                            <li className='flex border-b border-gray-500 p-4' 
                            onClick={() => navigate('/movieapp/m/' + movie.id, { state: movie })}
                            >
                                <img className='w-28 h-40 object-cover rounded-md'
                                 src={`http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${movie.backdrop_path}`} alt=" Posther" />
                                <div className='p-2'>
                                    <p><span className='font-bold  text-pink-500'>Title : </span> {movie.title}</p>
                                    <p><span className='font-bold  text-pink-500'>Orginal Title : </span> {movie.original_title}</p>

                                    <p><span className='font-bold  text-pink-500'>Release date  : </span> {movie.release_date}</p>
                                    <p><span className='font-bold  text-pink-500'>IMDB  : </span> {movie.vote_average}</p>
                                    




                                </div>
                            </li>


                        ))
                    )}
                </ul>
            </div>
        </PageLayout>
    );
}
