import SectionHeader from "../common/SectionHeader";
import Image from "next/image";

const SPONSORS = [
    { src: "/images/sponsors/sponsor1.jpeg", alt: "Sponsor 1" },
    { src: "/images/sponsors/sponsor2.jpeg", alt: "Sponsor 2" },
];

export default function Sponsors() {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4">
                <SectionHeader title="Sponsors" />
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto">
                    {SPONSORS.map((sponsor) => (
                        <div
                            key={sponsor.src}
                            className="flex items-center justify-center"
                        >
                            <Image
                                src={sponsor.src}
                                alt={sponsor.alt}
                                width={280}
                                height={140}
                                className="object-contain max-h-24 w-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
