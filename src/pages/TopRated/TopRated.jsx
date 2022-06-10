import React, { useState, useEffect } from 'react'
import { MovieGrid } from '../../components'
import axios from 'axios'

const TopRated = () => {

  const [topRated, setTopRated] = useState([])
  const [pageNum, setPageNum] = useState(1)


  const key = process.env.REACT_APP_TMDB_API_KEY
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${pageNum}`

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setTopRated(response.data.results)
      })
  }, [url])

  const handleNext = () => {
    setPageNum(pageNum + 1)
    window.scroll(0, 0)
  }

  const handlePrevious = () => {
    setPageNum(pageNum - 1)
    window.scroll(0, 0)
  }

  const handleDisable = () => {
    if (pageNum === 1) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <MovieGrid
        data={topRated}
        title={'Top Rated ⭐'}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleDisable={handleDisable()} />
    </>
  )
}

export default TopRated