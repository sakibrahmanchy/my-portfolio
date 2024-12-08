import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  VStack,
  HStack,
  Icon,
  useBreakpointValue,
  GridItem,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { SkillCloud } from "@/components/skill-cloud";
import Section from "./section";

export default function IntroSection() {
  const [focusedService, setFocusedService] = useState(1);
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Building scalable web apps, APIs, and microservices to deliver value.",
    },
    {
      id: 2,
      title: "UI/UX Engineering",
      description: "Designing intuitive interfaces to enhance user satisfaction and strengthen brand loyalty.",
    },
    {
      id: 3,
      title: "Cloud & DevOps",
      description: "Streamlining processes with efficient cloud solutions to reduce costs and improve scalability.",
    },
    {
      id: 4,
      title: "Leadership & Team Building",
      description: "Fostering collaborative, high-performing teams to boost productivity and drive innovation.",
    },
  ];
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Section
      id="intro"
      title="Driving innovation with technology"
      subtitle="Crafting Scalable Systems and Cutting-Edge Solutions with 7+ Years of Expertise in Software Engineering and Leadership ⚙️"
      maxHeight=""
    >
      <Grid
        templateColumns={{ base: "1fr", md: "3fr 1fr" }}
        gap={10}
        padding={4}
        alignItems="start"
      >
        <GridItem spacing={6} align="stretch">
          {services.map((service) => (
            <HStack
              key={service.id}
              cursor="pointer"
              padding={4}
              borderRadius="md"
              justifyContent="space-between"
              _hover={{ color: "white" }}
              _focus={{ color: "white" }}
              _active={{ color: "white" }}
              color={service.id === focusedService ? "white" : "inherit"}
              transition="all 0.3s ease"
              bgGradient={
                service.id === focusedService
                  ? "linear-gradient(280deg, #7322f6, #4400bf)"
                  : ""
              }
              onMouseEnter={() => setFocusedService(service.id)}
            >
              <Box>
                <Text fontSize={["md", "3xl"]} fontWeight="bold">
                  {service.title}
                </Text>
                <Text fontSize={["sm", "md"]}>{service.description}</Text>
              </Box>
              <Icon as={FaArrowRight} boxSize={5} />
            </HStack>
          ))}
        </GridItem>

        <GridItem align="stretch" >
          <Box
            overflowY="hidden"
            padding={isMobile ? 0 : 4}
            borderRadius="md"
          >
            <Flex wrap="wrap" gap={2}>
              <SkillCloud />
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Section>
  );
}
