import React, { useEffect, useState } from 'react';
import PageLayout from '../../Layout/PageLayout';
import style from './MovieDetails.module.css';
import { Back, Download, Heart, Save } from '../../utils/icon';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieById, fetchGenreOfMovie, checkSavedMovie, saveMovieToPlaylist, removeMovieFromPlaylist, saveMovieToLikedList, removeMovieFromLikedList, checkLikedMovie } from '../../utils/api';
import { useAuth } from '../../Context/AuthContext';

export default function Movie() {
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [thisMovieGenre, setThisMovieGenre] = useState([]);
    const [details, setDetails] = useState(null);
    const { token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const movieId = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!movieId) return;
                const movieDetails = await fetchMovieById(movieId);
                setDetails(movieDetails);

                const genres = await fetchGenreOfMovie();
                if (movieDetails.genre_ids) {
                    setThisMovieGenre(
                        movieDetails.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).filter(Boolean)
                    );
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchData();
    }, [token, movieId]);

    useEffect(() => {
        const fetchData = async () => {
            if (!details?.id) return;
            try {
                const isMovieSaved = await checkSavedMovie(token, details.id);
                setIsSaved(isMovieSaved);
                const isMovieLiked = await checkLikedMovie(token, details.id);
                setIsLiked(isMovieLiked);
            } catch (error) {
                console.error('Error checking saved/liked status:', error);
            }
        };

        fetchData();
    }, [token, details?.id]);

    const saveMovie = async () => {
        try {
            const success = await saveMovieToPlaylist(token, details.id);
            if (success) setIsSaved(true);
        } catch (error) {
            console.error('Failed to save movie:', error);
        }
    };

    const removeMovie = async () => {
        try {
            const success = await removeMovieFromPlaylist(token, details.id);
            if (success) setIsSaved(false);
        } catch (error) {
            console.error('Failed to remove movie:', error);
        }
    };

    const likeMovie = async () => {
        try {
            const success = await saveMovieToLikedList(token, details.id);
            if (success) setIsLiked(true);
        } catch (error) {
            console.error('Failed to like movie:', error);
        }
    };

    const unLikeMovie = async () => {
        try {
            const success = await removeMovieFromLikedList(token, details.id);
            if (success) setIsLiked(false);
        } catch (error) {
            console.error('Failed to remove liked movie:', error);
        }
    };

    if (!details) {
        return (
            <PageLayout>
                <div className="flex justify-center items-center h-screen text-white text-lg">Loading...</div>
            </PageLayout>
        );
    }

    const imageUrl = details.backdrop_path && `http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${details.backdrop_path}`;
    const posterUrl = details.poster_path && `http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${details.poster_path}`;

    return (
        <PageLayout>
            <button
                className="text-pink-500 mt-24 ml-20 cursor-pointer hover:bg-pink-500 hover:rounded-full hover:text-white"
                onClick={() => navigate(-1)}
            >
                <Back />
            </button>
            <div className="container flex justify-center bg-black h-screen">
                <div className={`${style.Movie_summary} h-2/3 w-4/5`} style={{ backgroundImage: `url(${posterUrl})` }}>
                    <div className="relative z-10 p-6 border-b flex flex-col  ">
                       <div className='flex flex-col md:flex-row '>
                       <div className="h-80 w-60 rounded-md  ">
                            <img className="rounded-md h-full w-full object-cover" src={imageUrl} alt={details.title} />
                        </div>
                        <div className="text-white flex flex-1 flex-col mx-0 mt-4 md:mx-6">
                            <p>
                                <span className="text-lg font-bold text-pink-600 mr-2">Film:</span> {details.title}
                            </p>
                            <p>{details.adult ? 'Suitable for over 18 years old.' : 'Suitable for all ages'}</p>
                            <p>
                                <span className="text-lg font-bold text-pink-600 mr-2">Story Overview:</span>
                                {details.overview}
                            </p>
                            <div className="flex">
                                {thisMovieGenre.map(genre => (
                                    <span key={genre} className="bg-white rounded-full text-sm bg-opacity-30 px-2 m-1">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                       </div>
                        <div className="flex mt-3 p-3  ">
                        <button
                            className={`flex items-center rounded-3xl text-sm font-medium w-20 h-8 p-2 m-1 ${
                                isSaved ? 'border-2 border-pink-600 text-pink-600' : 'bg-white bg-opacity-30 text-white'
                            }`}
                            onClick={isSaved ? removeMovie : saveMovie}
                        >
                            <Save fill={isSaved} />
                            Save
                        </button>
                        <button
                            className={`flex items-center rounded-3xl text-sm font-medium w-20 h-8 p-2 m-1 ${
                                isLiked ? 'border-2 border-pink-600 text-pink-600' : 'bg-white bg-opacity-30 text-white'
                            }`}
                            onClick={isLiked ? unLikeMovie : likeMovie}
                        >
                            <Heart fill={isLiked} />
                            Like
                        </button>
                        <button className="flex items-center bg-white bg-opacity-30 text-white rounded-3xl text-sm w-28 h-8 p-2 m-1">
                            <Download />
                            Download
                        </button>
                    </div>
                    </div>
                    
                </div>
            </div>
        </PageLayout>
    );
}
