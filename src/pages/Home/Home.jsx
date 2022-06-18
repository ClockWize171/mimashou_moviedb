import React from 'react'
import { Carousel } from '../../components'
import db_requests from '../../utils/dbrequest'

const Home = () => {
  return (
    <>
      <Carousel title="Popular 🔥" linkUrl='/popular' movieUrl={db_requests.requestPopular} />
      <Carousel title="Top Rated ⭐" linkUrl='/top_rated' movieUrl={db_requests.requestTopRated}  />
      <Carousel title="Upcoming 🎬" linkUrl='/upcoming' movieUrl={db_requests.requestUpcoming} />
    </>
  )
}

export default Home