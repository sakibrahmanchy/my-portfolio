import React, { useState, useRef, useMemo, useEffect } from "react";
import { ComposableMap, ZoomableGroup, Geographies, Geography, Marker } from "react-simple-maps";
import {
  Box,
  VStack,
  Text,
  Badge,
  HStack,
  Heading,
  Button,
  useBreakpointValue
} from "@chakra-ui/react";

import { experiences } from '@/constants/experience';
import Section from "../section";
import Swiper from "../swiper/swiper";

const calculateBoundedCenter = (coordinates: any = [0, 0], isMobile = false) => {
  const [longitude, latitude] = coordinates;


  const longitudeBounds = [-170, 170];
  const latitudeBounds = isMobile ? [0, 100] : [-60, 30];


  const clampedLongitude = Math.max(
    longitudeBounds[0],
    Math.min(longitudeBounds[1], longitude)
  );
  const clampedLatitude = Math.max(
    latitudeBounds[0],
    Math.min(latitudeBounds[1], latitude)
  );

  return [clampedLongitude, clampedLatitude];
};


const Experience = ({ experience, selectedExperience, handleMarkerClick, onSelectCompany, isMobile }) => (
  <Box
    key={experience.id}
    transition="all 0.3s"
    _hover={{
      transform: "scale(1.05)",
      shadow: "lg",
    }}
    bgGradient={experience.id === selectedExperience ? 'linear-gradient(280deg, #7322f6, #4400be)' : 'linear-gradient(280deg, #3b1d82, #1e005f)'}
    borderRadius="lg"
    p={[3, 6]}
    shadow="md"
    cursor="pointer"
    color="#fff"
    onClick={() => handleMarkerClick(experience.id)}
    onMouseMove={() => handleMarkerClick(experience.id)}
    onMouseEnter={() => handleMarkerClick(experience.id)}
    maxHeight={450}
    minHeight={isMobile ? 0 : 450}
    justifyContent="space-between"
    wordBreak="break-all"
    style={{
      textWrap: 'wrap'
    }}
  >
    <Text fontWeight="bold" fontSize={["md", "xl"]}>
      {experience.company}
    </Text>
    <Text fontSize={["xs, sm"]}>
      {experience.position} • {experience.duration}
    </Text>
    {!isMobile && <VStack align="start" spacing={2} mt={4}>
      {(experience?.description || []).map((desc: string, idx: number) => (
        <Text key={idx} fontSize="sm">
          - {desc}
        </Text>
      ))}
    </VStack>}
    <HStack mt={4} spacing={2} wrap="wrap"  justifyContent="flex-start" alignItems="flex-start" gap={2}> 
      {(experience?.tags || []).map((tag, idx) => (
        <Badge key={idx} colorScheme="purple">
          {tag}
        </Badge>
      ))}
    </HStack>
    <Button
      mt={4}
      size="sm"
      bg="brand.pink"
      onClick={() => {
        onSelectCompany(experience.company);
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      View Projects
    </Button>
  </Box>
)

export default function ExperienceMap({ onSelectCompany }) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [selectedExperience, setSelectedExperience] = useState(experiences[0].id);
  const [zoomCenter, setZoomCenter] = useState([0, 0]);
  const [zoomLevel, setZoomLevel] = useState(isMobile ? 5 : 1.5);

  const handleMarkerClick = (experienceId: number) => {
    setSelectedExperience(experienceId);
    setZoomLevel(isMobile ? 5 : 2);
  };

  const handleResetMap = () => {
    setZoomCenter(isMobile ? [-60, 30] : [0, 0]);
    setZoomLevel(isMobile ? 5 : 1);
  };


  useEffect(() => {
    const currentExperince = experiences.find(({ id }) => id === selectedExperience);
    console.log(currentExperince)
    if (!currentExperince) setZoomCenter(calculateBoundedCenter(experiences[0].location.coordinates, isMobile));
    else setZoomCenter(calculateBoundedCenter(currentExperince.location.coordinates, isMobile))
  }, [selectedExperience]);


  console.log(selectedExperience);
  return (
    <Section
      id="experience"
      title="Work Experience"
      subtitle="A Journey of Crafting Scalable, Innovative, and Impactful Solutions Across Industries and Teams Worldwide 🌍"
      paddingLeft={0}
    >
      <Box display="flex" flexDirection={{
        base: "column",
        lg: "row",
      }} gap={4} >
        {/* Left Section: Experiences */}
        <Box flex={isMobile ? 3 : 2} overflowY="auto" p={[0, 6]} borderRadius="md" flexDirection={isMobile ? 'row' : 'column'} >
          <VStack spacing={6} align="stretch">
            {/* {experiences.map((experience, index) => ( */}
             <Swiper
              enableSlideScroll
              items={experiences}
              onNextClick={() => {
                if (!Number.isNaN(selectedExperience) && selectedExperience !== experiences.length) {
                  setSelectedExperience(selectedExperience + 1)
                }
              }}
              onPreviousClick={() => {
                console.log('on', selectedExperience)
                if (!Number.isNaN(selectedExperience) && selectedExperience !== 1) {
                  setSelectedExperience(selectedExperience - 1)
                }
              }}
              renderItem={(experience) =>
                <Experience
                  experience={experience}
                  selectedExperience={selectedExperience}
                  handleMarkerClick={handleMarkerClick}
                  onSelectCompany={onSelectCompany}
                  isMobile={isMobile}
                />}
              forceItemsPerView={1}
              isMobile={isMobile}
            />
          </VStack>
        </Box>

        <Box flex="2" position="relative" height={["0vh", "100vh"]}>
          <ComposableMap projectionConfig={{ scale: 180 }} style={{ width: "100%", height: "100%" }}>
            <ZoomableGroup
              center={zoomCenter}
              zoom={zoomLevel}
              transitionDuration={800}
            >
              <Geographies geography="/countries-110m.json">
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: { fill: "#EDEDED", stroke: "#D6D6D6" },
                        hover: { fill: "#F0F0F0", stroke: "#D6D6D6" },
                        pressed: { fill: "#C0C0C0", stroke: "#D6D6D6" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {experiences.map((experience) => (
                <Marker
                  key={experience.id}
                  coordinates={experience.location.coordinates}
                  onClick={() => handleMarkerClick(experience.id)}
                >
                  <circle
                    r={experience.id === selectedExperience ? 12 : 8}
                    fill={experience.id === selectedExperience ? "#FF007F" : "#718096"}
                    stroke="#fff"
                    strokeWidth={2}
                    style={{
                      transition: "all 0.3s",
                      animation: experience.id === selectedExperience ? "pulse 1.5s infinite" : "",
                    }}
                    onMouseEnter={(e) => (e.target.style.r = "14")}
                    onMouseLeave={(e) => (e.target.style.r = experience.id === selectedExperience.id ? "12" : "8")}
                  />
                  {/* Dynamic width calculation for the card */}
                  <g>
                    {(() => {
                      const text = selectedExperience === experience.id ? experience.company + ', ' + experience.location.city : '';
                      const textLength = text.length * 6;
                      const rectX = -textLength / 2 - 10;
                      const rectWidth = textLength + 20;


                      if (selectedExperience !== experience.id) return;
                      return (
                        <>
                          {/* Background Card */}
                          <rect
                            x={rectX}
                            y={20}
                            width={rectWidth}
                            height={20}
                            rx={5}
                            ry={5}
                            fill="black"
                          />

                          {/* Marker Text */}
                          <text
                            x={0}
                            y={35}
                            textAnchor="middle"
                            style={{
                              fontSize: "12px",
                              fill: "#FFFFFF",
                              fontWeight: "bold",
                            }}
                          >
                            {text}
                          </text>
                        </>
                      );
                    })()}
                  </g>

                </Marker>
              ))}
              <style>
                {`
                  @keyframes pulse {
                    0% {
                      r: 10;
                    }
                    50% {
                      r: 12;
                    }
                    100% {
                      r: 10;
                    }
                  }
                `}
              </style>
            </ZoomableGroup>
          </ComposableMap>

          <Button
            position="absolute"
            top="10px"
            right="10px"
            size="sm"
            colorScheme="pink"
            onClick={handleResetMap}
            zIndex={10}
          >
            Reset Map
          </Button>
        </Box>
      </Box>
    </Section>
  );
}

