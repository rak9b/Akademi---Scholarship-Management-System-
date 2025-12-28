import React from 'react';
import ReactStars from "react-rating-stars-component";
import { MdOutlineAccessTime, MdOutlineCalendarMonth } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoLocationOutline, IoSchoolOutline } from 'react-icons/io5';
import { PiCertificate } from 'react-icons/pi';
import { GiNotebook } from 'react-icons/gi';

const ScholarshipsCard = ({ scholarship }) => {
    const { _id, scholarshipName, applicationFees, degree, description, scholarshipPostDate, universityImage, universityName, universityCity, universityCountry, scholarshipCategory, subjectCategory, applicationDeadline } = scholarship;
    const slicedText = description.length > 120 ? description.slice(0, 120) + "..." : description;

    return (
        <div className="glass-card group relative p-6 rounded-[2rem] flex flex-col h-full">
            <div className='flex items-center gap-5 mb-6'>
                <div className='relative'>
                    <img
                        className='object-cover w-20 h-20 rounded-2xl ring-4 ring-white/5 group-hover:ring-primary/20 transition-all duration-500'
                        src={universityImage}
                        alt={universityName}
                    />
                    <div className='absolute -bottom-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg'>
                        TOP
                    </div>
                </div>
                <div className='flex-1 min-w-0'>
                    <h2 className="font-bold text-xl text-white truncate group-hover:text-primary transition-colors duration-300">
                        {universityName}
                    </h2>
                    <p className='flex text-gray-400 text-sm items-center gap-1.5 mt-1'>
                        <IoLocationOutline className='text-primary' /> {universityCity}, {universityCountry}
                    </p>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-2xl text-white mb-4 line-clamp-2 leading-snug">
                    {scholarshipName}
                </h3>

                <div className='grid grid-cols-2 gap-4 mb-6'>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                        <IoSchoolOutline className='text-primary text-lg' />
                        <span className='truncate'>{scholarshipCategory}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                        <PiCertificate className='text-accent text-lg' />
                        <span className='truncate'>{degree}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                        <GiNotebook className='text-secondary text-lg' />
                        <span className='truncate'>{subjectCategory}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                        <MdOutlineAccessTime className='text-warning text-lg' />
                        <span className='truncate'>{applicationDeadline}</span>
                    </div>
                </div>

                <p className='text-gray-500 text-sm leading-relaxed mb-6 flex-1'>
                    {slicedText}
                </p>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                        <p className='text-xs text-gray-500 uppercase tracking-widest mb-1'>Application Fee</p>
                        <p className='text-2xl font-black text-white'>
                            ${applicationFees}
                        </p>
                    </div>

                    <div className='flex flex-col items-end gap-2'>
                        <div className="opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                            <ReactStars
                                count={5}
                                edit={false}
                                size={18}
                                value={4.8}
                                isHalf={true}
                                activeColor="#6366f1"
                            />
                        </div>
                        <Link to={`/scholarship-details/${_id}`}>
                            <button className="px-5 py-2.5 bg-white/5 hover:bg-primary text-white text-sm font-bold rounded-xl transition-all duration-300 border border-white/10 hover:border-primary">
                                Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipsCard;