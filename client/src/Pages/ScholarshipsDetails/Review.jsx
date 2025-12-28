import React, { useContext, useState } from 'react';
import { FaRegCalendarAlt, FaQuoteLeft } from 'react-icons/fa';
import ReactStars from "react-rating-stars-component";
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/MockAuthProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Review = ({ scholarshipData }) => {
    const { } = useContext(AuthContext);
    const reviews = scholarshipData.reviews || [];

    if (reviews.length === 0) {
        return (
            <div className="mt-10 p-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                <FaQuoteLeft className="text-gray-300 text-4xl mx-auto mb-4 opacity-50" />
                <p className="text-gray-500 font-bold italic underline underline-offset-4 decoration-green-600/30">No reviews discovered for this signature scholarship yet.</p>
            </div>
        );
    }

    return (
        <div className='mt-10 relative px-4'>
            <Swiper
                spaceBetween={30}
                centeredSlides={false}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 1.5 },
                    1024: { slidesPerView: 2 },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="reviewSwiper !pb-14"
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className='h-full border border-gray-100 p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group border-l-4 border-l-green-600'>
                            <div className="relative">
                                <FaQuoteLeft className="absolute -top-4 -left-4 text-green-600/10 text-6xl group-hover:text-green-600/20 transition-colors" />
                                <div className="relative z-10">
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        isHalf={true}
                                        value={review?.ratings}
                                        edit={false}
                                        activeColor="#16a34a"
                                    />
                                    <p className='mt-4 text-gray-700 font-medium italic leading-relaxed'>
                                        &quot;{review?.review}&quot;
                                    </p>
                                </div>
                            </div>

                            <div className='flex items-center gap-4 mt-8 pt-6 border-t border-gray-50'>
                                <img
                                    className='w-14 h-14 rounded-xl object-cover ring-2 ring-green-600/20'
                                    src={review?.image || "https://i.ibb.co/5GzXkwq/user.png"}
                                    alt={review?.name}
                                />
                                <div className="flex-1">
                                    <h2 className="font-black text-black text-sm uppercase tracking-wider">{review.name}</h2>
                                    <p className='flex items-center gap-2 text-xs text-gray-400 font-bold mt-1'>
                                        <FaRegCalendarAlt className="text-green-600" />
                                        {review?.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style>{`
                .reviewSwiper .swiper-button-next, .reviewSwiper .swiper-button-prev { color: #16a34a !important; transform: scale(0.6); }
                .reviewSwiper .swiper-pagination-bullet-active { background: #16a34a !important; }
            `}</style>
        </div>
    );
};

export default Review;