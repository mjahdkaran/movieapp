import React from 'react'
import PageLayout from '../../Layout/PageLayout'
import FilmCategories from '../../Components/FilmCategories/FilmCategories'
import FilteringHeader from '../../Components/FilteringHeader/FilteringHeader'
import { fetchMovieByCategory, fetchSeriesByCategory } from '../../utils/api';

export default function Movies() {
    const movieArr =
        [{ titl:'up coming', endpoint:'upcoming' },
        {titl: 'Top Rated', endpoint:'top_rated' },
        { titl:'Popular',endpoint: 'popular' },
        { titl:'Now Playing',endpoint: 'now_playing' },]
        ;

    return (
        <div className='containern'>

            <PageLayout>
                {/* <FilteringHeader /> */}

                <div className='mt-20 ' >
                    <FilmCategories
                        title='up coming'
                        endpoint='upcoming'
                        fetchMoviesFunction={fetchMovieByCategory} // ارسال تابع مخصوص فیلم‌ها
                    />
                    <FilmCategories
                        title='Top Rated'
                        endpoint='top_rated'
                        fetchMoviesFunction={fetchMovieByCategory} // ارسال تابع مخصوص فیلم‌ها
                    />

                    <FilmCategories
                        title='Popular'
                        endpoint='popular'
                        fetchMoviesFunction={fetchMovieByCategory} // ارسال تابع مخصوص فیلم‌ها
                    />
                    <FilmCategories
                        title='Now Playing'
                        endpoint='now_playing'
                        fetchMoviesFunction={fetchMovieByCategory} // ارسال تابع مخصوص فیلم‌ها
                    />

                    <FilmCategories
                        title='Airing Today'
                        endpoint='airing_today'
                        fetchMoviesFunction={fetchSeriesByCategory} // ارسال تابع مخصوص فیلم‌ها
                    />
                </div>


            </PageLayout>

        </div>
    )
}

