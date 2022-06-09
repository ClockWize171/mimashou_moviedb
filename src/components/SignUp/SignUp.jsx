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


const SignUp = () => {
  return (
    <>
            <Text mb={8} fontSize='3xl' fontWeight='bold'>Sign Up</Text>
            <FormControl>
                <FormLabel htmlFor='email'>Email address:</FormLabel>
                <Input id='signup_email' type='email' />
                <FormLabel mt={5} htmlFor='email'>Password:</FormLabel>
                <Input id='signup_password' type='password' />
                <FormLabel mt={5} htmlFor='email'>Confirm password:</FormLabel>
                <Input id='confirm_password' type='password' />
                <Box mt={5}>
                    <Button mr={5}>Sign Up</Button>
                </Box>
            </FormControl>
        </>
  )
}

export default SignUp