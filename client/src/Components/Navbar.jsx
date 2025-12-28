import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'SCHOLARSHIPS', path: '/all-scholarships' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT', path: '/contact' }
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-background/95 backdrop-blur-md py-4' : 'bg-transparent py-8'
            }`}>
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16 flex items-center justify-between">

                {/* Signature Logotype */}
                <Link to="/" className="group relative flex items-center gap-4">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-accent rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                        <span className="font-serif text-2xl font-black text-white">A</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-3xl font-black tracking-widest text-white leading-none">
                            AKADEMI
                        </span>
                        <span className="text-[10px] tracking-[0.4em] text-accent uppercase font-bold mt-1">
                            Signature Edition
                        </span>
                    </div>
                </Link>

                {/* Elegant Navigation */}
                <div className="hidden lg:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => `
                                relative group text-[11px] font-bold tracking-[0.25em] 
                                transition-colors duration-500
                                ${isActive ? 'text-accent' : 'text-foreground/60 hover:text-white'}
                            `}
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
                        </NavLink>
                    ))}
                </div>

                {/* Tactical Call to Action */}
                <div className="flex items-center gap-8">
                    <Link to="/login" className="text-[11px] font-bold tracking-[0.2em] text-foreground/40 hover:text-white transition-colors">
                        SIGN IN
                    </Link>
                    <Link
                        to="/register"
                        className="high-contrast-btn text-[11px]"
                    >
                        Apply Now
                    </Link>
                </div>
            </div>

            {/* Architectural Etched Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </nav>
    );
};

export default Navbar;