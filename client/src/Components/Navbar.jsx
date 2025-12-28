import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../Context/MockAuthProvider';
import { toast } from 'react-toastify';
import { FaGraduationCap, FaBars, FaTimes, FaUser, FaSignOutAlt, FaChevronDown, FaUniversity } from 'react-icons/fa';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logOut = () => {
        signOutUser()
            .then(() => {
                toast.success('Sign Out Successful');
                setShowUserMenu(false);
            });
    };

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/all-scholarships', label: 'Scholarships' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'py-4'
                    : 'py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`transition-all duration-500 ${isScrolled
                        ? 'bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.05)] rounded-[24px]'
                        : 'bg-white/40 backdrop-blur-md border border-white/10 rounded-[24px]'
                    } px-6 lg:px-10 py-3 flex items-center justify-between`}>

                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:bg-[#16a34a] transition-all duration-500 shadow-xl group-hover:scale-110">
                            <FaUniversity className="text-white text-lg" />
                        </div>
                        <span className="text-xl font-black text-black uppercase tracking-tighter group-hover:text-[#16a34a] transition-colors">
                            Akademi
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isActive
                                        ? 'text-white bg-black shadow-lg shadow-black/10'
                                        : 'text-gray-500 hover:text-black hover:bg-white/50'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Auth & Menu */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onMouseEnter={() => setShowUserMenu(true)}
                                    className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-[#16a34a] flex items-center justify-center overflow-hidden">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt="" />
                                        ) : (
                                            <span className="text-white text-xs font-black uppercase">{user.displayName?.charAt(0) || user.email?.charAt(0)}</span>
                                        )}
                                    </div>
                                    <span className="hidden md:block text-[10px] font-black text-black uppercase tracking-widest">{user.displayName || 'Registry'}</span>
                                    <FaChevronDown className="text-gray-300 text-[8px]" />
                                </button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            onMouseLeave={() => setShowUserMenu(false)}
                                            className="absolute right-0 mt-4 w-56 bg-white rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-gray-50 py-3 z-50 overflow-hidden"
                                        >
                                            <div className="px-4 py-3 mb-2 border-b border-gray-50">
                                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 text-center">Identity Verified</p>
                                                <p className="text-[10px] font-black text-black truncate text-center">{user.email}</p>
                                            </div>
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center px-4 py-3 text-[10px] font-black text-gray-600 uppercase tracking-widest hover:bg-gray-50 hover:text-[#16a34a] transition-all"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <FaUser className="mr-3 opacity-30" />
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={logOut}
                                                className="w-full flex items-center px-4 py-3 text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 transition-all"
                                            >
                                                <FaSignOutAlt className="mr-3 opacity-30" />
                                                Disengage Session
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="px-6 py-3 text-[10px] font-black text-black uppercase tracking-[0.2em] hover:text-[#16a34a] transition-all"
                                >
                                    Identity
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#16a34a] transition-all shadow-xl shadow-black/10"
                                >
                                    Join Core
                                </Link>
                            </div>
                        )}

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden w-11 h-11 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="lg:hidden absolute top-24 left-4 right-4 z-40"
                    >
                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl p-6 space-y-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${isActive
                                            ? 'bg-black text-white'
                                            : 'text-gray-500 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;