import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineAccessTime, MdOutlineCalendarMonth } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoLocationOutline, IoSchoolOutline } from 'react-icons/io5';
import { PiCertificate } from 'react-icons/pi';
import { GiNotebook } from 'react-icons/gi';
import { FaArrowRight, FaDollarSign, FaStar, FaUniversity } from 'react-icons/fa';

const ScholarshipsCard = ({ scholarship }) => {
    const {
        _id,
        scholarshipName,
        universityName,
        universityCity,
        universityCountry,
        scholarshipCategory,
        applicationFees,
        description,
        applicationDeadline,
        subjectCategory,
    } = scholarship;

    const text = description || '';
    const slicedText = text.length > 100 ? text.slice(0, 100) + "..." : text;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full"
        >
            {/* Header / Image Area */}
            <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent"></div>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 z-10 border border-green-600/10">
                    <IoSchoolOutline className="text-green-600 text-3xl" />
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/20">
                        {scholarshipCategory}
                    </span>
                </div>

                {/* Rank / Price Badge */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                        ${applicationFees}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="text-xl font-black text-black mb-1 line-clamp-1 group-hover:text-green-600 transition-colors uppercase tracking-tight">
                        {scholarshipName}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 font-bold text-xs uppercase tracking-wider">
                        <FaUniversity className="text-green-600" />
                        {universityName}
                    </div>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <IoLocationOutline className="text-green-600 shrink-0" />
                        <span>{universityCity}, {universityCountry}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <GiNotebook className="text-green-600 shrink-0" />
                        <span>{subjectCategory}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <MdOutlineCalendarMonth className="text-green-600 shrink-0" />
                        <span className="text-red-500 font-black">Deadline: {applicationDeadline}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm font-black text-black">4.8</span>
                    </div>

                    <Link to={`/scholarship-details/${_id}`}>
                        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black group-hover:text-green-600 transition-colors">
                            Details
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ScholarshipsCard;