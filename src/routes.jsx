import React from 'react'
import { Routes, Route } from "react-router-dom";
import Movies from './Pages/Movies/Movies';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
export default function routes() {
    return (
        <Routes>
            <Route path='/movieapp' element={<Movies />} />
            <Route path="/movieapp/m/:id" element={<MovieDetails />} />
        </Routes>
    )
}
