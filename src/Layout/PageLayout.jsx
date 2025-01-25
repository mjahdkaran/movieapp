import React, { useState } from 'react'
import Section from '../Components/FilmCategories/FilmCategories'
import Header from '../Components/Header/Header'
import Search from '../Pages/SearchPage/SearchPage'

export default function PageLayout({ children }) {
    return (
        <div className='bg-black relative '>

            <Header />
            {children}




        </div>
    )
}
