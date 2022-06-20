import React from 'react'
import {
    Text,
    Box,
    Flex,
    Container,
    Button,
    Spacer
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const Search = () => {
    return (
        <Container mt={3} maxW='container.xl'>
            <Flex w='full'>
                <Box>
                    <Text fontSize='md' fontWeight='medium' mt={3}>
                        <Link to='/account'>
                            Account Name
                        </Link>
                    </Text>
                </Box>
                <Spacer />
                <Box>
                    <Link to='/search'>
                        <Button colorScheme='linkedin' rightIcon={<FaSearch />} variant='outline'>
                            Search Movies ...
                        </Button>
                    </Link>
                </Box>
            </Flex>
        </Container>
    )
}

export default Search