import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useRole from '../../../Hooks/useRole';
import { FaCircleInfo } from 'react-icons/fa6';
import { BiSolidMessageError } from 'react-icons/bi';
import { RiIndeterminateCircleFill } from 'react-icons/ri';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { toast } from 'react-toastify';

const ManageApplications = () => {
    const { user, loading } = useRole();
    const [modalData, setModalData] = useState({});
    const [sortBy, setSortBy] = useState('dsc');

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['adminApplications', user?.email, sortBy],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-application?email=${user.email}`);

            // Sorting logic
            return [...res.data].sort((a, b) => {
                const dateA = new Date(a.appliedDate || a.appliedData);
                const dateB = new Date(b.appliedDate || b.appliedData);
                return sortBy === 'asc' ? dateA - dateB : dateB - dateA;
            });
        },
        enabled: !!user?.email && !loading
    });

    const updateStatus = (id, status) => {
        axios.patch(`${import.meta.env.VITE_API_URL}/update-feedback/${id}?email=${user?.email}`, { status })
            .then(res => {
                if (res.data.matchedCount > 0) {
                    toast.success(`Application ${status.toLowerCase()} successfully.`);
                    refetch();
                }
            })
            .catch(err => toast.error('Status update failed.'));
    };

    const handleFeedback = (e) => {
        e.preventDefault();
        const feedback = e.target.feedback.value;
        axios.patch(`${import.meta.env.VITE_API_URL}/update-feedback/${modalData._id}?email=${user?.email}`, { feedback })
            .then(res => {
                if (res.data.matchedCount > 0) {
                    toast.success('Feedback delivered with signature precision.');
                    document.getElementById('feedback_modal').checked = false;
                    refetch();
                }
            })
            .catch(err => toast.error('Feedback delivery failed.'));
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;

    return (
        <section className='bg-white min-h-screen py-10 px-4'>
            <div className="max-w-7xl mx-auto">
                <div className='flex flex-col md:flex-row justify-between items-center mb-10 gap-6'>
                    <div>
                        <h2 className='text-3xl font-black text-black uppercase tracking-tight'>Manage Applications</h2>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mt-1'>Review & Process Candidate Enrollment</p>
                    </div>
                    <div className='flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100'>
                        <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>Sort Chronology</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className='bg-transparent font-black text-xs uppercase tracking-widest text-black focus:outline-none'
                        >
                            <option value="dsc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                </div>

                {data.length > 0 ? (
                    <div className="overflow-x-auto bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100">
                        <table className="table w-full">
                            <thead>
                                <tr className='border-b border-gray-50 bg-gray-50/50'>
                                    <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest'>Applicant</th>
                                    <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest'>Scholarship / Degree</th>
                                    <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center'>Status</th>
                                    <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center'>Date</th>
                                    <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id} className='hover:bg-green-50/30 transition-colors border-b border-gray-50'>
                                        <td className='p-6'>
                                            <div className='font-black text-black uppercase tracking-tight'>{item.userName}</div>
                                            <div className='text-[10px] font-bold text-gray-400 uppercase'>{item.userEmail}</div>
                                        </td>
                                        <td className='p-6'>
                                            <div className='text-sm font-bold text-black'>{item.scholarshipName}</div>
                                            <div className='text-[10px] font-black text-green-600 uppercase tracking-widest'>{item.degree}</div>
                                        </td>
                                        <td className='p-6 text-center'>
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                                    item.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                                                        'bg-green-100 text-green-600'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className='p-6 text-center'>
                                            <span className='text-[10px] font-black text-black uppercase tracking-widest'>
                                                {new Date(item.appliedDate || item.appliedData).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className='p-6'>
                                            <div className='flex justify-center gap-2'>
                                                <label
                                                    onClick={() => setModalData(item)}
                                                    htmlFor='details_modal'
                                                    className="p-3 bg-gray-100 hover:bg-black hover:text-white rounded-xl transition-all cursor-pointer"
                                                    title="View Details"
                                                >
                                                    <FaCircleInfo className='text-lg' />
                                                </label>
                                                <label
                                                    onClick={() => setModalData(item)}
                                                    htmlFor='feedback_modal'
                                                    className="p-3 bg-gray-100 hover:bg-green-600 hover:text-white rounded-xl transition-all cursor-pointer"
                                                    title="Send Feedback"
                                                >
                                                    <BiSolidMessageError className='text-lg' />
                                                </label>
                                                {item.status !== 'Approved' && (
                                                    <button
                                                        onClick={() => updateStatus(item._id, 'Approved')}
                                                        className="p-3 bg-gray-100 hover:bg-green-500 hover:text-white rounded-xl transition-all"
                                                        title="Approve"
                                                    >
                                                        <IoCheckmarkCircle className='text-lg' />
                                                    </button>
                                                )}
                                                {item.status !== 'Rejected' && (
                                                    <button
                                                        onClick={() => updateStatus(item._id, 'Rejected')}
                                                        className="p-3 bg-gray-100 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                                        title="Reject"
                                                    >
                                                        <RiIndeterminateCircleFill className='text-lg' />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='bg-gray-50 rounded-[40px] p-20 text-center border-2 border-dashed border-gray-200'>
                        <h2 className='text-3xl font-black text-gray-300 uppercase tracking-tight'>No Applications To Review</h2>
                    </div>
                )}

                {/* Details Modal */}
                <input type="checkbox" id="details_modal" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box rounded-[40px] max-w-2xl bg-white p-10 lg:p-14 shadow-2xl space-y-8">
                        <div className='text-center'>
                            <h2 className='text-3xl font-black text-black uppercase tracking-tight mb-2'>In-Depth Review</h2>
                            <p className='text-gray-400 font-bold text-xs uppercase tracking-widest'>Candidate Profile Assessment</p>
                        </div>

                        <div className='flex flex-col items-center gap-6'>
                            <div className='w-32 h-32 rounded-[32px] overflow-hidden border-4 border-white shadow-xl bg-gray-100'>
                                <img src={modalData?.image} alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className='text-center'>
                                <h3 className='text-2xl font-black text-black uppercase tracking-tight'>{modalData?.userName}</h3>
                                <p className='text-green-600 font-black text-[10px] uppercase tracking-widest'>{modalData?.universityName}</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-8'>
                            <div className='bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center'>
                                <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2'>Academic Standing</span>
                                <div className='flex justify-around'>
                                    <div>
                                        <p className='text-[10px] font-black text-gray-400 uppercase'>SSC</p>
                                        <p className='text-lg font-black text-black'>{modalData?.sscResult}</p>
                                    </div>
                                    <div className='w-px h-8 bg-gray-200 mt-2'></div>
                                    <div>
                                        <p className='text-[10px] font-black text-gray-400 uppercase'>HSC</p>
                                        <p className='text-lg font-black text-black'>{modalData?.hscResult}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center'>
                                <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2'>Applied Program</span>
                                <p className='text-sm font-bold text-black'>{modalData?.subjectCategory}</p>
                                <p className='text-[10px] font-bold text-gray-400 uppercase'>{modalData?.degree}</p>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <label onClick={() => updateStatus(modalData._id, 'Approved')} htmlFor='details_modal' className='flex-1 h-16 bg-black text-white hover:bg-green-600 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center cursor-pointer transition-all duration-300'>Approve Candidate</label>
                            <label className='h-16 flex items-center justify-center px-10 bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs cursor-pointer transition-all duration-300' htmlFor="details_modal">Close</label>
                        </div>
                    </div>
                </div>

                {/* Feedback Modal */}
                <input type="checkbox" id="feedback_modal" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box rounded-[40px] bg-white p-10 shadow-2xl">
                        <form onSubmit={handleFeedback} className='space-y-8'>
                            <div className='text-center'>
                                <h2 className='text-2xl font-black text-black uppercase tracking-tight mb-2'>Professional Feedback</h2>
                                <p className='text-gray-400 font-bold text-xs uppercase tracking-widest'>Direct Communication with {modalData?.userName}</p>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Advisory Message</span></label>
                                <textarea required name="feedback" className='w-full rounded-3xl h-40 p-8 bg-gray-50 border-gray-200 font-bold focus:bg-white transition-all text-black' placeholder='Enter your constructive feedback...'></textarea>
                            </div>

                            <div className="flex gap-4">
                                <button className='flex-1 h-16 bg-black text-white hover:bg-green-600 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300'>Deliver Feedback</button>
                                <label className='h-16 flex items-center justify-center px-10 bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs cursor-pointer transition-all duration-300' htmlFor="feedback_modal">Cancel</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageApplications;