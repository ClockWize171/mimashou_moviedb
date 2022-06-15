import React from 'react'
import { useParams } from 'react-router-dom'

const MovieDetail = () => {
  const {tmdbID} = useParams()
  console.log(tmdbID)
  return (
    <div>
      Movie ID : {tmdbID}
    </div>
  )
}

export default MovieDetail