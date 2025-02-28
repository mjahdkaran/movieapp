import React from 'react'
import PageLayout from '../../Layout/PageLayout'
import FilmCategories from '../../Components/FilmCategories/FilmCategories'
import FilteringHeader from '../../Components/FilteringHeader/FilteringHeader'
import { fetchMovieByCategory, fetchSeriesByCategory } from '../../utils/api';

export default function Movies() {
    const moviesArr =
        [{ title: 'up coming', endpoint: 'upcoming' },
        { title: 'Top Rated', endpoint: 'top_rated' },
        { title: 'Popular', endpoint: 'popular' },
        { title: 'Now Playing', endpoint: 'now_playing' },]
    const seriesArr =
        [{ title: 'Airing Today', endpoint: 'airing_today' },
        { title: 'Top Rated', endpoint: 'top_rated' },
        { title: 'Popular', endpoint: 'popular' },
        { title: 'On The Air', endpoint: 'on_the_air' },

        ]

    return (
        <div className='containern'>

            <PageLayout>
                {/* <FilteringHeader /> */}
                <div className='mt-20 ' >
                    {moviesArr.map(movie => (
                        <FilmCategories
                            type='movie'
                            title={movie.title}
                            endpoint={movie.endpoint}
                            fetchMoviesFunction={fetchMovieByCategory} // ارسال تابع مخصوص فیلم‌ها
                        />
                    ))}
                    <div className=' relative flex items-center  px-5 my-5 w-full text-white   '>
                        <span className='font-extrabold text-2xl ml-5'>Series</span>
                        <div className=' absolute right-14 left-32 border-b-2 border-white '></div>

                    </div>

                    {seriesArr.map(series => (
                        <FilmCategories
                            type='series'
                            title={series.title}
                            endpoint={series.endpoint}
                            fetchMoviesFunction={fetchSeriesByCategory} // ارسال تابع مخصوص فیلم‌ها
                        />
                    ))}


                </div>


            </PageLayout>

        </div>
    )
}

