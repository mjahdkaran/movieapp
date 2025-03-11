import React, { useEffect, useState } from 'react'
import { fetchActors } from '../../utils/api'
import { useAuth } from '../../Context/AuthContext'

export default function Actors({ movieType, movieId }) {
    const [credits, setCredits] = useState([])
    const [actors, setActors] = useState([])

    useEffect(() => {
        const getCredits = async () => {
            try {
                const response = await fetchActors(movieType, movieId)
                console.log('response', response)
                setActors(response.cast)
            } catch (error) {
                console.error("Failed to fetch actors", error)
            }
        }
        getCredits()
    }, [movieType, movieId])

    return (
        <div className=' flex  mx-2 overflow-x-scroll scrollbar-hide text-white'>
            {actors.map((actor) => (
                <div key={actor.id} className='p-1  '>
                    <div className='rounded-lg m-1 w-16 md:w-28 h-16 md:h-28 object-cover overflow-hidden'>
                        <img className='w-full h-full object-cover' src={actor.profile_path ? `http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${actor.profile_path}` : '/image/Frame.png'} alt={actor.name} />
                    </div>
                    <p className='text-xs md:text-base '>{actor.name}</p>
                    <p className='text-xs md:text-base '>
                        <span className='text-gray-400 font-thin '> {actor.character}</span> </p>
                </div>
            ))}
        </div>
    )
}
