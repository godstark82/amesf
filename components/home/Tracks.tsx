import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "../common/SectionHeader";

const TRACKS = [
  {
    name: "Materials Science & Sustainability",
    subtopics: [
      "Green Materials", "Circular Economy", "Biodegradable Polymers", "Recycling Technologies"
    ]
  },
  {
    name: "Energy & Environmental Engineering",
    subtopics: [
      "Renewable Energy Systems", "Waste Management", "Carbon Capture", "Water Purification"
    ]
  },
  {
    name: "Sustainable Engineering",
    subtopics: [
      "Life Cycle Assessment", "Eco-design", "Sustainable Manufacturing"
    ]
  },
  {
    name: "Electronics, AI & Computing in Material",
    subtopics: [
      "AI-driven Material Discovery", "Smart Sensors", "Computational Modelling"
    ]
  },
  {
    name: "Interdisciplinary & Policy Topics",
    subtopics: [
      "Climate Policy", "Socio-Economic Impacts", "Regulatory Frameworks"
    ]
  },
  {
    name: "Sustainability in Digital Engineering",
    subtopics: [
      "Digital Twins", "IoT for Sustainability", "Virtual Prototyping"
    ]
  },
  {
    name: "Mathematical Modelling and weather forecasting",
    subtopics: [
      "Numerical Weather Prediction", "Data Assimilation", "Climate Simulation"
    ]
  },
  {
    name: "Forensic Science",
    subtopics: [
      "Crime Scene Analysis", "Forensic Toxicology", "Biometrics"
    ]
  },
  {
    name: "Food Technology",
    subtopics: [
      "Nutrition and Dietetics", "Food Quality & Safety", "Packaging Technology", "Food Fortification", "Nutrigenomics"
    ]
  },
  {
    name: "Biological Sciences",
    subtopics: [
      "Fermentation Technology", "Virology", "Biofuels", "Biofuels", "Environmental Biotechnology",
      "Bioinformatics"
    ]
  }
];

export default function Tracks() {
  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-6 md:px-10">
        <SectionHeader title="Themes" />
        <Accordion className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-20">
          {TRACKS.map((track) => (
            <AccordionItem key={track.name} value={track.name}>
              <Card className="bg-[#211833]  text-white rounded-xl shadow-lg transition hover:scale-[1.03] border-none">
                <AccordionTrigger className="px-7 py-6 text-lg font-semibold text-left rounded-t-xl border-none ">
                  {track.name}
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pl-7 pb-5">
                    <ul className="list-disc text-base space-y-2">
                      {track.subtopics?.map((sub, i) => (
                        <li key={i} className="ml-4 text-white">{sub}</li>
                      ))}
                    </ul>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
