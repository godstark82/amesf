import SectionImageHeader from "../common/SectionImageHeader";
import Image from "next/image";

const PHOTOS = [
    "/images/utb-images/gallery/gallery-12.jpg",
    "/images/utb-images/gallery/gallery-11.jpg", 
    "/images/utb-images/gallery/gallery-7.jpg",
    "/images/utb-images/gallery/gallery-6.jpg",
    "/images/utb-images/gallery/gallery-3.jpg",
    "/images/utb-images/gallery/gallery-2.jpg",
];

export default function Highlights() {
    return (
        <section className="bg-white">
            <SectionImageHeader title="Conference Highlights" image="/images/utb-images/gallery/BG6A0073.jpg" />
            <div className="container mx-auto px-4 py-12">
                {/* Photo Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {PHOTOS.map((src, idx) => (
                        <div key={idx} className="relative w-full h-56 md:h-48 lg:h-56 overflow-hidden rounded-md">
                            <Image
                                src={src}
                                alt={`Conference highlight ${idx + 1}`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                priority={idx < 2}
                                className="object-cover"
                                quality={75}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
