import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScholarshipsCard from './ScholarshipCard';

const TopScholarships = ({ data }) => {
    return (
        <section className='py-32 bg-[#0f172a] relative overflow-hidden'>
            {/* Background Decorative Element */}
            <div className='absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full -z-10' />

            <div className='max-w-screen-2xl mx-auto px-6 md:px-12'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className='text-center mb-16'
                >
                    <h2 className='text-4xl md:text-6xl font-black text-white mb-6'>
                        Scholarships That <span className='text-gradient'>Shine!</span>
                    </h2>
                    <p className='text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed'>
                        Explore the best scholarships to fund your education. Find opportunities based on merit, need, and field of study—apply with confidence!
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {data.map((d, index) => (
                        <motion.div
                            key={d._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ScholarshipsCard scholarship={d} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className='mt-20 flex justify-center'
                >
                    <Link to={'/all-scholarships'}>
                        <button className='px-12 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-1'>
                            View All Scholarships
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default TopScholarships;