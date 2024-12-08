import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,

  Button,
  Flex,

  useDisclosure,

  useBreakpointValue
} from "@chakra-ui/react";
import { LuArrowRightCircle as ArrowForwardIcon } from "react-icons/lu"
import AbstractGuidingLine from "../guiding-line";
import { projects } from "@/constants/projects";
import SlidingGrid from "@/components/sliding-grid/sliding-grid";
import Swiper from "@/components/swiper/swiper"
import Section from '@/components/section';

export default function ProjectsSection({
  initialTags = [],
  selectedCompany = null,
  setSelectedCompany = () => { }
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  // const [hovered, setHovered] = useState(null);
  const initialFilteredProjects = selectedTags.length
    ? projects.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag))
    )
    : projects;
  const [filteredProjects, setFilteredProjects] = useState(initialFilteredProjects);
  const [currentProject, setCurrentProject] = useState(null);
  const handleViewDemo = (project) => {
    setCurrentProject(project);
    onOpen();
  };

  const isMobile = useBreakpointValue({ base: true, md: false });



  useEffect(() => {
    if (selectedCompany) {
      const companyProjects = projects
        .filter((project) => project.company === selectedCompany)
      // .flatMap((project) => project.tags);
      setFilteredProjects(companyProjects)
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedTags.length > 0) {
      const newFilteredProjecs = filteredProjects.filter(project => project.tags.some(tag => selectedTags.includes(tag)))
      setFilteredProjects(newFilteredProjecs);
    } else {
      setFilteredProjects(initialFilteredProjects);
    }
  }, [selectedTags])

  const handleTagClick = (tag: string) => {
    if (tag === "all") {
      setFilteredProjects(projects)
      return
    }
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Innovating with Purpose: Transforming Ideas into Impactful Solutions with Agility and Precision 🚀"
      maxHeight=""
    >
      {/* <AbstractGuidingLine variant="split" /> */}
      {!isMobile && <Flex wrap={isMobile ? 'nowrap' : 'wrap'} justify={isMobile ? 'start' : 'center'} mb={8} flexDirection="row" gap={isMobile ? 10 : 0} overflow={isMobile ? 'scroll' : ''}>
        {["All", ...new Set(projects.flatMap((project) => project.tags))].map(
          (tag, index) => (
            <Button
              key={index}
              size="md"
              variant={selectedTags.includes(tag) ? "solid" : "outline"}
              m={2}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          )
        )}
        {selectedCompany && <Button
          key={selectedCompany}
          size="xs"
          variant={"solid"}
          onClick={() => setSelectedCompany(null)}
        >
          {selectedCompany}
        </Button>}
      </Flex>}
      {isMobile &&
        <Swiper
          items={[...["All", ...new Set(projects.flatMap((project) => project.tags))], ...[selectedCompany]]}
          renderItem={(item: any, index: number) => {
            return (
              <Button
                key={index}
                size="sm"
                onClick={() => handleTagClick(item)}
                variant={selectedTags.includes(item) ? "solid" : "outline"}
                m={2}
              >{item}</Button>
            )
          }}
        />}

      <SlidingGrid items={filteredProjects} />
    </Section>
  );
}
