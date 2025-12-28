import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGraduationCap, FaStar } from 'react-icons/fa';
import ScholarshipsCard from './ScholarshipCard';

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

    if (isLoading) return <div className="py-20 flex justify-center"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;
    if (error) return null;

    const items = Array.isArray(data) ? data.slice(0, 6) : [];

    return (
        <section className='py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden'>
            <div className='absolute top-20 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl opacity-10'></div>
            <div className='absolute bottom-20 right-10 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-10'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-5'></div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className='text-center mb-16'
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium mb-6">
                        <FaStar className="mr-2 text-green-500" />
                        Featured Scholarships
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'
                    >
                        Scholarships That
                        <span className='block text-green-600'>
                            Transform Lives
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'
                    >
                        Discover exceptional scholarship opportunities tailored to your academic journey. From merit-based awards to need-based grants, find the perfect funding for your education.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'
                >
                    {items.map((scholarship) => (
                        <motion.div
                            key={scholarship._id}
                            variants={itemVariants}
                            className="group"
                        >
                            <ScholarshipsCard scholarship={scholarship} />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className='text-center'
                >
                    <div className="bg-black rounded-3xl p-8 md:p-12 shadow-2xl border border-green-600/20">
                        <div className="flex items-center justify-center mb-6">
                            <FaGraduationCap className="text-4xl text-white mr-4" />
                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                Ready to Start Your Journey?
                            </h3>
                        </div>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Explore our complete collection of scholarships and find the perfect match for your academic goals and career aspirations.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/all-scholarships"
                                className="group inline-flex items-center px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                                View All Scholarships
                                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/register"
                                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-green-600 text-green-600 font-bold rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-8'
                >
                    {[
                        { number: '500+', label: 'Scholarships Available' },
                        { number: '10,000+', label: 'Students Helped' },
                        { number: '$50M+', label: 'Awarded Annually' },
                        { number: '95%', label: 'Success Rate' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 font-medium">
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