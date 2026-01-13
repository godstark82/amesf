import React from "react";
import AboutHeader from "@/components/common/AboutHeader";
import CommitteeMemberGrid from "@/components/common/CommitteeMemberGrid";

const internationalAdvisoryBoard = [
  {
    name: "Prof. Jay Narayan",
    role: "John C. Fan Family Distinguished Chair Professor of Materials Science, North Caroline State University",
  },
  {
    name: "Dr. Pankaj Attri",
    role: "National University Corporation Kyushu University, Japan",
  },
  {
    name: "Prof. Imran Ali",
    role: "Jamia Milia Islamia (Central University), India"
  },
  {
    name: "Prof. (Retd.) Anil Kumar",
    role: "IIT Roorkee"
  },
  {
    name: "Prof. Dinesh Mohan",
    role: "JNU, India"
  },
  {
    name: "Prof. Sameer Sapra",
    role: "IIT Delhi, India"
  },
  {
    name: "Prof. L.P. Singh",
    role: "Director General, National Council for NCCBM, India"
  },
  {
    name: "Dr. Soo Choi",
    role: "Nexmos, South Korea"
  },
  {
    name: "Dr. Millie Pant",
    role: "Professor & Head, Department of Applied Mathematics and Scientific Computing, IIT Roorkee",
  },
  {
    name: "Dr. Joydeep Dutta",
    role: "KTH Royal Institute of Technology, Sweden"
  },
  {
    name: "Dr. Neelam Bharti",
    role: "Technology & Technical Services, Carnegie Mellon University USA",
  },
  {
    name: "Dr. Antony George",
    role: "Germany"
  },
  {
    name: "Dr. M.V.R Reddy",
    role: "Canada"
  },
  {
    name: "Dr. Lilliana Guran",
    role: "Babes-Bolyai University, Cluj-Napoca, Romania",
  },
  {
    name: "Dr. Dorota Jelonek",
    role: "Czestochowa University of Technology, Poland",
  },
  {
    name: "Dr. Monika Bota",
    role: "Babes-Bolyai University, Cluj-Napoca, Romania",
  },
  {
    name: "Mr. Himanshu Jain",
    role: "Analog Devices"
  },
  {
    name: "Prof. (Dr.) Biswajit Sarkar",
    role: "Yonesai University, South Korea"
  },
  {
    name: "Prof. (Dr.) Rahul Singal",
    role: "C USA"
  },
  {
    name: "Prof. (Dr.) Shailendra Jain",
    role: "(MNIT, Bhopal)"
  },
  {
    name: "Prof. (Dr.) Kanjilal",
    role: "IUAC, New Delhi"
  },
  {
    name: "Dr. Shabir Hasan",
    role: "Khalifa University, UAE"
  },
  {
    name: "Dr. Santanu Basu",
    role: "Sweden Agriculture University, Sweden"
  },
  {
    name: "Dr. Pawan Singh",
    role: "University of Missouri, USA"
  },
  {
    name: "Dr. Neera Tiwari",
    role: "Michigan State University"
  },
  {
    name: "Prof. (Dr.) Prashant Kumar Kalita",
    role: "University of Illinois, USA"
  },
  {
    name: "Prof. (Dr.) Asgar Ali",
    role: "Director, CPHB, Malaysia"
  },
  {
    name: "Prof. (Dr.) Priyanka Sharma",
    role: "MD Anderson Cancer Centre, USA"
  },
  {
    name: "Dr. A.K. Tyagi",
    role: "Dean, HBNI, Mumbai"
  },
  {
    name: "Dr. Sandeep Nigam",
    role: "BARC, Mumbai"
  },
  {
    name: "Prof. Mrinal R. Pai",
    role: "BARC, Mumbai"
  },
  {
    name: "Prof. Vinita G. Gupta",
    role: "BARC, Mumbai"
  },
  {
    name: "Prof. P. A. Hassan",
    role: "BARC, Mumbai"
  },
  {
    name: "Anubhav Saxena",
    role: "Chief R&D Officer, Pidilite Industries Limited"
  },
  {
    name: "Prof. (Dr.) Balamurgan Balusamy",
    role: "Manipal Academy of Higher Education, Dubai"
  },
  {
    name: "Prof. (Dr.) Tabrez Ahmad",
    role: "Founding Dean, MANUU, Hyderabad"
  },
  {
    name: "Prof. (Dr.) Haitham Al Qahtani",
    role: "University of Technology, Bahrain"
  },
  {
    name: "Dr. Abhishek Dubey",
    role: "UTAS, Salalah, Sultanate of Oman"
  },
  {
    name: "Dr S. K. Chaubey,",
    role: "UTAS, Shinas, Sultanate of Oman"
  }
];

