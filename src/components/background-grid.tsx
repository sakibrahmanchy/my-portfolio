import { Box, keyframes } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const moveHorizontal = keyframes`
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
    transform: translateX(100vw);
  }
  100% {
    opacity: 0;
  }
`;

const moveVertical = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
    transform: translateY(100vh);
  }
  100% {
    opacity: 0;
  }
`;

export default function BackgroundGrid() {
  const numLines = 10;
  const [randomLines, setRandomLines] = useState<boolean[]>([]);

  useEffect(() => {
    const lines = Array.from({ length: numLines }, () => Math.random() > 0.5);
    setRandomLines(lines);
  }, []);

  return (
    <Box
      position="absolute"
      inset={0}
      zIndex={-1}
      overflow="hidden"
      pointerEvents="none"
    >
      {/* Horizontal Lines */}
      {Array.from({ length: numLines }).map((_, idx) => (
        <Box
          key={`h-line-${idx}`}
          position="absolute"
          top={`${(idx / numLines) * 100}%`}
          left="0"
          width="100%"
          height="1px"
          bg="rgba(255, 255, 255, 0.1)"
        >
          {/* Moving Light */}
          {randomLines[idx] && (
            <Box
              position="absolute"
              top="0"
              left="0"
              width="200%"
              height="1px"
              bg="rgba(255, 255, 255, 0.5)"
              animation={`${moveHorizontal} 8s linear infinite`}
              animationDelay={`${Math.random() * 5}s`}
            />
          )}
        </Box>
      ))}

      {/* Vertical Lines */}
      {Array.from({ length: numLines }).map((_, idx) => (
        <Box
          key={`v-line-${idx}`}
          position="absolute"
          left={`${(idx / numLines) * 100}%`}
          top="0"
          height="100%"
          width="1px"
          bg="rgba(255, 255, 255, 0.1)"
        >
          {/* Moving Light */}
          {randomLines[idx] && (
            <Box
              position="absolute"
              top="0"
              left="0"
              height="200%"
              width="1px"
              bg="rgba(255, 255, 255, 0.5)"
              animation={`${moveVertical} 8s linear infinite`}
              animationDelay={`${Math.random() * 5}s`}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
