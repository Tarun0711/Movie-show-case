import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import "./Movie.css"
import MovieList from './MovieList'
import Home from './Home'
import TvList from './TvList'
import Favmov from './Favmov'
import FavTv from '../FavTv'
import Pagination from './Pagination'


export default function Movie() {


  const [movies,setMovies] = useState([]);
  const [series,setSeries] = useState([]);
  const [totalPages,setTotalPages] = useState(0);
  const [totalTvPages,setTotalTvPages] = useState(0);
  const [currentPage,setCurrentPage] = useState(1)
  const [currentTvPage,setCurrentTvPage] = useState(1)


  const fetchMovies = async(page)=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`)
      const result = await response.json()
      console.log(result)
      setMovies(result.results);
      setTotalPages(result.total_pages)
    } catch (error) {
      
    }
  }
  const fetchSeries = async(page)=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`)
      const result = await response.json()
      console.log(result)
      setSeries(result.results);
      setTotalTvPages(result.total_pages)
    } catch (error) {
      
    }
  }
  const handleSearch=async(query)=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=f531333d637d0c44abc85b3e74db2186&include_adult=false&language=en-US&page=1`)
      const result = await response.json();
      setMovies(result.results)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchMovies(currentPage)
    fetchSeries(currentTvPage)
  },[currentPage,currentTvPage])
  const handlePageChange = (page)=>{
    setCurrentPage(page) 
  }
  const handlePageTvChange = (page)=>{
    setCurrentTvPage(page) 
  }
  return (
    <div>   
      <BrowserRouter>
        <Navbar onSearch={handleSearch}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/movies' element={<div>
            <MovieList movies={movies}/>
            <Pagination currentPage={currentPage} totalPages={totalPages} 
            onPageChange = {handlePageChange}/>
          </div>}/>
          <Route path='/tv' element={
          <div>
            <TvList series={series}/>
            <Pagination currentPage={currentTvPage} totalPages={totalTvPages}
            onPageChange = {handlePageTvChange}/>
          </div>}/>
          <Route path='/favMov' element={<Favmov movies={movies}/>}/>
          <Route path='/favTv' element={<FavTv/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}