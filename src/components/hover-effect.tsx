import { motion } from 'framer-motion';
import { Box, BoxProps } from '@chakra-ui/react';

const MotionBox = motion<BoxProps>(Box);

const HoverEffect = ({ children, ...props }: BoxProps) => {
    return (
        <MotionBox
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            {...props}
        >
            {children}
        </MotionBox>
    );
};

export default HoverEffect;
