import React from 'react'
import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Box,
    Text
} from '@chakra-ui/react'
import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
    return (
        <>
            <Text mb={8} fontSize='3xl' fontWeight='bold'>Sign In</Text>
            <FormControl>
                <FormLabel htmlFor='email'>Email address:</FormLabel>
                <Input id='signin_email' type='email' />
                <FormLabel mt={5} htmlFor='email'>Password:</FormLabel>
                <Input id='signin_password' type='password' />
                <Box mt={5}>
                    <Button mr={5}>Sign in</Button>
                    <Button leftIcon={<FaGoogle />} colorScheme='linkedin'>Sign in with Google</Button>
                </Box>
            </FormControl>
        </>
    )
}

export default SignIn