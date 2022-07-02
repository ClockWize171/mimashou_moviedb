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
import { Link, useNavigate } from 'react-router-dom'
import { RiMoonClearFill } from "react-icons/ri";
import { HiLightBulb } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { UserAuth } from '../../context/AuthContext';
import './Navbar.css'

const Navbar = () => {

  const { user, logOut } = UserAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/login')
    } catch (error) {
      console.log(error.message)
    }
  }

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
                  bg={isDark ? '#2D313D' : '#EDF2F6'}
                  w='50px'
                  h='50px'
                  boxShadow="lg"
                  borderRadius='100vh'
                  as={Button}>
                  {isOpen ? <Icon mt={1} as={MdClose} /> : <Icon mt={2} as={GiHamburgerMenu} />}
                </MenuButton>
                <MenuList>
                <Link to='/popular'><MenuItem>Popular 🔥</MenuItem></Link>
                <Link to='/top_rated'><MenuItem>Top Rated ⭐</MenuItem></Link>
                <Link to='/upcoming'><MenuItem>Upcoming 🎬</MenuItem></Link>
                  {user ?
                    <MenuItem onClick={handleLogout}>Logout 👤</MenuItem>
                    :
                    <Link to='/login'><MenuItem>Login 👤</MenuItem></Link>}
                    <Link to='/about'><MenuItem>About 🌐</MenuItem></Link>
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
                <Link to='/popular'>
                  <Button w='10vw' fontWeight='normal' fontSize={textSize}>Popular 🔥</Button>
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
                {user ?
                  <Button onClick={handleLogout} w='10vw' fontWeight='normal' fontSize={textSize}>Logout 👤</Button>
                  :
                  <Link to='/login'>
                    <Button w='10vw' fontWeight='normal' fontSize={textSize}>Login 👤</Button>
                  </Link>
                }

              </Box>
              <Spacer />

              <Box
                pl={paddinL}>
                <Link to='/about'>
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