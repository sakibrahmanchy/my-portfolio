import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionPath = motion.path;


const AbstractGuidingLine = ({ variant, zIndex = 0 }: { variant?: "default" | "split", zIndex?: number }) => {
    const path =
        variant === "split"
            ? "M50 0 C100 200, 0 400, 50 600 C100 800, 0 1000, 50 1200"
            : "M50 0 C100 200, 100 400, 50 600 C0 800, 100 1000, 50 1200";

    return (
        <Box 
            position="absolute" 
            top="0"
            left="0" 
            width="100%" 
            height="100%" 
            overflow="hidden" 
            zIndex={zIndex}
        >
            <svg width="100%" height="100%" viewBox="0 0 200 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <MotionPath
                    d={path}
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                    animate={{ strokeDashoffset: [0, -4000] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    strokeDasharray="2000"
                />
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ff007f" />
                        <stop offset="100%" stopColor="#00e0ff" />
                    </linearGradient>
                </defs>
            </svg>
        </Box>
    );
};


export default AbstractGuidingLine;
