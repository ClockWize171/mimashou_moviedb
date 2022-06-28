import React from 'react'
import { Text, Container } from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Container pt='10vh'>
      <Text fontWeight='bold' fontSize={['2xl', '3xl']}>
        404 Page Not Found :(
      </Text>
    </Container>
  )
}

export default NotFound