import { Box, ChakraProvider, Spinner } from '@chakra-ui/react';
import '@fontsource/poppins';
import "../styles/globals.css";
import type { AppProps } from "next/app";
import customTheme from "../theme";
import Navbar from '@/components/Navbar';
import ScrollProgressBar from '@/components/scroll-progress';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false)
    }, [])
    return (
        <ChakraProvider theme={customTheme}>
            {/* Inject font via a global style */}
            <Box
                position="relative"
                as="main"
                overflowY="scroll" // Enables scrolling
                h="100vh" // Full viewport height for the container
                scrollSnapType="y mandatory" // Vertical scroll snap
                scrollBehavior="smooth" // Smooth scrolling effect
            >
                <Navbar isLoading={loading}/>
                {loading && <Box height="100vh" display="flex" alignItems="center" justifyContent="center"><Spinner /></Box>}
                {!loading && <Component {...pageProps} />}
                {/* <ScrollProgressBar /> */}
            </Box>
        </ChakraProvider>
    );
}