const nationalAdvisoryBoard = [
  {
    name: "Dr. A.K Jaiswal",
    role: "AIIMS, New Delhi"
  },
  {
    name: "Dr. Amardeep Singh",
    role: "IOCI, India"
  },
  {
    name: "Prof. (Dr.) Sonal Singhal",
    role: "Punjab University, Chandigarh"
  },
  {
    name: "Dr. Sudhir Kumar",
    role: "Deputy Director, FSL, Moradabad"
  },
  {
    name: "Prof. A. Dutta",
    role: "GGSIP University, India"
  },
  {
    name: "Dr. Tripti Bhatnagar",
    role: "Codon Biotech Pvt. Ltd., Noida, India"
  },
  {
    name: "Dr. Yatendra S Chaudhary",
    role: "CSIR-IMMT, Bhubaneswar"
  },
  {
    name: "Prof. Sandeep Kumar",
    role: "C.V. Raman Avenue, Bangalore, India"
  },
  {
    name: "Prof. Pabitra Nayak",
    role: "TIFR, Hyderabad"
  },
  {
    name: "Dr. Bhaskar Chauhan",
    role: "Puniska Healthcare Pvt. Ltd., Ahmedabad, India"
  },
  {
    name: "Mr. Pradeep Kumar Jain",
    role: "VP, Glenmark Pharma, Mumbai"
  },
  {
    name: "Dr. S. Mahapatra",
    role: "Professor, GGSIP University, New Delhi"
  },
  {
    name: "Dr. Adarsh Kumar",
    role: "Director, Forensic Science Laboratory, Lucknow"
  },
  {
    name: "Dr. Amit Goel",
    role: "Professor & Dean, SPSU, Udaipur"
  },
  {
    name: "Dr. Sanjeev Sharma",
    role: "Pro Vice Chancellor, Shushant University, Haryana"
  },
  {
    name: "Dr. Pradeep Kumar",
    role: "Pro Vice Chancellor, MRIIRS, Faridabad, Haryana"
  },
  {
    name: "Dr. Tokeer Ahmed",
    role: "Jamia Millia Islamia (JMI), New Delhi"
  },
  {
    name: "Prof. (Dr.) O.P. Sharma",
    role: "IIT Patna"
  },
  {
    name: "Prof. (Dr.) Piyush Tiwari",
    role: "Director, BITS Mesra, Jaipur Campus"
  },
  {
    name: "Prof. (Dr.) Piyush Kant",
    role: "BHU"
  },
  {
    name: "Prof. (Dr.) Adrijit Goswami",
    role: "IIT Kharagpur"
  },
  {
    name: "Prof. (Dr.) Rajesh",
    role: "CSIR-NPL, Delhi"
  },
  {
    name: "Dr. Sandeep Gupta",
    role: "DST, New Delhi"
  },
  {
    name: "Prof. (Dr.) Arun Kumar Choudhary",
    role: "MNRE, New Delhi"
  },
  {
    name: "Prof. (Dr.) Vinod Kr. Yadav",
    role: "DTU, New Delhi"
  },
  {
    name: "Prof. (Dr.) Anil Kumar",
    role: "DTU, New Delhi"
  },
  {
    name: "Prof. (Dr.) JS Lather",
    role: "NIT Kurukshetra"
  },
  {
    name: "Prof. (Dr.) Sanjay Jain",
    role: "TIET, Punjab"
  },
  {
    name: "Dr. Indivar Gupta",
    role: "DRDO, SAG Lab, New Delhi"
  },
  {
    name: "Dr. Dhananjoy Dey",
    role: "IIIT Lucknow"
  },
  {
    name: "Prof. (Dr.) Neeraj Atrai",
    role: "IIP, Dehradun"
  },
  {
    name: "Dr. Neeraj Jain",
    role: "CBRI-CSIR, Roorkee"
  },
  {
    name: "Dr. Bhupinder Singh",
    role: "IIT Delhi"
  },
  {
    name: "Dr. Ashok Panwar",
    role: "Head & Executive VP - Quality & Regulatory, MedTherapy Biotech, Noida"
  },
  {
    name: "Dr. Amit Panwar",
    role: "Global Technology Manager, DuPont, India"
  },
  {
    name: "Prof. (Dr.) S. Chandra Sekhara Rao",
    role: "IIT Delhi"
  },
  {
    name: "Prof. (Dr.) Jitendra Mohan",
    role: "JIIT, Noida"
  },
  {
    name: "Dr. Rajesh Ghangal",
    role: "Scientist, DST, New Delhi"
  },
  {
    name: "Dr. Sandeep Shiromani",
    role: "Associate Director, BioCon, Bengaluru, Karnataka"
  },
  {
    name: "Dr. Rupak Raja",
    role: "Syngene Scientific Solutions Ltd., Hyderabad, India"
  },
  {
    name: "Prof. (Dr.) Pritish Varadwaj",
    role: "IIIT Allahabad"
  },
  {
    name: "Prof. (Dr.) Anita Yadav",
    role: "Kurukshetra University, Haryana"
  },
  {
    name: "Prof. (Dr.) Suresh Chandra",
    role: "Devi Ahilya University, Indore"
  },
  {
    name: "Prof. (Dr.) Gunjan Varshney",
    role: "Head, Robotics & AI, JSS, Noida"
  }
];


export default function ReviewCommitteePage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHeader
        title="Advisory Boards"
        date="6 - 7 September"
        // image="/images/simdte-white-lg.png"
        overlayColor="#1a1a2e"
        bgImage="/images/utb-images/gallery/gallery-2.jpg"
        dividerColor="primary"
      />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">International Advisory Board</h2>
        <div className="h-1.5 md:h-2 w-20 md:w-24 bg-primary mx-auto mb-12" />
        <CommitteeMemberGrid members={internationalAdvisoryBoard} />
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-16">National Advisory Board</h2>
        <div className="h-1.5 md:h-2 w-20 md:w-24 bg-primary mx-auto mb-12" />
        <CommitteeMemberGrid members={nationalAdvisoryBoard} />
      </section>
    </div>
  );
}
