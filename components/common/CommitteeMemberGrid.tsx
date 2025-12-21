export default function CommitteeMemberGrid({ members }: { members: any }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((member: any, idx: number) => (
                <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
                >
                    {/* Image Section */}
                    {member.image && (
                        <div className="relative w-full h-64 overflow-hidden">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    )}

                    {/* Text Section */}
                    <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <span className="w-1.5 h-6 bg-primary mr-2 rounded"></span>
                            {member.name}
                        </h3>
                        <p className="text-gray-700 font-medium mt-2 leading-snug">
                            {member.role}
                        </p>
                        {member.affiliation && (
                            <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                                {member.affiliation}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>

    );
}