import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaCrown, FaRocket, FaGraduationCap } from 'react-icons/fa';
import { useState } from 'react';

const Pricing = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: 'Basic',
            icon: FaGraduationCap,
            description: 'Perfect for getting started with scholarship search',
            monthlyPrice: 0,
            annualPrice: 0,
            color: 'gray',
            gradient: 'from-gray-500 to-gray-600',
            popular: false,
            features: [
                'Access to 1,000+ scholarships',
                'Basic search filters',
                'Application tracking',
                'Email notifications',
                'Community forum access',
                'Mobile app access'
            ],
            limitations: [
                'Limited to 5 applications per month',
                'Basic support only',
                'No priority matching',
                'No essay review'
            ]
        },
        {
            name: 'Pro',
            icon: FaRocket,
            description: 'Most popular choice for serious scholarship seekers',
            monthlyPrice: 29,
            annualPrice: 290,
            color: 'blue',
            gradient: 'from-blue-500 to-indigo-600',
            popular: true,
            features: [
                'Access to 10,000+ scholarships',
                'Advanced AI matching',
                'Unlimited applications',
                'Priority notifications',
                'Essay review service',
                'Interview preparation',
                'Deadline reminders',
                'Success analytics',
                'Priority support',
                'Document templates'
            ],
            limitations: []
        },
        {
            name: 'Premium',
            icon: FaCrown,
            description: 'Complete solution with personal guidance',
            monthlyPrice: 99,
            annualPrice: 990,
            color: 'purple',
            gradient: 'from-purple-500 to-pink-600',
            popular: false,
            features: [
                'Everything in Pro',
                'Personal scholarship counselor',
                '1-on-1 strategy sessions',
                'Custom application review',
                'Interview coaching',
                'Financial aid consultation',
                'University partnerships',
                'Guaranteed matches',
                'White-glove service',
                'Success guarantee'
            ],
            limitations: []
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

    const cardVariants = {
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
        <div className="min-h-screen bg-white">
            {/* Header */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-20 pb-16 px-4"
            >
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6 border border-green-600/20">
                        <span className="text-green-700 font-semibold text-sm">Flexible Pricing</span>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Choose Your
                        <span className="block text-green-600">
                            Success Plan
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Start free and upgrade as you grow. All plans include our core features
                        with additional benefits for serious scholarship seekers.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <span className={`font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? 'bg-green-600' : 'bg-gray-300'
                                }`}
                        >
                            <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${isAnnual ? 'translate-x-8' : 'translate-x-1'
                                }`} />
                        </button>
                        <span className={`font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                            Annual
                        </span>
                        {isAnnual && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                Save 17%
                            </span>
                        )}
                    </div>
                </div>
            </motion.section>

            {/* Pricing Cards */}
            <section className="pb-20 px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 ${plan.popular
                                    ? 'border-green-500 scale-105'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className="p-8">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-black rounded-xl mb-4 border border-green-600/30`}>
                                        <plan.icon className="text-green-400 text-2xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-6">{plan.description}</p>

                                    <div className="mb-6">
                                        <div className="flex items-baseline justify-center">
                                            <span className="text-5xl font-bold text-gray-900">
                                                ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                                            </span>
                                            <span className="text-gray-500 ml-2">
                                                /{isAnnual ? 'year' : 'month'}
                                            </span>
                                        </div>
                                        {isAnnual && plan.monthlyPrice > 0 && (
                                            <p className="text-sm text-gray-500 mt-2">
                                                ${Math.round(plan.annualPrice / 12)}/month billed annually
                                            </p>
                                        )}
                                    </div>

                                    <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${plan.popular
                                            ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/25'
                                            : 'bg-black text-white hover:bg-green-700'
                                        }`}>
                                        {plan.monthlyPrice === 0 ? 'Get Started Free' : 'Start Free Trial'}
                                    </button>
                                </div>

                                {/* Features */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                                    {plan.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-start gap-3">
                                            <FaCheck className="text-green-500 text-sm mt-1 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm">{feature}</span>
                                        </div>
                                    ))}

                                    {plan.limitations.length > 0 && (
                                        <>
                                            <div className="border-t border-gray-200 pt-4 mt-6">
                                                <h4 className="font-semibold text-gray-900 mb-4">Limitations:</h4>
                                                {plan.limitations.map((limitation, limitIndex) => (
                                                    <div key={limitIndex} className="flex items-start gap-3">
                                                        <FaTimes className="text-gray-400 text-sm mt-1 flex-shrink-0" />
                                                        <span className="text-gray-500 text-sm">{limitation}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-600">Everything you need to know about our pricing and plans</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                question: "Can I change plans anytime?",
                                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
                            },
                            {
                                question: "Is there a free trial?",
                                answer: "All paid plans come with a 14-day free trial. No credit card required to start, and you can cancel anytime during the trial period."
                            },
                            {
                                question: "What payment methods do you accept?",
                                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe."
                            },
                            {
                                question: "Do you offer student discounts?",
                                answer: "Yes! We offer a 50% student discount on all paid plans. Simply verify your student status with your .edu email address."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 rounded-xl p-6"
                            >
                                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-black border-t border-green-600/20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center text-white"
                >
                    <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Scholarship?</h2>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of students who have already secured their educational funding through our platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg">
                            Start Free Trial
                        </button>
                        <button className="px-8 py-4 btn-ghost text-green-400 rounded-xl font-semibold hover:bg-green-600/10 transition-colors border border-green-600/30">
                            Contact Sales
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Pricing;