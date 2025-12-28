import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoLocationOutline, IoSchoolOutline } from 'react-icons/io5';
import { GiNotebook } from 'react-icons/gi';
import { FaArrowRight, FaStar, FaUniversity } from 'react-icons/fa';
import bgImg from '../../assets/Pattern-Bg.png';

const ScholarshipsCard = ({ scholarship }) => {
    const {
        _id,
        scholarshipName,
        universityName,
        universityCity,
        universityCountry,
        scholarshipCategory,
        applicationFees,
        applicationDeadline,
        subjectCategory,
        degree
    } = scholarship;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group relative bg-white rounded-[32px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full"
        >
            {/* Elite Header Area */}
            <div className="relative h-56 bg-[#0c281b] flex items-center justify-center overflow-hidden">
                <div
                    style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '200px', opacity: 0.05 }}
                    className="absolute inset-0 z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c281b] via-transparent to-transparent z-10" />

                <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[24px] border border-white/20 flex items-center justify-center z-20 shadow-2xl"
                >
                    <IoSchoolOutline className="text-white text-4xl" />
                </motion.div>

                {/* Status Badges */}
                <div className="absolute top-6 left-6 z-30">
                    <span className="px-4 py-1.5 bg-[#16a34a] text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10 shadow-lg">
                        {scholarshipCategory}
                    </span>
                </div>

                <div className="absolute top-6 right-6 z-30">
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Index Fee</span>
                        <span className="text-white font-black text-lg tracking-tighter">${applicationFees}</span>
                    </div>
                </div>

                {/* University Emblem Overlay (Subtle) */}
                <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FaUniversity className="text-white text-8xl rotate-12" />
                </div>
            </div>

            {/* Premium Content Body */}
            <div className="p-8 flex flex-col flex-1 relative">
                <div className="mb-6">
                    <h3 className="text-2xl font-black text-black mb-2 line-clamp-1 group-hover:text-[#16a34a] transition-colors uppercase tracking-tighter leading-none">
                        {scholarshipName}
                    </h3>
                    <div className="flex items-center gap-2 text-[#16a34a] font-black text-[10px] uppercase tracking-[0.2em]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                        {universityName}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Global Site</p>
                        <div className="flex items-center gap-2 text-black font-black text-[10px] uppercase truncate">
                            <IoLocationOutline className="text-[#16a34a]" />
                            {universityCity}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Domain</p>
                        <div className="flex items-center gap-2 text-black font-black text-[10px] uppercase truncate">
                            <GiNotebook className="text-[#16a34a]" />
                            {subjectCategory}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Level</p>
                        <div className="flex items-center gap-2 text-black font-black text-[10px] uppercase">
                            <IoSchoolOutline className="text-[#16a34a]" />
                            {degree}
                        </div>
                    </div>
                    <div className="bg-[#16a34a]/5 p-4 rounded-2xl border border-[#16a34a]/10">
                        <p className="text-[8px] font-black text-[#16a34a] uppercase tracking-widest mb-1 text-right">Deadline</p>
                        <div className="flex items-center justify-end gap-2 text-[#16a34a] font-black text-[10px] uppercase">
                            {applicationDeadline}
                            <MdOutlineCalendarMonth />
                        </div>
                    </div>
                </div>

                {/* Card Footer - Registry Metadata */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Registry Trust</p>
                        <div className="flex items-center gap-1.5">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={`text-[10px] ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`} />
                                ))}
                            </div>
                            <span className="text-[10px] font-black text-black">4.9</span>
                        </div>
                    </div>

                    <Link to={`/scholarship-details/${_id}`}>
                        <button className="h-12 px-6 bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#16a34a] transition-all shadow-xl shadow-black/5 flex items-center gap-3">
                            View Dossier
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Elite Hover Effect Glow */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#16a34a]/20 rounded-[32px] pointer-events-none transition-all duration-500" />
        </motion.div>
    );
};

export default ScholarshipsCard;