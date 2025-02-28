import React, { useEffect, useState } from 'react';
import PageLayout from '../../Layout/PageLayout';
import style from './MovieDetails.module.css';
import { Back, Comment, Download, Heart, Save, Send, Trash } from '../../utils/icon';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieById, fetchGenreOfMovie, checkSavedMovie, saveMovieToPlaylist, removeMovieFromPlaylist, saveMovieToLikedList, removeMovieFromLikedList, checkLikedMovie } from '../../utils/api';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import CommentSection from '../../Components/CommentSection/CommentSection';
import AddComment from '../../Components/AddComment/AddComment';

export default function Movie() {
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showReplies, setShowReplies] = useState({}); // وضعیت نمایش کامنت‌های فرزند
    const [thisMovieGenre, setThisMovieGenre] = useState([]);
    const [details, setDetails] = useState(null);
    const [comment] = useState('');
    const [allCommentsArray, setAllCommentsArray] = useState([])
    const [childComments, setChildComments] = useState({}); // کامنت‌های فرزند هر کامنت

    const [parentComment, setParentComment] = useState({})
    const { token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const movieId = location.state;

    useEffect(() => {
        // console.log('user image',userImage)
        fetchComments()

        const fetchData = async () => {
            console.log(parentComment)
            try {
                if (!movieId) return;
                const movieDetails = await fetchMovieById(movieId);
                setDetails(movieDetails);
                if (movieDetails.genres) {
                    setThisMovieGenre(movieDetails.genres)
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchData();
    }, [token, movieId, childComments, comment]);

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
    //---------------
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://65.109.177.24:2024/api/comment/movie/${movieId}`)
            setAllCommentsArray(response.data)
        } catch (error) {
            console.error('Error getting comments', error)
        }
    }
    //-------------
    const fetchChildComments = async (parentId) => {
        try {
            const response = await axios.get(`http://65.109.177.24:2024/api/comment/parent/${parentId}`)

            setChildComments(prev => ({
                ...prev,
                [parentId]: response.data // ذخیره‌ی کامنت‌های فرزند بر اساس parentId
            }));

            setShowReplies(prev => ({
                ...prev,
                [parentId]: true // نمایش کامنت‌های فرزند این کامنت
            }));
            console.log(response.data)
        } catch (error) {
            console.error('Error getting child comments', error)
        }
    }

    const addComment = async () => {
        if (!comment) return;
        try {
            const response = await axios.post('http://65.109.177.24:2024/api/comment', {
                "movieId": movieId,
                "Description": comment,
                "parentId": parentComment?.id || null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('added comment successfully');


            setComment('')
            setParentComment(null)
            if (parentComment?.id) {
                fetchChildComments(parentComment.id);
            } else {
                fetchComments(); // کامنت‌های اصلی را آپدیت کن
            }

        } catch (error) {
            console.log('add Comment failed', error)

        }
    }
    const removeComment = async (id, parentId = null) => {
        try {
            const response = await axios.delete(`http://65.109.177.24:2024/api/comment/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('remove comment succesfully')
            if (!parentId) {
                fetchComments();
            } else {
                fetchChildComments(parentId);
            }
        } catch (error) {
            console.error('error removing comment ', error)
        }

    }

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
                className=" text-pink-500 mt-24 ml-20 cursor-pointer hover:bg-pink-500 hover:rounded-full hover:text-white"
                onClick={() => navigate(-1)}
            >
                <Back />
            </button>
            <div className="container flex  justify-center items-center  bg-black ">
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
                                <p className='my-2'><span className='font-bold  text-pink-500'>IMDB  : </span>   {details.vote_average.toFixed(1).replace(/\.0$/, '')} <span className='text-gray-500'>/10</span></p>
                                <p>{details.adult ? 'Suitable for over 18 years old.' : 'Suitable for all ages'}</p>
                                <p>
                                    <span className="text-lg font-bold text-pink-600 mr-2">Story Overview:</span>
                                    {details.overview}
                                </p>
                                <div className="flex">
                                    {thisMovieGenre.map(genre => (
                                        <span key={genre.name} className="bg-white rounded-full text-sm bg-opacity-30 px-2 m-1">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-3 p-3  ">
                            <button
                                className={`flex items-center rounded-3xl text-sm font-medium md:w-20 h-8 p-2 m-1 ${isSaved ? 'border-2 border-pink-600 text-pink-600' : 'bg-white bg-opacity-30 text-white'
                                    }`}
                                onClick={isSaved ? removeMovie : saveMovie}
                            >
                                <Save fill={isSaved} />
                                <span className='hidden md:inline-block'> Save</span>

                            </button>
                            <button
                                className={`flex items-center rounded-3xl text-sm font-medium md:w-20 h-8 p-2 m-1 ${isLiked ? 'border-2 border-pink-600 text-pink-600' : 'bg-white bg-opacity-30 text-white'
                                    }`}
                                onClick={isLiked ? unLikeMovie : likeMovie}
                            >
                                <Heart fill={isLiked} />
                                <span className='hidden md:inline-block'>Like</span>

                            </button>
                            <button className="flex items-center bg-white bg-opacity-30 text-white rounded-3xl text-sm md:w-28 h-8 p-2 m-1">
                                <Download />
                                <span className='hidden md:inline-block'>Download</span>

                            </button>
                        </div>

                    </div>

                </div>
            </div>
            {/*------------------- comment section----------------------  */}
            <div className='  w-full  md:px-36  text-white  pb-24 '>
                <p className=' flex  w-full px-5 py-5 text-md md:text-xl font-bold text-pink-600'> <span className='px-3'><Comment /></span>    Comments</p>

                <div className='    rounded-sm p-2 w'>
                    {/* ------user comments------- */}

                    <AddComment 
                    parentComment={parentComment}
                     setParentComment={setParentComment} 
                     movieId={movieId}
                      setAllCommentsArray={setAllCommentsArray}
                      fetchComments={fetchComments}
                      fetchChildComments={fetchChildComments}
                       />
                    {/* ------user comments------- */}
                   
                    <div className=''>
                 <CommentSection
                 allCommentsArray={allCommentsArray}
                 fetchComments={fetchComments}
                 fetchChildComments={fetchChildComments}
                 setParentComment={setParentComment}
                 showReplies={showReplies}
                 childComments={childComments}
                 />
                    </div>

                </div>
            </div>
        </PageLayout>
    );
}
