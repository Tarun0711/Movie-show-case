import React,{useEffect, useState} from 'react'
import { FaHeart,FaRegHeart } from "react-icons/fa";
export default function MovieCard({movie}) {
    const {id,poster_path,title,vote_count,vote_average,release_date} = movie;
    const [isFavorite,setIsFavorite] = useState(
        JSON.parse(
            localStorage.getItem('favoriteMovies'))?.some(([_,movieId])=>movieId === id) || false
    )

    
    const toggleFav=()=>{
        setIsFavorite((prev)=>!prev)
    }
    useEffect(()=>{
        const favMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || []
        if(isFavorite){
            localStorage.setItem('favoriteMovies',JSON.stringify([...favMovies,[title,id]]))
        }
        else{
            localStorage.setItem("favoriteMovies",
             JSON.stringify(favMovies.filter(([_,movieId])=>movieId !== id))
            )
        }
    },[isFavorite,title,id])
  return (
    <div className='card'>
        <li>
            <img src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            height="200" width="200" alt='title'/>
            <h1>{title}</h1>
            <section>
                <div>
                    <p>Votes: {vote_count}</p>
                    <p>Rating: {vote_average}</p>
                </div>
                <div>
                    <p>Release: {release_date}</p>
                    {isFavorite ? (
                    <FaHeart className='fav-icon' color='red' onClick={toggleFav}/>
                    ):(
                    <FaRegHeart className='fav-icon' onClick={toggleFav}/>
                )}
                </div>
            </section>
        </li>
    </div>
  )
}