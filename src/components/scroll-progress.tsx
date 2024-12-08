import React, { useEffect, useState } from "react";
import { Box, chakra } from "@chakra-ui/react";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress); // Updates on every scroll
    };

    // Add scroll listener
    window.addEventListener("scroll", updateProgress);

    // Run once to initialize (in case the page is already scrolled)
    updateProgress();

    return () => {
      // Cleanup listener on unmount
      window.removeEventListener("scroll", updateProgress);
    };
  }, []); // The listener itself is set only once

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      width="64px"
      height="64px"
      borderRadius="full"
      background="rgba(0, 0, 0, 0.7)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      onClick={handleScrollToTop}
      _hover={{ background: "rgba(0, 0, 0, 0.9)" }}
    >
      <chakra.svg
        width="56px"
        height="56px"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(-90deg)"
      >
        {/* Background Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="4"
        />
        {/* Progress Circle */}
        <chakra.circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeDasharray="100"
          strokeDashoffset={100 - scrollProgress}
          transition="stroke-dashoffset 0.2s ease-out"
        />
        {/* Arrow Icon */}
        <chakra.text
          x="18"
          y="20.5"
          fontSize="12px"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
        >
          ↑
        </chakra.text>
      </chakra.svg>
    </Box>
  );
};

export default ScrollProgressBar;
