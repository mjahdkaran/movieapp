import React from 'react'
import PageLayout from '../../Layout/PageLayout'
import FilmCategories from '../../Components/FilmCategories/FilmCategories'
import FilteringHeader from '../../Components/FilteringHeader/FilteringHeader'

export default function Movies() {
    return (
        <div className='containern'>

            <PageLayout>
                <FilteringHeader />
                <FilmCategories title='up coming' />
                <FilmCategories title='Top Rated' />
                <FilmCategories title='Popular' />
                <FilmCategories title='Now Playing' />

            </PageLayout>

        </div>
    )
}

