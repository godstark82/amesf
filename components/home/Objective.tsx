import SectionHeader from "../common/SectionHeader";

export default function Objective() {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4">
                {/* Title */}
                <SectionHeader title="Objective" />

                <div className="text-black text-lg text-justify space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            To promote the exchange of knowledge and recent advancements in advanced
                            materials and sustainable engineering technologies.
                        </li>
                        <li>
                            To provide a collaborative platform for researchers, academicians, and industry
                            professionals to discuss innovative solutions for global sustainability challenges.
                        </li>
                        <li>
                            To highlight the role of material science and engineering in achieving environmental
                            sustainability and energy efficiency.
                        </li>
                        <li>
                            To encourage interdisciplinary research and development for sustainable materials,
                            processes, and applications.
                        </li>
                        <li>
                            To inspire young researchers and innovators to contribute toward creating a
                            sustainable and technologically advanced future.
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
