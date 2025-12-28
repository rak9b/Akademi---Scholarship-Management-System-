import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaGraduationCap, FaAward, FaArrowRight, FaUniversity, FaMicroscope, FaLaptopCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import bgImg from '../../assets/Pattern-Bg.png';
import image1 from '../../assets/AdobeStock_545875468@2x-1.webp';
import image2 from '../../assets/AdobeStock_587433154-1.webp';

const Banner = () => {
    const slides = [
        {
            title: "Global Engineering",
            subtitle: "Scholarships",
            highlight: "Engineering",
            description: "Unlock your potential with elite engineering programs worldwide. Full and partial funding for future innovators.",
            icon: FaLaptopCode,
            bg: "from-[#0b3824] via-[#0f4a2a] to-[#134d2f]",
            image: image1
        },
        {
            title: "Medical & Health",
            subtitle: "Research Grants",
            highlight: "Medical",
            description: "Dedicated support for aspiring medical professionals and researchers. Build your clinical career without debt.",
            icon: FaMicroscope,
            bg: "from-[#171717] via-[#262626] to-[#0a0a0a]",
            image: image2
        },
        {
            title: "World Class",
            subtitle: "Management Awards",
            highlight: "Management",
            description: "Join the next generation of global leaders. Exclusive scholarships for MBA and specialized management degrees.",
            icon: FaUniversity,
            bg: "from-[#052e16] via-[#064e3b] to-[#14532d]",
            image: image1
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className='relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden'>
            <Swiper
                spaceBetween={0}
                effect={'fade'}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className={`h-full bg-gradient-to-br ${slide.bg} relative flex items-center`}>
                            {/* Background Pattern */}
                            <div
                                style={{
                                    backgroundImage: `url(${bgImg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                                className="absolute opacity-5 inset-0"
                            />

                            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-20'>
                                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                                    {/* Content */}
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={containerVariants}
                                        className='text-center lg:text-left'
                                    >
                                        <motion.div variants={itemVariants}>
                                            <span className='inline-flex items-center px-4 py-2 rounded-full text-xs font-black bg-green-500 text-white mb-6 uppercase tracking-widest'>
                                                <slide.icon className="mr-2" />
                                                Elite {slide.highlight} Portal
                                            </span>
                                        </motion.div>

                                        <motion.h1
                                            variants={itemVariants}
                                            className='text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-none'
                                        >
                                            {slide.title}
                                            <span className='block text-green-500'>
                                                {slide.subtitle}
                                            </span>
                                        </motion.h1>

                                        <motion.p
                                            variants={itemVariants}
                                            className='text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium'
                                        >
                                            {slide.description}
                                        </motion.p>

                                        <motion.div
                                            variants={itemVariants}
                                            className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'
                                        >
                                            <Link
                                                to="/all-scholarships"
                                                className='group inline-flex items-center px-8 py-4 bg-green-600 text-white font-black rounded-xl hover:bg-white hover:text-black transition-all duration-300 shadow-xl'
                                            >
                                                EXPLORE CATEGORY
                                                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </motion.div>
                                    </motion.div>

                                    {/* Image */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className='hidden lg:block relative'
                                    >
                                        <div className="absolute inset-0 bg-green-500 rounded-3xl blur-3xl opacity-10"></div>
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className='relative z-10 w-full rounded-3xl shadow-2xl border-2 border-white/10 grayscale hover:grayscale-0 transition-all duration-700'
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Bottom Wave Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                </svg>
            </div>

            <style>{`
                .swiper-button-next, .swiper-button-prev { color: #16a34a !important; }
                .swiper-pagination-bullet-active { background: #16a34a !important; }
            `}</style>
        </div>
    );
};

export default Banner;