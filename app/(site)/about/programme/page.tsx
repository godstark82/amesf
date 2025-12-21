import AboutHeader from '@/components/common/AboutHeader';

export default function Programme() {
    return (
        <>
        <div>
            <AboutHeader title="Programme" date="5 - 7 September" overlayColor='#1f1f33' bgImage='/images/calendar-imp-dates.png' dividerColor='secondary' />
        </div>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[400px]">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-400">Coming Soon</h2>
        </div>
        </>
    )
}