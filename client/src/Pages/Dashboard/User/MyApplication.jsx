import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useRole from '../../../Hooks/useRole';
import { toast } from 'react-toastify';
import { BiSolidMessageEdit } from 'react-icons/bi';
import { FaPen } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import ReactStars from "react-rating-stars-component";

const MyApplication = () => {
    const { userId, loading, user } = useRole();
    const [modalData, setModalData] = useState({});
    const [ratings, setRatings] = useState(0);
    const [sortBy, setSortBy] = useState('appliedDate'); // Default sort

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['myApplications', userId, sortBy],
        queryFn: async () => {
            if (!userId) return [];
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-application?userId=${userId}`);

            // Client-side sorting for immediate feedback/simplicity
            return [...res.data].sort((a, b) => {
                const dateA = new Date(a.appliedDate || a.appliedData);
                const dateB = new Date(b.appliedDate || b.appliedData);
                const deadlineA = new Date(a.applicationDeadline);
                const deadlineB = new Date(b.applicationDeadline);

                if (sortBy === 'appliedDate') {
                    return dateB - dateA;
                } else if (sortBy === 'deadline') {
                    return deadlineA - deadlineB;
                }
                return 0;
            });
        },
        enabled: !!userId && !loading
    });

    const handleDelete = (id) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/delete-application/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('Application removed with signature precision.');
                    refetch();
                }
            })
            .catch(err => toast.error('Removal failed. Please retry.'));
    };

    const handleUpdate = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updateData = Object.fromEntries(formData);
        const imageFile = new FormData();
        imageFile.append('image', formData.get('image'));

        fetch('https://api.imgbb.com/1/upload?key=48b282cb34af9841dcce86814f69cd23', {
            method: 'POST',
            body: imageFile,
        }).then(res => res.json())
            .then(res => {
                axios.patch(`${import.meta.env.VITE_API_URL}/update-application/${modalData?._id}`, {
                    ...updateData,
                    image: res.data.url
                })
                    .then(res => {
                        if (res.data.matchedCount > 0) {
                            toast.success('Application updated successfully.');
                            document.getElementById('my_modal_9').checked = false;
                            refetch();
                        }
                    })
                    .catch(err => toast.error('Update failed.'));
            })
            .catch(err => toast.error('Image upload failed.'));
    };

    const handleReview = (e) => {
        e.preventDefault();
        if (ratings === 0) {
            toast.error('Please select a star rating.');
            return;
        }
        const formData = new FormData(e.target);
        const reviewData = Object.fromEntries(formData);
        const date = new Date().toDateString().split(' ').slice(1).join('-');
        const finalReview = {
            ...reviewData,
            userid: user.uid,
            image: user.photoURL,
            ratings,
            date,
            universityName: modalData.universityName,
            subjectCategory: modalData.subjectCategory,
            scholarshipName: modalData.scholarshipName,
            scholarshipId: modalData.scholarshipId
        };

        axios.post(`${import.meta.env.VITE_API_URL}/add-review/${modalData.scholarshipId}`, finalReview)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Review added successfully.');
                    document.getElementById('my_modal_4').checked = false;
                }
            })
            .catch(err => toast.error('Review submission failed.'));
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;

    return (
        <section className='bg-white min-h-screen py-14 px-4'>
            <div className="max-w-6xl mx-auto">
                <div className='flex justify-between items-center mb-10'>
                    <h2 className='text-3xl font-black text-black uppercase tracking-tight'>My Applications</h2>
                    <div className='flex items-center gap-3'>
                        <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>Sort By</span>
                        <select
                            onChange={(e) => setSortBy(e.target.value)}
                            value={sortBy}
                            className='bg-gray-50 border-gray-200 rounded-xl px-4 py-2 font-bold text-xs uppercase tracking-widest text-black focus:outline-none focus:border-green-500'
                        >
                            <option value="appliedDate">Applied Date</option>
                            <option value="deadline">Scholarship Deadline</option>
                        </select>
                    </div>
                </div>

                {data.length > 0 ? (
                    <div className="overflow-x-auto bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100">
                        <table className="table w-full">
                            <thead>
                                <tr className='border-b border-gray-50 bg-gray-50/50'>
                                    <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center'>University</th>
                                    <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center'>Subject</th>
                                    <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center'>Status</th>
                                    <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center'>Fees</th>
                                    <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id} className='hover:bg-green-50/30 transition-colors border-b border-gray-50'>
                                        <td className='p-6 text-center'>
                                            <div className='font-black text-black uppercase tracking-tight'>{item.universityName}</div>
                                            <div className='text-xs font-bold text-gray-400 uppercase'>{item.universityAddress || 'Global Campus'}</div>
                                        </td>
                                        <td className='p-6 text-center'>
                                            <div className='text-sm font-bold text-black'>{item.subjectCategory}</div>
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
                                            <div className='font-black text-black'>${item.applicationFees}</div>
                                        </td>
                                        <td className='p-6'>
                                            <div className='flex justify-center gap-2'>
                                                <label
                                                    onClick={() => setModalData(item)}
                                                    htmlFor='my_modal_4'
                                                    className="p-3 bg-gray-100 hover:bg-black hover:text-white rounded-xl transition-all cursor-pointer"
                                                    title="Add Review"
                                                >
                                                    <BiSolidMessageEdit className='text-lg' />
                                                </label>
                                                <label
                                                    disabled={item.status !== 'Pending'}
                                                    onClick={() => { if (item.status === 'Pending') setModalData(item); }}
                                                    htmlFor='my_modal_9'
                                                    className={`p-3 rounded-xl transition-all cursor-pointer ${item.status === 'Pending' ? 'bg-gray-100 hover:bg-green-600 hover:text-white' : 'opacity-20 cursor-not-allowed bg-gray-50'}`}
                                                    title="Edit Application"
                                                >
                                                    <FaPen className='text-sm' />
                                                </label>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-3 bg-gray-100 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                                    title="Cancel Application"
                                                >
                                                    <FcCancel className='text-lg' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='bg-gray-50 rounded-[40px] p-20 text-center border-2 border-dashed border-gray-200'>
                        <h2 className='text-3xl font-black text-gray-300 uppercase tracking-tight'>No Active Applications Found</h2>
                    </div>
                )}

                {/* Modals */}
                <input type="checkbox" id="my_modal_9" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <form onSubmit={handleUpdate} className='modal-box rounded-[40px] max-w-2xl bg-white p-10 lg:p-14 shadow-2xl space-y-8'>
                        <div className='text-center'>
                            <h2 className='text-3xl font-black text-black uppercase tracking-tight mb-2'>Update Application</h2>
                            <p className='text-gray-400 font-bold text-xs uppercase tracking-widest'>Modify Enrollment Details</p>
                        </div>

                        <div className='grid md:grid-cols-2 gap-6'>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Phone Number</span></label>
                                <input defaultValue={modalData?.phoneNumber} required name='phoneNumber' type="number" className="h-14 bg-gray-50 border-gray-200 rounded-xl px-6 font-bold text-black" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Update Photo</span></label>
                                <input required name='image' type="file" className="file-input file-input-bordered h-14 bg-gray-50 border-gray-200 rounded-xl" />
                            </div>
                        </div>

                        <div className='flex gap-4 pt-4'>
                            <button className='flex-1 h-16 bg-black text-white hover:bg-green-600 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300'>Update Application</button>
                            <label className='h-16 flex items-center justify-center px-10 bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs cursor-pointer transition-all duration-300' htmlFor="my_modal_9">Cancel</label>
                        </div>
                    </form>
                </div>

                <input type="checkbox" id="my_modal_4" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box rounded-[40px] bg-white p-10 shadow-2xl">
                        <form onSubmit={handleReview} className='space-y-8'>
                            <div className='text-center'>
                                <h2 className='text-2xl font-black text-black uppercase tracking-tight mb-2'>Submit Review</h2>
                                <p className='text-gray-400 font-bold text-xs uppercase tracking-widest'>{modalData.universityName}</p>
                            </div>

                            <div className='flex flex-col items-center gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100'>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Scholarly Rating</span>
                                <ReactStars
                                    count={5}
                                    size={40}
                                    onChange={setRatings}
                                    isHalf={true}
                                    activeColor="#ffd700"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Your Expertise & Feedback</span></label>
                                <textarea required name="review" className='w-full rounded-2xl h-32 p-6 bg-gray-50 border-gray-200 font-bold focus:bg-white transition-all text-black' placeholder='Share your experience...'></textarea>
                            </div>

                            <div className="flex gap-4">
                                <button className='flex-1 h-16 bg-black text-white hover:bg-green-600 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300'>Post Review</button>
                                <label className='h-16 flex items-center justify-center px-10 bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs cursor-pointer transition-all duration-300' htmlFor="my_modal_4">Close</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyApplication;