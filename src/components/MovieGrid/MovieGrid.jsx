import React from 'react'
import {
  SimpleGrid,
  Box,
  Text,
  Button,
  Image,
  ButtonGroup,
  Container,
  useMediaQuery,
} from '@chakra-ui/react'
import { FaHeart, FaClock } from "react-icons/fa";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import ScrollTop from '../ScrollTop/ScrollTop';


const MovieGrid = ({ data, title }) => {

  // Screen Size
  const [isNotSmallerScreen] = useMediaQuery('(min-width: 479px)')
  // console.log(trending)
  return (
    <Container pb='10vh' pt={5} maxW='container.xl'>
      <ScrollTop />
      <Box
        p={3}
        mb={5}
        textAlign='center'>
        <Text fontSize={['2xl']} fontWeight='black'>{title}</Text>
      </Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing='40px'>
        {
          data.map((response) => (

            <Box h='100%' key={response.id}>
              <Box align="center">
                <Image
                  fallbackSrc='https://via.placeholder.com/240x360'
                  borderRadius='md'
                  w={['70%', '80%']}
                  h={['22rem', '19rem']}
                  src={`https://image.tmdb.org/t/p/original/${response?.poster_path}`} />
              </Box>
              <Box align='center' pt={3}>
                <ButtonGroup size={['sm', 'sm']} isAttached>
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
              <Box
                _hover={{ textDecoration: 'underline' }}
                mt={3}
                textAlign='center'>
                <Text
                  fontSize={['md', 'lg']}
                  fontWeight='bold'>
                  {response?.title ? response?.title : response?.name}
                </Text>
              </Box>
            </Box>

          ))
        }
      </SimpleGrid>
      <Box pt={5} align='center'>
        <Button
          variant='outline'
          w={['', '150px']}
          mr='5vh'>
          <AiFillCaretLeft /> 
          {isNotSmallerScreen ? 'Previous' : null}
          
        </Button>
        <Button
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