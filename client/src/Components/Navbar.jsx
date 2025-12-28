import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logOut = () => {
        signOutUser()
            .then(() => toast.success('Logged out successfully'));
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Scholarships', path: '/all-scholarships' },
        { name: 'Contact', path: '/contact' },
        { name: 'Dashboard', path: '/dashboard' },
    ];

    const links = navLinks.map(link => (
        <NavLink
            key={link.path}
            className={({ isActive }) =>
                `px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`
            }
            to={link.path}
        >
            {link.name}
        </NavLink>
    ));

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 ${isScrolled ? 'py-4' : 'py-8'}`}>
            <div className={`max-w-screen-2xl mx-auto glass-panel rounded-3xl transition-all duration-500 ${isScrolled ? 'px-6 py-3 shadow-2xl' : 'px-8 py-5'}`}>
                <div className="flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center gap-12">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="text-white font-black text-xl">A</span>
                            </div>
                            <span className="text-white font-black text-2xl tracking-tighter hidden md:block">
                                AKADEMI
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center gap-2">
                            {links}
                        </div>
                    </div>

                    {/* End Area */}
                    <div className="flex items-center gap-6">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-white/10 hover:border-primary transition-all duration-300 p-0">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt={user?.displayName}
                                            src={user?.photoURL || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl glass-panel rounded-2xl w-56 border border-white/5"
                                >
                                    <div className="px-3 py-2 border-b border-white/5 mb-2">
                                        <p className="text-white font-bold truncate">{user?.displayName}</p>
                                        <p className="text-gray-400 text-[10px] truncate">{user?.email}</p>
                                    </div>
                                    <li className="hover:bg-white/5 rounded-lg"><Link to="/dashboard">My Dashboard</Link></li>
                                    <li onClick={logOut} className="hover:bg-red-500/10 text-red-400 rounded-lg"><a>Logout</a></li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-300 hover:text-white font-semibold transition-colors">Login</Link>
                                <Link to="/register" className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
                                    Join Now
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-4 shadow-2xl glass-panel rounded-2xl w-64 gap-2">
                                {links}
                                {!user && (
                                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                                        <Link to="/login" className="btn btn-ghost text-white">Login</Link>
                                        <Link to="/register" className="btn btn-primary">Join Now</Link>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;