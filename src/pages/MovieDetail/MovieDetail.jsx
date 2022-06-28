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
import { useParams, useNavigate } from 'react-router-dom'
import './MovieDetail.css'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../utils/firebase'
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore'

const MovieDetail = () => {
  const navigate = useNavigate()
  const { tmdbID } = useParams()
  const { user } = UserAuth()
  const [content, setContent] = useState([])
  const [video, setVideo] = useState([])
  const [casts, setCasts] = useState([])
  const [reviews, setReviews] = useState([])
  const [noReviews, setNoReviews] = useState(false)
  const [watchLater, setWatchLater] = useState([])
  const [watchLaterLoading, setWatchLaterLoading] = useState()
  const [favorite, setFavorite] = useState([])
  const [favoriteLoading, setFavoriteLoading] = useState()
  // const [watchLaterCondition, setwatchLaterCondition] = useState([])
  // const [favoriteCondition, setFavoriteCondition] = useState([])

  // URLs
  const contentURL = `https://api.themoviedb.org/3/movie/${tmdbID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  const videoURL = `https://api.themoviedb.org/3/movie/${tmdbID}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  const creditURL = `https://api.themoviedb.org/3/movie/${tmdbID}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  const reviewsURL = `https://api.themoviedb.org/3/movie/${tmdbID}/reviews?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`

  useEffect(() => {
    axios.get(contentURL)
      .then((response) => {
        setContent(response.data)
      })
    axios.get(videoURL)
      .then((response) => {
        setVideo(response.data.results[0].key)
      })
      .catch(err => {
        console.log('Error in key')
      })
    axios.get(creditURL)
      .then((response) => {
        setCasts(response.data.cast.slice(0, 10))
      })

    axios.get(reviewsURL)
      .then((response) => {
        if (response.data.results.length === 0) {
          setNoReviews(true)
        } else {
          setReviews(response.data.results.slice(0, 2))
        }
      })
  }, [contentURL, videoURL, creditURL, reviewsURL])

  // MONEY CALCULATION FOR REVENUE
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

  const movieID = doc(db, 'users', `${user?.email}`)

  // Store Favorite Shows
  const saveFavorite = async () => {
    setFavoriteLoading(true)
    setTimeout(() => { setFavoriteLoading(false) }, 1000);
    if (user?.email) {
      await updateDoc(movieID, {
        favorite_shows: arrayUnion({
          id: content.id,
          title: content.title,
          img: content.poster_path
        })
      })
    } else (
      navigate('/login')
    )
  }

  // Store Watch Later Shows
  const saveWatchLater = async () => {
    setWatchLaterLoading(true)
    setTimeout(() => { setWatchLaterLoading(false) }, 1000);
    if (user?.email) {
      await updateDoc(movieID, {
        watchlater_shows: arrayUnion({
          id: content.id,
          title: content.title,
          img: content.poster_path
        })
      })
    } else (
      navigate('/login')
    )
  }

  // Toggling delete and save //
  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setWatchLater(doc.data()?.watchlater_shows);
      setFavorite(doc.data()?.favorite_shows)
    });
  }, [user?.email]);

  const deleteWatchLater = async (id) => {
    setWatchLaterLoading(true)
    setTimeout(() => { setWatchLaterLoading(false) }, 1000);
    try {
      const result = watchLater.filter((item) => item.id !== id)
      await updateDoc(movieID, {
        watchlater_shows: result,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteFavorite = async (id) => {
    setFavoriteLoading(true)
    setTimeout(() => { setFavoriteLoading(false) }, 1000);
    try {
      const result = favorite.filter((item) => item.id !== id)
      await updateDoc(movieID, {
        favorite_shows: result,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  // On Off Controller for favorite and watch later
  if (user) {
    var favoriteCondition = favorite?.filter(element => {
      return (element.id === content.id)
    })

    var watchLaterCondition = watchLater?.filter(element => {
      return element.id === content.id
    })
  } else {
    // eslint-disable-next-line
    var favoriteCondition = [];
    // eslint-disable-next-line
    var watchLaterCondition = [];
  }

  return (
    <Container pb='10vh' pt={5} maxW='container.xl'>
      {/* Backdrop Background Here */}
      <Box
        filter='auto'
        h='40vh'
        style={backgroundImage()}>
      </Box>

      {/* Intro and Casts */}
      <SimpleGrid pt={5} columns={[1, null, 2]} spacing='40px'>
        {/* Intro */}
        <Box>
          <Box>
            <Button
              isDisabled={video.length === 0 ? true : false}
              size={['sm', 'md']}
              variant='solid'
              colorScheme='red'
              leftIcon={<FaYoutube />}
              onClick={() => window.open(`https://www.youtube.com/watch?v=${video}`)}>
              Watch the Trailer
            </Button>
            <ButtonGroup
              mt={2}
              float='right'
              size={['xs', 'sm']}
              isAttached>
              {watchLaterCondition.length === 0 ?
                <Button
                  isLoading={watchLaterLoading}
                  onClick={saveWatchLater}
                  leftIcon={<FaClock />}
                  variant='outline'
                  colorScheme='whatsapp'>
                  Watch Later
                </Button>
                :
                <Button
                  isLoading={watchLaterLoading}
                  onClick={() => deleteWatchLater(content.id)}
                  leftIcon={<FaClock />}
                  variant='solid'
                  colorScheme='whatsapp'>
                  Watch Later
                </Button>
              }
              {favoriteCondition.length === 0 ?
                <Button
                  isLoading={favoriteLoading}
                  onClick={saveFavorite}
                  rightIcon={<FaHeart />}
                  variant='outline'
                  colorScheme='red'>
                  Favourite
                </Button>
                :
                <Button
                  isLoading={favoriteLoading}
                  onClick={() => deleteFavorite(content.id)}
                  leftIcon={<FaHeart />}
                  variant='solid'
                  colorScheme='red'>
                  Favourite
                </Button>
              }

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
            <Text pt={3}>{content.overview}</Text>
          </Box>
        </Box>

        {/* Casts */}
        <Box>
          {casts.length === 0 ?
            <Text pt={5} align='center' fontSize='2xl' fontWeight='bold'>No Cast Avaliable</Text>
            :
            <Box className='cast_wrapper'>
              <>
                {
                  casts.map((cast) => (
                    <Box key={cast.id} className='cast_lists'>
                      <Image
                        h='16rem'
                        fallbackSrc='https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_960_720.png'
                        src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`} />
                      <Box>
                        <Text fontWeight='bold' fontSize='xl'>{cast.original_name}</Text> as
                        <Text fontSize='sm' noOfLines={1}>{cast.character}</Text>
                      </Box>
                    </Box>
                  ))
                }
              </>
            </Box>
          }
        </Box>
      </SimpleGrid>

      {/* Reviews */}
      <Box pt={5}>
        <Text fontSize={['xl', '2xl']} fontWeight='bold'>Reviews from audiences</Text>
        {
          noReviews ?
            <Text pt={3} fontSize={['lg', 'xl']}>No Users Review Yet!</Text>
            :
            <SimpleGrid pt={5} columns={[1, null, 2]} spacing='40px'>
              {reviews.map((review) => (
                <Box borderWidth='2px' borderRadius='md' key={review.id}>
                  <HStack padding={2}>
                    <Box align='center'>
                      <Image
                        h='16rem'
                        borderRadius='full'
                        boxSize={['50px', '100px']}
                        fallbackSrc='https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_960_720.png'
                        src={`https://image.tmdb.org/t/p/w200${review?.author_details?.avatar_path}`} />
                      <Box pt={3}>
                        <Text fontSize='sm' fontWeight='medium'>{review.author_details.username}</Text>
                        <Text fontSize='xs'>{review.created_at.split("T")[0]}</Text>
                        {review.created_at !== review.updated_at
                          ?
                          <>
                            <Text fontSize='xs' as='i'>(Edited)</Text>
                          </>
                          :
                          null
                        }
                      </Box>
                    </Box>
                    <Box w='75%' ml={4} p={3}>
                      <Text textAlign='left' noOfLines={10} fontSize='md'>{review.content}</Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
        }
      </Box>
    </Container>
  )
}

export default MovieDetail