import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaUniversity, FaStar, FaShieldAlt } from 'react-icons/fa';
import ScholarshipsCard from './ScholarshipCard';
import bgImg from '../../assets/Pattern-Bg.png';

const TopScholarships = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['topScholarships'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/`);
            return res.data;
        }
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    if (isLoading) return <div className="py-20 flex justify-center bg-white"><span className="loading loading-spinner loading-lg text-[#16a34a]"></span></div>;
    if (error) return null;

    const items = Array.isArray(data) ? data.slice(0, 6) : [];

    return (
        <section className='py-24 lg:py-32 bg-[#FDFDFC] relative overflow-hidden'>
            {/* Background Pattern */}
            <div
                style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '400px', opacity: 0.02 }}
                className="absolute inset-0 z-0"
            />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className='flex flex-col items-center text-center mb-20'
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 border border-[#16a34a]/30 bg-[#16a34a]/10 rounded-full text-[#16a34a] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                        <FaStar className="mr-2" />
                        Signature Edition Registry
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className='text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none mb-8'
                    >
                        Elite <span className='text-[#16a34a]'>Opportunities</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className='max-w-2xl text-gray-400 font-bold text-sm md:text-base uppercase tracking-widest leading-relaxed'
                    >
                        Precision-indexed scholarships from world-class institutions.
                        Discover funding that aligns with your academic legacy.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24'
                >
                    {items.map((scholarship) => (
                        <motion.div
                            key={scholarship._id}
                            variants={itemVariants}
                        >
                            <ScholarshipsCard scholarship={scholarship} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Signature CTA Block */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative group h-full"
                >
                    <div className="absolute inset-0 bg-[#16a34a] rounded-[48px] blur-3xl opacity-5 group-hover:opacity-10 transition-opacity" />
                    <div className="relative bg-[#0c281b] rounded-[48px] p-12 md:p-20 overflow-hidden border-8 border-[#16a34a]/10 shadow-2xl">
                        <div
                            style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '300px', opacity: 0.05 }}
                            className="absolute inset-0 z-0"
                        />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] flex items-center justify-center mb-10 shadow-2xl">
                                <FaShieldAlt className="text-[#16a34a] text-3xl" />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                                Begin Your <span className="text-[#16a34a]">Scholarly Dossier</span>
                            </h3>
                            <p className="text-gray-400 font-bold text-sm md:text-base uppercase tracking-widest max-w-2xl mx-auto mb-12 leading-relaxed">
                                Join the elite network of academic seekers. Index your profile and access prioritized scholarship opportunities.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link
                                    to="/all-scholarships"
                                    className="px-10 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-[#16a34a] hover:text-white transition-all shadow-2xl"
                                >
                                    Explore Full Registry
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-10 py-5 bg-transparent border-2 border-white/20 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-black transition-all"
                                >
                                    Create Archive Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Legacy Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='mt-24 grid grid-cols-2 lg:grid-cols-4 gap-12'
                >
                    {[
                        { number: '500+', label: 'Verified Awards' },
                        { number: '10K+', label: 'Global Scholars' },
                        { number: '50M+', label: 'Allocated Capital' },
                        { number: '95%', label: 'Approval Index' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="text-4xl md:text-5xl font-black text-black mb-3 tracking-tighter group-hover:text-[#16a34a] transition-colors">
                                {stat.number}
                            </div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TopScholarships;