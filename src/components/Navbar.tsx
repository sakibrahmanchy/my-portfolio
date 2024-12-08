import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Button,
    Link,
    useColorMode,
    useColorModeValue,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
    useDisclosure,
    useBreakpointValue,
} from '@chakra-ui/react';
import { RxHamburgerMenu as HamburgerIcon  } from 'react-icons/rx';

const Navbar = ({ isLoading }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const textColor = useColorModeValue('text.primary', 'text.secondary');
    const [activeSection, setActiveSection] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const sections = document.querySelectorAll('section');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: [0.5] } // Trigger when 20% of the section is visible
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [isLoading]);

    const shouldShowNavbar = !['', 'hero'].includes(activeSection);
    console.log(activeSection);
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            color={textColor}
            padding={8}
            paddingX={isMobile ? 5 : 20}
            position={shouldShowNavbar ? 'fixed' : 'absolute'}
            width="100%"
            zIndex={100}
            background={
                shouldShowNavbar
                    ? colorMode === 'light'
                        ? 'linear-gradient(180deg, #fffdf9, #f9f5f0)'
                        : 'linear-gradient(240deg, #2b1d3b, #1a0c22)'
                    : ''
            }
            backdropBlur="10px"
            transition="background 0.3s ease-in-out"
        >
            <Flex justify="space-between" align="center">
                <Heading as="h1" size="lg">
                    <i>Sakib's Portfolio.</i>
                </Heading>
                {isMobile ? (
                    <>
                        <IconButton
                            icon={<HamburgerIcon />}
                            aria-label="Open menu"
                            onClick={onOpen}
                            variant="outline"
                        />
                        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerBody>
                                    <VStack spacing={6} mt={8}>
                                        <Link href="#intro" onClick={onClose}>
                                            Intro
                                        </Link>
                                        <Link href="#projects" onClick={onClose}>
                                            Projects
                                        </Link>
                                        <Link href="#skills" onClick={onClose}>
                                            Skills
                                        </Link>
                                        <Button onClick={toggleColorMode} variant="outline">
                                            {colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                                        </Button>
                                    </VStack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </>
                ) : (
                    <Flex align="center">
                        <Link href="#intro" mx={4}>
                            Intro
                        </Link>
                        <Link href="#projects" mx={4}>
                            Projects
                        </Link>
                        <Link href="#skills" mx={4}>
                            Skills
                        </Link>
                        <Button onClick={toggleColorMode} variant="outline">
                            {colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        </Button>
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default Navbar;
