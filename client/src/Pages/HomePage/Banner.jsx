import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-950" />
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold-600/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            </div>

            <div className="relative z-10 max-w-screen-xl mx-auto px-8 md:px-16 w-full">
                <div className="flex flex-col items-center text-center">

                    {/* Sequence 1: Decorative Element */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, ease: [0.2, 1, 0.3, 1] }}
                        className="w-24 h-[1px] bg-accent mb-12"
                    />

                    {/* Sequence 2: Eyebrow */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="text-accent text-[12px] font-bold tracking-[0.5em] uppercase mb-6"
                    >
                        Foundation for Excellence
                    </motion.span>

                    {/* Sequence 3: Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1.2, ease: [0.2, 1, 0.3, 1] }}
                        className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-12 max-w-5xl"
                    >
                        Shape Your <br />
                        <span className="text-gold italic">Academic Destiny</span>
                    </motion.h1>

                    {/* Sequence 4: Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.5 }}
                        className="text-foreground/60 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-16"
                    >
                        Access a curated ecosystem of global opportunities designed for the next
                        generation of thinkers, leaders, and visionaries.
                    </motion.p>

                    {/* Sequence 5: Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex flex-col sm:flex-row items-center gap-12"
                    >
                        <button
                            onClick={() => navigate('/all-scholarships')}
                            className="high-contrast-btn group flex items-center gap-4"
                        >
                            Explore Grants
                            <span className="w-8 h-[1px] bg-emerald-950 group-hover:w-12 transition-all duration-500" />
                        </button>

                        <div className="w-[1px] h-12 bg-white/10 hidden sm:block" />

                        <div className="flex flex-col items-start gap-1">
                            <span className="text-[10px] text-accent/60 tracking-widest uppercase font-bold">Applications Open</span>
                            <span className="text-white font-serif text-xl">Winter 2025 Cohort</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Etched Border */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
};

export default Banner;