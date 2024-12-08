import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const MotionBox = motion(Box)

const stats = [
  { value: "7+", label: "Years of experience." },
  { value: "20+", label: "Projects completed." },
  { value: "2.1M+", label: "Users served." },
  { value: "70K+", label: "Software Engineers Impacted." },
  { value: "100K+", label: "Shopify stores impacted." },
  { value: "30+", label: "People mentored." },
];

const Stats = () => {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={4}
      gap={8}
      width="100%"
    >
      <AnimatePresence exitBeforeEnter>
        <MotionBox
          key={stats[currentStatIndex].value}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          textAlign="center"
        >
          <Text fontSize={['4xl', '8xl']} fontWeight="bold">
            {stats[currentStatIndex].value}
          </Text>
          <Text fontSize={['xl', '2xl']}>{stats[currentStatIndex].label}</Text>
        </MotionBox>
        <MotionBox
          key={stats[currentStatIndex + 1]?.value || stats[0]?.value}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          textAlign="center"
        >
          <Text fontSize={['4xl', '8xl']} fontWeight="bold">
            {stats[currentStatIndex + 1]?.value || stats[0]?.value}
          </Text>
          <Text fontSize={['xl', '2xl']}>{stats[currentStatIndex + 1]?.label || stats[0]?.label}</Text>
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
};

export default Stats;
