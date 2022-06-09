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
import { FaSearch } from 'react-icons/fa'

const Search = () => {
    return (
        <Container mt={3} pb='5vh' maxW='container.xl'>
            <Box w='full'>
                <Flex w={['40%', '30%']} float='right'>
                    <InputGroup>
                        <InputRightElement
                            pointerEvents='none'
                            children={<FaSearch />}
                        />
                        <Input type='text' placeholder='Search keyword' />
                    </InputGroup>
                </Flex>
                <Flex float='left'>
                    <Text fontSize='md' fontWeight='medium' mt={3}>
                        Account Name
                    </Text>
                </Flex>
            </Box>
        </Container>
    )
}

export default Search