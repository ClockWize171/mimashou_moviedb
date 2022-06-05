import React from 'react'
import { Carousel } from '../../components'
import { Text } from '@chakra-ui/react'
import db_requests from '../../utils/dbrequest'

const Home = () => {
  return (
    <>
      <Text fontSize='xl' pt={5} textAlign='center'>Search Bar here.</Text>
      <Carousel title="Trending 🔥" linkUrl='/trending' movieUrl={db_requests.requestTrending} />
      <Carousel title="Top Rated ⭐" linkUrl='/top_rated' movieUrl={db_requests.requestTopRated}  />
      <Carousel title="Upcoming 🎬" linkUrl='/upcoming' movieUrl={db_requests.requestUpcoming} />
    </>
  )
}

export default Home