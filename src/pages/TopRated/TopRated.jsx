import React, {useState, useEffect} from 'react'
import { MovieGrid } from '../../components'
import axios from 'axios'
import db_requests from '../../utils/dbrequest'

const TopRated = () => {

  const [topRated, setTopRated] = useState([])

  useEffect(() => {
    axios.get(db_requests.requestTopRated)
      .then((response) => {
        setTopRated(response.data.results)
      })
  }, [])

  return (
    <>
      <MovieGrid data={topRated}/>
    </>
  )
}

export default TopRated