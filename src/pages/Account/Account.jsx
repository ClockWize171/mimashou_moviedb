import React from 'react'
import {
    Container,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    useColorModeValue
} from '@chakra-ui/react'
import { FaHeart, FaClock } from "react-icons/fa";
import { WatchLater, Favorite } from '../../components'

const Account = () => {
    return (
        <Container mt={5} maxW='container.lg'>
            <Text fontSize={['2xl', '3xl']} fontWeight='bold'>Your Saved Shows:</Text>
            <Tabs
                mt='2vh'
                isLazy
                isFitted
                variant='enclosed'
                colorScheme={useColorModeValue('blackAlpha', 'whiteAlpha')}>
                <TabList>
                    <Tab
                        _selected={{ bg: useColorModeValue('whatsapp.400', 'whatsapp.300') }}
                        fontWeight='medium'
                        borderWidth='2px'>
                        Watch Later &nbsp; <FaClock />
                    </Tab>
                    <Tab
                        _selected={{ bg: useColorModeValue('red.400', 'red.300') }}
                        fontWeight='medium'
                        borderWidth='2px'>
                        Favorite &nbsp; <FaHeart />
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <WatchLater />
                    </TabPanel>
                    <TabPanel>
                        <Favorite />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    )
}

export default Account