import React, { useState } from 'react'

import TvList from './TvList';

export default function FavTv({movies}) {
  const [fav,setFav] = useState([]);
  const favoriteSeriesIds = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
  
  const fetchSeries = async()=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=10aa8884d12e462c2b99060d40fb6608&language=en-US&page=1`)
      const result = await response.json()
      return result.results;
    } catch (error) {
      
    }
  }
  const renderFavoriteSeries = async()=>{
    const mainSeriesList = await fetchSeries()
    const favoriteSeries = mainSeriesList.filter((series)=>
     favoriteSeriesIds.some(([_,tvId])=>tvId === series.id)
    )
    return favoriteSeries
  }
  renderFavoriteSeries().then((response)=>{
    setFav(response)
  })
  return (
    <div>
        {/* <h2>Favorite Movies Section</h2> */}
        {
          favoriteSeriesIds.length > 0 ?(
            <TvList series={fav}/>
          ) :(
            <>
              <h1>No Favorites Yet!</h1>
            </>
          )
        }
    </div>
  )
}