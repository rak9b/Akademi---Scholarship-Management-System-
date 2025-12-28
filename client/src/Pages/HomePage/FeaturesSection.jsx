import { motion } from 'framer-motion';
import { FaSearch, FaShieldAlt, FaRocket, FaUsers, FaChartLine, FaBell } from 'react-icons/fa';

const FeaturesSection = () => {
    const features = [
        {
            icon: FaSearch,
            title: 'Smart Matching',
            description: 'AI-powered algorithm matches you with scholarships based on your profile, interests, and academic achievements.',
            gradient: 'from-green-500 to-green-600'
        },
        {
            icon: FaShieldAlt,
            title: 'Secure & Trusted',
            description: 'Bank-level security ensures your personal information and applications are protected with end-to-end encryption.',
            gradient: 'from-green-600 to-green-700'
        },
        {
            icon: FaRocket,
            title: 'Fast Application',
            description: 'Streamlined application process with auto-fill features and document management to save you time.',
            gradient: 'from-green-500 to-green-600'
        },
        {
            icon: FaUsers,
            title: 'Expert Support',
            description: 'Dedicated counselors and mentors provide personalized guidance throughout your scholarship journey.',
            gradient: 'from-green-600 to-green-700'
        },
        {
            icon: FaChartLine,
            title: 'Success Tracking',
            description: 'Comprehensive analytics and progress tracking to monitor your applications and success rate.',
            gradient: 'from-green-500 to-green-600'
        },
        {
            icon: FaBell,
            title: 'Smart Notifications',
            description: 'Never miss a deadline with intelligent reminders and updates about new opportunities.',
            gradient: 'from-green-600 to-green-700'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
                        <span className="text-green-600 font-semibold text-sm">Why Choose Akademi</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
                        Everything You Need to
                        <span className="block text-green-600">
                            Succeed
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Our platform provides the tools, resources, and support you need
                        to find and secure the perfect scholarship opportunities.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200"
                        >
                            {/* Background Highlight */}
                            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

                            {/* Icon */}
                            <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/20`}>
                                <feature.icon className="text-white text-2xl" />
                            </div>

                            {/* Content */}
                            <div className="relative">
                                <h3 className="text-xl font-bold text-black mb-4 group-hover:text-green-700 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mt-16"
                >
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>

                        <div className="relative">
                            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
                            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                                Join thousands of students who have already found their perfect scholarship match.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                                    Get Started Free
                                </button>
                                <button className="px-8 py-4 bg-green-500/20 text-white rounded-xl font-semibold hover:bg-green-500/30 transition-colors border border-green-400/30">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;