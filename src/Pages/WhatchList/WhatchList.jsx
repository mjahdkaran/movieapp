import React, { useEffect, useState } from 'react';
import PageLayout from '../../Layout/PageLayout';
import { Trash } from '../../utils/icon';
import { fetchMovieById, fetchSeriesById, getList, removeMovieFromPlaylist } from '../../utils/api';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function WhatchList() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [playListArr, setPlayListArr] = useState([]);
    const [movieDetailsArr, setMovieDetailsArr] = useState([]);
    const [moviesList, setMoviesList] = useState([])
    const [seriesList, setSeriesList] = useState([])
    //  گرفتن پلی‌لیست
    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const playList = await getList(token, 2);
                setSeriesList(playList.filter(movie => movie.movieType === 2))
                setMoviesList(playList.filter(movie => movie.movieType === 1))
                setPlayListArr(playList);
            } catch (error) {
                console.error('Error getting playlist:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

    // 📌 گرفتن جزئیات فیلم‌ها
    useEffect(() => {
        if (playListArr.length === 0) {
            setMovieDetailsArr([]); // لیست فیلم‌ها رو خالی کن
            return;
        }

        const fetchMovieDetails = async () => {

            try {
                const seriesDetail = await Promise.all(seriesList.map(async (movie) => {
                    const fetcheSeries = await fetchSeriesById(movie.id)
                    return { ...fetcheSeries, movieType: 2 }
                }))
                const moviesDetail = await Promise.all(moviesList.map(async (movie) => {
                    const fetchMovies = await fetchMovieById(movie.id)
                    return { ...fetchMovies, movieType: 1 }
                }))

                const allMoviesDetail = [...moviesDetail, ...seriesDetail]
                console.log('allMoviesDetail', allMoviesDetail)
                setMovieDetailsArr(allMoviesDetail)


            }

            catch (error) {
                console.error('Error fetching movie details in FavoritList components', error)

            }
        }

        fetchMovieDetails();
    }, [playListArr]);

    // 📌 حذف فیلم از پلی‌لیست
    const removeMovie = async (movieId, e) => {
        e.stopPropagation();
        try {
            await removeMovieFromPlaylist(token, movieId);
            setPlayListArr(prev => prev.filter(id => id !== movieId));
            setMovieDetailsArr(prev => prev.filter(movie => movie.id !== movieId));
        } catch (error) {
            console.error('Failed to remove movie:', error);
        }
    };

    return (
        <PageLayout>
            <div className='flex flex-col w-screen max-w-screen-2xl overflow-x-hidden'>
                <div className='flex justify-center md:justify-start mt-20 px-10 py-6 text-white font-mono font-bold text-xs md:text-sm'>
                    <p className='mr-4 md:mr-9 p-2 bg-pink-800 border border-pink-600 rounded-md cursor-pointer'>
                        Whatch <span className='hidden md:inline-block'>List</span>
                    </p>
                    <p
                        className='border border-pink-600 rounded-md p-2 cursor-pointer hover:text-pink-800'
                        onClick={() => navigate('/liked')}
                    >
                        Favorite <span className='hidden md:inline-block'>List</span>
                    </p>
                </div>

                {isLoading ? (
                    <div className='flex flex-col justify-center items-center'>
                        <div className="animate-spin border-4 border-t-4 border-gray-300 rounded-full w-14 h-14 border-t-pink-500"></div>
                        <p className='text-center text-white'>Loading...</p>
                    </div>
                ) : movieDetailsArr.length === 0 ? (
                    <p className='text-center text-white mt-20'>Your Watch List is empty.</p>
                ) : (
                    <div className='flex-1 flex flex-wrap justify-center md:justify-start w-screen overflow-x-hidden'>
                        {movieDetailsArr.map(movie => (
                            <div
                                key={`${movie.movieType}-${movie.id}`}
                                className='relative w-32 sm:w-60 rounded-md m-5 mb-20 overflow-hidden cursor-pointer'
                                onClick={() => {
                                    movie.movieType === 1 ? navigate('/m/' + movie.id, { state: movie.id }) : navigate('/s/' + movie.id, { state: movie.id }
                                    )
                                }}                            >
                                <div className='relative w-full h-32 md:h-80 object-cover'>
                                    <p className='absolute bottom-0 left-0 px-1 rounded-sm bg-pink-950 text-sm text-white'>{movie.movieType === 1 ? 'movie' : 'series'}</p>

                                    <img
                                        src={`http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${movie.backdrop_path}`}
                                        alt={movie.title}
                                        className='w-full h-full object-cover'
                                    />
                                </div>

                                <div className='flex justify-between items-center py-1 px-2 text-white bg-gray-950 rounded-br-md h-14 text-xs md:py-2 md:px-3 md:h-20 md:text-lg'>
                                    <p className='flex flex-wrap w-5/6'>{movie.title||movie.name}</p>
                                    <button
                                        className='hover:bg-pink-300 text-pink-600 rounded-full'
                                        onClick={(e) => removeMovie(movie.id, e)}
                                    >
                                        <Trash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
