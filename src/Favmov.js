import React, {  useState } from 'react'
import MovieList from './MovieList';

export default function Favmov({movies}) {
  const [fav,setFav] = useState([]);
  const favoriteMoviesIds = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  console.log(favoriteMoviesIds)
  
  const fetchMovies = async()=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=10aa8884d12e462c2b99060d40fb6608&language=en-US&page=1`)
      const result = await response.json()
      return result.results;
    } catch (error) {
      
    }
  }
  const renderFavoriteMovies = async()=>{
    const mainMovieList = await fetchMovies()
    const favoriteMovies = mainMovieList.filter((movie)=>
     favoriteMoviesIds.some(([_,movieId])=>movieId === movie.id)
    )
    return favoriteMovies
  }
  renderFavoriteMovies().then((response)=>{
    setFav(response)
  })
  return (
    <div>
        {/* <h2>Favorite Movies Section</h2> */}
        {
          favoriteMoviesIds.length > 0 ?(
            <MovieList movies={fav}/>
          ) :(
            <>
              <h1>No Favorites Yet!</h1>
            </>
          )
        }
    </div>
  )
}