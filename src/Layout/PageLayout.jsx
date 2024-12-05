import React from 'react'
import Section from '../Components/FilmCategories/FilmCategories'
import Header from '../Components/Header/Header'

export default function PageLayout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
