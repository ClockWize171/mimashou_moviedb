import React from 'react'
import { Container, Text } from '@chakra-ui/react'

const About = () => {
  return (
    <Container maxW='container.lg'>
      <Text align='center' fontSize='3xl' fontWeight='bold' textDecor='underline'>
        About this Page
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur numquam quasi aliquid illum laboriosam quae omnis ipsam odio, sequi doloribus nesciunt earum voluptas veritatis labore natus deserunt magnam modi cum.
      </Text>
    </Container>
  )
}

export default About