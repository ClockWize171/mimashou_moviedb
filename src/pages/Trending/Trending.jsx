import React, { useState, useEffect } from 'react'
import { Spinner, Box } from '@chakra-ui/react'
import { MovieGrid } from '../../components'
import axios from 'axios'

const Trending = () => {

  // save the current page by local storage
  function useLocalStorage(localItem) {
    const [local, setState] = useState(localStorage.getItem(localItem))
    function setLoc(newItem) {
      localStorage.setItem(localItem, newItem);
      setState(JSON.parse(newItem))
    }
    return [local, setLoc]
  }

  const [trending, setTrending] = useState([])

  const [loading, setLoading] = useState(true)
  const [pageNum, setPageNum] = useLocalStorage('trending-page')

  const key = process.env.REACT_APP_TMDB_API_KEY
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${pageNum}`

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setTrending(response.data.results)
        setLoading(false)
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
    if (pageNum === null || pageNum === 1 || pageNum === '1') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {
        loading ?
          <Box mt={9} align='center'>
            <Spinner size='xl' />
          </Box>
          :
          <MovieGrid
            data={trending}
            title={'Popular'}
            emoji={'🔥'}
            currentPage={pageNum}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleDisable={handleDisable()} />}
    </>
  )
}

export default Trending