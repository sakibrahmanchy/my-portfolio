import { useState, useEffect } from "react";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import styles from "./about.module.css";

export default function OtherSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box as="section" display="flex" justifyContent="center" alignItems="center" h="100vh" overflow="hidden" position="relative">
      {/* Background Animation */}
      <motion.div
        className={styles.sectionBackground}
        animate={{
          scale: [1, 1.3 + scrollY / 300, 1.5 + scrollY / 600],  // Adjust zoom based on scroll
          opacity: [0.6, 0.5 + scrollY / 1000, 0.8],
          rotate: [0, -10 + scrollY / 50, 0],
        }}
        transition={{
          duration: 1,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></motion.div>

      {/* Main Content */}
      <Stack spacing={6} align="center" zIndex={1}>
        <Heading size="2xl" fontWeight="bold" textAlign="center" color="black">
          My Resume
        </Heading>
        <Text fontSize="xl" textAlign="center" color="black">
          A brief overview of my professional experience and skills.
        </Text>
        {/* Additional resume content goes here */}
      </Stack>
    </Box>
  );
}
