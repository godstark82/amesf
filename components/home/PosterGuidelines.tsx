import SectionHeader from "../common/SectionHeader";

export default function PosterGuidelines() {
    return (
        <section className="bg-[#f5f7fa] py-12">
            <div className="container mx-auto px-4">
                <SectionHeader title="Poster Guidelines" />
                
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left side - Main content */}
                        <div className="lg:col-span-2 space-y-8">
                    {/* Poster Template Structure */}
                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-black mb-6">Poster Template Structure</h3>
                        
                        <div className="space-y-6 text-black">
                            {/* Title Section */}
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="text-xl font-bold mb-2">POSTER TITLE</h4>
                                <p className="text-sm text-gray-600 mb-2">72–100 pt, Bold, Centred</p>
                                <div className="space-y-1 text-base">
                                    <p><strong>Author Name1¹</strong>, Author Name2², Author Name3³</p>
                                    <p>¹Department, Institution, City, Country</p>
                                    <p>²Department, Institution, City, Country</p>
                                    <p><strong>Corresponding Author:</strong> email@institution.edu</p>
                                </div>
                            </div>

                            {/* Sections */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="text-xl font-bold mb-2">1. INTRODUCTION (36–44 pt)</h4>
                                        <ul className="list-disc list-inside space-y-1 text-base ml-2">
                                            <li>Background of the study</li>
                                            <li>Problem statement</li>
                                            <li>Research gap</li>
                                            <li>Significance of the study</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="text-xl font-bold mb-2">2. OBJECTIVES</h4>
                                        <ul className="list-disc list-inside space-y-1 text-base ml-2">
                                            <li>Objective 1</li>
                                            <li>Objective 2</li>
                                            <li>Objective 3</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="text-xl font-bold mb-2">3. HYPOTHESIS / RESEARCH QUESTIONS (if applicable)</h4>
                                        <ul className="list-disc list-inside space-y-1 text-base ml-2">
                                            <li>H1:</li>
                                            <li>H2:</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="text-xl font-bold mb-2">4. METHODOLOGY</h4>
                                        <ul className="list-disc list-inside space-y-1 text-base ml-2">
                                            <li>Study design</li>
                                            <li>Sample / Participants</li>
                                            <li>Materials / Instruments</li>
                                            <li>Procedure</li>
                                            <li>Statistical analysis</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="text-xl font-bold mb-2">5. RESULTS</h4>
                                        <ul className="list-disc list-inside space-y-1 text-base ml-2">
                                            <li>Key findings (bullet points)</li>
                                            <li>Insert graphs/charts here</li>
                                            <li>Include high-resolution figures (300 dpi)</li>
                                        </ul>
                                        <div className="mt-3 p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded text-center text-gray-500">
                                            [Insert Figure Placeholder]
                                        </div>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="text-xl font-bold mb-2">6. DISCUSSION</h4>
                                        <ul className="list-disc list-inside space-y-1 text-base ml-2">
                                            <li>Interpretation of findings</li>
                                            <li>Comparison with previous studies</li>
                                            <li>Practical implications</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="text-xl font-bold mb-2">7. CONCLUSION</h4>
                                        <ul className="list-disc list-inside space-y-1 text-base ml-2">
                                            <li>Major conclusions</li>
                                            <li>Contributions</li>
                                            <li>Future scope</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="text-xl font-bold mb-2">8. ACKNOWLEDGMENTS</h4>
                                        <ul className="list-disc list-inside space-y-1 text-base ml-2">
                                            <li>Funding agency</li>
                                            <li>Institutional support</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="text-xl font-bold mb-2">9. REFERENCES</h4>
                                        <ul className="list-disc list-inside space-y-1 text-base ml-2">
                                            <li>Follow APA / IEEE / Vancouver format</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formatting Guidelines */}
                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-black mb-6">Poster Formatting Guidelines</h3>
                        <div className="grid md:grid-cols-2 gap-6 text-black">
                            <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <p><strong>Recommended size:</strong> A0 (841 x 1189 mm) or 36 x 48 inches</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <p><strong>Use sans-serif fonts</strong> (Arial, Calibri, Helvetica)</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <p><strong>Title:</strong> 72–100 pt</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <p><strong>Section headings:</strong> 36–44 pt</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <p><strong>Body text:</strong> 24–32 pt</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <p>Maintain consistent alignment and spacing</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <p>Use contrasting color scheme</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <p>Keep text concise and visual-heavy</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sample Content */}
                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-black mb-6">Sample Filled-In Demonstration Poster Content</h3>
                        <div className="space-y-4 text-black">
                            <div>
                                <p><strong>Title:</strong> Impact of Analytical Techniques in Forensic Investigation</p>
                            </div>
                            <div>
                                <p><strong>Introduction:</strong> Forensic science has evolved significantly with advanced analytical methods...</p>
                            </div>
                            <div>
                                <p><strong>Objective:</strong> To evaluate modern analytical techniques in forensic casework.</p>
                            </div>
                            <div>
                                <p><strong>Methodology:</strong> Experimental comparative study using chromatography and spectroscopy tools.</p>
                            </div>
                            <div>
                                <p><strong>Results:</strong> Improved detection sensitivity by 35% compared to conventional methods.</p>
                            </div>
                            <div>
                                <p><strong>Conclusion:</strong> Advanced analytical tools significantly enhance forensic accuracy and reliability.</p>
                            </div>
                        </div>
                    </div>
                        </div>

                        {/* Right side - Poster Format File */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
                                <h3 className="text-xl font-bold text-black mb-4">Poster Format Template</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                        <div className="text-center">
                                            <svg className="w-16 h-16 mx-auto mb-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-sm text-gray-600 font-medium">PowerPoint Template</p>
                                        </div>
                                    </div>
                                    <a 
                                        href="/downloads/poster-format.ppt"
                                        download
                                        className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200"
                                    >
                                        Download Template
                                    </a>
                                    <p className="text-sm text-gray-600 text-center">
                                        Download the official poster format template for your presentation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
