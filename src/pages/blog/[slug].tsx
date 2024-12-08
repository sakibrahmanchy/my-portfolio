import {
    Box,
    Container,
    Heading,
    Text,
    Wrap,
    WrapItem,
    Tag,
    Divider,
    Flex,
    IconButton,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
  import { getPostBySlug, getAllPosts } from "../../lib/posts";
  
  export default function BlogPost({ post }) {
    // Theme-based colors
    const bgColor = useColorModeValue("background.light.card", "background.dark.card");
    const textColor = useColorModeValue("black", "white");
    const accentColor = useColorModeValue("background.light.accent", "background.dark.accent");
    const secondaryTextColor = "text.secondary";
  
    return (
      <Container maxW="100%" marginTop="100px">
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          shadow="md"
          color={textColor}
        >
          {/* Hero Section */}
          <Box textAlign="center" mb={8}>
            <Heading as="h1" size="2xl" color="brand.pink" mb={4}>
              {post.title}
            </Heading>
            <Text fontSize="sm" color={secondaryTextColor}>
              Published on {post.date}
            </Text>
            <Wrap mt={4} justify="center">
              {post.tags?.map((tag) => (
                <WrapItem key={tag}>
                  <Tag colorScheme="purple">{tag}</Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
  
          {/* Divider */}
          <Divider my={8} />
  
          {/* Blog Content */}
          <Box
            className="blog-content"
            sx={{
              "& h2": { fontSize: "xl", color: accentColor, mb: 4 },
              "& p": { mb: 6, lineHeight: "1.8" },
              "& ul": { ml: 6, mb: 6 },
              "& a": {
                color: "brand.purple",
                textDecoration: "underline",
                _hover: { color: "brand.blue" },
              },
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
  
          {/* Social Sharing */}
          <Flex justify="center" mt={10} gap={4}>
            <IconButton
              aria-label="Share on Facebook"
              icon={<FaFacebook />}
              bg={accentColor}
              color={textColor}
              _hover={{ bg: "brand.pink" }}
            />
            <IconButton
              aria-label="Share on Twitter"
              icon={<FaTwitter />}
              bg={accentColor}
              color={textColor}
              _hover={{ bg: "brand.pink" }}
            />
            <IconButton
              aria-label="Share on LinkedIn"
              icon={<FaLinkedin />}
              bg={accentColor}
              color={textColor}
              _hover={{ bg: "brand.pink" }}
            />
          </Flex>
        </Box>
      </Container>
    );
  }
  
  export async function getStaticPaths() {
    const posts = getAllPosts();
    const paths = posts.map((post) => ({ params: { slug: post.slug } }));
    return { paths, fallback: false };
  }
  
  export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug);
    return { props: { post } };
  }
  