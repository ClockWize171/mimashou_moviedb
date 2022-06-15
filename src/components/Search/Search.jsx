import React from 'react'
import {
    Text,
    Box,
    Flex,
    Container,
    InputGroup,
    InputRightElement,
    Input
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const Search = () => {
    return (
        <Container mt={3} pb='5vh' maxW='container.xl'>
            <Box w='full'>
                <Flex w={['40%', '30%']} float='right'>
                    <form action="/search">
                        <InputGroup>
                            <InputRightElement
                                pointerEvents='none'
                                children={<FaSearch />}
                            />
                            <Input type='text' placeholder='Search keyword' />
                        </InputGroup>
                    </form>
                </Flex>
                <Flex float='left'>
                    <Text fontSize='md' fontWeight='medium' mt={3}>
                    <Link to='/account'>
                        Account Name
                    </Link>
                    </Text>
                </Flex>
            </Box>
        </Container>
    )
}

export default Search