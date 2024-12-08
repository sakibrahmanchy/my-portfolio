import { Box, useBreakpointValue, Tag, Heading, VStack } from "@chakra-ui/react";
import { FaLaptopCode, FaCloud, FaTools, FaServer, FaAdjust } from "react-icons/fa";
import Swiper from "./swiper/swiper";

const groupedSkills = {
    Frontend: ["React", "Redux", "TypeScript", "JavaScript", "TailwindCSS", "HTML", "CSS", "Storybook", "TailwindCSS", "HTML", "CSS", "Storybook"],
    Backend: ["NodeJS", "PHP", "GraphQL", "MySQL", "MongoDB", "Laravel", "NestJS", "PostgreSQL"],
    DevOps: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Helm", "Serverless", "Azure"],
    Testing: ["Jest", "Cypress", "Enzyme", "RTK", "Performance", "Testing"],
    Tools: ["GitHub", "Bitbucket", "GIT", "Nginx", "Elasticsearch"],
};

export const SkillCloud = ({
    onTagSelect = (skill: string, index: any) => { }
}) => {
    const fontSize = useBreakpointValue({ base: 'xl', sm: 'sm', md: '3xl' });
    const sectionFontSize = useBreakpointValue({ base: 'xl', md: '3xl' });

    return (
        <Box overflow="hidden" opacity={1}>
            <Swiper
                items={Object.keys(groupedSkills)}
                renderItem={(category, categoryIndex) => (
                    <VStack key={categoryIndex} align="start" spacing={8} >
                        <Box display="flex" alignItems="center" gap={4}>
                            {category === "Frontend" && <FaLaptopCode size={40} />}
                            {category === "Backend" && <FaServer size={40} />}
                            {category === "DevOps" && <FaCloud size={40} />}
                            {category === "Testing" && <FaAdjust size={40} />}
                            {category === "Tools" && <FaTools size={40} />}
                            <Heading
                                ml={2}
                                as="h3"
                                size="xl"
                                fontSize={sectionFontSize}
                            >
                                {category} Expertise
                            </Heading>
                        </Box>
                        <Box display="flex" flexWrap="wrap" zIndex="1">
                            {groupedSkills[category].map((skill, index) => (
                                <Tag
                                    key={index}
                                    fontSize={fontSize}
                                    fontWeight="bold"
                                    m={1}
                                    textTransform="capitalize"
                                    bg={getRandomColor()}
                                    transition="all 0.3s ease"
                                    opacity="0.9"
                                    zIndex="2"
                                    color="white"
                                    
                                    _hover={{
                                        transform: 'scale(1.1)',
                                        color: 'white',
                                        fontWeight: 'bolder',
                                        opacity: 1,
                                    }}
                                    cursor="pointer"
                                    onClick={() => onTagSelect(skill, index)}
                                >
                                    {skill}
                                </Tag>
                            ))}
                        </Box>
                    </VStack>
                )}
                forceItemsPerView={1}
            />
        </Box>
    );
};

const getRandomColor = () => {
    const colors = [ 'blue.400', '#7322f6', '#4400be'];
    return colors[Math.floor(Math.random() * colors.length)];
};
