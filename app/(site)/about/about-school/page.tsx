import AboutHeader from '@/components/common/AboutHeader';
import SectionHeader from '@/components/common/SectionHeader';

export default function AboutUniversityPage() {
    return (
        <div className="bg-white">
            <AboutHeader title="School Profile" date="5 - 7 September" overlayColor='#d0224a' bgImage='/images/utb-images/gallery/gallery-1.jpg' />
            <div className="container mx-auto px-4 py-16">
                <SectionHeader title="Organising Schools Profiles" />
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="md:w-2/3 text-gray-900 space-y-6 text-lg text-justify">
                        <p>
                            The <b>School of Engineering</b> at IILM University prepares students to meet global industry
                            demands by fostering technical expertise, innovation, and sustainable problem-solving. It
                            offers diverse B.Tech programs in areas such as Biotechnology, Bioinformatics, Food
                            Technology, Civil and Sustainable Infrastructure, Robotics & AI, and ECE in collaboration
                            with L&T.

                        </p>
                        <p>
                            <b>The School of Sciences (SoS)</b> at IILM University provides a strong academic foundation
                            across Physics, Chemistry, Mathematics, Forensic Science, and Environmental Science. Its
                            programs are designed to build scientific competence and support students pursuing
                            careers in various science disciplines. All undergraduate and postgraduate programs follow
                            the NEP 2020 framework, offering multiple entry and exit options for academic flexibility.
                        </p>
                        <p>
                            The <b>Faculty of Artificial Intelligence and Digital Technologies</b> at Samarkand State
                            University, Uzbekistan, reorganized from the Mechanical Mathematics faculty in 2017. It
                            offers Bachelor’s, Master’s, and PhD programs in applied mathematics, informatics,
                            information technologies, and related fields. It hosts scientific schools in information
                            technologies and mechanics of anomalous liquids, with significant contributions from
                            leading professors. The faculty actively develops software products, conducts research,
                            and collaborates with educational institutions and regional organizations.
                        </p>
                    </div>
                    <div className="md:w-1/3 w-full flex justify-center md:justify-end">
                        <img
                            src="https://iilm.ac.in/uploads/all/40/conversions/Group-20050-(1)-full.webp"
                            alt="Arya College, Jaipur"
                            className="shadow-lg w-full max-w-md object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
