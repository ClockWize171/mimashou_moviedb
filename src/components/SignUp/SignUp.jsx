import React, { useState } from 'react'
import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Button,
    Box,
    Text
} from '@chakra-ui/react'
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'


const SignUp = () => {

    const { signUp, error } = UserAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const isError = password !== confirmPassword

    const handleSubmit = async (e) => {
        setLoading(true)
        setTimeout(() => { setLoading(false) }, 3000);
        e.preventDefault()
        if (password !== confirmPassword) {
            return null
        } else {
            try {
                await signUp(email, password)
                navigate('/account')
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    return (
        <>
            <Text mb={8} fontSize='3xl' fontWeight='bold'>Sign Up</Text>
            <form action='' onSubmit={handleSubmit}>
                {error ?
                    <Box p={2} borderWidth='2px' borderColor='red.300'>
                        <Text color='red.400'>{error.split(":")[1]}</Text>
                    </Box>
                    :
                    null
                }
                <FormLabel pt={5} htmlFor='email'>Email address:</FormLabel>
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    id='signup_email'
                    isRequired
                    type='email' />
                <FormControl isInvalid={isError}>
                    <FormLabel mt={5} htmlFor='email'>Password:</FormLabel>
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        id='signup_password'
                        isRequired
                        type='password' />
                    <FormLabel mt={5} htmlFor='email'>Confirm password:</FormLabel>
                    <Input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        id='confirm_password'
                        isRequired
                        type='password' />
                    {isError ?
                        <FormErrorMessage>Passwords are not same.</FormErrorMessage>
                        :
                        null
                    }
                    <Box mt={5}>
                        <Button isLoading={loading} type='submit' mr={5}>Sign Up</Button>
                    </Box>
                </FormControl>
            </form>
        </>
    )
}

export default SignUp