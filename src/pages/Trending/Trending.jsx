import React, { useState, useEffect } from 'react'
import { MovieGrid } from '../../components'
import axios from 'axios'

const Trending = () => {

  function useLocalStorage(localItem) {
    const [local, setState] = useState(localStorage.getItem(localItem))

    console.log(local)
    function setLoc(newItem) {
      localStorage.setItem(localItem, newItem);
      setState(JSON.parse(newItem))
    }
    return [local, setLoc]
  }

  const [trending, setTrending] = useState([])
  const [pageNum, setPageNum] = useLocalStorage('trending-page')

  const key = process.env.REACT_APP_TMDB_API_KEY
  // https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${pageNum}`

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setTrending(response.data.results)
      })
  }, [url])

  // console.log(trending)
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