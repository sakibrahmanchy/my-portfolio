import { Box, Heading, Text, useBreakpointValue, Flex } from '@chakra-ui/react';

const Section = ({
    children,
    title,
    subtitle,
    id,
    maxHeight = "100vh",
    paddingLeft = null
}) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <Box
            id={id}
            as="section"
            scrollSnapAlign="start"
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            maxHeight={maxHeight}
            paddingLeft={isMobile ? 0 : paddingLeft ?? 20}
            // overflow={isMobile ? '' : 'hidden'}
        >
            <Flex justify="center" align="center" flexDirection="column" textAlign="center" mb={isMobile ? 4: 12}>
                <Heading as="h1" fontSize={{
                    base: "2xl",
                    md: "6xl"
                }} mb={2}>
                    {title}
                </Heading>
                <Text fontSize={{ base: "sm", md: "xl" }} maxW="4xl">{subtitle}</Text>
            </Flex>

            {children}
        </Box>
    )
}

export default Section;