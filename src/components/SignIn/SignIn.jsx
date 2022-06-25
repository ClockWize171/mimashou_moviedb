import React, { useState, useEffect } from 'react';
import {
    Input,
    FormControl,
    FormLabel,
    Button,
    Box,
    Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { UserAuth } from '../../context/AuthContext';

const SignIn = () => {

    const navigate = useNavigate()
    const { user, signIn, signInWithGoogle } = UserAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signIn(email, password)
            navigate('/account')
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }
    }

    useEffect(() => {
      if(user != null){
        navigate('/account')
      }
    }, [user, navigate])
    

    return (
        <>
            <Text mb={8} fontSize='3xl' fontWeight='bold'>Sign In</Text>
            {error ?
                <Box p={2} borderWidth='2px' borderColor='red.300'>
                    <Text color='red.400'>{error.split(":")[1]}</Text>
                </Box>
                :
                null}
            <form action="" onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel pt={3} htmlFor='email'>Email address:</FormLabel>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        isRequired
                        id='signin_email'
                        type='email' />
                    <FormLabel mt={5} htmlFor='email'>Password:</FormLabel>
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        isRequired
                        id='signin_password'
                        type='password' />
                    <Box mt={5}>
                        <Button type='submit' mr={5}>Sign in</Button>
                        <Button onClick={signInWithGoogle} leftIcon={<FaGoogle />} colorScheme='linkedin'>Sign in with Google</Button>
                    </Box>
                </FormControl>
            </form>
        </>
    )
}

export default SignIn