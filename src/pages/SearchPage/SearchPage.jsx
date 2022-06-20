import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  InputGroup,
  InputLeftElement,
  Input,
  useToast,
  Text
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import MovieGrid from '../../components/MovieGrid/MovieGrid'

const Search = () => {

  const [searchMovies, setSearchMovies] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [keyword, setKeyword] = useState('Harry Potter')

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${keyword}&language=en-US&page=${pageNum}&include_adult=false`

  useEffect(() => {
    axios.get(url)
      .then((response) => {
          setSearchMovies(response.data.results)
      })
      .catch(error => {
        console.log("Your input is empty currently")
      })
  }, [url])


  // SUBMIT_HANDLER
  const toast = useToast();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword === "") {
      return (
        toast({
          position: 'top',
          title: 'Your input is empty!',
          status: 'error',
          duration: 2500,
          isClosable: true
        })
      )
    }
  }

  const handleNext = () => {
    if (pageNum === null) {
      setPageNum(pageNum + 2)
      window.scroll(0, 0)
    } else {
      setPageNum(pageNum - 1 + 2)
      window.scroll(0, 0)
    }
  }

  const handlePrevious = () => {
    setPageNum(pageNum - 1)
    window.scroll(0, 0)
  }

  const handleDisable = () => {
    if (pageNum === null || pageNum === 1 || pageNum === '1') {
      return true
    } else {
      return false
    }
  }

  return (
    <Container pt={5} maxW='container.xl'>
      <form action="" onSubmit={submitHandler}>
        <InputGroup>
          <InputLeftElement
            mt={0.5}
            pointerEvents='none'
            children={<FaSearch color='gray' />}
          />
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            h='5vh'
            borderRadius='sm'
            type='text'
            placeholder='Search Keyword ...' />
        </InputGroup>
      </form>
      {
        searchMovies.length === 0 ?
          <Text pt={5} fontWeight='bold' align='center' fontSize='2xl'>No Movies Found!!</Text>
          :
          <MovieGrid
            data={searchMovies}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleDisable={handleDisable()} />
      }

    </Container>
  )
}

export default Search