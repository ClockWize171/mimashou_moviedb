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
import { UserAuth } from '../../context/AuthContext'

const Search = () => {
    const { user } = UserAuth()
    return (
        <Container mt={3} maxW='container.xl'>
            <Flex w='full'>
                <Box>
                    <Text textDecoration='underline' fontSize={['sm', 'md']} fontWeight='medium' mt={3}>
                        <Link to='/account'>
                            {user ? user.email : 'Guest User'}
                        </Link>
                    </Text>
                </Box>
                <Spacer />
                <Box>
                    <Link to='/search'>
                        <Button colorScheme='linkedin' size={['sm','md']} rightIcon={<FaSearch />} variant='outline'>
                            Search Movies ...
                        </Button>
                    </Link>
                </Box>
            </Flex>
        </Container>
    )
}

export default Search