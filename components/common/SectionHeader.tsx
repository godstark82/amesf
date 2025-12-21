export default function SectionHeader({ title }) {
    return (
        <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">{title}</h2>
            <div className="mx-auto w-16 h-2 bg-primary mb-4"></div>
        </div>
    )
}