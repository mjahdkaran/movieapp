import React from 'react'
import PageLayout from '../../Layout/PageLayout'
import FilmCategories from '../../Components/FilmCategories/FilmCategories'
import FilteringHeader from '../../Components/FilteringHeader/FilteringHeader'

export default function Movies() {
    return (
        <div className='containern'>

            <PageLayout>
                {/* <FilteringHeader /> */}

                <div className='mt-20 ' >
                    <FilmCategories title='up coming' />
                    <FilmCategories title='Top Rated' />
                    <FilmCategories title='Popular' />
                    <FilmCategories title='Now Playing' />

                </div>


            </PageLayout>

        </div>
    )
}

