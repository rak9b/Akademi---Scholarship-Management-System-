import React from 'react';
import bgImg from '../assets/Pattern-Bg.png';

const OtherPageBanner = ({ image, heading }) => {
    return (
        <div
            style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            className="min-h-[400px] w-full relative flex items-center justify-center overflow-hidden"
        >
            {/* Deep Emerald Overlay with Pattern */}
            <div className='absolute inset-0 bg-[#0c281b] bg-opacity-80 backdrop-blur-sm' />
            <div
                style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '400px', opacity: 0.05 }}
                className="absolute inset-0 z-0"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <div className="inline-flex items-center px-4 py-2 border border-white/20 bg-white/5 rounded-full text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                    Institutional Record
                </div>
                <h1 className='text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none max-w-4xl mx-auto drop-shadow-2xl'>
                    {heading}
                </h1>
            </div>

            {/* Bottom Edge Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFDFC] to-transparent z-10" />
        </div>
    );
};

export default OtherPageBanner;