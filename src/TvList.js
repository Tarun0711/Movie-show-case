import React,{useEffect, useState} from 'react'
import { FaHeart,FaRegHeart } from "react-icons/fa";
export default function TvCard({series}) {
    const {id,poster_path,name,vote_count,vote_average,first_air_date} = series;
    const [isFavorite,setIsFavorite] = useState(
        JSON.parse(
            localStorage.getItem('favoriteSeries'))?.some(([_,tvId])=>tvId === id) || false
    )

    
    const toggleFav=()=>{
        setIsFavorite((prev)=>!prev)
    }
    useEffect(()=>{
        const favSeries = JSON.parse(localStorage.getItem('favoriteSeries')) || []
        if(isFavorite){
            localStorage.setItem('favoriteSeries',JSON.stringify([...favSeries,[name,id]]))
        }
        else{
            localStorage.setItem("favoriteSeries",
             JSON.stringify(favSeries.filter(([_,tvId])=>tvId !== id))
            )
        }
    },[isFavorite,name,id])
  return (
    <div className='card'>
        <li>
            <img src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            height="200" width="200" alt='title'/>
            <h1>{name}</h1>
            <section>
                <div>
                    <p>Votes: {vote_count}</p>
                    <p>Rating: {vote_average}</p>
                </div>
                <div>
                    <p>Release: {first_air_date}</p>
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