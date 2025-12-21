import React from "react";
import AboutHeader from "@/components/common/AboutHeader";
import CommitteeMemberGrid from "@/components/common/CommitteeMemberGrid";

const chiefPatron = [
    {
        image: "https://iilm.ac.in/uploads/all/1067/conversions/Taruna-Ma'am-full.webp",
        name: "Prof (Dr) Taruna Gautam",
        role: "Vice-Chancellor",
        affiliation: "IILM University, Greater Noida",
    }
];

const coPatron = [
    {
        image: "https://iilm.ac.in/uploads/all/691/conversions/Dr-Sandeep-Chatterjee-full.webp",
        name: "Dr. Sandeep Chattarjee",
        role: "Pro VC",
        affiliation: "IILM University, Greater Noida",
    }
];

const conferenceChair = [
    {
        image: "https://iilm.ac.in/uploads/all/700/conversions/Munish-Sabharwal-full.webp",
        name: "Prof. Munish Sabharwal",
        role: "IILM University",
        affiliation: "Greater Noida",
    }
];

const internationalChair = [
    {
        image: "/images/user.jpg",
        name: "Dr. Akhatov Akmal Rustamovich",
        role: "Vice Rector for international cooperation",
        affiliation: "Samarkand State University, Uzbekistan",
    }
];

const conveners = [
    {
        image: "https://iilm.ac.in/uploads/all/422/conversions/AK-JAIN-350x240-full.webp",
        name: "Prof. A.K. Jain",
        role:"Convener",
        affiliation: "IILM University, Greater Noida",
    },
    {
        image: "/images/speakers/dr-narendra.jpeg",
        name: "Prof. Narendra Kumar",
        role: "Co Convener",
        affiliation: "IILM University, Greater Noida",
    },
    {
        image: "/images/speakers/nazarov-fayzullo.jpeg",
        name: "Dr. Nazarov Fayzullo",
        role: "Co Convener",
        affiliation: "Uzbekistan",
    },
];

const organizingSecretaries = [
    {
        image: "https://iilm.ac.in/uploads/all/439/conversions/Artboard-18-350x240-full.webp",
        name: "Dr. Nidhi Puri",
        role: "Organising Secretary",
        affiliation: "IILM University, Greater Noida"
    },
    {
        image: "/images/user.jpg",
        name: "Dr. Arpit Varshney",
        role: "Organising Secretary",
        affiliation: "IILM University, Greater Noida"
    },
    {
        image: "/images/user.jpg",
        name: "Dr. KM Bala",
        role: "Organising Secretary",
        affiliation: "IILM University, Greater Noida"
    },
    {
        image: "/images/user.jpg",
        name: "Dr. Yarmatov Sherzodjon",
        role: "Organising Secretary",
        affiliation: "Samarkand State University, Uzbekistan"
    }
];

const organizingCommittee = [
    {
        name: "Dr. Priyanka Bhatnagar",
        role: "Organising Committee",
        affiliation: " IILM University, Greater Noida"
    },
    {
        name: "Dr. Nidhi Puri",
        role: "Organising Committee",
        affiliation: " IILM University, Greater Noida"
    },
    {
        name: "Dr. Vanya",
        role: "Organising Committee",
        affiliation: " IILM University, Greater Noida"
    },
    {
        name: "Dr. Bharti",
        role: "Organising Committee",
        affiliation: " IILM University, Greater Noida"
    },
    {
        name: "Dr. Pankaj",
        role: "Organising Committee",
        affiliation: " IILM University, Greater Noida"
    },
    {
        name: "Dr. Lalit",
        role: "Organising Committee",
        affiliation: " IILM University, Greater Noida"
    }
];

export default function ConferenceChairPage() {
    return (
        <div className="min-h-screen bg-white">
            <AboutHeader
                title="Conference Chairs & Committee"
                date="5 - 7 September"
                // image="/images/simdte-white-lg.png"
                overlayColor="#1a1a2e"
                bgImage="/images/utb-images/gallery/gallery-2.jpg"
                dividerColor="primary"
            />
            <section className="max-w-6xl mx-auto px-4 py-12">

                <h2 className="text-3xl md:text-4xl font-bold mb-8">Chief Patron</h2>
                <CommitteeMemberGrid members={chiefPatron.map(m => ({
                    name: m.name,
                    role: `${m.role}${m.affiliation ? `, ${m.affiliation}` : ""}`,
                    image: m.image
                }))} />
<br />
<br />
                {/* <h2 className="text-3xl md:text-4xl font-bold mb-8">Co-Patron</h2>
                <CommitteeMemberGrid members={coPatron.map(m => ({
                    name: m.name,
                    role: `${m.role}${m.affiliation ? `, ${m.affiliation}` : ""}`,
                    image: m.image
                }))} /> */}

                <h2 className="text-3xl md:text-4xl font-bold mb-8 mt-16">Conference Chair</h2>
                <CommitteeMemberGrid members={conferenceChair.map(m => ({
                    name: m.name,
                    role: `${m.role}${m.affiliation ? `, ${m.affiliation}` : ""}`,
                    image: m.image
                }))} />

                <h2 className="text-3xl md:text-4xl font-bold mb-8 mt-16">International Chair</h2>
                <CommitteeMemberGrid members={internationalChair.map(m => ({
                    name: m.name,
                    role: `${m.role}${m.affiliation ? `, ${m.affiliation}` : ""}`,
                    image: m.image
                }))} />

                <h2 className="text-3xl md:text-4xl font-bold mb-8 mt-16">Conveners & Co-Conveners</h2>
                <CommitteeMemberGrid members={conveners.map(m => ({
                    name: m.name,
                    role: `${m.role}${m.affiliation ? `, ${m.affiliation}` : ""}`,
                    image: m.image
                }))} />

                <h2 className="text-3xl md:text-4xl font-bold mb-8 mt-16">Organizing Secretaries</h2>
                <CommitteeMemberGrid members={organizingSecretaries.map(m => ({
                    name: m.name,
                    role: `${m.role}${m.affiliation ? `, ${m.affiliation}` : ""}`,
                    image: m.image ?? "/images/user.jpg"
                }))} />

                <h2 className="text-3xl md:text-4xl font-bold mb-8 mt-16">Organizing Committee</h2>
                <CommitteeMemberGrid members={organizingCommittee.map((m:any) => ({
                    name: m.name,
                    role: `${m.role}${m.affiliation ? `, ${m.affiliation}` : ""}`,
                    image: m.image ?? "/images/user.jpg"
                }))} />

            </section>
        </div>
    );
}
