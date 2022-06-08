import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { BsArrowUp } from "react-icons/bs";
import './ScrollTop.css'

const ScrollTop = () => {
    const [scrollToTop, setScrollToTop] = useState(false)

    // Toggle Color Mode 
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setScrollToTop(true)
            } else {
                setScrollToTop(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <motion.div
            style={{
                position: 'fixed',
                bottom: '150px',
                right: '0',
                left: '85%',
                width: '10px'
            }}>
            {scrollToTop && (
                <IconButton
                    bg={isDark ? '#2D313D' : '#EDF2F6'}
                    w='50px'
                    h='50px'
                    borderRadius='full'
                    boxShadow="lg"
                    className='arrow'
                    variant='solid'
                    size='lg'
                    icon={<BsArrowUp />}
                    onClick={scrollUp}>
                </IconButton>

            )}
        </motion.div>
    )
}

export default ScrollTop