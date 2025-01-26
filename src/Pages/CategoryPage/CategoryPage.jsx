import React, { useEffect, useState } from 'react'
import PageLayout from '../../Layout/PageLayout'
import FilteringHeader from '../../Components/FilteringHeader/FilteringHeader'
import PosterCard from '../../Components/PosterCard/PosterCard'
import { fetchMovieByCategory } from '../../utils/api'
import { useLocation, useParams,useNavigate } from 'react-router-dom'
import { Back, LeftArrowRound , RightArrowRound } from '../../utils/icon'


export default function CategoryPage() {
    const { category } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    const title = location.state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(32);
const navigate=useNavigate()
    const [allMovies, setAllMovies] = useState([])
    useEffect(() => {
        const fetcheMovies = async () => {
            try {
                setIsLoading(true)
                const data = await fetchMovieByCategory(category, currentPage)
                setAllMovies(data)

            } catch (error) {
                console.log(error)

            } finally {
                setIsLoading(false)
            }
        }
        fetcheMovies()


    }, [category, currentPage])

    return (
        <PageLayout>
            {/* <FilteringHeader /> */}
            <div className='flex pl-5  flex-col h-screen bg-blyeack mt-20'>
                <div className='border-b-2   border-pink-700'>
                    <button className='text-pink-500  cursor-pointer hover:bg-pink-500 hover:rounded-full hover:text-white'
                    onClick={()=>navigate(-1)} >
                    
                        <Back/></button>
                    <h1 className='text-2xl text-white font-bold px-4 py-1'>{title} movies</h1>

                </div>

                {!isLoading ? (
                    <div className='flex-1 flex flex-wrap justify-start space-x-4 py-5 px-3  '>
                        {allMovies.map((movie, index) => <PosterCard key={`${movie.id}-${index}`} movieobj={movie} />)}

                    </div>
                ) :

                    (
                        <div className=' flex-1 flex justify-center items-center '>
                            <p className='text-white text-3xl font-bold text-center mx-4'>...Is Loding</p>
                            {/* صفحه بارگذاری با انیمیشن spinner */}
                            <div className="animate-spin border-4 border-t-4 border-gray-300 rounded-full w-14 h-14 border-t-pink-500">

                            </div>
                            {/* صفحه بارگذاری با انیمیشن spinner */}
                        </div>

                    )
                }
                {/* pagination--------------------------------------- */}
                <div className='flex justify-center items-center my-4 py-6  '>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className='px-4 py-2 bg-pink-500 text-white rounded mx-2 disabled:opacity-50'
                    >
                        <LeftArrowRound />
                    </button>
                    <span className='text-white mx-2'>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className='px-4 py-2 bg-pink-500 text-white rounded mx-2 disabled:opacity-50'
                    >
                        <RightArrowRound />
                    </button>
                </div>
            </div>



        </PageLayout>
    )
}
