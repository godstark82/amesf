import SectionImageHeader from "../common/SectionImageHeader";

// const KEYNOTE_SPEAKERS = [
//     {
//         name: "Dr. L.P. Singh",
//         affiliation: "DG - NCCBM, Govt of India",
//         country: "India",
//         img: "", // No image provided for keynote speaker
//     },
// ];

const SPEAKERS = [
    {
        name: "Dr. Imran Ali",
        affiliation: "Professor & Head, JMI New Delhi",
        country: "India",
        img: "",
    },
    {
        name: "Dr. Liliana Guran",
        affiliation: "Babes-Bolyai University, Cluj-Napoca, Romania",
        country: "Romania",
        img: "/images/speakers/liliana.jpg",
    },
    {
        name: "Dr. Dorota Jelonek",
        affiliation: "Czestochowa University of Technology, Poland",
        country: "Poland",
        img: "/images/speakers/prof-dorota2.jpeg",
    },
    {
        name: "Dr. Monika Bota",
        affiliation: "Babes-Bolyai University, Cluj-Napoca, Romania",
        country: "Romania",
        img: "/images/speakers/monalika_bota.jpg",
    },
    {
        name: "Dr. Sameer Sapra",
        affiliation: "IIT Delhi",
        country: "India",
        img: "",
    },
    {
        name: "Dr. Adarsh Kumar",
        affiliation: "Director, Forensic Science Laboratory, Lucknow",
        country: "India",
        img: "",
    },
    {
        name: "Dr. Millie Pant",
        affiliation: "Professor & Head, Department of Applied Mathematics and Scientific Computing, IIT Roorkee",
        country: "India",
        img: "",
    },
    {
        name: "Dr. S. Mahapatra",
        affiliation: "Professor, GGSIP University, New Delhi",
        country: "India",
        img: "",
    },
    {
        name: "Dr. Tokeer Ahmed",
        affiliation: "Professor of Nano/Energy/Physical Chemistry, JMI, New Delhi",
        country: "India",
        img: "",
    },
    {
        name: "Prof. Dinesh Mohan",
        affiliation: "JNU, New Delhi",
        country: "India",
        img: "",
    },
    {
        name: "Dr. Antony George",
        affiliation: "Adjunct Professor, Friedrich Schiller University, Jena, Germany",
        country: "Germany",
        img: "",
    },
    {
        name: "Dr. M.V.R Reddy",
        affiliation: "Senior Researcher, Hydro-Québec, Canada",
        country: "Canada",
        img: "",
    },
];

function SpeakerCard({ speaker }: { speaker: any }) {
    return (
        <div className="bg-[#232335] rounded-md overflow-hidden shadow-md flex flex-col w-full max-w-[275px] p-4 text-white">
            {/* {speaker.img ? (
                <div className="h-[200px] overflow-hidden mb-4 rounded-md">
                    <img
                        src={speaker.img}
                        alt={speaker.name}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            ) : null} */}
            <div>
                <div className="h-1.5 w-12 bg-primary my-1.5"></div>
                <div className="font-semibold text-sm md:text-base leading-tight mb-1">{speaker.name}</div>
                <div className="text-xs opacity-90 leading-tight whitespace-normal mb-1">{speaker.affiliation}</div>
                <div className="text-xs opacity-70 leading-tight whitespace-normal">{speaker.country}</div>
            </div>
        </div>
    );
}

export default function KeynoteSpeakers() {
    return (
        <section className="bg-white">
            <SectionImageHeader title="Keynote Speakers" image="/images/speakers-bg.jpg" />
            <div className="container mx-auto px-4 py-8 md:py-12">
                {/* <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#232335]">Keynote Speakers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center mb-12">
                    {KEYNOTE_SPEAKERS.map((speaker) => (
                        <SpeakerCard key={speaker.name} speaker={speaker} />
                    ))}
                </div> */}

                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#232335]">Speakers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
                    {SPEAKERS.map((speaker) => (
                        <SpeakerCard key={speaker.name} speaker={speaker} />
                    ))}
                </div>
            </div>
        </section>
    );
}
