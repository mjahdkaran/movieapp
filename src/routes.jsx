import React from 'react'
import { Routes, Route } from "react-router-dom";
import Movies from './Pages/Movies/Movies';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import SearchPage from './Pages/SearchPage/SearchPage';
export default function routes() {
    return (
        <Routes>
            <Route path='/movieapp' element={<Movies />} />
            <Route path="/movieapp/m/:id" element={<MovieDetails />} />
            <Route path='/movieapp/:category' element={<CategoryPage />} />
            <Route path="/movieapp/login" element={<Login />} />
            <Route path="/movieapp/signup" element={<Signup />} />
            <Route path="/movieapp/search" element={<SearchPage/>} />


        </Routes>
    )
}
