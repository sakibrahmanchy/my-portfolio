import { Box } from '@chakra-ui/react';

const BlobBackground = () => {
    return (
        <Box
            position="absolute"
            top={-50}
            left={-50}
            width="200px"
            height="200px"
            bgGradient="radial(brand.100, brand.300)"
            borderRadius="50%"
            opacity={0.6}
            zIndex={-1}
        />
    );
};

export default BlobBackground;
