import {
  Grid,
  GridItem,
  Box as Block,
  Button,
  Heading,
  useBreakpointValue,
  Tag,
  Text,
  Flex
} from "@chakra-ui/react";
import { useState, useEffect, useRef, useMemo } from "react";

const rand = (min, max) => Math.floor(Math.random() * max) + min;

const Item = ({ item, index }) => {
  const gradients = [
    // "linear-gradient(280deg, #2E2E8C, #1C1C50)", // Indigo-Gray
    // "linear-gradient(280deg, #142850, #27496D)", // Navy-Teal
    // "linear-gradient(280deg, #503850, #1E1E2E)", // Plum-Slate
    // "linear-gradient(280deg, #3A506B, #1C1C1C)", // Steel-Charcoal
    // "linear-gradient(280deg, #E8D7F1, #FFF0F6)", // Peach-Lavender
    // "linear-gradient(280deg, #0F0F1C, #2E2E3A)", // Midnight
    // "linear-gradient(280deg, #7322f6, #4400bf)",
    // "linear-gradient(black, rgb(26, 12, 34))",
    //  "linear-gradient(rgb(43, 29, 59), rgb(26, 12, 34))"
  ];

  const isMobile = useBreakpointValue({ base: true, md: false });
  // const gradient = useMemo(() => gradients[rand(1, gradients.length) - 1], [item.id])
  // const gradient = gradients[index % gradients.length]; // Use index-based gradient for consistency
  const [focused, setFocused] = useState(false);

  return (
    <GridItem display="flex" key={index}>
      <Block
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={isMobile ? 4 : 20}
        flexDirection="column"
        width={isMobile ? 300 : 600}
        zIndex={20}
        border="1px solid rgba(255, 255, 255, 0.1)"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        // bgGradient={gradient}
        cursor="pointer"
        textAlign="center"
        transition="scale 0.3s"
        _hover={{
          transform: "scale(1.02)",
          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.4)",
          bgGradient: "linear-gradient(280deg, #7322f6, #4400bf)",
          border: 'none',
          color: "white"
        }}
        onMouseEnter={() => setFocused(true)}
        onMouseLeave={() => setFocused(false)}
        position="relative"
        gap={4}
        // borderRadius="md"
        overflow="hidden"
        // color="white"
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        {item.background && (
          <Block
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            background="rgba(0, 0, 0, 0.4)"
            zIndex={-1}
            bgImage={`url(${item.background})`}
            bgSize="cover"
            bgPosition="center"
            filter="blur(5px)"
          />
        )}

        <Heading
          as="h3"
          size={{ base: "md", md: "xl" }}
          mb={2}
          transition="all 0.3s"
        >
          {item.title}
        </Heading>

        <Text fontSize={{ base: "sm", md: "md" }} mb={4}>
          {item.description}
        </Text>

        <Flex gap={2} flexWrap="wrap" justifyContent="center" mb={4}>
          {item.tags.map((tag, i) => (
            <Tag
              key={i}
              border="1px solid rgba(255, 255, 255, 0.2)"
              px={3}
              py={1}
              color="inherit"
              _hover={{ bg: "brand.pink", }}
              transition="all 0.3s"
              bg="rgba(255, 255, 255, 0.1)"
            >
              {tag}
            </Tag>
          ))}
        </Flex>

        <Button
          bg="brand.pink"
          fontSize={{ base: "sm", md: "md" }}
          px={6}
          py={4}
          color="white"
          borderRadius="full"
          _hover={{
            // bg: "",
          }}
          transform={focused ? 'scale(1.3)' : ''}
          transition="all 0.3s"
        >
          Explore More
          <Text as="span" ml={2}>
            →
          </Text>
        </Button>
      </Block>
    </GridItem>
  );
};



const ScrollButton = ({ onClick, disabled, children, top = "50%", left = 0, right = 'none' }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Button
      position="absolute"
      top={top}
      left={left}
      right={right}
      zIndex="50"
      padding={isMobile ? 6 : 8}
      fontSize={isMobile ? "2xl" : "5xl"}
      borderRadius="50%"
      onClick={onClick}
      disabled={disabled}
      height={isMobile ? 5 : 20}
      width={isMobile ? 5 : 20}
      bgGradient="linear-gradient(90deg, #ff007f, #00e0ff)"
      bg="brand.blue"
      color="white"
      boxShadow="0 12px 24px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)"
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.05) translateY(-5px)",
        background: "gradientMove 1s infinite"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.animation = "gradientMove 1s infinite";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.animation = "";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </Button>
  )
};



const SlidingGrid = ({ items = [] }) => {
  const [isScrolledLeft, setIsScrolledLeft] = useState(true);
  const [isScrolledRight, setIsScrolledRight] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const scrollLength = isMobile ? 300 : 600;

  const checkScrollPosition = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      setIsScrolledLeft(scrollLeft === 0);
      setIsScrolledRight(scrollLeft + clientWidth === scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollLeft -= scrollLength;
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollLeft += scrollLength;
    }
  };

  useEffect(() => {
    const handleScroll = () => checkScrollPosition();
    const gridElement = gridRef.current;

    if (gridElement) {
      gridElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);


  return (
    <Block position="relative" overflow="hidden" paddingLeft={4}>
      {/* Left Button */}
      {!isScrolledLeft && <ScrollButton
        onClick={scrollLeft}
        disabled={isScrolledLeft}
        left={10}
        top="50%"
      >
        ←
      </ScrollButton>}

      <Grid
        templateColumns="repeat(6, 1fr)"
        gap="6"
        overflowX="scroll"
        ref={gridRef}
        scrollBehavior="smooth"
        css={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
          "::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and newer Edge
          },
        }}
      >
        {items.map((item, index) => (
          <Item item={item} index={index} key={index} />
        ))}
      </Grid>

      {/* Right Button */}
      {!isScrolledRight && <ScrollButton
        onClick={scrollRight}
        disabled={isScrolledRight}
        right={10}
        left="none"
        top="50%"
      >
        →
      </ScrollButton>}
    </Block>
  )
}

export default SlidingGrid;