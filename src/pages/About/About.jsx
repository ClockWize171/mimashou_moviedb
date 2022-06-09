import React from 'react'
import { Container, Text, Box, Link } from '@chakra-ui/react'
import './About.css'

const About = () => {
  return (
    <Container maxW='container.lg'>
      <Box className='center'>
        <Box>
          <Text align='center' fontSize='3xl' fontWeight='bold' textDecor='underline'>
            About this Page
          </Text>
          <Text mt={5} fontSize={['lg', 'xl']} lineHeight={10} textAlign='justify'>
            This web app is developed by&nbsp;
            <Link
              textDecor='underline'
              color='blue.300'
              _hover={{ color: 'blue.400' }}
              fontWeight='bold'
              onClick={() => window.open("https://reactjs.org/")}>
              ReactJS
            </Link>.
            All the data of the movies are rendered and feteched from&nbsp;
            <Link
              textDecor='underline'
              color='blue.300'
              _hover={{ color: 'blue.400' }}
              fontWeight='bold'
              onClick={() => window.open("https://www.themoviedb.org/")}>
              TMDB (The Movie Database)
            </Link>.
            For the styling and theming over the web app, the&nbsp;
            <Link
              textDecor='underline'
              color='blue.300'
              _hover={{ color: 'blue.400' }}
              fontWeight='bold' onClick={() => window.open("https://chakra-ui.com/")}>
              Chakra UI
            </Link> is used and you can also support communities on their website.
          </Text>
        </Box>
      </Box>
    </Container>
  )
}

export default About