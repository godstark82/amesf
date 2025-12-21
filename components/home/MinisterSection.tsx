import React from "react";

export default function MinisterSection() {
    return (
        <section className="py-10 md:py-16">
            <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center md:items-stretch gap-8 md:gap-0">
                {/* Text Section with red rounded bg */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="bg-primary rounded-2xl h-full flex flex-col justify-center px-8 py-10 md:py-0 md:min-h-[340px]">
                        <div className="text-white text-sm md:text-base mb-2 opacity-80">Chief Guest</div>
                        <div className="text-white text-2xl md:text-3xl font-semibold mb-2">Prof. Sanjeev Kumar</div>
                        <div className="text-white text-base md:text-lg mb-1">Vice Chancellor</div>
                        <div className="text-white text-base md:text-lg mb-6">Maharaja Suhel Dev University, Azamgarh, U.P. India </div>
                        <div className="h-3 w-16 bg-white mb-0 mt-2"></div>
                    </div>
                </div>
                {/* Image Section on white bg with red underline */}
                <div className="shrink-0 flex flex-col items-start justify-center md:pl-8">

                    <img
                        src="https://www.shantiresearchfoundation.com/_img/team/dr-sanjeev-sir.webp"
                        alt="His Excellency Dr. Mohamed bin Mubarak Juma"
                        className="rounded-2xl object-cover w-[240px] h-[300px] md:w-[260px] md:h-[320px]"
                        style={{ objectPosition: 'top' }}
                    />

                    <div className="h-4 w-[100px] md:w-[100px] bg-primary mt-2"></div>
                </div>
            </div>
        </section>
    );
}
