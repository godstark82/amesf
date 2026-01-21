import AboutHeader from '@/components/common/AboutHeader';

const importantDates = [
    {
        event: "Conference Date",
        date: "25 - 26 February, 2025",
        rowClass: "bg-gray-50"
    },
    {
        event: "Registration and Abstract Submission Starts",
        date: "31 January, 2026",
        rowClass: "bg-gray-50"
    },
    {
        event: "Last Date of Registration without late payment",
        date: "5 February, 2026",
        rowClass: "bg-gray-50"
    },
    {
        event: "Abstract submission Deadline",
        date: "10 January, 2026",
        rowClass: "bg-gray-50"
    },
    {
        event: "Abstract Acceptance Notification",
        date: "25 January, 2025",
        rowClass: "bg-gray-50"
    },
    {
        event: "Full length paper submission Deadline",
        date: "05 February, 2026",
        rowClass: "bg-gray-50"
    }
];

export default function ImportantDates() {
    return (
        <div className="bg-white">
            <AboutHeader title="Important Dates" date="5 -7 September" overlayColor='#1f1f33' bgImage='/images/calendar-imp-dates.png' dividerColor='white' />
            <div className="container mx-auto px-4 py-16">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden shadow-md">
                        <thead>
                            <tr>
                                <th className="bg-[#d0224a] text-white text-left px-6 py-3 text-lg font-semibold rounded-tl-lg">Event</th>
                                <th className="bg-[#d0224a] text-white text-left px-6 py-3 text-lg font-semibold rounded-tr-lg">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {importantDates.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className={`${item.rowClass} border-t border-[#d0224a]/30`}
                                >
                                    <td className="px-6 py-4">{item.event}</td>
                                    <td className="px-6 py-4">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
