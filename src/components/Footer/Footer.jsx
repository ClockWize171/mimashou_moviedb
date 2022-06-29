import React from 'react'
import { Container, Text } from '@chakra-ui/react'

const Footer = () => {
    const getYear = () => {
        return new Date().getFullYear();
    }
    return (
        <Container pt={5} pb='10vh'>
            <Text fontSize={['xs', 'sm']} align='center'>
                Developed by <strong>Thet Min Htin</strong> © {getYear()}.
            </Text>
        </Container>
    )
}

export default Footer