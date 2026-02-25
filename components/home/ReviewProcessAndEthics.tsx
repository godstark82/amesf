import SectionHeader from "../common/SectionHeader";

export default function ReviewProcessAndEthics() {
    return (
        <section className="bg-[#f5f7fa] py-12">
            <div className="container mx-auto px-4">
                <SectionHeader title="Double-Blind Review Process" />

                <div className="max-w-4xl mx-auto space-y-8 text-black">
                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md space-y-4 text-justify">
                        <p>
                            The double-blind peer-review process will be adopted for IC-AMESF 2026, organised by IILM University, Greater Noida to ensure the highest standards of academic integrity, fairness, and objectivity. In this system, both the authors and reviewers remain anonymous throughout the evaluation process. This structure eliminates potential biases related to identity, institution, nationality, seniority or reputation.
                        </p>
                        <p>
                            Upon submission, each manuscript undergoes an initial editorial screening to verify relevance to conference themes, compliance with formatting guidelines, and originality using plagiarism-detection tools. Submissions that pass this stage are assigned to two or more expert reviewers who possess specialised domain knowledge.
                        </p>
                        <p>Reviewers assess the manuscript based on:</p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>Originality and novelty of research</li>
                            <li>Methodological rigor</li>
                            <li>Clarity of presentation</li>
                            <li>Validity and reliability of results</li>
                            <li>Quality of discussion and conclusion</li>
                            <li>Contribution to the field of advanced materials and sustainable engineering</li>
                        </ul>
                        <p>
                            Reviewers shall provide detailed, constructive feedback, including suggestions for improvement, clarification of concepts, corrections, and recommendations regarding acceptance, revision, or rejection.
                        </p>
                        <p>
                            Author identities are not disclosed to reviewers, and reviewers&apos; identities remain concealed from authors. Revised manuscripts undergo further scrutiny until they meet scientific and ethical standards. Only papers that successfully pass this rigorous double-blind process are considered for publication and may be forwarded to partnering publication outlets, including CRC&apos;s prestigious imprint under CRC Press, subject to final approval.
                        </p>
                        <p>
                            This review system safeguards academic fairness and promotes high-quality research dissemination.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-black mb-6 text-center">Ethics and Malpractice Statement</h3>
                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md space-y-6 text-justify">
                            <p>
                                IC-AMESF 2026 is committed to maintaining the highest standards of publication ethics and professional responsibility. The conference follows internationally accepted guidelines to prevent unethical practices, academic misconduct, and compromise of scientific integrity.
                            </p>

                            <div>
                                <h4 className="text-xl font-bold text-black mb-3">Ethical Responsibilities of Authors</h4>
                                <p className="mb-3">Authors must ensure that:</p>
                                <ul className="list-disc list-inside space-y-2 ml-2">
                                    <li>Their work is original, unpublished, and not under review elsewhere.</li>
                                    <li>All data presented is accurate, verifiable, and free from manipulation.</li>
                                    <li>Appropriate citations and acknowledgements are provided for all referenced work.</li>
                                    <li>All contributors are listed as authors based on significant scholarly contribution.</li>
                                    <li>Plagiarism in any form, including self-plagiarism, is strictly prohibited.</li>
                                </ul>
                                <p className="mt-3">
                                    Any detected malpractice—fabrication, falsification of data, duplicate submission, or uncredited use of others&apos; work—results in immediate rejection.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xl font-bold text-black mb-3">Ethical Responsibilities of Reviewers</h4>
                                <p className="mb-3">Reviewers must:</p>
                                <ul className="list-disc list-inside space-y-2 ml-2">
                                    <li>Evaluate manuscripts objectively, fairly, and confidentially.</li>
                                    <li>Avoid conflicts of interest related to personal, financial, or professional relationships.</li>
                                    <li>Provide constructive comments without bias or improper criticism.</li>
                                    <li>Maintain strict confidentiality and not use unpublished data for personal advantage.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-bold text-black mb-3">Ethical Responsibilities of Editors</h4>
                                <p className="mb-3">Editors must:</p>
                                <ul className="list-disc list-inside space-y-2 ml-2">
                                    <li>Ensure a transparent and unbiased editorial process.</li>
                                    <li>Avoid conflicts of interest and assign reviewers solely based on expertise.</li>
                                    <li>Uphold confidentiality of all submitted materials.</li>
                                    <li>Take corrective action if ethical concerns arise, including retraction or withdrawal of papers.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-bold text-black mb-3">Publication Integrity</h4>
                                <p>
                                    The conference adheres to global ethical guidelines to ensure that the proceedings and associated publications meet the highest academic standards. Any publication in collaboration with international publishers—including those aligned with CRC&apos;s academic imprint—must comply with strict ethical protocols. The organising committee reserves the right to reject or remove any paper found violating ethical or scientific norms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
