import React from 'react'
import Section from '../Components/FilmCategories/FilmCategories'
import Header from '../Components/Header/Header'

export default function PageLayout({ children }) {
    return (
        <div className='bg-black '>
            <Header />
            {children}
        </div>
    )
}
