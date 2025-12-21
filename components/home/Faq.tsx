import SectionHeader from "../common/SectionHeader";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FAQ_DATA = [
  {
    question: "Who Should Attend?",
    answer: `The International Conference on Advanced Materials & Engineering for Sustainable Future is not just a knowledge-sharing forum, but also a catalyst for international collaboration and innovation, empowering the next generation of scientists, engineers, and leaders to drive progress toward a greener and more sustainable world. We invite the Researchers, Academicians, Students, Industry Professionals, and Policy Makers from National and International Institutes, Universities, R&D Organizations, Leading Industries, and Startups to join us in this prestigious conference and share your research findings, innovative ideas, and solutions.`
  },
  {
    question: "Why Attend?",
    answerItems: [
      "Exchange groundbreaking research ideas",
      "Network with academia and industry experts",
      "Discover funding opportunities & collaborations",
      "Explore sustainable solutions for a greener future"
    ]
  },
  // Add more FAQ items here simply by adding more objects
];

export default function FaqSection() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeader title="Frequently Asked Questions" />
        <Accordion className="space-y-4">
          {FAQ_DATA.map(({ question, answer, answerItems }, idx) => (
            <AccordionItem key={idx} value={`faq-item-${idx}`} className="border border-gray-200 rounded-lg">
              <AccordionTrigger className="text-lg font-semibold px-6 py-4 hover:bg-gray-100 rounded-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-700 leading-relaxed">
                {answer && <p>{answer}</p>}
                {answerItems && (
                  <ul className="list-disc list-inside space-y-2">
                    {answerItems.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
