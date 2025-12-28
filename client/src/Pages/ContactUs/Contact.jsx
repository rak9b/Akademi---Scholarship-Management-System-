import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUniversity, FaArrowRight } from 'react-icons/fa';
import customerImg from '../../assets/Customer.webp';
import MyMap from './Map';
import bgImg from '../../assets/Pattern-Bg.png';

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFC]">
            <ContactHero />
            <ContactBody />
            <div className="pt-24 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                        <MyMap />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactHero = () => (
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
                    Global Support Desk
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                    Connect With <span className="text-[#16a34a]">Discovery</span>
                </h1>
                <p className="max-w-2xl text-gray-400 font-bold text-sm md:text-base uppercase tracking-widest leading-relaxed">
                    Personalized assistance for your scholarship application journey.
                    Available 24/7 across all time zones.
                </p>
            </motion.div>
        </div>
    </section>
);

const ContactBody = () => (
    <section className="py-24 px-4 bg-white relative -mt-10 z-20">
        <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12">
                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-8 bg-white border border-gray-100 p-10 md:p-16 rounded-[48px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]"
                >
                    <div className="mb-12">
                        <span className="text-[#16a34a] font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Direct Query</span>
                        <h2 className="text-4xl font-black text-black uppercase tracking-tighter mb-4">Submit Your <span className="text-[#16a34a]">Request</span></h2>
                    </div>

                    <form className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                                <input type="text" placeholder="John" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-[#16a34a]/10 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                                <input type="text" placeholder="Doe" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-[#16a34a]/10 transition-all" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Professional Email</label>
                                <input type="email" placeholder="john.doe@academy.edu" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-[#16a34a]/10 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-[#16a34a]/10 transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Inquiry Category</label>
                            <select className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-[#16a34a]/10 transition-all appearance-none cursor-pointer">
                                <option>General Inquiry</option>
                                <option>Scholarship Application Assistance</option>
                                <option>University Partnership</option>
                                <option>Technical Support</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message Detail</label>
                            <textarea rows="5" placeholder="Describe your inquiry in detail..." className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-[#16a34a]/10 transition-all resize-none"></textarea>
                        </div>

                        <button className="w-full py-5 bg-black text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-[#16a34a] transition-all shadow-xl flex items-center justify-center gap-3 group">
                            Transmit Inquiry <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </form>
                </motion.div>

                {/* Info Side */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-4"
                >
                    <div className="bg-black text-white p-12 rounded-[48px] h-full flex flex-col justify-between border-8 border-[#16a34a]/10 relative overflow-hidden shadow-2xl">
                        <div
                            style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '200px', opacity: 0.1 }}
                            className="absolute inset-0 z-0"
                        />

                        <div className="relative z-10">
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Institutional <span className="text-[#16a34a]">Registry</span></h2>

                            <div className="space-y-10">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-[#16a34a]/20 border border-[#16a34a]/30 rounded-2xl flex items-center justify-center shrink-0">
                                        <FaPhone className="text-[#16a34a]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest mb-1">Direct Line</p>
                                        <p className="text-sm font-bold uppercase tracking-tight">+1.800.AKADEMI</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-[#16a34a]/20 border border-[#16a34a]/30 rounded-2xl flex items-center justify-center shrink-0">
                                        <FaEnvelope className="text-[#16a34a]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest mb-1">Electronic Correspondence</p>
                                        <p className="text-sm font-bold uppercase tracking-tight">registrars@akademi.com</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-[#16a34a]/20 border border-[#16a34a]/30 rounded-2xl flex items-center justify-center shrink-0">
                                        <FaMapMarkerAlt className="text-[#16a34a]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest mb-1">Physical Index</p>
                                        <p className="text-sm font-bold uppercase tracking-tight leading-relaxed">
                                            Academic Quarter 4<br />
                                            Metropolis Innovation District<br />
                                            United States
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-16 group cursor-pointer">
                            <div className="absolute inset-0 bg-[#16a34a] rounded-3xl blur-2xl opacity-20" />
                            <img src={customerImg} alt="Support Specialist" className="relative z-10 rounded-3xl grayscale hover:grayscale-0 transition-all duration-700 border-2 border-white/10" />
                            <div className="mt-6 flex items-center gap-4">
                                <div className="w-3 h-3 bg-[#16a34a] rounded-full animate-pulse" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registrars Online Now</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default ContactUs;