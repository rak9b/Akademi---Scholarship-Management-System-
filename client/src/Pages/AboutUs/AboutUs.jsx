import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaAward, FaHandshake, FaUniversity } from 'react-icons/fa';
import bgImg from '../../assets/Pattern-Bg.png';

const AboutUs = () => {
    const stats = [
        { icon: FaGraduationCap, number: '10,000+', label: 'Students Helped' },
        { icon: FaAward, number: '500+', label: 'Scholarships Available' },
        { icon: FaUsers, number: '50+', label: 'Partner Universities' },
        { icon: FaHandshake, number: '$50M+', label: 'Scholarships Awarded' }
    ];

    const team = [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Founder & CEO',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
            bio: 'Former university dean with 20+ years in education'
        },
        {
            name: 'Michael Chen',
            role: 'CTO',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
            bio: 'Tech innovator passionate about educational accessibility'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Head of Partnerships',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
            bio: 'Building bridges between students and opportunities'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFC]">
            {/* Neo-Classical Hero Section */}
            <section className="relative bg-[#0c281b] pt-32 pb-24 overflow-hidden border-b-8 border-[#16a34a]/20">
                <div
                    style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '400px', opacity: 0.03 }}
                    className="absolute inset-0 z-0"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="inline-flex items-center px-4 py-2 border border-[#16a34a]/30 bg-[#16a34a]/10 rounded-full text-[#16a34a] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                            <FaUniversity className="mr-2" />
                            Academic Heritage & Vision
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                            Our <span className="text-[#16a34a]">Legacy</span>
                        </h1>
                        <p className="max-w-2xl text-gray-400 font-bold text-sm md:text-base uppercase tracking-widest leading-relaxed">
                            Democratizing elite education through precision-curated scholarship access.
                            Building a bridge between talent and world-class institutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[#16a34a] font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">The Mission</span>
                            <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-8 leading-tight">
                                Empowering Global <span className="text-[#16a34a]">Ambition</span>
                            </h2>
                            <p className="text-lg text-gray-500 font-medium mb-8 leading-relaxed">
                                At Akademi, we believe that financial barriers should never prevent talented
                                individuals from pursuing their educational dreams. Our platform serves as a
                                bridge between ambitious students and generous scholarship providers.
                            </p>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-start gap-4 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shrink-0">
                                        <FaAward className="text-[#16a34a]" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xs uppercase tracking-widest mb-1">Precision Curation</h4>
                                        <p className="text-sm text-gray-400 font-bold uppercase tracking-tight">Only the most elite and verified opportunities make it to our registry.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-6 bg-[#16a34a]/5 border border-[#16a34a]/10 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 bg-[#16a34a] rounded-2xl flex items-center justify-center shrink-0">
                                        <FaUsers className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xs uppercase tracking-widest mb-1">Unified Network</h4>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-tight">Connecting 500+ global universities with 10k+ deserving students.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-[#16a34a] rounded-[48px] blur-3xl opacity-10 translate-x-10 translate-y-10" />
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
                                alt="Signature Academic Excellence"
                                className="rounded-[40px] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Impact Section - Glassmorphic Stats */}
            <section className="py-24 px-4 bg-black relative overflow-hidden">
                <div
                    style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '400px', opacity: 0.05 }}
                    className="absolute inset-0 z-0"
                />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[#16a34a] font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Our Impact</span>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Global Influence & <span className="text-[#16a34a]">Metrics</span></h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[32px] text-center group hover:bg-[#16a34a]/10 transition-all"
                            >
                                <stat.icon className="text-3xl mx-auto mb-6 text-[#16a34a] group-hover:scale-110 transition-transform" />
                                <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">{stat.number}</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[#16a34a] font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">The Council</span>
                        <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Leadership & <span className="text-[#16a34a]">Domain Experts</span></h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-[#16a34a]/10 rounded-[40px] rotate-2 group-hover:rotate-0 transition-transform" />
                                <div className="relative bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm hover:shadow-2xl transition-all h-full">
                                    <div className="relative w-32 h-32 mx-auto mb-8">
                                        <div className="absolute inset-0 bg-[#16a34a] rounded-full blur-xl opacity-20" />
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-4 border-white shadow-lg"
                                        />
                                    </div>
                                    <h3 className="text-xl font-black text-black text-center mb-1 uppercase tracking-tight">{member.name}</h3>
                                    <p className="text-[#16a34a] font-black text-[10px] uppercase tracking-widest text-center mb-6">{member.role}</p>
                                    <p className="text-gray-400 text-sm font-bold uppercase tracking-tight text-center leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Aesthetic Footer Buffer */}
            <div className="h-24 bg-gradient-to-t from-gray-50 to-transparent" />
        </div>
    );
};

export default AboutUs;