import React from 'react'
import {
  Box,
  Flex,
  Text,
  Spacer,
  IconButton,
  Button,
  Container,
  useColorMode,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useMediaQuery,
  useColorModeValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiMoonClearFill } from "react-icons/ri";
import { HiLightBulb } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import './Navbar.css'

const Navbar = () => {

  // Common Variable
  const textSize = "md"
  const paddinL = 9

  // Toggle Color Mode 
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"

  // Screen Size
  const [isLargerThan1280] = useMediaQuery('(min-width: 1023px)')

  return (
    <>
      <div className='mobile-navbar'>
        <Box display={isLargerThan1280 ? 'none' : 'flex'}>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  bg={isDark ? '#2D313D' : '#EDF2F6' }
                  w='50px'
                  h='50px'
                  boxShadow="lg"
                  borderRadius='100vh'
                  as={Button}>
                  {isOpen ? <Icon mt={1} as={MdClose} /> : <Icon mt={2} as={GiHamburgerMenu} />}
                </MenuButton>
                <MenuList>
                  <MenuItem><Link to='/trending'>Trending 🔥</Link></MenuItem>
                  <MenuItem><Link to='/top_rated'>Top Rated ⭐</Link></MenuItem>
                  <MenuItem><Link to='/upcoming'>Upcoming 🎬</Link></MenuItem>
                  <MenuItem><Link to='/login'>Login 👤</Link></MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
      </div>
      <Box bg={useColorModeValue('white', '#1A202C')} className='navbar'>
        <Divider boxShadow='dark-lg' />
        <Container maxW='80vw'>
          <Flex pt={2} textAlign='center' w='full'>
            <Box>
              <Link to='/'>
                <Text fontWeight='black' fontSize='3xl'>Mimashou</Text>
              </Link>
            </Box>
            <Spacer />

            <Box display={isLargerThan1280 ? 'flex' : 'none'}>
              <Box
                pl={paddinL}>
                <Link to='/trending'>
                  <Button w='10vw' fontWeight='normal' fontSize={textSize}>Trending 🔥</Button>
                </Link>
              </Box>
              <Spacer />
              <Box
                pl={paddinL}>
                <Link to='/top_rated'>
                  <Button w='10vw' fontWeight='normal' fontSize={textSize}>Top Rated ⭐</Button>
                </Link>
              </Box>
              <Spacer />
              <Box
                pl={paddinL}>
                <Link to='/upcoming'>
                  <Button w='10vw' fontWeight='normal' fontSize={textSize}>Upcoming 🎬</Button>
                </Link>
              </Box>

              <Spacer />
              <Box
                pl={paddinL}>
                <Link to='/login'>
                  <Button w='10vw' fontWeight='normal' fontSize={textSize}>Login 👤</Button>
                </Link>
              </Box>
              <Spacer />

              <Box
                pl={paddinL}>
                <Link to='/login'>
                  <Button w='10vw' fontWeight='normal' fontSize={textSize}>About 🌐</Button>
                </Link>
              </Box>
              <Spacer />
            </Box>

            <Box
              pl={paddinL}>
              <IconButton
                w='50px'
                onClick={toggleColorMode}
                icon={isDark ? <HiLightBulb /> : <RiMoonClearFill />} />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default Navbar