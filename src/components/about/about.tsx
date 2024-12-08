import AnimatedSection from '@/components/animated-section/animated-section'// Import the AnimatedSection
import { Heading, Text, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'


export default function ResumeSection() {
    return (
      <AnimatedSection sectionId="resume">
        <Heading size="2xl" fontWeight="bold" textAlign="center" color="black">
          My Resume
        </Heading>
        <Text fontSize="xl" textAlign="center" color="black">
          A brief overview of my professional experience and skills.
        </Text>
        {/* Add resume content here */}
      </AnimatedSection>
    );
  }
  