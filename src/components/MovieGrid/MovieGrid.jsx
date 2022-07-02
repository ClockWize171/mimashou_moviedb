import React from 'react'
import {
  SimpleGrid,
  Box,
  Text,
  Button,
  Image,
  Container,
  useMediaQuery,
  Tag
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import ScrollTop from '../ScrollTop/ScrollTop';

const MovieGrid = ({
  data,
  title,
  emoji,
  currentPage,
  handleNext,
  handlePrevious,
  handleDisable }) => {

  // Screen Size
  const [isNotSmallerScreen] = useMediaQuery('(min-width: 479px)')
  return (
    <Container pt={5} maxW='container.xl'>
      <ScrollTop />
      <Box
        p={3}
        textAlign='center'>
        <Text fontSize={['xl', '2xl', '3xl', '4xl']} fontWeight='black'>
          {emoji} {title} Movies {emoji}
        </Text>
      </Box>
      <Box align='center' pb={5}>
        <Tag colorScheme='teal' variant='outline' size={['md', 'lg']}>Current Page: ({currentPage ? currentPage : '1'})</Tag>
      </Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px'>
        {
          data.map((response) => (
            <Box h='100%' key={response.id}>
              <Box align="center">
                <Image
                  borderRadius='md'
                  w={['70%', '80%']}
                  h={['22rem', '21.5rem']}
                  src={
                    response.poster_path === null || response.poster_path === undefined ?
                      'https://via.placeholder.com/240x360'
                      :
                      `https://image.tmdb.org/t/p/w500/${response.poster_path}`
                  } />
              </Box>
              <Box
                _hover={{ textDecoration: 'underline' }}
                mt={3}
                textAlign='center'>
                <Text
                  fontSize={['md', 'lg']}
                  fontWeight='bold'>
                  <Link to={`/movie/${response.id}`}>
                    {response?.title ? response?.title : response?.name}
                  </Link>
                </Text>
              </Box>
            </Box>
          ))
        }
      </SimpleGrid>
      <Box pt={5} align='center'>
        <Button
          onClick={handlePrevious}
          isDisabled={handleDisable}
          variant='outline'
          w={['', '150px']}
          mr='5vh'>
          <AiFillCaretLeft />
          {isNotSmallerScreen ? 'Previous' : null}
        </Button>
        <Button
          onClick={handleNext}
          variant='outline'
          w={['', '150px']}>
          {isNotSmallerScreen ? 'Next' : null}
          <AiFillCaretRight />
        </Button>
      </Box>
    </Container>
  )
}

export default MovieGrid