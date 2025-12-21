import React from "react";
import AboutHeader from "@/components/common/AboutHeader";
import CommitteeMemberGrid from "@/components/common/CommitteeMemberGrid";


const organizingCommitteeMembers = [
    { name: "Dr. Rahul Sristvastava", role: "(HOD ECE), ACEIT, Jaipur" },
    { name: "Dr. Prabaht Kumar", role: "(HOD EE), ACEIT, Jaipur" },
    { name: "Dr. Saurabh Bhaskar", role: "(HOD ME), ACEIT, Jaipur" },
    { name: "Shri Ramcharan Sharma", role: "Chief Accountant, ACEIT, Jaipur" },
    { name: "Dr. Devesh Bandil", role: "AI&DS, ACEIT, Jaipur " },
    { name: "Dr. Manoj Kr. Tiwari", role: "CS, ACEIT, Jaipur " },
    { name: "Dr. Rajeev Kumar", role: "CS, ACEIT, Jaipur" },
    { name: "Dr. Jyoti Singh", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Dr. Ramswroop", role: "CS, ACEIT, Jaipur" },
    { name: "Dr. Sangeeta Gupta", role: "CS, ACEIT, Jaipur" },
    { name: "Dr. Saumya Mishra", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Mr. Mohit Mishra", role: "CS, ACEIT, Jaipur" },
    { name: "Mr. Amit Kr. Tewari", role: "CS, ACEIT, Jaipur" },
    { name: "Ms. Aarti Sharma", role: "CS, ACEIT, Jaipur" },
    { name: "Mr. Dharmendra Singh Rajpurohit", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Ms. Chhavi Gupta", role: "CS, ACEIT, Jaipur" },
    { name: "Mr. Rakesh Ranjan", role: "IT, ACEIT, Jaipur" },
    { name: "Ms. Megha Rathore", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Mr. Mahesh Kr. Sharma", role: "IT, ACEIT, Jaipur" },
    { name: "Mr. Harveer Choudhary", role: "IT, ACEIT, Jaipur" },
    { name: "Mr. Manish Dwivedi", role: "IT, ACEIT, Jaipur" },
    { name: "Mr. Robil Varshney", role: "IT, ACEIT, Jaipur" },
    { name: "Mr. Kishan Kr. Sharma", role: "IT, ACEIT, Jaipur" },
    { name: "Mr. Santosh Kumar", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Ms. Shikha Gupta", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Mr. Mukesh Kr. Mishra", role: "CS, ACEIT, Jaipur" },
    { name: "Mr. Sushil Kr Dubey", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Ms. Sangeeta Sharma", role: "CS, ACEIT, Jaipur" },
    { name: "Ms. Rajni Kumari Chouhan", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Mr. Ram Babu Buri", role: "CS, ACEIT, Jaipur" },
    { name: "Ms. Deepmala Sharma", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Ms. Ekta Soni", role: "CS, ACEIT, Jaipur" },
    { name: "Ms. Vaishali Shrivastava", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Ms. Sandhya Soni", role: "CS, ACEIT, Jaipur" },
    { name: "Mr. Rishu Ranjan Kumar", role: "AI&DS, ACEIT, Jaipur" },
    { name: "Ms. Neha Ranga", role: "CS, ACEIT, Jaipur" },
    { name: "Ms. Ratan Kumari", role: "CS, ACEIT, Jaipur" },
];

export default function OrganizingCommitteePage() {
    return (
        <div className="min-h-screen bg-white">
            <AboutHeader
                title="Committees"
                date="5 - 7 September"
                // image="/images/simdte-white-lg.png"
                overlayColor="#1a1a2e"
                bgImage="/images/utb-images/gallery/gallery-2.jpg"
                dividerColor="primary"
            />

            <section className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Organising Committee</h2>
                <div className="h-1.5 md:h-2 w-20 md:w-24 bg-primary mx-auto mb-12"></div>
                <CommitteeMemberGrid members={organizingCommitteeMembers} />
            </section>
        </div>
    );
}
