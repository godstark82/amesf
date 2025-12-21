export default function SectionImageHeader({ title, image }) {
    return <>
        <div className="relative w-full h-56 flex items-center justify-center" style={{ background: `linear-gradient(rgba(35,35,53,0.75),rgba(35,35,53,0.75)), url("${image}") center/cover` }}>

            <div className="absolute inset-0 bg-[#232335] opacity-70"></div>
            <div className="relative z-10 w-full flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h2>
                <div className="mx-auto w-16 h-2 bg-primary mb-4"></div>
            </div>
        </div>
    </>
}