'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = {
        "/": "HOME",
        "ABOUT": {
            "About College": 'About University',
            "About School": 'About School',
            'Important Dates': 'Important Dates',
            'Programme': 'Programme',
            'Accommodation Options': 'Accommodation Options'
        },
        "COMMITTEES": {
            "Conference Chairs": "Conference Chairs",
            // "Organising Committee": "Organising Committee",
            "Technical Board": "Advisory Board",
            "Other Committees": "Other Committees"
            // "Other Committees": "Other Committees",
        },
        // "REGISTRATION": "REGISTRATION/PAYMENT",
        "UPLOAD PAPER": "REGISTRATION",
        "DOWNLOADS": "DOWNLOADS",
        "CONTACT US": "CONTACT US"
    }

    const renderLink = (key: string, value: string | { [key: string]: string }, isMobile: boolean = false) => {
        if (typeof value === 'string') {
            return (
                <Link
                    key={key}
                    href={`/${key.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`${isMobile ? 'text-foreground' : 'text-white'} hover:text-[#E13A59] transition-colors font-bold block py-2`}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {value}
                </Link>
            );
        } else {
            return (
                <div key={key} className="relative group">
                    <button className={`${isMobile ? 'text-foreground' : 'text-white'} hover:text-[#E13A59] transition-colors font-bold flex items-center gap-1 w-full py-2`}>
                        {key}
                        <svg
                            className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    <div className="md:invisible md:group-hover:visible md:absolute md:border md:border-border md:top-full md:left-0 md:mt-2 md:w-64 md:bg-popover md:shadow-lg md:rounded-md md:py-2 md:z-50 md:opacity-0 md:group-hover:opacity-100 md:transition-all md:duration-300 pl-4 md:pl-0">
                        {Object.entries(value).map(([subKey, subValue]) => (
                            <Link
                                key={subKey}
                                href={`/${key.toLowerCase().replace(/\s+/g, '-')}/${subKey.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block px-4 py-2 text-sm text-popover-foreground font-bold hover:bg-accent"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {subValue as any}
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }
    };

    return (
        <header className="bg-[#211833] shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        <Link href="/">
                            <Image src={'/images/iilm/iilm_logo.png'} alt='IILM_LOGO' width={200} height={100} />
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-6 items-center">
                        {Object.entries(links).map(([key, value]) => renderLink(key, value))}
                        <Link
                            href="/login"
                            className="text-white hover:text-[#E13A59] transition-colors font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login
                        </Link>
                    </div>
                    <button
                        className="md:hidden text-white hover:text-[#E13A59]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 bg-black/75 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`fixed right-0 top-0 h-full w-64 bg-popover shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4">
                        <button
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="mt-8 space-y-4">
                            {Object.entries(links).map(([key, value]) => renderLink(key, value, true))}
                            <Link
                                href="/login"
                                className="text-foreground hover:text-[#E13A59] transition-colors font-bold flex items-center gap-2 py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;