import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
    Box,
    Text,
    Image,
    Icon,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from "react-icons/fa";
import './Carousel.css'

const Carousel = ({ title, movieUrl, linkUrl }) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(movieUrl)
            .then((response) => {
                setMovies(response.data.results.slice(0, 10))
            })
    }, [movieUrl])

    // Carousel Settings
    const [width, setWidth] = useState(0)
    const carousel = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            const scrollWidth = carousel.current.scrollWidth
            const offsetWidth = carousel.current.offsetWidth
            setWidth(scrollWidth - offsetWidth)
        }, 2000)
    }, [])

    return (
        <Box pt={5}>
            <Box w='160px'>
                <Text _hover={{ textDecoration: 'underline' }} pl={3} pb={3} fontWeight='bold' fontSize='xl'>
                    <Link to={linkUrl}>
                        {title} <Icon w={4} h={4} as={FaArrowRight} />
                    </Link>
                </Text>
            </Box>
            <motion.div
                ref={carousel}
                className='carousel'
                whileTap={{ cursor: "grabbing" }}>
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="inner-carousel">
                    {
                        movies.map((movie, id) => (
                            <React.Fragment key={id}>
                                <Image
                                    fallbackSrc='https://via.placeholder.com/360x240'
                                    pl={2}
                                    w='full'
                                    h='20vh'
                                    className='image'
                                    src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} />
                                <Text
                                    pr='0.5rem'
                                    pt='1rem'
                                    fontWeight='bold'
                                    fontSize={['sm', 'md']}
                                    className='vertical'>
                                    {movie?.title ? movie?.title : movie?.name}
                                </Text>
                            </React.Fragment>
                        ))
                    }

                </motion.div>
            </motion.div>
        </Box>
    )
}

export default Carousel