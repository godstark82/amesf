import React from "react";
import AboutHeader from "@/components/common/AboutHeader";

const CommitteeMemberGrid = ({ members }: { members: { name: string, role: string }[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {members.map((member, idx) => (
            <div key={idx} className="bg-gray-100 rounded-lg p-6 shadow">
                <div className="border-l-4 border-primary pl-4 mb-2 font-semibold text-lg">{member.name}</div>
                <div className="text-gray-700">{member.role}</div>
            </div>
        ))}
    </div>
);

const technicalCommittee = [
    { name: "Dr. Pankaj", role: "IILM University, Greater Noida" },
    { name: "Dr. Chhavi Pahawa", role: "IILM University, Greater Noida" },
    { name: "Dr. Pawan Soni", role: "IILM University, Greater Noida" },
    { name: "Dr. Anupama Srivastava", role: "IILM University, Greater Noida" },
    { name: "Dr. Avdhesh Gupta", role: "IILM University, Greater Noida" },
    { name: "Dr. K.M. Bala", role: "IILM University, Greater Noida" },
    { name: "Dr. Umesh Sharma", role: "GLA University, Mathura" },
    { name: "Dr. Sansar Singh", role: "GL Bajaj, Gr. Noida" },
    { name: "Dr. Risha Jashmin Nathan", role: "ARU, UK" },
    { name: "Dr. Tokeer Ahmed", role: "JMI, New Delhi" },
    { name: "Dr. Kapil Dev", role: "JD, FSL, Ghaziabad" },
    { name: "Dr. Antony George", role: "Friedrich Schiller University, Jena, Germany" },
    { name: "Dr. Ali Raza", role: "BOWIE University, USA" },
    { name: "Dr. Vinti Dhaka", role: "IILM University, Greater Noida" },
    { name: "Dr. Shikha", role: "IILM University, Greater Noida" },
    { name: "Dr. Vipul Kumar", role: "IILM University, Greater Noida" },
    { name: "Dr. Manish Kumar", role: "ARSD College, DU" },
    { name: "Dr. Suneet Kuma", role: "Senior Scientific Officer, FSL-Moradabad" },
    { name: "Prof. (Dr.) Shubham Tiwari", role: "ABES, Ghaziabad" },
    { name: "Prof. (Dr.) Kedar Singh", role: "JNU" },
    { name: "Prof. (Dr.) OP Thakur", role: "NSUT, Delhi" },
    { name: "Prof. (Dr.) Geeta Singh", role: "DTU" },
    { name: "Dr. Nupur Mathur", role: "Teri" },
    { name: "Dr. Ashutosh Kumar", role: "TIET" },
    { name: "Dr. Pragya Ranjan Rout", role: "NIT Jalandhar" },
    { name: "Dr. Bikash Koli Dey", role: "SRMU, Chennai" },
    { name: "Dr. Selva Bharti", role: "SRMU, Chennai" },
    { name: "Dr. Roopam Singh", role: "VIT, Chennai" },
    { name: "Dr. Roma Chandra", role: "IILM University, Greater Noida" },
    { name: "Dr. Garima Gupta", role: "IILM University, Greater Noida" },
    { name: "Dr. Muneeb Malik", role: "IILM University, Greater Noida" },
    { name: "Dr. Monu", role: "IILM University, Greater Noida" },
];

const technicalSessionCommittee = [
    { name: "Dr. Rajeev Kumar", role: "Greater Noida, IILM University" },
    { name: "Dr. Vanya Arun", role: "IILM University, Greater Noida" },
    { name: "Dr. Himanshu Sharma", role: "IILM University, Greater Noida" },
    { name: "Dr. Pankaj", role: "IILM University, Greater Noida" },
    { name: "Dr. Chavi Pahwa", role: "IILM University, Greater Noida" },
    { name: "Dr. Bharti Choudhary", role: "IILM University, Greater Noida" },
    { name: "Prof. (Dr.) Avdhesh Kr. Gupta", role: "IILM University, Greater Noida" },
    { name: "Dr. Ankita Awasthi", role: "IILM University, Greater Noida" },
    { name: "Dr. Meenu", role: "IILM University, Greater Noida" },
    { name: "Dr. Umesh Chandra", role: "IILM University, Greater Noida" },
    { name: "Dr. Sanjoy", role: "IILM University, Greater Noida" },
    { name: "Dr. Manoj Kumar", role: "IILM University, Greater Noida" },
    { name: "Dr. Aastha", role: "IILM University, Greater Noida" },
    { name: "Dr. Sanjeev Verma", role: "IILM University, Greater Noida" },
    { name: "Dr. Khushboo Gupta", role: "IILM University, Greater Noida" },
    { name: "Dr. Mukesh Kumar", role: "IILM University, Greater Noida" },
    { name: "Dr. Kuldeep Malik", role: "IILM University, Greater Noida" },
    { name: "Dr. Veena", role: "IILM University, Greater Noida" },
    { name: "Dr. Pankja Verma", role: "IILM University, Greater Noida" },

];

const foodCommittee = [
    { name: "Dr. Priyanka Bhatnagar", role: "Committee Chair, IILM University, Greater Noida" },
    { name: "Dr. Shivani Saini", role: "IILM University, Greater Noida" },
    { name: "Dr. Nidhi Singh", role: "IILM University, Greater Noida" },
    { name: "Dr. Bisma", role: "IILM University, Greater Noida" },
    { name: "Dr. Duraivadivel", role: "IILM University, Greater Noida" },
];

const sponsorshipCommittee = [
    { name: "Dr. Kshama Pandey", role: "Committee Chair, IILM University, Greater Noida" },
    { name: "Dr. Arpit Varshney", role: "IILM University, Greater Noida" },
    { name: "Dr. Rakhi Trivedi", role: "IILM University, Greater Noida" },
    { name: "Dr. Dimpy Chauhan", role: "IILM University, Greater Noida" },
    { name: "Dr. Garima", role: "IILM University, Greater Noida" },
    { name: "Dr. Sameer", role: "IILM University, Greater Noida" },
    { name: "Dr. Pankaj Sharma", role: "IILM University, Greater Noida" },
];

const hospitalityCommittee = [
    { name: "Dr. Naseem Ahmed", role: "Committee Chair, IILM University, Greater Noida" },
    { name: "Dr. Vibhav Narayan Singh", role: "IILM University, Greater Noida" },
    { name: "Mr. Satish Jha", role: "IILM University, Greater Noida" },
    { name: "Mr. Mayank", role: "IILM University, Greater Noida" },
    { name: "Mr. Pradeep Upadhyay", role: "IILM University, Greater Noida" },
];

const registrationHelpDeskCommittee = [
    { name: "Dr. Shradha Sharma", role: "Committee Chair, IILM University, Greater Noida" },
    { name: "Dr. Ashlesha Bhardwaj", role: "IILM University, Greater Noida" },
    { name: "Dr. Sunil Bhardwaj", role: "IILM University, Greater Noida" },
    { name: "Dr. Geetika", role: "IILM University, Greater Noida" },
    { name: "Dr. Manoj Kumar", role: "IILM University, Greater Noida" },
    { name: "Dr. Nidhi Rai", role: "IILM University, Greater Noida" },
    { name: "Dr. Kushal Mazumder", role: "IILM University, Greater Noida" },
    { name: "Dr. Rahul Singh", role: "IILM University, Greater Noida" },
    { name: "Dr. Saurabh", role: "IILM University, Greater Noida" },
    { name: "Dr. Kuldeep Malik", role: "IILM University, Greater Noida" },
    { name: "Dr. Aruna", role: "IILM University, Greater Noida" },
    { name: "Dr. Roma Pandey", role: "IILM University, Greater Noida" },
];

const printingDesigningCommittee = [
    { name: "Mr. Aditya Saini", role: "Committee Chair, IILM University, Greater Noida" },
    { name: "Dr. Kriti Nagarkoti", role: "IILM University, Greater Noida" },
    { name: "Dr. K.M. Bala", role: "IILM University, Greater Noida" },
    { name: "Dr. Gaurav Upadhyay", role: "IILM University, Greater Noida" },
    { name: "Dr. Priti", role: "IILM University, Greater Noida" },
    { name: "Dr. Jayanta Biswas", role: "IILM University, Greater Noida" },
    { name: "Dr. Monu", role: "IILM University, Greater Noida" },
];

const publicitySocialMediaCommittee = [
    { name: "Dr. Heena Khera", role: "Committee Chair, IILM University, Greater Noida" },
    { name: "Dr. Vinti Dhaka", role: "IILM University, Greater Noida" },
    { name: "Dr. Kuldeep Malik", role: "IILM University, Greater Noida" },
    { name: "Dr. Prince Solanki", role: "IILM University, Greater Noida" },
    { name: "Dr. Rahul Singh", role: "IILM University, Greater Noida" },
    { name: "Dr. Aastha", role: "IILM University, Greater Noida" },
    { name: "Dr. Saurabh", role: "IILM University, Greater Noida" },
    { name: "Dr. Neha", role: "IILM University, Greater Noida" },
    { name: "Ms. Smriti Sethi", role: "IILM University, Greater Noida" },
];

const culturalCommittee = [
    { name: "Dr. Khushboo Gupta", role: "Committee Chair, IILM University, Greater Noida" },
    { name: "Dr. Pawan Soni", role: "IILM University, Greater Noida" },
    { name: "Dr. Mukesh", role: "IILM University, Greater Noida" },
    { name: "Dr. Surbhi Rani", role: "IILM University, Greater Noida" },
    { name: "Dr. Akansha", role: "IILM University, Greater Noida" },
    { name: "Ms. Priyanka Singh", role: "IILM University, Greater Noida" },
];

const publicationCommittee = [
    { name: "Prof. Narendra Kumar", role: "Committee Chair, IILM University, Greater Noida" },
    { name: "Dr. Rajeev Kumar", role: "IILM University, Greater Noida" },
    { name: "Dr. Pranav Srivastava", role: "IILM University, Greater Noida" },
    { name: "Dr. Jaswinder Singh", role: "IILM University, Greater Noida" },
    { name: "Dr. Gaurav Upadhyay", role: "IILM University, Greater Noida" },
    { name: "Dr. K.K. Mishra", role: "IILM University, Greater Noida" },
    { name: "Dr. Swati", role: "IILM University, Greater Noida" },
];

const Section = ({ title, members }: { title: string, members: { name: string, role: string }[] }) => (
    <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">{title}</h2>
        <div className="h-1.5 md:h-2 w-20 md:w-24 bg-primary mx-auto mb-8"></div>
        <CommitteeMemberGrid members={members} />
    </section>
);

export default function OtherCommitteesPage() {
    return (
        <div className="min-h-screen bg-white">
            <AboutHeader
                title="Committees"
                date="14 – 15 October"
                // image="/images/simdte-white-lg.png"
                overlayColor="#1a1a2e"
                bgImage="/images/utb-images/gallery/gallery-2.jpg"
                dividerColor="primary"
            />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Section title="Technical Committee" members={technicalCommittee} />
                <Section title="Technical Session Committee" members={technicalSessionCommittee} />
                <Section title="Food Committee" members={foodCommittee} />
                <Section title="Sponsorship Committee" members={sponsorshipCommittee} />
                <Section title="Transportation, Accommodation & Hospitality Committee" members={hospitalityCommittee} />
                <Section title="Registration Committee & Help Desk" members={registrationHelpDeskCommittee} />
                <Section title="Printing and Designing Committee" members={printingDesigningCommittee} />
                <Section title="Publicity & Social Media Committee" members={publicitySocialMediaCommittee} />
                <Section title="Cultural Committee" members={culturalCommittee} />
                <Section title="Publication Committee" members={publicationCommittee} />
            </div>
        </div>
    );
}
