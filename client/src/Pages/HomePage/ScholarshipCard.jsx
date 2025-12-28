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
        degree,
        universityImage // Ensure this is coming from the DB
    } = scholarship;

    return (
        <motion.div
            whileHover={{ y: -12 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="group relative bg-white rounded-[40px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.04)] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full"
        >
            {/* Cinematic Header Area with Real University Image */}
            <div className="relative h-64 overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={universityImage || "https://images.unsplash.com/photo-1541339907198-e08756ebafe1?w=800&q=80"}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 grayscale-[20%] group-hover:grayscale-0"
                    alt={universityName}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                {/* Academic Pattern Overlay */}
                <div
                    style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '300px', opacity: 0.1 }}
                    className="absolute inset-0 z-10 pointer-events-none"
                />

                {/* Status Badges */}
                <div className="absolute top-8 left-8 z-20">
                    <span className="px-5 py-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-white/20 shadow-2xl">
                        {scholarshipCategory}
                    </span>
                </div>

                <div className="absolute top-8 right-8 z-20">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-1">Index Fee</span>
                        <span className="text-white font-black text-2xl tracking-tighter shadow-sm">${applicationFees}</span>
                    </div>
                </div>

                {/* Floating Meta */}
                <div className="absolute bottom-8 left-8 z-20 right-8">
                    <div className="flex items-center gap-2 text-[#16a34a] font-black text-xs uppercase tracking-[0.3em] mb-1">
                        <div className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                        {universityName}
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none line-clamp-1 drop-shadow-2xl">
                        {scholarshipName}
                    </h3>
                </div>
            </div>

            {/* Premium Content Body */}
            <div className="p-10 flex flex-col flex-1 relative">
                <div className="grid grid-cols-2 gap-5 mb-10 flex-1">
                    <div className="bg-gray-50/50 p-5 rounded-[24px] border border-gray-100 flex flex-col justify-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Location</p>
                        <div className="flex items-center gap-3 text-black font-black text-[12px] uppercase truncate">
                            <IoLocationOutline className="text-[#16a34a] text-lg" />
                            {universityCity}
                        </div>
                    </div>
                    <div className="bg-gray-50/50 p-5 rounded-[24px] border border-gray-100 flex flex-col justify-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Subject</p>
                        <div className="flex items-center gap-3 text-black font-black text-[12px] uppercase truncate">
                            <GiNotebook className="text-[#16a34a] text-lg" />
                            {subjectCategory}
                        </div>
                    </div>
                    <div className="bg-gray-50/50 p-5 rounded-[24px] border border-gray-100 flex flex-col justify-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Degree</p>
                        <div className="flex items-center gap-3 text-black font-black text-[12px] uppercase">
                            <IoSchoolOutline className="text-[#16a34a] text-lg" />
                            {degree}
                        </div>
                    </div>
                    <div className="bg-[#16a34a]/5 p-5 rounded-[24px] border border-[#16a34a]/10 flex flex-col justify-center">
                        <p className="text-[10px] font-black text-[#16a34a]/60 uppercase tracking-widest mb-2 text-right">Deadline</p>
                        <div className="flex items-center justify-end gap-3 text-[#16a34a] font-black text-[12px] uppercase">
                            {applicationDeadline}
                            <MdOutlineCalendarMonth className="text-lg" />
                        </div>
                    </div>
                </div>

                {/* Card Footer - Registry Metadata */}
                <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Index Trust</p>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={`text-xs ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`} />
                                ))}
                            </div>
                            <span className="text-[12px] font-black text-black">4.9</span>
                        </div>
                    </div>

                    <Link to={`/scholarship-details/${_id}`} className="group/btn">
                        <button className="h-14 px-10 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl group-hover/btn:bg-[#16a34a] transition-all shadow-2xl flex items-center gap-4">
                            Access Dossier
                            <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Elite Hover Effect Glow */}
            <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#16a34a]/30 rounded-[40px] pointer-events-none transition-all duration-500" />
        </motion.div>
    );
};

export default ScholarshipsCard;