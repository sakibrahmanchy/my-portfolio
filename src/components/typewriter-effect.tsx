import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TypewriterEffect = ({ phrases }: { phrases: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }, 3000); // Change phrase every 3 seconds
        return () => clearInterval(interval);
    }, [phrases]);

    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
        >
            <Box fontSize="lg" fontWeight="bold" color="brand.500">
                {phrases[index]}
            </Box>
        </motion.div>
    );
};

export default TypewriterEffect;