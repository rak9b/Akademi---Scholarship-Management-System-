import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import scholarshipsBanner from '../../assets/pricing-breadcrumb-1.jpg';
import { SlCalender } from 'react-icons/sl';
import { MdOutlineAccessTime } from 'react-icons/md';
import { IoLocationOutline, IoSchoolOutline } from 'react-icons/io5';
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
            return toast.error('Select your gender');
        }

        setTempFormData(formData);
        document.getElementById('my_modal_7').checked = false;
        document.getElementById('my_modal_6').checked = true;
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
                            toast.success('Your application was submitted with signature precision.');
                            document.getElementById('my_modal_6').checked = false;
                            setPaymentSuccess(false);
                            setTempFormData(null);
                        }
                    })
                    .catch(err => toast.error('Application delivery failed.'));
            })
            .catch(err => toast.error('Image upload failed.'));
    };

    useEffect(() => {
        if (paymentSuccess && tempFormData) {
            handleFinalSubmission();
        }
    }, [paymentSuccess]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;
    if (error || !scholarshipData) return <div className="min-h-screen flex items-center justify-center bg-white"><p className="text-red-500 font-bold">Failed to load scholarship details.</p></div>;

    return (
        <section>
            <OtherPageBanner image={scholarshipsBanner} heading={'Your Scholarship at a Glance'} />
            <section className='bg-[#f2f8f1] py-20'>
                <div className="bg-white max-w-max mx-auto border-2 shadow-xl rounded-lg overflow-hidden  p-10 px-16 gap-10 flex">
                    <div className=" text-center flex flex-col max-w-36  items-center">
                        <img
                            className=" w-32  h-32 rounded-xl object-cover"
                            src={scholarshipData.universityImage}
                            alt="Scholarship Card"
                        /> <h2 className="font-bold text-xl text-[#0c281b] mb-6">{scholarshipData.universityName}</h2>
                    </div>

                    <div className=''>
                        <div className='space-y-2'>
                            <h2 className="font-bold text-3xl text-[#0c281b]">{scholarshipData.scholarshipName}</h2>
                            <p className='flex text-sm items-center gap-2'><SlCalender />{scholarshipData.scholarshipPostDate}</p>

                            <div className='flex justify-between flex-col md:flex-row'>
                                <div className='space-y-1'>
                                    <h2 className='text-xl pb-2 pt-3 font-bold'>About the University</h2>
                                    <p className='flex items-center gap-2'><PiRanking />{scholarshipData.universityWorldRank}</p>
                                    <p className='flex items-center gap-2'><IoLocationOutline /> {scholarshipData.universityCity + ', ' + scholarshipData.universityCountry}</p>
                                    <p className='flex items-center gap-2'><MdOutlineAccessTime /> {scholarshipData.applicationDeadline}</p>
                                    <p className='flex items-center gap-2'><BsCashCoin />{scholarshipData.tuitionFees}<small className='-mt-2 -ml-1'>{'*Tuition fee'}</small></p>
                                </div>
                                <div className='space-y-1'>
                                    <h2 className='text-xl pb-2 pt-3 font-bold'>About the Scholarship</h2>
                                    <p className='flex items-center gap-2'><GiNotebook />{scholarshipData.subjectCategory}</p>
                                    <p className='flex items-center gap-2'><PiCertificate />{scholarshipData.degree}</p>
                                    <p className='flex items-center gap-2'>
                                        <IoSchoolOutline />{scholarshipData.scholarshipCategory}</p>
                                    <p className='flex items-center gap-2'><AiOutlineDollar />{scholarshipData.applicationFees + " + " + scholarshipData.serviceCharge}<small className='-mt-2 -ml-1'>*service charge</small></p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <label htmlFor="my_modal_7" className="btn mt-4  transition duration-300 hover:bg-[#7CFF77] hover:text-[#14452F] bg-[#185137] text-white ml-1">Apply Now</label>
                        </div>
                    </div>
                </div>

                <div className='max-w-screen-lg mx-auto pt-16'>
                    <div>
                        <div className='flex gap-3 p-2 border-2 border-black max-w-max rounded-full'>
                            <button onClick={() => setToggle(true)} className={`transition duration-300 px-3 py-2 rounded-full ${toggle && 'bg-[#185137] text-white'}`}>Description</button>
                            <button onClick={() => setToggle(false)} className={`transition duration-300 px-3 py-2 rounded-full ${toggle || 'bg-[#185137] text-white'}`}>Reviews</button>
                        </div>
                    </div>
                    {toggle ? <Description description={scholarshipData.description} /> : <Review scholarshipData={scholarshipData} />}
                </div>
            </section>
            <input required type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h2 className='text-xl font-semibold mb-5'>Amount needs to pay: {parseInt(scholarshipData.serviceCharge) + parseInt(scholarshipData.applicationFees)}</h2>
                    <Elements stripe={stripePromise}>
                        <PaymentForm setPaymentSuccess={setPaymentSuccess} price={parseInt(scholarshipData.serviceCharge) + parseInt(scholarshipData.applicationFees)} />
                    </Elements>
                </div>
            </div>
            <input required type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <form onSubmit={handleFormSubmit} className='modal-box rounded-xl max-w-2xl bg-white space-y-2'>
                    <div><h2 className='text-center text-3xl font-bold mb-7'>Please fill out this form</h2></div>
                    <h4 className='text-sm'>Required fields are marked as  <span className='text-red-600'>*</span></h4>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Phone number  <span className='text-red-600'>*</span></span>
                            </div>
                            <input required name='phoneNumber' type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Your photo <span className='text-red-600'>*</span></span>
                            </div>
                            <input required name='image' type="file" placeholder="Type here" className="input input-bordered w-full max-w-xs p-2" />
                        </label>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender <span className='text-red-600'>*</span></span>
                            </div>
                            <select defaultValue={'none'} name="gender" className="input input-bordered w-full max-w-xs" id="">
                                <option disabled value="none">Select One</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Address <span className='text-red-600'>*</span></span>
                            </div>
                            <input required name='address' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex gap-5 justify-center">

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">HSC result <span className='text-red-600'>*</span></span>
                            </div>
                            <input name='hscResult' min={1} max={5} step={0.01} required type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">SSC result <span className='text-red-600'>*</span></span>
                            </div>
                            <input name='sscResult' min={1} max={5} step={0.01} required type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Applying Degree <span className='text-red-600'>*</span></span>
                            </div>
                            <select defaultValue={scholarshipData.degree} className="input input-bordered w-full max-w-xs" name="degree" id="">
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                            </select>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Study gap</span>
                            </div>
                            <select defaultValue={'none'} className="input input-bordered w-full max-w-xs" name="studyGap" id="">
                                <option disabled value="none">Select your study gap</option>
                                <option value="6month">6 Month</option>
                                <option value="oneYear">1 Year</option>
                                <option value="twoYear">2 Year</option>
                                <option value="threeYear">3 Year</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <label data-tip='Read Only' className="tooltip tooltip-error hover:tooltip-open form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">University name <span className='text-red-600'>*</span></span>
                            </div>
                            <input required value={scholarshipData.universityName} name='universityName' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label data-tip='Read Only' className="tooltip tooltip-error hover:tooltip-open form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Scholarship category <span className='text-red-600'>*</span></span>
                            </div>
                            <input required value={scholarshipData.scholarshipCategory} name='scholarshipCategory' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className=" flex gap-5 justify-center">
                        <label data-tip='Read Only' className="tooltip tooltip-error hover:tooltip-open form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Subject Category <span className='text-red-600'>*</span></span>
                            </div>
                            <input required value={scholarshipData.subjectCategory} name='subjectCategory' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label data-tip='Read Only' className="tooltip tooltip-error hover:tooltip-open form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">University address <span className='text-red-600'>*</span></span>
                            </div>
                            <input required name='universityAddress' value={scholarshipData.universityCity + ", " + scholarshipData.universityCountry} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex justify-center items-center gap-5 !mt-7">
                        <button className='btn transition duration-300 hover:bg-[#7CFF77] hover:text-[#14452F] bg-[#185137] text-white px-7'>Submit</button>
                        <label className='btn transition duration-300 hover:bg-[#b12c2c] hover:text-[#ffffff] bg-[#ff2525] text-white px-7' htmlFor="my_modal_7">close</label>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ScholarshipsDetails;