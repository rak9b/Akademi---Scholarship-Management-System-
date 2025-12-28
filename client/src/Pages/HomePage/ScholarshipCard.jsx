import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ScholarshipCard = ({ scholarship }) => {
    const {
        _id,
        scholarshipName,
        universityName,
        universityCountry,
        universityCity,
        universityLogo,
        category,
        applicationDeadline,
        subjectCategory,
        scholarshipPostDate,
        applicationFees,
        serviceCharge,
        stipend,
        description
    } = scholarship;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="signature-card group overflow-hidden flex flex-col h-full bg-slate-900/40 border border-white/5"
        >
            {/* Architectural Header */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={universityLogo}
                    alt={universityName}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 to-transparent opacity-80" />

                {/* Sharp Accent Badge */}
                <div className="absolute top-4 right-4 bg-gold-500 text-emerald-950 text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 clip-path-polygon">
                    {category}
                </div>
            </div>

            {/* Content Body */}
            <div className="p-8 flex flex-col flex-grow">
                <span className="text-accent text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
                    {universityName} • {universityCountry}
                </span>

                <h3 className="font-serif text-2xl text-white mb-4 line-clamp-2 leading-tight">
                    {scholarshipName}
                </h3>

                <p className="text-foreground/40 text-sm font-light mb-8 line-clamp-3 leading-relaxed">
                    {description}
                </p>

                <div className="mt-auto space-y-6">
                    {/* Data Grid */}
                    <div className="grid grid-cols-2 gap-8 py-6 border-y border-white/5">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-accent/40 tracking-widest uppercase mb-1">Fee</span>
                            <span className="text-white font-serif text-lg">${applicationFees}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] text-accent/40 tracking-widest uppercase mb-1">Stipend</span>
                            <span className="text-white font-serif text-lg">${stipend}</span>
                        </div>
                    </div>

                    <Link
                        to={`/scholarship-details/${_id}`}
                        className="flex items-center justify-between group/link"
                    >
                        <span className="text-[11px] font-black tracking-[0.2em] text-white group-hover/link:text-accent transition-colors">
                            VIEW DETAILS
                        </span>
                        <div className="w-12 h-[1px] bg-white/10 group-hover/link:bg-accent group-hover/link:w-16 transition-all duration-500" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ScholarshipCard;