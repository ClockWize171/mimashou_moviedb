import React from 'react'
import { SignIn, SignUp } from '../../components'
import { SimpleGrid, Container, Box, Divider } from '@chakra-ui/react'

const Login = () => {
  return (
    <Container pb='2vh' pt='5vh' maxW='container.lg'>
      <SimpleGrid columns={[1, null, 2]} spacing='40px'>
        <Box><SignIn /></Box>
        <Divider display={['flex', 'flex', 'none']} />
        <Box><SignUp /></Box>
      </SimpleGrid>
    </Container>
  )
}

export default Login