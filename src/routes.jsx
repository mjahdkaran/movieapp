import React from 'react'
import { Routes, Route } from "react-router-dom";
import Movies from './Pages/Movies/Movies';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import SearchPage from './Pages/SearchPage/SearchPage';
import FallBackComponent from './Pages/Error';
// import FavoriteMovieList from './Pages/FavoriteMovieList/FavoriteMovieList';
import WhatchList from './Pages/WhatchList/WhatchList';
import FavoriteList from './Pages/FavoriteList/FavoriteList';
import Profile from './Pages/Profile/Profile';
export default function routes() {
    return (
        <Routes>
            <Route path='' element={<Movies />} />
            <Route path="/m/:id" element={<MovieDetails />} />
            <Route path='/:category' element={<CategoryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/watchlist" element={<WhatchList />} />
            <Route path="/liked" element={<FavoriteList />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<FallBackComponent />} />



        </Routes>
    )
}
