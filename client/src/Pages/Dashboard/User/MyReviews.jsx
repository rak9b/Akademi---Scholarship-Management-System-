import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaPen, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";
import useRole from '../../../Hooks/useRole';

const MyReviews = () => {
    const { user, userId, loading } = useRole();
    const [currentRating, setCurrentRating] = useState(0);
    const [modalData, setModalData] = useState(null);

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['myReviews', userId],
        queryFn: async () => {
            if (!userId) return [];
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-reviews?email=${user.email}`);
            return res.data;
        },
        enabled: !!userId && !loading && !!user?.email
    });

    const handleDelete = (id) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/delete-review/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('Review removed successfully.');
                    refetch();
                }
            })
            .catch(err => toast.error('Removal failed.'));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!modalData) return;

        const formData = new FormData(e.target);
        const updateData = Object.fromEntries(formData);

        axios.patch(`${import.meta.env.VITE_API_URL}/update-review/${modalData._id}`, {
            ...updateData,
            ratings: currentRating || modalData.ratings
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Review updated with signature precision.');
                    document.getElementById('edit_review_modal').checked = false;
                    refetch();
                }
            })
            .catch(err => toast.error('Update failed.'));
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;

    return (
        <section className='bg-white min-h-screen py-14 px-4'>
            <div className="max-w-6xl mx-auto">
                <div className='flex justify-between items-center mb-10'>
                    <h2 className='text-3xl font-black text-black uppercase tracking-tight'>My Reviews</h2>
                    <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100'>
                        {data.length} Global Contributions
                    </span>
                </div>

                {data.length > 0 ? (
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {data.map((item) => (
                            <div key={item._id} className='bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 border border-gray-100 flex flex-col h-full group'>
                                <div className='flex justify-between items-start mb-6'>
                                    <div className='bg-green-50 p-3 rounded-2xl'>
                                        <ReactStars
                                            count={5}
                                            size={16}
                                            edit={false}
                                            value={item.ratings}
                                            isHalf={true}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <label
                                            onClick={() => { setModalData(item); setCurrentRating(item.ratings); }}
                                            htmlFor="edit_review_modal"
                                            className="p-2 bg-gray-50 hover:bg-black hover:text-white rounded-lg cursor-pointer transition-colors"
                                        >
                                            <FaPen size={12} />
                                        </label>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="p-2 bg-gray-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <h3 className='text-lg font-black text-black uppercase tracking-tight mb-1 line-clamp-1'>{item.scholarshipName}</h3>
                                    <p className='text-[10px] font-black text-green-600 uppercase tracking-widest mb-4'>{item.universityName}</p>
                                    <p className='text-gray-500 text-sm font-medium leading-relaxed italic'>"{item.review}"</p>
                                </div>

                                <div className='mt-8 pt-6 border-t border-gray-50 flex justify-between items-center'>
                                    <span className='text-[10px] font-black text-gray-300 uppercase tracking-widest'>{item.date}</span>
                                    <div className='w-8 h-8 rounded-full bg-gray-100 border border-white shadow-sm overflow-hidden'>
                                        <img src={item.image} alt="" className='w-full h-full object-cover' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='bg-gray-50 rounded-[40px] p-20 text-center border-2 border-dashed border-gray-200'>
                        <h2 className='text-3xl font-black text-gray-300 uppercase tracking-tight'>No Reviews Yet</h2>
                    </div>
                )}

                {/* Edit Modal */}
                <input type="checkbox" id="edit_review_modal" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box rounded-[40px] bg-white p-10 shadow-2xl">
                        {modalData && (
                            <form onSubmit={handleUpdate} className='space-y-8'>
                                <div className='text-center'>
                                    <h2 className='text-2xl font-black text-black uppercase tracking-tight mb-2'>Edit Review</h2>
                                    <p className='text-gray-400 font-bold text-xs uppercase tracking-widest'>{modalData.universityName}</p>
                                </div>

                                <div className='flex flex-col items-center gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100'>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Scholarly Rating</span>
                                    <ReactStars
                                        count={5}
                                        size={40}
                                        onChange={setCurrentRating}
                                        value={modalData.ratings}
                                        isHalf={true}
                                        activeColor="#ffd700"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Your Expertise & Feedback</span></label>
                                    <textarea
                                        required
                                        name="review"
                                        defaultValue={modalData.review}
                                        className='w-full rounded-2xl h-32 p-6 bg-gray-50 border-gray-200 font-bold focus:bg-white transition-all text-black'
                                    ></textarea>
                                </div>

                                <div className="flex gap-4">
                                    <button className='flex-1 h-16 bg-black text-white hover:bg-green-600 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300'>Update Review</button>
                                    <label className='h-16 flex items-center justify-center px-10 bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs cursor-pointer transition-all duration-300' htmlFor="edit_review_modal">Cancel</label>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyReviews;