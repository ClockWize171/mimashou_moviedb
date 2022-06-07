import React from 'react'
import {
  SimpleGrid,
  Box,
  Text,
  Button,
  Image,
  ButtonGroup,
  Container
} from '@chakra-ui/react'

const MovieGrid = ({ data }) => {
  // console.log(trending)
  return (
    <Container pb='10vh' pt={5} maxW='container.xl'>
      <SimpleGrid columns={[1, 2, 4]} spacing='40px'>
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
                <ButtonGroup size={['sm', 'sm']} isAttached variant='outline'>
                  <Button>Watch Later</Button>
                  <Button>Favourite</Button>
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
    </Container>
  )
}

export default MovieGrid