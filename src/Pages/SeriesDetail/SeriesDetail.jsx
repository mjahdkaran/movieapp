import React, { useEffect, useState } from 'react';
import PageLayout from '../../Layout/PageLayout';
import style from './SeriesDetail.module.css';
import { Back, Comment, Download, Heart, InFormation, Save, } from '../../utils/icon';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchSeriesById, saveMovieTolist, removeMovieFromList, checkSavedOrLiked, getComments, getChildCommentsByParentId } from '../../utils/api';
import { useAuth } from '../../Context/AuthContext';
import CommentSection from '../../Components/CommentSection/CommentSection';
import AddComment from '../../Components/AddComment/AddComment';
import SimilarMovies from '../../Components/SimilarMovies/SimilarMovies';
import Actors from '../../Components/Actors/Actors';

export default function SeriesDetails() {
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showReplies, setShowReplies] = useState({}); // وضعیت نمایش کامنت‌های فرزند
    const [showTab, setShowTab] = useState({ info: false, download: false, comments: false });
    const [showOverView, setShowOverView] = useState(false)
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
        const fetchData = async () => {
            try {
                if (!movieId) return;
                const movieDetails = await fetchSeriesById(movieId);
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
                const isMovieSaved = await checkSavedOrLiked(token, 2, details.id, 2);
                setIsSaved(isMovieSaved);
                const isMovieLiked = await checkSavedOrLiked(token, 1, details.id, 2);
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
            const response = await getComments(movieId, 2)
            setAllCommentsArray(response)
        } catch (error) {
            console.error('Error getting series comments', error)
        }
    }
    //-------------
    const fetchChildComments = async (parentId) => {
        try {
            const response = await getChildCommentsByParentId(parentId)

            setChildComments(prev => ({
                ...prev,
                [parentId]: response // ذخیره‌ی کامنت‌های فرزند بر اساس parentId
            }));

            setShowReplies(prev => ({
                ...prev,
                [parentId]: true // نمایش کامنت‌های فرزند این کامنت
            }));
            console.log(response)
        } catch (error) {
            console.error('Error getting child comments', error)
        }
    }
    //----
    const handleTabChange = (tab) => {
        setShowTab({ info: false, download: false, comments: false, [tab]: true });

        if (tab === "comments" && allCommentsArray.length === 0) {
            fetchComments(); // فقط اگر قبلاً لود نشده باشد

        }
    };


    const saveMovie = async () => {
        try {
            const success = await saveMovieTolist(token, 2, details.id, 2);
            if (success) setIsSaved(true);
        } catch (error) {
            console.error('Failed to save movie:', error);
        }
    };

    const removeMovie = async () => {
        try {
            const success = await removeMovieFromList(token, 2, details.id, 2);
            if (success) setIsSaved(false);
        } catch (error) {
            console.error('Failed to remove movie:', error);
        }
    };

    const likeMovie = async () => {
        try {
            const success = await saveMovieTolist(token, 1, details.id, 2);
            if (success) setIsLiked(true);
        } catch (error) {
            console.error('Failed to like movie:', error);
        }
    };

    const unLikeMovie = async () => {
        try {
            const success = await removeMovieFromList(token, 1, details.id, 2);
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
                                <img className="rounded-md h-full w-full object-cover" src={imageUrl} alt={details.name} />
                            </div>
                            <div className="text-white flex flex-1 flex-col mx-0 mt-4 md:mx-6">
                                <p>
                                    <span className="text-lg font-bold text-pink-600 mr-2">Film:</span> {details.name}({details.first_air_date} <span className='font-extrabold'> _ </span>{details.last_air_date} )
                                </p>
                                <p className='my-2'><span className='font-bold  text-pink-500'>IMDB  : </span>   {details.vote_average.toFixed(1).replace(/\.0$/, '')} <span className='text-gray-500'>/10</span></p>
                                <p>{details.adult ? 'Suitable for over 18 years old.' : 'Suitable for all ages'}</p>
                                <p>
                                    <span className="text-lg font-bold text-pink-600 mr-2">Seasons:</span>
                                    {details.number_of_seasons}</p>

                                <p>
                                    <span className="text-lg font-bold text-pink-600 mr-2">Episodes:</span>
                                    {details.number_of_episodes}</p>
                                <div>
                                    <span className="text-lg font-bold text-pink-600 mr-2">Story Overview:</span>
                                    {showOverView && details.overview.length >= 200 ? details.overview : details.overview.slice(0, 200)}
                                    <button className='text-gray-400 font-bold mx-1' onClick={() => setShowOverView(!showOverView)}>{showOverView ? 'less' : 'more...'}</button>
                                </div>

                                <div className="flex">
                                    {thisMovieGenre.map(genre => (
                                        <span key={genre.id} className="flex justify-center items-center bg-white rounded-full text-xs md:text-sm bg-opacity-30 px-2 m-1">
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
                                <span className='hidden md:inline-block'
                                    onClick={() => handleTabChange('download')}>Download</span>

                            </button>
                        </div>

                    </div>

                </div>
            </div>
            {/* -------------------bottom section------------------------ */}
            <div className='w-full md:px-32 text-gray-400 '>

                <ul className='flex justify-around list-none text-xs md:text-lg font-bold  '>
                    <li className={`flex cursor-pointer items-center pt-3 px-1 rounded-md md:p-2 ${showTab.info && 'text-pink-600 bg-gray-900'}`} onClick={() => handleTabChange("info")}><InFormation /> InFormation</li>
                    <li className={`flex cursor-pointer items-center pt-3 px-1 rounded-md md:p-2 ${showTab.download && 'text-pink-600 bg-gray-900'}`} onClick={() => handleTabChange("download")}><Download />DownLoads</li>
                    <li className={`flex cursor-pointer items-center pt-3 px-1 rounded-md md:p-2 ${showTab.comments && 'text-pink-600 bg-gray-900'}`} onClick={() => handleTabChange("comments")}><Comment /> Comments</li>

                </ul>
                {/* --------------content------------ */}
                <div className='bg-gray-900'>
                    {showTab.info && <div><Actors
                        movieId={movieId}
                        movieType='tv' /></div>}
                    {showTab.download && <div>this is download</div>}
                    {showTab.comments &&
                        <div className='  w-full  md:px-36  text-white  pb-24 '>


                            <div className='    rounded-sm p-2 w'>
                                {/* ------Add comments------- */}

                                <AddComment
                                    parentComment={parentComment}
                                    setParentComment={setParentComment}
                                    movieId={movieId}
                                    movieType={2}
                                    setAllCommentsArray={setAllCommentsArray}
                                    fetchComments={fetchComments}
                                    fetchChildComments={fetchChildComments}
                                />
                                {/* ------Add comments------- */}

                                {/* ------users comments------ */}
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
                                {/* ------users comments------ */}

                            </div>
                        </div>
                    }

                </div>{/* --------------content------------ */}
                {/* similar movies section */}
                <div><SimilarMovies
                    movieType='tv'
                    movieId={details.id}
                /></div>{/* similar movies section */}
            </div>
        </PageLayout>
    );
}
