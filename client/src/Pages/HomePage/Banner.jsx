import React from 'react';
import { motion } from 'framer-motion';
import bgImg from '../../assets/Pattern-Bg.png';
import image1 from '../../assets/AdobeStock_545875468@2x-1.webp';
import image2 from '../../assets/AdobeStock_587433154-1.webp';

const Banner = () => {
    return (
        <div className='bg-mesh relative overflow-hidden py-32 md:py-48'>
            {/* Background Pattern with Animation */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 2 }}
                style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} 
                className="absolute inset-0 z-0"
            />

            <div className='relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
                    
                    {/* Left Decorative Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='hidden lg:block w-1/4'
                    >
                        <img 
                            src={image1} 
                            alt="Student" 
                            className='rounded-3xl shadow-2xl border border-white/10 animate-float'
                        />
                    </motion.div>

                    {/* Content Section */}
                    <div className='flex-1 flex flex-col items-center text-center max-w-3xl'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className='glass-panel px-6 py-2 rounded-full mb-8'
                        >
                            <span className='text-primary font-medium text-sm tracking-widest uppercase'>
                                Empowering Ambitions • Enabling Success
                            </span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='text-white text-4xl md:text-6xl xl:text-8xl font-black leading-tight mb-8'
                        >
                            Unlock Your Future with <span className='text-gradient'>Scholarships</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className='text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl'
                        >
                            Find, apply, and manage your scholarships effortlessly. Our premium platform guides you every step of the way toward achieving your academic dreams.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className='flex flex-wrap justify-center gap-6'
                        >
                            <button className='px-10 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40'>
                                Get Started
                            </button>
                            <button className='px-10 py-4 glass-card text-white font-bold rounded-2xl transition-all duration-300'>
                                Learn More
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Decorative Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='hidden lg:block w-1/4'
                    >
                        <img 
                            src={image2} 
                            alt="Success" 
                            className='rounded-3xl shadow-2xl border border-white/10 animate-float'
                            style={{ animationDelay: '1s' }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Decorative Orbs */}
            <div className='absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full z-0' />
            <div className='absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full z-0' />
        </div>
    );
};

export default Banner;