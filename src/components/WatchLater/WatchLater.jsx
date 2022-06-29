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

const WatchLater = () => {

  const { user } = UserAuth()
  const [watchLater, setWatchLater] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setWatchLater(doc.data()?.watchlater_shows);
      setLoading(false)
    });
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`)

  const deleteWatchLater = async (id) => {
    try {
      const result = watchLater.filter((item) => item.id !== id)
      updateDoc(movieRef, {
        watchlater_shows: result,
      })
    } catch (error) {
      console.log(error.message)
    }
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
            {watchLater.length === 0 ? <Text>There is no watch later movies.</Text> : null}
            {watchLater.map((data) => (
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
                    onClick={() => deleteWatchLater(data.id)}
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

export default WatchLater