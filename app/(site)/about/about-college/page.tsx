import AboutHeader from '@/components/common/AboutHeader';
import SectionHeader from '@/components/common/SectionHeader';

export default function AboutUniversityPage() {
    return (
        <div className="bg-white">
            <AboutHeader title="University Profile" overlayColor='#d0224a' bgImage='/images/iilm/iilm_uni_back.webp' />
            <div className="container mx-auto px-4 py-16">
                <SectionHeader title="IILM University Greater, Noida" />
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* Left: Text Content */}
                    <div className="md:w-2/3 text-gray-900 space-y-6 text-lg text-justify">
                        <p>
                            <b>IILM University, Greater Noida</b>, established under the Uttar Pradesh Private University (Amendment) Act 2022, is a young and progressive institution focused on academic excellence, innovation, and holistic student development. Located in the educational hub of Greater Noida, it provides a vibrant and globally oriented learning environment with strong industry exposure. The university is built on the principles of inclusivity, integrity, and quality, aiming to offer a transformative educational experience.

                            <br></br>
                            It offers diverse undergraduate, postgraduate, and doctoral programs across Management, Law, Engineering, Sciences, Liberal Arts, and Social Sciences. The curriculum blends academic rigor with real-world relevance to prepare students for modern professional challenges. Beyond academics, the university emphasizes critical thinking, creativity, leadership, and overall personality development.

                            <br /><br />
                            <b>Samarkand State University, Uzbekistan</b>, officially founded in 1927 but rooted in the 600- year legacy of the Mirzo Ulughbek Madrasa, is one of Uzbekistan’s oldest and most renowned institutions. It has evolved through several historical stages and now comprises 7 faculties, 4 institutes, and 59 departments offering 72 programs. The university serves nearly 17,000 undergraduate and 700 graduate students, supported by around 900 faculty members and extensive research opportunities.

                        </p>
                    </div>
                    {/* Right: Image */}
                    <div className="md:w-1/3 w-full flex justify-center md:justify-end">
                        <img
                            src="/images/arya-images/gallery-1.webp"
                            alt="Arya College, Jaipur"
                            className="shadow-lg w-full max-w-md object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
