import {
    Box,
    Container,
    Heading,
    Link,
    Text,
    Tag,
    Wrap,
    WrapItem,
    Select,
    Button,
    Stack,
    Flex,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { getAllPosts } from "../../lib/posts";
  
  const POSTS_PER_PAGE = 5;
  
  export default function BlogIndex({ posts }) {
    const [selectedTag, setSelectedTag] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
  
    // Theme-based colors
    const bgColor = useColorModeValue("background.light.card", "background.dark.card");
    const textColor = useColorModeValue("black", "white");
    const accentColor = useColorModeValue("background.light.accent", "background.dark.accent");
    const secondaryTextColor = "text.secondary";
  
    const filteredPosts = selectedTag
      ? posts.filter((post) => post.tags?.includes(selectedTag))
      : posts;
  
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  
    const uniqueTags = Array.from(
      new Set(posts.flatMap((post) => post.tags || []))
    );
  
    return (
      <Container maxW="container.md" py={8}>
        <Stack spacing={8}>
          {/* Blog Heading */}
          <Heading textAlign="center" color="brand.pink">
            Blog
          </Heading>
  
          {/* Tag Filter Dropdown */}
          <Select
            placeholder="Filter by tag"
            onChange={(e) => setSelectedTag(e.target.value)}
            value={selectedTag}
            maxW="300px"
            mx="auto"
            bg={bgColor}
            color={textColor}
          >
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Select>
  
          {/* Blog Posts */}
          <Stack spacing={8}>
            {paginatedPosts.map((post) => (
              <Box
                key={post.slug}
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                bg={bgColor}
                color={textColor}
                shadow="md"
                _hover={{
                  shadow: "lg",
                  borderColor: accentColor,
                }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Heading as="h3" size="lg" mb={2} color="brand.blue">
                    {post.title}
                  </Heading>
                </Link>
                <Text fontSize="sm" color={secondaryTextColor}>
                  {post.date}
                </Text>
                <Wrap mt={2}>
                  {post.tags?.map((tag) => (
                    <WrapItem key={tag}>
                      <Tag colorScheme="purple">{tag}</Tag>
                    </WrapItem>
                  ))}
                </Wrap>
                <Text mt={4}>{post.description}</Text>
              </Box>
            ))}
            {paginatedPosts.length === 0 && (
              <Text textAlign="center" color={secondaryTextColor}>
                No posts found for the selected tag.
              </Text>
            )}
          </Stack>
  
          {/* Pagination Controls */}
          {filteredPosts.length > POSTS_PER_PAGE && (
            <Flex justifyContent="space-between" alignItems="center" mt={8}>
              <Button
                bg={accentColor}
                color={textColor}
                _hover={{ bg: "brand.pink" }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <Text>
                Page {currentPage} of {totalPages}
              </Text>
              <Button
                bg={accentColor}
                color={textColor}
                _hover={{ bg: "brand.pink" }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </Flex>
          )}
        </Stack>
      </Container>
    );
  }
  
  export async function getStaticProps() {
    const posts = getAllPosts();
    return { props: { posts } };
  }
  