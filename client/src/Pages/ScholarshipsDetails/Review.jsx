import React, { useContext } from 'react';
import { FaRegCalendarAlt, FaQuoteRight, FaUniversity } from 'react-icons/fa';
import ReactStars from "react-rating-stars-component";
import { AuthContext } from '../../Context/MockAuthProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import bgImg from '../../assets/Pattern-Bg.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Review = ({ scholarshipData }) => {
    const { } = useContext(AuthContext);
    const reviews = scholarshipData.reviews || [];

    if (reviews.length === 0) {
        return (
            <div className="mt-16 p-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100 text-center relative overflow-hidden">
                <div
                    style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '300px', opacity: 0.05 }}
                    className="absolute inset-0 z-0"
                />
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-8 border border-gray-100">
                        <FaQuoteRight className="text-gray-200 text-3xl" />
                    </div>
                    <h3 className="text-xl font-black text-black uppercase tracking-tight mb-2">No Verified Testimonials</h3>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">Be the first to provide a peer-review for this elite opportunity.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='mt-16 relative px-4'>
            <div className="flex flex-col items-center mb-16">
                <div className="inline-flex items-center px-4 py-2 border border-[#16a34a]/30 bg-[#16a34a]/10 rounded-full text-[#16a34a] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    <FaUniversity className="mr-2" />
                    Student Registry & Testimonials
                </div>
                <h2 className="text-4xl font-black text-black uppercase tracking-tighter text-center">
                    Peer <span className="text-[#16a34a]">Insights</span>
                </h2>
            </div>

            <Swiper
                spaceBetween={40}
                centeredSlides={false}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    1024: { slidesPerView: 2 },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="reviewSwiper !pb-24"
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className='h-full relative bg-white border border-gray-50 p-10 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)] hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.08)] transition-all duration-500 group flex flex-col'>
                            {/* Academic Pattern Overlay */}
                            <div
                                style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '200px', opacity: 0.02 }}
                                className="absolute inset-0 z-0 rounded-[40px] pointer-events-none"
                            />

                            <div className="relative z-10 mb-10">
                                <FaQuoteRight className="text-gray-50 text-8xl absolute -top-4 -right-4 pointer-events-none group-hover:text-[#16a34a]/5 transition-colors" />

                                <div className="flex items-center gap-1 mb-6">
                                    <ReactStars
                                        count={5}
                                        size={18}
                                        isHalf={true}
                                        value={review?.ratings}
                                        edit={false}
                                        activeColor="#16a34a"
                                    />
                                    <span className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest ml-2 px-2 py-0.5 bg-[#16a34a]/10 rounded-full border border-[#16a34a]/20">
                                        Verified Scholar
                                    </span>
                                </div>

                                <p className='text-gray-500 font-bold text-base md:text-lg uppercase tracking-tight leading-relaxed line-clamp-4 italic group-hover:text-black transition-colors'>
                                    &quot;{review?.review}&quot;
                                </p>
                            </div>

                            <div className='mt-auto pt-8 border-t border-gray-50 flex items-center gap-5 relative z-10'>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#16a34a] rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                                    <img
                                        className='w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-white relative z-10'
                                        src={review?.image || "https://i.ibb.co/5GzXkwq/user.png"}
                                        alt={review?.name}
                                    />
                                </div>
                                <div>
                                    <h2 className="font-black text-black text-sm uppercase tracking-[0.1em]">{review.name}</h2>
                                    <div className='flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1.5'>
                                        <FaRegCalendarAlt className="text-[#16a34a]" />
                                        Indexed: {review?.date}
                                    </div>
                                </div>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#16a34a]/5 to-transparent rounded-br-[40px] pointer-events-none" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style>{`
                .reviewSwiper .swiper-button-next, .reviewSwiper .swiper-button-prev { 
                    color: black !important; 
                    transform: scale(0.4); 
                    background: white; 
                    width: 80px; 
                    height: 80px; 
                    border-radius: 30px; 
                    border: 1px solid #f3f4f6; 
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    transition: all 0.3s;
                }
                .reviewSwiper .swiper-button-next:hover, .reviewSwiper .swiper-button-prev:hover {
                    color: #16a34a !important;
                    background: black;
                }
                .reviewSwiper .swiper-pagination-bullet { background: #d1d5db !important; opacity: 1; }
                .reviewSwiper .swiper-pagination-bullet-active { background: #16a34a !important; width: 30px; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default Review;