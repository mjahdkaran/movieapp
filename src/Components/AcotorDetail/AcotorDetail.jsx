import React, { useEffect, useState } from 'react';
import { fetchActorDetial, fetchActorMovies } from '../../utils/api';
import { useLocation } from 'react-router-dom';
import PageLayout from '../../Layout/PageLayout';

export default function ActorDetail() {
    const location = useLocation();
    const actorId = location.state;
    const [actorObj, setActorObj] = useState(null);
    const [movies, setMovies] = useState(null)
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false); // State for toggling full text

    useEffect(() => {
        getActorDetail();
        getActorMovies()
    }, []);

    const getActorDetail = async () => {
        try {
            const response = await fetchActorDetial(actorId);
            console.log('actorobj: ', response)
            setActorObj(response);
        } catch (error) {
            console.error('Error in getting Actor Detail', error);
        } finally {
            setLoading(false);
        }
    };

    const getActorMovies = async () => {
        try {
            const response = await fetchActorMovies(actorId,'movie_credits');
            console.log('moooovies',response.cast)
            setMovies(response.cast)

        } catch (error) {
            console.error('Error in getting Actor Detail', error);
        } finally {
            setLoading(false);
        }
    };
    const getActorSeries = async () => {
        try {
            const response = await fetchActorMovies(actorId,'tv_credits');
            console.log('moooovies',response.cast)
            setSeries(response.cast)

        } catch (error) {
            console.error('Error in getting Actor Detail', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded); // Toggle full text view
    };

    if (loading) {
        return (
            <PageLayout>
                <div className="flex justify-center items-center h-screen">
                    <p className="text-white">Loading...</p>
                </div>
            </PageLayout>
        );
    }

    const biography = actorObj?.biography || 'Biography not available';
    const isLongBiography = biography.length > 300; // Check length of the text
    const displayedBiography = isExpanded ? biography : biography.slice(0, 300); // Shorten text if needed

    return (
        <PageLayout>
            {/* Actor Header */}
            <div className="bg-gradient-to-b from-black to-pink-700 p-6 mt-20 rounded-xl shadow-lg mx-4">
                {actorObj && (
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Actor Image */}
                        <div className="w-full md:w-1/3 h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                            <img
                                className="w-full h-full object-cover"
                                src={
                                    actorObj.profile_path
                                        ? `http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${actorObj.profile_path}`
                                        : '/image/Frame.png'
                                }
                                alt={actorObj.name}
                            />
                        </div>
                        {/* Actor Information */}
                        <div className="flex-1 text-white space-y-4 text-center md:text-left">
                            <h1 className="text-2xl md:text-4xl font-bold">{actorObj.name}</h1>
                            <p className="text-gray-300 text-sm md:text-base">
                                {displayedBiography}
                                {isLongBiography && (
                                    <span
                                        onClick={toggleExpand}
                                        className="text-pink-400 cursor-pointer ml-2 hover:underline"
                                    >
                                        {isExpanded ? 'Less' : 'More'}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Movies and Series List */}
            <div className="mt-8 px-4">
                <h2 className="text-pink-400 text-xl md:text-2xl font-semibold mb-4 text-center">Movies and TV Shows</h2>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {movies?.map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                className="w-full h-48 md:h-60 object-cover"
                                src={
                                    movie.poster_path
                                        ? `http://65.109.177.24:2024/api/file/image?size=w300&imgPath=${movie.poster_path}`
                                        : '/image/Frame.png'
                                }
                                alt={movie.title}
                            />
                            <div className="p-2 md:p-3">
                                <h3 className="text-white text-sm md:text-lg font-semibold truncate">{movie.title}</h3>
                                <p className="text-gray-400 text-xs md:text-sm">{movie.release_date || 'Unknown'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}
