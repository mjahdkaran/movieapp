import React, { useEffect, useState } from 'react'
import PageLayout from '../../Layout/PageLayout'
import FilteringHeader from '../../Components/FilteringHeader/FilteringHeader'
import PosterCard from '../../Components/PosterCard/PosterCard'
import { fetchMovieByCategory } from '../../utils/api'
import { useLocation, useParams } from 'react-router-dom'


export default function CategoryPage() {
    const { category } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    const title = location.state

    const [allMovies, setAllMovies] = useState([])
    useEffect(() => {
        const fetcheMovies = async () => {
            try {
                setIsLoading(true)
                let fetchAllPage = []
                for (let page = 1; page <= 32; page++) {
                    const data = await fetchMovieByCategory(category, page)
                    fetchAllPage = [...fetchAllPage, ...data]
                }



                setAllMovies(fetchAllPage)
                // const data = await fetchMovieByCategory(category, 3)
                // setAllMovies(data)


            } catch (error) {
                console.log(error)

            } finally {
                setIsLoading(false)
            }
        }
        fetcheMovies()


    }, [category])

    return (
        <PageLayout>
            <FilteringHeader />
            <div className='flex  flex-col h-screen bg-blyeack mt-20'>
                <h1 className='text-xl text-white font-bold px-4 py-1'>{title} movies</h1>

                {!isLoading ? (
                    <div className='flex-1 flex flex-wrap justify-start space-x-4 py-5 '>
                        {allMovies.map((movie, index) => <PosterCard key={`${movie.id}-${index}`} movieobj={movie} />)}

                    </div>
                ) :

                    (
                        <div className=' flex-1 flex justify-center items-center'>
                            <p className='text-white text-3xl font-bold text-center mx-4'>...Is Loding</p>
                            {/* صفحه بارگذاری با انیمیشن spinner */}
                            <div className="animate-spin border-4 border-t-4 border-gray-300 rounded-full w-14 h-14 border-t-pink-500"></div>
                            {/* صفحه بارگذاری با انیمیشن spinner */}
                        </div>

                    )
                }
            </div>



        </PageLayout>
    )
}
