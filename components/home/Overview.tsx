import SectionHeader from "../common/SectionHeader";

const CHAIRS = [
    {
        name: 'DR HAITHAM ALQAHTANI',
        title: 'Executive Conference Chair',
        img: '/images/haitham.jpg', // Replace with actual image path
    },
    {
        name: 'DR SHABANA FAIZAL',
        title: 'Conference Chair',
        img: '/images/shabana.jpg', // Replace with actual image path
    },
];

export default function Overview() {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4">
                {/* Title */}
                <SectionHeader title="Conference Overview" />
                <div className="text-black text-lg text-justify space-y-4">
                    <p>
                        The International Conference on Advanced Materials & Engineering for Sustainable Future is a premier academic and industry-focused gathering dedicated to exploring the latest advancements in materials science, engineering innovations, and sustainable technologies. The conference aims to serve as a global platform where researchers, academicians, industry experts, policymakers, and young innovators come together to exchange knowledge, foster collaborations, and address the pressing challenges of sustainability.
                    </p>
                    <p>
                        In an era where resource efficiency, environmental responsibility, and technological innovation are paramount, advanced materials and engineering solutions play a vital role in shaping a sustainable future. This conference will highlight cutting-edge research in areas such as nanomaterials, composites, biomaterials, smart and functional materials, renewable energy technologies, green manufacturing, and sustainable engineering practices.
                    </p>
                    <p>
                        Participants will gain the opportunity to engage in thought-provoking keynote lectures, and technical paper presentations led by renowned experts from across the domains. By bridging the gap between scientific discovery and practical application, the conference seeks to inspire innovative solutions that contribute to environmental preservation, economic growth, and societal well-being.
                    </p>
                </div>
            </div>
        </section>
    );
}
