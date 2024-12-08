import { Box, Heading, Text, VStack, Stack, Image, useBreakpointValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ServerAnimation from "../../../public/server-cluster.svg";
import Stats from '@/components/stats/stats';

const HeroSection = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [colorToChange, setColorToChange] = useState("");

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('here')
  //     setColorToChange("linear-gradient(180deg, rgb(255, 151, 102), rgb(255, 88, 132))")
  //   }, 2000)
  // }, [])

  return (
    <Box
      as="section"
      id="hero"
      minHeight="100vh"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      position="relative"
      overflow="hidden"
      scrollSnapAlign="start"
      padding={8}
      transition="all 0.3s ease"
      bgGradient={colorToChange}
    >
      {/* Left Content */}
      <Box
        flex="1"
        p={{ base: 2, md: 12 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <VStack
          align={{ base: "center", md: "flex-start" }}
          textAlign={{ base: "center", md: "left" }}
          spacing={6}
          zIndex={10}
        >
          <Heading as="h2" size={{ base: "xl", md: "2xl", lg: "3xl" }}>Hello, I'm Sakib.</Heading>
          <Heading as="h1" size={{ base: "xl", md: "3xl", lg: "4xl" }} maxW="4xl">
            Crafting Seamless Digital Experiences.
          </Heading>
          <Text fontSize={{ base: "md", md: "lg", lg: "xl" }}>
            Building innovative, scalable, and user-centric solutions for tomorrow's challenges.
          </Text>

          {/* CTA Buttons */}
          <Stack spacing={4} direction={{ base: "column", md: "row" }}>
            <button
              style={{
                background: "linear-gradient(90deg, #ff007f, #00e0ff)",
                color: "white",
                fontSize: "1.25rem",
                fontWeight: "bold",
                padding: "1rem 2.5rem",
                borderRadius: "10px",
                cursor: "pointer",
                border: "none",
                backgroundSize: "200% 200%",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.animation = "gradientMove 1s infinite";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.animation = "";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() =>
                document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore My Work
            </button>

            <style>
              {`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}
            </style>

            <button
              style={{
                background: "transparent",
                color: "#00e0ff",
                fontSize: "1.1rem",
                fontWeight: "bold",
                padding: "0.8rem 2rem",
                borderRadius: "10px",
                border: "2px solid #00e0ff",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={() => window.open("/path/to/resume.pdf", "_blank")}
            >
              Download Resume
            </button>
          </Stack>
        </VStack>
        <VStack>
          
       <Stats />
        </VStack>
      </Box>

      {/* Right Content */}
      {!isMobile && <Box
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        // position={{
        //   base: "relative",
        //   md: 'absolute'
        // }}
        position="absolute"
        alignItems="flex-end"
        height="100vh"
        bottom="0"
        right="0"
      >
        {isMobile ? <Image src={"server-cluster.svg"} width={600} />: <ServerAnimation />}
      </Box>}
      
    </Box>
  );
};

export default HeroSection;
