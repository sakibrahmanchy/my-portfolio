import { Box, chakra, keyframes} from "@chakra-ui/react";
import HeroSection from "@/components/hero/Hero";
import ProjectsSection from "@/components/projects/projects";
import IntroSection from "@/components/intro";
import ExperiencesSection from "@/components/experience/experience"
import { useState } from "react";
import { init } from "next/dist/compiled/@vercel/og/satori";

export default function Home() {
    const [initialTags, setInitialTags] = useState<string[]>([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    console.log(selectedCompany);
    return (
        <Box
        > 
            <HeroSection onTagSelect={(skill: string, index: number) => {
                if (!initialTags.includes(skill)) {
                    console.log('found')
                    setInitialTags([ ...initialTags, skill ]);
                }
            }}/>
            <IntroSection />
            <ProjectsSection initialTags={initialTags} selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany}/>
            <ExperiencesSection onSelectCompany={setSelectedCompany} />
        </Box>
    );
}
