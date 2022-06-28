import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../utils/firebase'
import {
  Spinner,
  SimpleGrid,
  Box,
  Image,
  Text,
  Button,
} from '@chakra-ui/react'
import { FaTrashAlt } from "react-icons/fa";
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'

const Favorite = () => {
  const { user } = UserAuth()
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setFavorites(doc.data()?.favorite_shows);
      setLoading(false);
    });
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`)

  const deleteFavorite = async (id) => {
    setButtonLoading(true)
    setTimeout(() => {
      setButtonLoading(false)
      try {
        const result = favorites.filter((item) => item.id !== id)
        updateDoc(movieRef, {
          favorite_shows: result,
        })
      } catch (error) {
        console.log(error.message)
      }
    }, 500)

  }

  return (
    <>
      {
        loading ?
          <Box align='center' pt={5}>
            <Spinner size='xl' />
          </Box>
          :
          <SimpleGrid pt={5} columns={[1, 2, 3, 4]} spacing='40px'>
            {favorites.length === 0 ? <Text>There is no favorite movies.</Text> : null}
            {favorites.map((data) => (
              <Box height='full' key={data.id}>
                <Box align="center">
                  <Image
                    fallbackSrc='https://via.placeholder.com/240x360'
                    borderRadius='md'
                    borderBottomRadius='none'
                    w={['70%', '80%']}
                    h={['22rem', '19rem']}
                    src={`https://image.tmdb.org/t/p/w500/${data.img}`} />
                  <Button
                    isLoading={buttonLoading}
                    onClick={() => deleteFavorite(data.id)}
                    borderTopRadius='none'
                    leftIcon={<FaTrashAlt />}
                    colorScheme='red'
                    w={['70%', '80%']}>
                    Remove
                  </Button>
                </Box>
                <Box
                  _hover={{ textDecoration: 'underline' }}
                  mt={3}
                  textAlign='center'>
                  <Text
                    fontSize={['md', 'lg']}
                    fontWeight='bold'>
                    <Link to={`/movie/${data.id}`}>
                      {data?.title}
                    </Link>
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
      }
    </>
  )
}

export default Favorite