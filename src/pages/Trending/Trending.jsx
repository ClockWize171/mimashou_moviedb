import React, { useState, useEffect } from 'react'
import { MovieGrid } from '../../components'
import axios from 'axios'
import db_requests from '../../utils/dbrequest'

const Trending = () => {

  const [trending, setTrending] = useState([])

  useEffect(() => {
    axios.get(db_requests.requestTrending)
      .then((response) => {
        setTrending(response.data.results)
      })
  }, [])

  // console.log(trending)


  return (
    <>
      <MovieGrid trending={trending} />
    </>
  )
}

export default Trending