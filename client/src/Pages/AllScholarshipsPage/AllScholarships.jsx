import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScholarshipsCard from '../HomePage/ScholarshipCard';
import { FaSearch, FaFilter, FaSort, FaArrowLeft, FaArrowRight, FaGraduationCap, FaTh, FaList, FaUniversity } from 'react-icons/fa';
import bgImg from '../../assets/Pattern-Bg.png';

const AllScholarships = () => {
    const { data: initialData = [], isLoading, error } = useQuery({
        queryKey: ['allScholarships'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-data`);
            return res.data;
        }
    });

    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('scholarshipName');
    const [sortOrder, setSortOrder] = useState('asc');
    const [viewMode, setViewMode] = useState('grid');

    // Pagination
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (initialData) {
            let result = [...initialData];

            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                result = result.filter(s =>
                    s.scholarshipName?.toLowerCase().includes(query) ||
                    s.universityName?.toLowerCase().includes(query) ||
                    s.degree?.toLowerCase().includes(query)
                );
            }

            result.sort((a, b) => {
                let aValue = a[sortBy] || '';
                let bValue = b[sortBy] || '';

                if (sortBy === 'applicationFees') {
                    aValue = parseFloat(aValue) || 0;
                    bValue = parseFloat(bValue) || 0;
                }

                if (sortOrder === 'asc') return aValue > bValue ? 1 : -1;
                return aValue < bValue ? 1 : -1;
            });

            setFilteredData(result);
            setCurrentPage(1);
        }
    }, [initialData, searchQuery, sortBy, sortOrder]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentScholarships = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFC]">
            {/* Neo-Classical Hero Section */}
            <section className="relative bg-[#0c281b] pt-32 pb-24 overflow-hidden border-b-8 border-[#16a34a]/20">
                <div
                    style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '400px', opacity: 0.03 }}
                    className="absolute inset-0 z-0"
                />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/20 to-transparent z-0" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="inline-flex items-center px-4 py-2 border border-[#16a34a]/30 bg-[#16a34a]/10 rounded-full text-[#16a34a] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                            <FaUniversity className="mr-2" />
                            Academic Registry & Global Index
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                            Elite <span className="text-[#16a34a]">Scholarships</span>
                        </h1>
                        <p className="max-w-2xl text-gray-400 font-bold text-sm md:text-base uppercase tracking-widest leading-relaxed">
                            Curated global opportunities for the next generation of academic leaders.
                            Precision-indexed for your career evolution.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Floating Search Dock */}
            <div className="relative -mt-10 z-30 max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/90 backdrop-blur-2xl border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[32px] p-4 flex flex-col lg:flex-row gap-4 items-center"
                >
                    <div className="relative flex-1 w-full">
                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Enter university, degree, or scholarship name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#16a34a]/10 transition-all font-bold text-black text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="flex-1 lg:flex-none px-6 py-4 bg-gray-50 border-none rounded-2xl font-black text-[10px] uppercase tracking-widest text-black focus:ring-4 focus:ring-[#16a34a]/10 transition-all cursor-pointer"
                        >
                            <option value="scholarshipName">Sort By Name</option>
                            <option value="applicationFees">Sort By Fee</option>
                            <option value="applicationDeadline">Sort By Deadline</option>
                        </select>

                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="p-4 bg-gray-50 text-black hover:bg-black hover:text-white rounded-2xl transition-all shadow-sm"
                            title="Toggle Sort Order"
                        >
                            <FaSort className={`transform ${sortOrder === 'desc' ? 'rotate-180' : ''} transition-transform`} />
                        </button>

                        <div className="h-10 w-px bg-gray-100 hidden lg:block mx-1" />

                        <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 gap-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
                            >
                                <FaTh size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
                            >
                                <FaList size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Results Grid */}
            <section className="pt-20 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        {filteredData.length > 0 ? (
                            <motion.div
                                key={`${viewMode}-${currentPage}`}
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                                className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
                            >
                                {currentScholarships.map((scholarship) => (
                                    <motion.div key={scholarship._id} variants={itemVariants} layout className="h-full">
                                        <ScholarshipsCard scholarship={scholarship} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200"
                            >
                                <div className="inline-flex p-6 bg-white rounded-[32px] shadow-sm mb-6">
                                    <FaSearch className="text-4xl text-gray-200" />
                                </div>
                                <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-2">No Records Found</h3>
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">Refine your search parameters to discover elite opportunities.</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-10 py-4 bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#16a34a] transition-all shadow-xl"
                                >
                                    Reset Directory
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Signature Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col md:flex-row items-center justify-between mt-20 gap-8">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                                Page {currentPage} of {totalPages} — Signature Indexing
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="h-14 px-6 bg-white border border-gray-100 rounded-2xl text-black disabled:opacity-30 disabled:grayscale hover:border-[#16a34a] hover:text-[#16a34a] transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3"
                                >
                                    <FaArrowLeft /> PREV
                                </button>

                                <div className="flex items-center gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`w-14 h-14 rounded-2xl font-black text-xs transition-all border ${currentPage === i + 1
                                                    ? 'bg-black text-white border-black shadow-xl ring-4 ring-black/5'
                                                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                                                }`}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="h-14 px-6 bg-white border border-gray-100 rounded-2xl text-black disabled:opacity-30 disabled:grayscale hover:border-[#16a34a] hover:text-[#16a34a] transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-3"
                                >
                                    NEXT <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Aesthetic Footer Buffer */}
            <div className="h-24 bg-gradient-to-t from-gray-50 to-transparent" />
        </div>
    );
};

export default AllScholarships;