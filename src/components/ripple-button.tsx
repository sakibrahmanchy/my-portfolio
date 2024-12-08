import { Button, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const RippleButton = ({ children, onClick }: { children: string; onClick?: () => void }) => {
    const MotionBox = motion(Box);

    return (
        <Button
            position="relative"
            overflow="hidden"
            onClick={onClick}
            _hover={{ bg: "brand.400", transform: "scale(1.05)" }}
        >
            {children}
            <MotionBox
                position="absolute"
                top="50%"
                left="50%"
                width="300%"
                height="300%"
                bg="brand.100"
                borderRadius="full"
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 0.8 }}
                pointerEvents="none"
            />
        </Button>
    );
};

export default RippleButton;
