import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaUniversity } from 'react-icons/fa';
import bgImg from '../assets/Pattern-Bg.png';

const Footer = () => {
    return (
        <footer className="relative bg-[#0a0a0a] pt-32 pb-16 overflow-hidden border-t-8 border-[#16a34a]/20">
            {/* Background Pattern */}
            <div
                style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '400px', opacity: 0.03 }}
                className="absolute inset-0 z-0"
            />
            <div className='absolute -bottom-24 -left-24 w-96 h-96 bg-[#16a34a]/10 blur-[120px] rounded-full z-0' />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

                    {/* Brand Section */}
                    <div className="space-y-10">
                        <Link to="/" className="flex items-center gap-4 group">
                            <div className="w-14 h-14 bg-[#16a34a] rounded-[20px] flex items-center justify-center shadow-2xl shadow-[#16a34a]/20 group-hover:rotate-12 transition-transform duration-500">
                                <FaUniversity className="text-white text-2xl" />
                            </div>
                            <span className="text-white font-black text-3xl tracking-tighter uppercase">
                                Akademi
                            </span>
                        </Link>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest leading-relaxed">
                            Empowering elite academic pursuit through curated discovery and precision data mapping.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -8, backgroundColor: '#16a34a', borderColor: '#16a34a' }}
                                    href="#"
                                    className="w-12 h-12 border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all duration-300 bg-white/5"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10">The Network</h4>
                        <ul className="space-y-5">
                            {['Home', 'Scholarships', 'About', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-500 font-black text-[10px] uppercase tracking-[0.2em] hover:text-[#16a34a] transition-all flex items-center gap-3 group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] scale-0 group-hover:scale-100 transition-transform" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10">Registry Access</h4>
                        <ul className="space-y-8">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <FaEnvelope className="text-[#16a34a] text-sm" />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Electronic Mail</p>
                                    <a href="mailto:registrars@akademi.com" className="text-gray-400 font-bold text-xs uppercase tracking-tight hover:text-white transition-colors">registrars@akademi.com</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <FaPhoneAlt className="text-[#16a34a] text-sm" />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Direct Hot-Line</p>
                                    <a href="tel:+1.800.AKADEMI" className="text-gray-400 font-bold text-xs uppercase tracking-tight hover:text-white transition-colors">+1.800.AKADEMI</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10">Global Bulletins</h4>
                        <p className="text-gray-500 font-bold text-sm mb-8 uppercase tracking-tight">Receive prioritized notifications from the central registry.</p>
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="IDENTIFIER@DOMAIN.COM"
                                className="w-full bg-white/5 border border-white/10 rounded-[24px] py-5 px-6 text-white text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-[#16a34a] transition-all"
                            />
                            <button type="submit" className="absolute right-2 top-2 bottom-2 px-8 bg-black hover:bg-[#16a34a] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-[18px] transition-all border border-white/10">
                                Sync
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-gray-600 font-black text-[9px] uppercase tracking-[0.3em]">
                        &copy; {new Date().getFullYear()} AKADEMI GLOBAL REGISTRY — ALL RIGHTS RESERVED
                    </p>
                    <div className="flex gap-10">
                        {['Privacy', 'Legal', 'Governance'].map(item => (
                            <a key={item} href="#" className="text-gray-600 font-black text-[9px] uppercase tracking-[0.2em] hover:text-white transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;