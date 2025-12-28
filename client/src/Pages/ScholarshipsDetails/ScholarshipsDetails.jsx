import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import scholarshipsBanner from '../../assets/pricing-breadcrumb-1.jpg';
import { SlCalender } from 'react-icons/sl';
import { MdOutlineAccessTime, MdVerified, MdOutlineEditNote } from 'react-icons/md';
import { IoLocationOutline, IoSchoolOutline, IoWalletOutline } from 'react-icons/io5';
import { AiOutlineDollar } from 'react-icons/ai';
import Description from './Description';
import Review from './Review';
import OtherPageBanner from '../../Hooks/OtherPageBanner';
import { GiNotebook } from 'react-icons/gi';
import { PiCertificate, PiRanking } from 'react-icons/pi';
import { BsCashCoin } from 'react-icons/bs';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../PaymentGateway/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import useRole from '../../Hooks/useRole';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUniversity, FaArrowRight, FaShieldAlt, FaTimes } from 'react-icons/fa';
import bgImg from '../../assets/Pattern-Bg.png';

const stripePromise = loadStripe(import.meta.env.VITE_publishableKey);

const ScholarshipsDetails = () => {
    const { id } = useParams();
    const { data: scholarshipData, isLoading, error } = useQuery({
        queryKey: ['scholarship', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/scholarship/${id}`);
            return Array.isArray(res.data) ? res.data[0] : res.data;
        }
    });

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [tempFormData, setTempFormData] = useState(null);
    const { user, userId } = useRole();
    const [toggle, setToggle] = useState(true);

    const handleFormSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);

        if (!formValues.gender) {
            return toast.error('Selection of gender identity is required.');
        }

        setTempFormData(formData);
        document.getElementById('application_modal').checked = false;
        document.getElementById('payment_modal').checked = true;
    };

    const handleFinalSubmission = () => {
        if (!tempFormData || !scholarshipData) return;

        const imageFile = new FormData();
        imageFile.append('image', tempFormData.get('image'));

        fetch('https://api.imgbb.com/1/upload?key=48b282cb34af9841dcce86814f69cd23', {
            method: 'POST',
            body: imageFile,
        }).then(res => res.json())
            .then(res => {
                const applicationData = {
                    phoneNumber: tempFormData.get('phoneNumber'),
                    address: tempFormData.get('address'),
                    gender: tempFormData.get('gender'),
                    degree: tempFormData.get('degree'),
                    sscResult: tempFormData.get('sscResult'),
                    hscResult: tempFormData.get('hscResult'),
                    studyGap: tempFormData.get('studyGap'),
                    universityName: scholarshipData.universityName,
                    scholarshipCategory: scholarshipData.scholarshipCategory,
                    subjectCategory: scholarshipData.subjectCategory,
                    applicationFees: scholarshipData.applicationFees,
                    serviceCharge: scholarshipData.serviceCharge,
                    applicationDeadline: new Date(scholarshipData.applicationDeadline).toISOString(),
                    status: 'Pending',
                    feedback: 'None',
                    image: res.data.url,
                    userName: user.displayName,
                    userEmail: user.email,
                    userId,
                    scholarshipId: scholarshipData._id,
                    appliedDate: new Date().toISOString(),
                    scholarshipName: scholarshipData.scholarshipName
                };

                fetch(`${import.meta.env.VITE_API_URL}/add-application`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(applicationData)
                }).then(res => res.json())
                    .then(res => {
                        if (res.insertedId) {
                            toast.success('Your application dossier was synchronized with precision.');
                            document.getElementById('payment_modal').checked = false;
                            setPaymentSuccess(false);
                            setTempFormData(null);
                        }
                    })
                    .catch(err => toast.error('Protocol failure during application submission.'));
            })
            .catch(err => toast.error('Image processing failed.'));
    };

    useEffect(() => {
        if (paymentSuccess && tempFormData) {
            handleFinalSubmission();
        }
    }, [paymentSuccess]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><span className="loading loading-spinner loading-lg text-[#16a34a]"></span></div>;
    if (error || !scholarshipData) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="text-center font-black uppercase text-red-500 tracking-widest">Protocol Retrieval Error</div></div>;

    const stats = [
        { label: 'Campus Location', value: `${scholarshipData.universityCity}, ${scholarshipData.universityCountry}`, icon: IoLocationOutline },
        { label: 'Academic Standing', value: `World Rank #${scholarshipData.universityWorldRank}`, icon: PiRanking },
        { label: 'Deadline Registry', value: scholarshipData.applicationDeadline, icon: MdOutlineAccessTime, critical: true },
        { label: 'Tuition Baseline', value: `$${scholarshipData.tuitionFees}`, icon: BsCashCoin },
    ];

    const scholarshipInfos = [
        { label: 'Field of Study', value: scholarshipData.subjectCategory, icon: GiNotebook },
        { label: 'Degree Track', value: scholarshipData.degree, icon: PiCertificate },
        { label: 'Award Type', value: scholarshipData.scholarshipCategory, icon: IoSchoolOutline },
        { label: 'Total Indexing Fee', value: `$${parseInt(scholarshipData.applicationFees) + parseInt(scholarshipData.serviceCharge)}`, icon: AiOutlineDollar },
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFC]">
            {/* Cinematic Hero */}
            <OtherPageBanner image={scholarshipsBanner} heading={scholarshipData.scholarshipName} />

            <section className='py-24 relative'>
                {/* Background Decor */}
                <div
                    style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '400px', opacity: 0.02 }}
                    className="absolute inset-0 z-0"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* Dossier Sidebar */}
                        <motion.aside
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-4 space-y-8"
                        >
                            <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] text-center group">
                                <div className="relative w-40 h-40 mx-auto mb-8">
                                    <div className="absolute inset-0 bg-[#16a34a] rounded-[32px] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                                    <img
                                        className="w-full h-full rounded-[32px] object-cover border-4 border-white shadow-xl relative z-10"
                                        src={scholarshipData.universityImage}
                                        alt={scholarshipData.universityName}
                                    />
                                </div>
                                <h2 className="font-black text-2xl text-black uppercase tracking-tighter mb-2 group-hover:text-[#16a34a] transition-colors">{scholarshipData.universityName}</h2>
                                <div className="inline-flex items-center px-3 py-1 bg-[#16a34a]/10 rounded-full text-[#16a34a] text-[9px] font-black uppercase tracking-widest border border-[#16a34a]/20">
                                    <MdVerified className="mr-1" />
                                    Accredited Institution
                                </div>
                            </div>

                            <div className="bg-[#0c281b] rounded-[40px] p-10 text-white relative overflow-hidden border-8 border-[#16a34a]/10 shadow-2xl">
                                <div
                                    style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '300px', opacity: 0.05 }}
                                    className="absolute inset-0 z-0"
                                />
                                <div className="relative z-10">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-[#16a34a]">Action Registry</h3>
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-10 leading-relaxed text-center">
                                        Secure your position in the upcoming academic cycle. Transmit your dossier now.
                                    </p>
                                    <label htmlFor="application_modal" className="w-full h-16 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#16a34a] hover:text-white transition-all shadow-xl cursor-pointer flex items-center justify-center gap-3">
                                        Apply for Admission <FaArrowRight />
                                    </label>
                                </div>
                            </div>
                        </motion.aside>

                        {/* Intelligence Grid */}
                        <motion.main
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-8 flex flex-col gap-8"
                        >
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-[#16a34a]">Institutional Index</h3>
                                    <div className="space-y-6">
                                        {stats.map((stat, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                                                        <stat.icon className="text-[#16a34a] text-sm" />
                                                    </div>
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</span>
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-tight ${stat.critical ? 'text-red-500' : 'text-black'}`}>{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-[#16a34a]">Award Analytics</h3>
                                    <div className="space-y-6">
                                        {scholarshipInfos.map((info, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                                                        <info.icon className="text-[#16a34a] text-sm" />
                                                    </div>
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{info.label}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-black uppercase tracking-tight">{info.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-100 rounded-[40px] p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
                                <div className='flex p-2 bg-gray-50 rounded-[32px] gap-2'>
                                    <button onClick={() => setToggle(true)} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${toggle ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:text-black'}`}>Intelligence Report</button>
                                    <button onClick={() => setToggle(false)} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${!toggle ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:text-black'}`}>Public Testimonials</button>
                                </div>
                                <div className="p-8">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={toggle ? 'desc' : 'rev'}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {toggle ? <Description description={scholarshipData.description} /> : <Review scholarshipData={scholarshipData} />}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.main>
                    </div>
                </div>
            </section>

            {/* Application Modal - Obsidian Overlay */}
            <input required type="checkbox" id="payment_modal" className="modal-toggle" />
            <div className="modal backdrop-blur-2xl" role="dialog">
                <div className="modal-box bg-white rounded-[40px] p-12 border border-gray-100 shadow-2xl relative">
                    <label htmlFor="payment_modal" className="absolute top-8 right-8 cursor-pointer text-gray-400 hover:text-black transition-all">
                        <FaTimes size={18} />
                    </label>
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-[#16a34a]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <IoWalletOutline className="text-[#16a34a] text-2xl" />
                        </div>
                        <h2 className="text-2xl font-black text-black uppercase tracking-tighter mb-2">Syncing Gateway</h2>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Authorized Transaction Required</p>
                    </div>

                    <div className="bg-[#16a34a]/5 p-6 rounded-2xl border border-[#16a34a]/10 mb-8 flex justify-between items-center">
                        <span className="text-[11px] font-black text-black uppercase tracking-widest">Protocol Indexing Fee</span>
                        <span className="text-xl font-black text-[#16a34a] tracking-tighter">
                            ${parseInt(scholarshipData.serviceCharge) + parseInt(scholarshipData.applicationFees)}
                        </span>
                    </div>

                    <Elements stripe={stripePromise}>
                        <PaymentForm setPaymentSuccess={setPaymentSuccess} price={parseInt(scholarshipData.serviceCharge) + parseInt(scholarshipData.applicationFees)} />
                    </Elements>
                </div>
            </div>

            <input required type="checkbox" id="application_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <form onSubmit={handleFormSubmit} className='modal-box bg-white rounded-[40px] max-w-4xl p-12 border border-gray-100 relative shadow-2xl space-y-8'>
                    <label htmlFor="application_modal" className="absolute top-8 right-8 cursor-pointer text-gray-400 hover:text-black transition-all">
                        <FaTimes size={18} />
                    </label>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#16a34a]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MdOutlineEditNote className="text-[#16a34a] text-3xl" />
                        </div>
                        <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-2">Registry Dossier</h2>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Academic Identity Sync — Information Terminal</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity Terminal (Phone)</label>
                            <input required name='phoneNumber' type="number" placeholder="+1..." className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold focus:ring-4 focus:ring-[#16a34a]/10 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Archive Portrait</label>
                            <input required name='image' type="file" className="w-full bg-gray-50 border-none rounded-2xl p-3 text-[10px] font-black uppercase focus:ring-4 focus:ring-[#16a34a]/10 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-[#16a34a]/20 file:text-[#16a34a]" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Personal Descriptor (Gender)</label>
                            <select defaultValue={'none'} name="gender" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold focus:ring-2 appearance-none cursor-pointer">
                                <option disabled value="none">Choose Identity</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Global Index (Address)</label>
                            <input required name='address' type="text" placeholder="123 Elite Way..." className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold focus:ring-4 focus:ring-[#16a34a]/10 transition-all" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">HSC Merit Score</label>
                            <input name='hscResult' min={1} max={5} step={0.01} required type="number" placeholder="4.00" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">SSC Merit Score</label>
                            <input name='sscResult' min={1} max={5} step={0.01} required type="number" placeholder="4.00" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Academic Level Access</label>
                            <select defaultValue={scholarshipData.degree} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold appearance-none cursor-pointer" name="degree">
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                                <option value="PhD">Doctorate</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Chronological Break (Study Gap)</label>
                            <select defaultValue={'none'} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold appearance-none cursor-pointer" name="studyGap">
                                <option value="none">No Break Detected</option>
                                <option value="6month">6 Month</option>
                                <option value="oneYear">1 Year</option>
                                <option value="twoYear">2 Year</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2 opacity-60">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Selected Institution (Read Only)</label>
                            <input readOnly value={scholarshipData.universityName} className="w-full bg-gray-100 border-none rounded-2xl p-4 text-xs font-black uppercase" />
                        </div>
                        <div className="space-y-2 opacity-60">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Award Category (Read Only)</label>
                            <input readOnly value={scholarshipData.scholarshipCategory} className="w-full bg-gray-100 border-none rounded-2xl p-4 text-xs font-black uppercase" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2 opacity-60">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Domain Index (Read Only)</label>
                            <input readOnly value={scholarshipData.subjectCategory} className="w-full bg-gray-100 border-none rounded-2xl p-4 text-xs font-black uppercase" />
                        </div>
                        <div className="space-y-2 opacity-60">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Registry Location (Read Only)</label>
                            <input readOnly value={scholarshipData.universityCity + ", " + scholarshipData.universityCountry} className="w-full bg-gray-100 border-none rounded-2xl p-4 text-xs font-black uppercase" />
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col items-center gap-6">
                        <button className='w-full h-16 bg-black text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-[#16a34a] transition-all shadow-xl flex items-center justify-center gap-3 group'>
                            Synchronize Dossier <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScholarshipsDetails;