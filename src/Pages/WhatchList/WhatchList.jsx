import React, { useEffect, useState } from 'react'
import PageLayout from '../../Layout/PageLayout'
import { Trash } from '../../utils/icon'
import { getPlayList, fetchMovieById, removeMovieFromPlaylist } from '../../utils/api'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function WhatchList() {
    const { token } = useAuth()
    const [playListArr, setPlayListArr] = useState([])
    const [movieDetailsArr, setMovieDetailsArr] = useState([])
  
    const navigate = useNavigate()
// گرفتن پلی لیست
    useEffect(() => {
        const fetchData = async () => {
            try {
                const playList = await getPlayList(token)
                setPlayListArr(playList)

            } catch (error) {
                console.error('Error getting play list', error)
            }
        }
        fetchData()
    }, [token])

    useEffect(() => {
        if (playListArr.length === 0) return; // جلوگیری از اجرای بیهوده
        console.log('token', token)
        const fetchMovieDetails = async () => {
            try {
                const details = await Promise.all(playListArr.map(id => fetchMovieById(id)))
                setMovieDetailsArr(details)

            } catch (error) {
                console.error('Error fetching movie details:', error)
            }
        }

        fetchMovieDetails()
    }, [playListArr])



    const removeMovie = async (movieid, e) => {
        e.stopPropagation();  
        try {
            await removeMovieFromPlaylist(token, movieid);
            // حذف فیلم از آرایه پس از موفقیت در حذف از سرور
            setMovieDetailsArr(prevState => prevState.filter(movie => movie.id !== movieid));
        } catch (error) {
            console.error('Failed to remove movie:', error);
        }
    };
    

    return (
        <PageLayout>
            <div className=' flex flex-col w-screen max-w-screen-2xl overflow-x-hidden '  >

                <div className=' flex  mt-20 px-10 py-6  text-white  font-mono font-bold text-sm '>
                    <p className='mr-9 p-2 bg-pink-800 border border-pink-600  rounded-md  cursor-pointer'>Whatch List</p>
                    <p className=' border border-pink-600 rounded-md  p-2 cursor-pointer '>Favorite List</p>
                </div>



                <div className=' flex-1 flex flex-wrap  justify-center
                md:justify-start w-screen   overflow-x-hidden '>
                    {movieDetailsArr && movieDetailsArr.map(movie => (

                        <div key={movie.id} className='  relative w-32 sm:w-60  rounded-md m-5 mb-20  overflow-hidden'
                            onClick={() => {
                                navigate('/m/' + movie.id, { state: movie })}}
                        >
                            <div className='w-full h-32 md:h-80 object-cover  '>
                                <img src={`http://65.109.177.24:2024/api/file/image?size=w500&imgPath=${movie.backdrop_path}`} alt=""
                                    className='w-full h-full overflow-hidden  object-cover '
                                />
                            </div>


                            <div className='flex justify-between items-center py-1 px-2  text-white bg-gray-950 rounded-br-md  h-14 text-xs
                             md:py-2 md:px-3 md:h-20 md:text-lg'>
                                <p className='flex flex-wrap w-5/6 '>{movie.title}</p>
                                <button className='hover:bg-pink-300 rounded-full'
                               onClick={(e) => {
                                    removeMovie(movie.id, e);  // پاس دادن e به removeMovie
                                }}
                                ><Trash /></button>

                            </div>
                        </div>
                    ))
                    }

                </div>

            </div>

        </PageLayout>
    )
}
