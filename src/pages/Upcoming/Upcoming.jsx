import React, { useState, useEffect } from 'react'
import { MovieGrid } from '../../components'
import axios from 'axios'
import db_requests from '../../utils/dbrequest'

const Upcoming = () => {

  const [upcoming, setUpcoming] = useState([])

  useEffect(() => {
    axios.get(db_requests.requestUpcoming)
      .then((response) => {
        setUpcoming(response.data.results)
      })
  }, [])

  return (
    <>
      <MovieGrid data={upcoming} />
    </>
  )
}

export default Upcoming