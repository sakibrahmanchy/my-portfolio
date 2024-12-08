import {
    Box,
    Button,
    useBreakpointValue,
    Flex,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

const Item = ({ item, index, renderItem = () => {}, singleView = false }) => {
    return (
        <Box
            key={index}
            flex="0 0 auto"
            p={2}
            width={singleView ? "90%" : "auto"}
            marginRight={singleView ? "10px" : "0"}
        >
            {renderItem(item)}
        </Box>
    );
};

const ScrollButton = ({ onClick, disabled, children }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            padding={isMobile ? 4 : 6}
            fontSize={isMobile ? "sm" : "2xl"}
            background="none"
            transition="all 0.3s ease"
            _hover={{ transform: "scale(1.1)" }}
            animation="pulseArrow 1.5s infinite"
        >
            <style>
                {`
                  @keyframes pulseArrow {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                `}
            </style>
            {children}
        </Button>
    );
};

const Swiper = ({
    items = [],
    renderItem = () => {},
    onNextClick = () => {},
    onPreviousClick = () => {},
    forceItemsPerView = null,
    enableSlideScroll = false, // New prop to enable sliding scroll
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [startIndex, setStartIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    const updateItemsPerView = () => {
        if (forceItemsPerView) setItemsPerView(forceItemsPerView);
        else if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const buttonWidth = 50;
            const isMobile = containerWidth < 768;
            const itemWidth = isMobile ? 100 : 200;
            const availableWidth = containerWidth - 2 * buttonWidth;
            const itemsThatFit = Math.floor(availableWidth / itemWidth);

            setItemsPerView(itemsThatFit > 0 ? itemsThatFit : 1);
        }
    };

    useEffect(() => {
        updateItemsPerView();
        window.addEventListener("resize", updateItemsPerView);
        return () => {
            window.removeEventListener("resize", updateItemsPerView);
        };
    }, []);

    const scrollLeft = () => {
        if (enableSlideScroll && forceItemsPerView === 1 && containerRef.current) {
            const container = containerRef.current;
            const itemWidth = container.offsetWidth * 0.9; // Adjust width to match visible item
            container.scrollBy({ left: -itemWidth, behavior: "smooth" });
        } else {
            setStartIndex((prev) => Math.max(0, prev - itemsPerView));
            onPreviousClick();
        }
    };

    const scrollRight = () => {
        if (enableSlideScroll && forceItemsPerView === 1 && containerRef.current) {
            const container = containerRef.current;
            const itemWidth = container.offsetWidth * 0.9; // Adjust width to match visible item
            container.scrollBy({ left: itemWidth, behavior: "smooth" });
        } else {
            setStartIndex((prev) =>
                Math.min(prev + itemsPerView, items.length - itemsPerView)
            );
            onNextClick();
        }
    };

    const visibleItems =
        forceItemsPerView === 1 && !enableSlideScroll
            ? items.slice(startIndex, startIndex + itemsPerView)
            : items;

    return (
        <Flex
            position="relative"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            overflow="hidden"
        >
            <ScrollButton onClick={scrollLeft} disabled={startIndex === 0}>
                ←
            </ScrollButton>

            <Flex
                ref={containerRef}
                flex="1"
                alignItems="center"
                width="100%"
                overflow={enableSlideScroll ? "hidden" : "visible"}
                style={{
                    scrollBehavior: enableSlideScroll ? "smooth" : "auto",
                    whiteSpace: enableSlideScroll ? "nowrap" : "normal",
                }}
                css={{
                    "&::-webkit-scrollbar": { display: "none" },
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                }}
            >
                {visibleItems.map((item, index) => (
                    <Item
                        item={item}
                        index={index}
                        key={index}
                        renderItem={renderItem}
                        singleView={forceItemsPerView === 1}
                    />
                ))}
            </Flex>

            <ScrollButton
                onClick={scrollRight}
                disabled={startIndex + itemsPerView >= items.length}
            >
                →
            </ScrollButton>
        </Flex>
    );
};


export default Swiper;
