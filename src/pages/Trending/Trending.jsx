import React, { useState, useEffect } from 'react'
import { MovieGrid } from '../../components'
import axios from 'axios'

const Trending = () => {

  const [trending, setTrending] = useState([])
  const [pageNum, setPageNum] = useState(1)

  const key = process.env.REACT_APP_TMDB_API_KEY
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page=${pageNum}`

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setTrending(response.data.results)
      })
  }, [url])

  // console.log(trending)
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
        data={trending}
        title={'Trending 🔥'}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleDisable={handleDisable()}
      />
    </>
  )
}

export default Trending