import { useContext, useState } from "react";
import { AuthContext } from "../../Context/MockAuthProvider";
import { toast } from "react-toastify";
import googleImg from '../../assets/googleLogo.png';
import { Link, useNavigate } from "react-router-dom";
import useCreateUser from "../../Hooks/useCreateUser";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const Login = () => {
    const { login, setUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const { createUser } = useCreateUser();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (data) => {
        setIsLoggingIn(true);
        login(data.email, data.password)
            .then(res => {
                setUser(res.user);
                createUser(res.user);
                toast.success('Sign in successful');
                navigate('/');
            })
            .catch(err => {
                console.error(err);
                toast.error(err.message || 'Invalid credentials');
            })
            .finally(() => setIsLoggingIn(false));
    };

    const handleGoogleSignin = () => {
        setIsLoggingIn(true);
        signInWithGoogle()
            .then((userCredential) => {
                toast.success('Welcome back!');
                setUser(userCredential.user);
                createUser(userCredential.user);
                navigate('/');
            })
            .catch(err => {
                console.error(err);
                toast.error('Google Sign-in failed. Please try again');
            })
            .finally(() => setIsLoggingIn(false));
    };

    const handleQuickLogin = (email, password, roleLabel) => {
        setIsLoggingIn(true);
        login(email, password)
            .then(res => {
                setUser(res.user);
                createUser(res.user);
                toast.success(`Logged in as ${roleLabel}`);
                navigate('/');
            })
            .catch(err => {
                console.error(err);
                toast.error(`${roleLabel} login failed. Check credentials.`);
            })
            .finally(() => setIsLoggingIn(false));
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
        <div className="min-h-screen flex items-center justify-center bg-[#ffffff] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 relative z-10"
            >
                <div className="text-center">
                    <motion.h2 variants={itemVariants} className="text-5xl font-black text-black tracking-tight mb-2">
                        Welcome Back
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-gray-500 font-medium">
                        Enter your credentials to access the portal
                    </motion.p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2">
                                <FaEnvelope className="text-green-600 text-xs" />
                                Email Address
                            </label>
                            <div className="relative group">
                                <input
                                    {...register("email")}
                                    type="email"
                                    className={`appearance-none block w-full px-4 py-4 border ${errors.email ? 'border-red-500' : 'border-gray-200'} placeholder-gray-400 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 group-hover:bg-white`}
                                    placeholder="admin@mail.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.email.message}</p>}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2">
                                <FaLock className="text-green-600 text-xs" />
                                Password
                            </label>
                            <div className="relative group">
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    className={`appearance-none block w-full px-4 py-4 border ${errors.password ? 'border-red-500' : 'border-gray-200'} placeholder-gray-400 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 group-hover:bg-white`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.password.message}</p>}
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                        <button
                            disabled={isLoggingIn}
                            type="submit"
                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-black rounded-xl text-white bg-black hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoggingIn ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </motion.div>
                </form>

                <div className="space-y-6">
                    <motion.div variants={itemVariants} className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400 font-bold uppercase tracking-widest text-[10px]">Or Security Access</span>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <button
                            type="button"
                            disabled={isLoggingIn}
                            onClick={handleGoogleSignin}
                            className="w-full flex items-center justify-center gap-3 px-4 py-4 border-2 border-gray-100 rounded-xl text-black font-bold hover:bg-gray-50 hover:border-green-600/30 transition-all duration-300"
                        >
                            <img className="h-5 w-5" src={googleImg} alt="Google" />
                            Sign in with Google Account
                        </button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-4 border-t border-gray-100">
                        <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Elite Entry Points</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleQuickLogin('admin@mail.com', 'Admin123', 'Admin')}
                                className="flex items-center justify-center py-3 px-4 rounded-xl text-[10px] font-black text-white bg-black hover:bg-green-600 transition-all duration-300 shadow-lg shadow-black/5"
                            >
                                ADMIN PORTAL
                            </button>
                            <button
                                onClick={() => handleQuickLogin('moderator@mail.com', 'Moderator123', 'Moderator')}
                                className="flex items-center justify-center py-3 px-4 rounded-xl text-[10px] font-black text-black bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-100"
                            >
                                STAFF ACCESS
                            </button>
                        </div>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-center text-sm font-bold">
                        <span className="text-gray-500">New candidate?</span>{" "}
                        <Link to="/register" className="text-green-600 hover:text-green-700 underline underline-offset-4 decoration-2">
                            Open Account
                        </Link>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;