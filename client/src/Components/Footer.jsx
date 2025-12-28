import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative bg-[#0f172a] pt-32 pb-16 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className='absolute bottom-0 left-0 w-full h-1/2 bg-mesh opacity-20 -z-10' />
            <div className='absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full' />

            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
                                <span className="text-white font-black text-2xl">A</span>
                            </div>
                            <span className="text-white font-black text-3xl tracking-tighter">
                                AKADEMI
                            </span>
                        </Link>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Empowering students globally by bridging the gap between talent and opportunity through our premium scholarship platform.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -5, backgroundColor: 'rgba(99, 102, 241, 1)' }}
                                    href="#"
                                    className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-white transition-colors duration-300"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-xl mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {['Home', 'Scholarships', 'About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-xl mb-8">Get in Touch</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center shrink-0">
                                    <FaEnvelope className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email Us</p>
                                    <a href="mailto:support@akademi.com" className="text-gray-300 hover:text-white transition-colors">support@akademi.com</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center shrink-0">
                                    <FaPhoneAlt className="text-secondary" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Call Us</p>
                                    <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">+1 (234) 567-890</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold text-xl mb-8">Stay Updated</h4>
                        <p className="text-gray-400 mb-6">Subscribe to get the latest scholarship alerts.</p>
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary transition-colors"
                            />
                            <button type="submit" className="absolute right-2 top-2 bottom-2 px-6 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Akademi Inc. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;