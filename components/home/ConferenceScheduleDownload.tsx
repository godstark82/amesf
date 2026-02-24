export default function ConferenceScheduleDownload() {
    const pdfUrl = "/downloads/IC-AMESF%202026_Conference%20Schedule%20%26%20Presentation%20Codes.pdf";
    const fileName = "IC-AMESF 2026_Conference Schedule & Presentation Codes.pdf";

    return (
        <section className="bg-[#f5f7fa] py-6 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <span className="text-black font-medium text-center sm:text-left">
                        Conference Schedule &amp; Presentation Codes
                    </span>
                    <a
                        href={pdfUrl}
                        download={fileName}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                    </a>
                </div>
            </div>
        </section>
    );
}
