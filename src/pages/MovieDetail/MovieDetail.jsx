import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  SimpleGrid,
  ButtonGroup,
  Button,
  Text,
  Badge,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  HStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { FaHeart, FaClock, FaStopwatch, FaCalendarDay, FaStar, FaYoutube } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import './MovieDetail.css'

const MovieDetail = () => {
  const { tmdbID } = useParams()
  const [content, setContent] = useState([])
  const [video, setVideo] = useState([])
  const [casts, setCasts] = useState([])
  const [reviews, setReviews] = useState([])
  const [recommendation, setRecommendation] = useState([])

  const contentURL = `https://api.themoviedb.org/3/movie/${tmdbID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  const videoURL = `https://api.themoviedb.org/3/movie/${tmdbID}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  const creditURL = `https://api.themoviedb.org/3/movie/${tmdbID}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  const reviewsURL = `https://api.themoviedb.org/3/movie/${tmdbID}/reviews?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
  const recommendationURL = `https://api.themoviedb.org/3/movie/${tmdbID}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`

  useEffect(() => {
    axios.get(contentURL)
      .then((response) => {
        setContent(response.data)
      })
    axios.get(videoURL)
      .then((response) => {
        setVideo(response.data.results[0].key)
      })
    axios.get(creditURL)
      .then((response) => {
        setCasts(response.data.cast.slice(0, 10))
      })
    axios.get(reviewsURL)
      .then((response) => {
        setReviews(response.data.results)
      })
    axios.get(recommendationURL)
      .then((response) => {
        setRecommendation(response.data.results.slice(0, 10))
      })
  }, [contentURL, videoURL, creditURL, reviewsURL, recommendationURL])

  console.log(reviews, recommendation)

  const trailer = `https://www.youtube.com/watch?v=${video}`

  // Money calculation function
  function MoneyFormat(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+6

        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3

          ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

          : Math.abs(Number(labelValue));

  }

  // Background fallback image function
  function backgroundImage() {
    if (content.backdrop_path === null || content.backdrop_path === undefined)
      return {
        backgroundImage: `url(https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };

    return {
      backgroundImage: `url(https://image.tmdb.org/t/p/original/${content.backdrop_path})`,
      backgroundPosition: "top",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
  }

  console.log(content)

  return (
    <Container pb='10vh' maxW='container.xl'>
      <Box
        filter='auto'
        h='40vh'
        style={backgroundImage()}>
      </Box>
      <SimpleGrid pt={5} columns={[1, null, 2]} spacing='40px'>
        <Box>
          <Box>
            <Button
              size={['sm', 'md']}
              variant='solid'
              colorScheme='red'
              leftIcon={<FaYoutube />}
              onClick={() => window.open(trailer)}>
              Watch the Trailer
            </Button>
            <ButtonGroup
              mt={2}
              float='right'
              size={['xs', 'sm']}
              isAttached>
              <Button
                leftIcon={<FaClock />}
                variant='outline'
                colorScheme='whatsapp'>
                Watch Later
              </Button>
              <Button
                rightIcon={<FaHeart />}
                variant='outline'
                colorScheme='red'>
                Favourite
              </Button>
            </ButtonGroup>
          </Box>
          <Box pt={3}>
            <Text fontSize={['xl', '2xl']} fontWeight='bold'>{content.title}</Text>
            <HStack pt={3} spacing={2}>
              <Tag size='sm' borderRadius='sm' variant='subtle'>
                <TagLeftIcon boxSize='12px' as={FaStopwatch} />
                <TagLabel>{content.runtime} mins</TagLabel>
              </Tag>
              <Tag size='sm' borderRadius='sm' variant='subtle' colorScheme='blue'>
                <TagLeftIcon boxSize='12px' as={FaCalendarDay} />
                <TagLabel>{content.release_date}</TagLabel>
              </Tag>
              <Tag size='sm' borderRadius='sm' variant='subtle' colorScheme='yellow'>
                <TagLeftIcon boxSize='12px' as={FaStar} />
                <TagLabel>{content.vote_average}</TagLabel>
              </Tag>
            </HStack>
            <Text fontWeight='bold' pt={3}>
              Budget: <Badge colorScheme='whatsapp'>
                {content.budget ? `$ ${MoneyFormat(content.budget)}` : '<NO DATA>'}
              </Badge>
            </Text>
            <Text fontWeight='bold' pt={3}>
              Revenue: <Badge colorScheme='whatsapp'>
                {content.revenue ? `$ ${MoneyFormat(content.revenue)}` : '<NO DATA>'}
              </Badge>
            </Text>
            <Text fontWeight='medium' pt={3}>{content.overview}</Text>
          </Box>
        </Box>
        <Box>
          <Box className='wrapper'>
            {casts.map((cast) => (
              <Box key={cast.id} className='cast_lists'>
                <Image
                  h='16rem'
                  fallbackSrc='https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_960_720.png'
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} />
                <Box>
                  <Text fontWeight='bold' fontSize='xl'>{cast.original_name}</Text> as
                  <Text fontSize='sm' noOfLines={1}>{cast.character}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default MovieDetail