import React from "react";
import AboutHeader from "@/components/common/AboutHeader";

const downloads = [
    {
        label: "Copyright Form",
        link: "/downloads/Copyright.pdf",
    },
    {
        label: "Manuscript Submission Template",
        link: "/downloads/template.docx",
    },
    {
        label: "Presentation Template",
        link: "/downloads/presentation-template.pptx",
    },
    {
        label: "Final Programme",
        link: "/downloads/final-programme.pdf",
    },
];

function DownloadIcon() {
    return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="8" fill="#D0224A" />
            <path d="M12 6v8m0 0l-3-3m3 3l3-3M6 18h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function DownloadsPage() {
    return (
        <div className="min-h-screen bg-white">
            <AboutHeader
                title="Downloads"
                date="5 - 7 September"
                // image="/images/simdte-white-lg.png"
                overlayColor="#1a1a2e"
                bgImage="/images/utb-images/gallery/gallery-2.jpg"
                dividerColor="primary"
            />
            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center">
                    {downloads.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center group"
                        >
                            <div className="mb-4">
                                <DownloadIcon />
                            </div>
                            <span className="text-lg md:text-xl font-medium text-primary group-hover:underline text-center">
                                {item.label}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
