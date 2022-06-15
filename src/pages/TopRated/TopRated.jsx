import React, { useState, useEffect } from 'react'
import { MovieGrid } from '../../components'
import axios from 'axios'

const TopRated = () => {

  function useLocalStorage(localItem) {
    const [local, setState] = useState(localStorage.getItem(localItem))

    console.log(local)
    function setLoc(newItem) {
      localStorage.setItem(localItem, newItem);
      setState(JSON.parse(newItem))
    }
    return [local, setLoc]
  }

  const [topRated, setTopRated] = useState([])
  const [pageNum, setPageNum] = useLocalStorage('top-rate-page')

  const key = process.env.REACT_APP_TMDB_API_KEY
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${pageNum}`

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setTopRated(response.data.results)
      })
  }, [url])

  const handleNext = () => {
    if (pageNum === null) {
      setPageNum(pageNum + 2)
      window.scroll(0, 0)
    } else {
      setPageNum(pageNum - 1 + 2)
      window.scroll(0, 0)
    }
  }

  const handlePrevious = () => {
    setPageNum(pageNum - 1)
    window.scroll(0, 0)
  }

  const handleDisable = () => {
    if (pageNum === null || pageNum === 1) {
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