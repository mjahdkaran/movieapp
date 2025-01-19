import React, { useEffect, useState } from 'react'
import PageLayout from '../../Layout/PageLayout'
import style from './MovieDetails.module.css'
import { Back, Download, Heart, Save } from '../../utils/icon'
import { useLocation } from 'react-router-dom'
import { fetchGenreOfMovie } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

export default function Movie() {
    const [isSaved, setIsSaved] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [allGenres, setAllGenres] = useState([])
    const [thisMovieGenre, setThisMovieGenre] = useState([])
const navigate = useNavigate()
    // استفاده از اطلاعات ارسال شده از PosterCard
    const location = useLocation()
    const details = location.state
    const imageUrl = details.backdrop_path
        ? `http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${details.backdrop_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'
    const posterUrl = details.backdrop_path
        ? `http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${details.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'


        // گرفتن عکس ها 
        const getImage=async()=>{
            const response= await fetch(`https://localhost:7015/api/file/image?size=original&${details.backdrop_path}`)
           const data=await response.json()
           console.log('data: ',data)
        }

    // تطبیق ژانرها

    const matchGenres = () => {
        const movieGenres = details.genre_ids.map(id => {
            const genre = allGenres.find(genre => genre.id === id)
            return genre ? genre.name : null
        })
        setThisMovieGenre(movieGenres.filter(genre => genre !== null)) // فقط ژانرهای معتبر
    }

    const fetchGenre = async () => {
        try {
            const genres = await fetchGenreOfMovie()
            setAllGenres(genres)
        } catch (error) {
            console.log('Error fetching genres:', error)
        }
    }
 
    useEffect(() => {
        fetchGenre()
       console.log(imageUrl)
    }, [])

    useEffect(() => {
        if (allGenres.length > 0 && details.genre_ids.length > 0) {
            matchGenres()
        }
    }, [allGenres, details.genre_ids])

    return (
        <PageLayout>
            
            <button className='text-pink-500 mt-24 ml-20  cursor-pointer hover:bg-pink-500 hover:rounded-full hover:text-white'
                                onClick={()=>navigate(-1)} >
                             
                                    <Back/></button>  
            <div className='container flex  justify-center bg-black h-screen '>
            
                <div className={`${style.Movie_summary} h-2/3 w-4/5 bg-[url('./70ebbb90317477.5e291ea97163e.jpg')]`} style={{ backgroundImage: `url(${posterUrl})` }}>
                    <div className='relative z-10'>
                        <div className='relative z-10 flex flex-col justify-start p-6 border-b md:flex-row '>
                            <div className='h-80 w-60 rounded-md'>
                                <img className='rounded-md h-full w-full object-cover' src={imageUrl} alt="" />
                            </div>

                            <div className='text-white flex flex-1 flex-col justify-between mx-0 mt-4 md:mx-6'>
                                <p > <span className='text-lg font-bold text-pink-600 mr-2'>Film:</span> {details.title}</p>
                                <p>{details.adult ? 'Suitable for over 18 years old.' : 'Suitable for all ages'}</p>
                                <p>
                                    <span className='text-lg font-bold text-pink-600 mr-2'> Story Overview :</span>
                                    {details.overview}</p>
                                <div className='flex'>
                                    {thisMovieGenre.map(genre => (
                                        <span key={genre} className='bg-white rounded-full text-sm bg-opacity-30 px-1 m-1'>{genre}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 p-3'>
                            <button
                                className={`flex items-center justify-evenly rounded-3xl text-sm font-medium w-20 h-8 p-2 m-1
                                 ${isSaved ? 'bg-inherit border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white' : 'bg-white bg-opacity-30 hover:bg-opacity-20 text-white'}`}
                                onClick={() => setIsSaved(!isSaved)}>
                                <Save fill={isSaved} />
                                Save
                            </button>

                            <button
                                className={`flex items-center justify-evenly rounded-3xl text-sm font-medium w-20 h-8 p-2 m-1
                                 ${isLiked ? 'bg-inherit border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white' : 'bg-white bg-opacity-30 hover:bg-opacity-20 text-white'}`}
                                onClick={() => setIsLiked(!isLiked)}>
                                <Heart fill={isLiked} />
                                Like
                            </button>

                            <button className='flex items-center justify-evenly bg-white bg-opacity-30 hover:bg-opacity-20 text-white rounded-3xl text-sm w-28 h-8 p-2 m-1'>
                                <Download />
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
