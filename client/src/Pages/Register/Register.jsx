import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/MockAuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import googleImg from '../../assets/googleLogo.png';
import useCreateUser from "../../Hooks/useCreateUser";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Password must contain uppercase, lowercase and a number"),
    image: z.any().refine((files) => files?.length > 0, "Profile image is required")
});

const Register = () => {
    const { setUser, user, register: authRegister, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const { createUser } = useCreateUser();
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema)
    });

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const onSubmit = (data) => {
        setIsRegistering(true);
        const imageFile = new FormData();
        imageFile.append('image', data.image[0]);

        fetch('https://api.imgbb.com/1/upload?key=48b282cb34af9841dcce86814f69cd23', {
            method: 'POST',
            body: imageFile,
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    authRegister(data.email, data.password)
                        .then(resData => {
                            const updatedUser = { ...resData.user, displayName: data.name, photoURL: res.data.url };
                            setUser(updatedUser);
                            createUser(updatedUser);
                            toast.success('Account created successfully');
                            navigate('/');
                        })
                        .catch(err => {
                            toast.error(err.message || 'Registration failed');
                        })
                        .finally(() => setIsRegistering(false));
                } else {
                    toast.error('Image upload failed');
                    setIsRegistering(false);
                }
            })
            .catch(err => {
                toast.error('Unexpected error happened. Please try again!');
                setIsRegistering(false);
            });
    };

    const handleGoogleSignin = () => {
        setIsRegistering(true);
        signInWithGoogle()
            .then((userCredential) => {
                toast.success('Welcome to Akademi!');
                setUser(userCredential.user);
                createUser(userCredential.user);
                navigate('/');
            })
            .catch(err => toast.error('Registration failed. Please try again'))
            .finally(() => setIsRegistering(false));
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-green-600/5 rounded-full blur-3xl -ml-32 -mt-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/5 rounded-full blur-3xl -mr-32 -mb-32"></div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 relative z-10"
            >
                <div className="text-center">
                    <motion.h2 variants={itemVariants} className="text-5xl font-black text-black tracking-tight mb-2">
                        Create Account
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-gray-500 font-medium">
                        Join the elite scholarship management network
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <motion.div variants={itemVariants} className="md:col-span-1">
                            <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2">
                                <FaUser className="text-green-600 text-xs" />
                                Full Name
                            </label>
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="Signature Name"
                                className={`appearance-none block w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-50 hover:bg-white`}
                            />
                            {errors.name && <p className="mt-1 text-xs font-bold text-red-500">{errors.name.message}</p>}
                        </motion.div>

                        <motion.div variants={itemVariants} className="md:col-span-1">
                            <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2">
                                <FaEnvelope className="text-green-600 text-xs" />
                                Email
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="elite@akademi.com"
                                className={`appearance-none block w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-50 hover:bg-white`}
                            />
                            {errors.email && <p className="mt-1 text-xs font-bold text-red-500">{errors.email.message}</p>}
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2">
                            <FaLock className="text-green-600 text-xs" />
                            Secure Password
                        </label>
                        <div className="relative">
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={`appearance-none block w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-200'} text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-50 hover:bg-white`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-xs font-bold text-red-500">{errors.password.message}</p>}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2">
                            <FaImage className="text-green-600 text-xs" />
                            Profile Photo
                        </label>
                        <input
                            {...register("image")}
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-black file:text-white hover:file:bg-green-600 file:transition-all cursor-pointer bg-gray-50 p-2 rounded-xl border border-gray-100"
                        />
                        {errors.image && <p className="mt-1 text-xs font-bold text-red-500">{errors.image.message}</p>}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-center justify-between py-2">
                        <p className="text-xs font-bold text-gray-500">
                            Already a member? <Link className="text-black hover:text-green-600 underline" to="/login">Sign In</Link>
                        </p>
                        <div onClick={handleGoogleSignin} className="flex items-center gap-2 cursor-pointer group">
                            <img className="w-5 grayscale group-hover:grayscale-0 transition-all" src={googleImg} alt="Google" />
                            <span className="text-[10px] font-black uppercase tracking-wider group-hover:text-green-600 transition-colors">Quick Join</span>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <button
                            disabled={isRegistering}
                            className="w-full py-4 bg-black text-white font-black text-lg rounded-xl hover:bg-green-600 transition-all duration-300 shadow-xl disabled:opacity-70 flex items-center justify-center gap-3"
                        >
                            {isRegistering ? <span className="loading loading-spinner loading-md"></span> : "Register Now"}
                        </button>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest mt-4">
                        By joining you agree to the signature terms of service
                    </motion.p>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;