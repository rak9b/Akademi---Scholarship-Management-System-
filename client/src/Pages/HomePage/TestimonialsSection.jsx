import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const TestimonialsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Chen',
            role: 'Computer Science Student',
            university: 'Stanford University',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            rating: 5,
            text: 'Akademi helped me secure a $40,000 scholarship for my CS degree. The platform\'s AI matching system found opportunities I never would have discovered on my own. The application process was seamless and the support team was incredibly helpful.',
            scholarship: 'Tech Innovation Grant',
            amount: '$40,000'
        },
        {
            id: 2,
            name: 'Marcus Johnson',
            role: 'Pre-Med Student',
            university: 'Harvard Medical School',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            rating: 5,
            text: 'As a first-generation college student, I thought medical school was financially impossible. Akademi connected me with multiple scholarships totaling over $100,000. I\'m now pursuing my dream of becoming a doctor.',
            scholarship: 'Healthcare Heroes Program',
            amount: '$100,000+'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Environmental Science Major',
            university: 'UC Berkeley',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            rating: 5,
            text: 'The personalized guidance from Akademi\'s counselors was game-changing. They helped me craft compelling essays and prepare for interviews. I received three scholarship offers and chose the perfect one for my environmental research goals.',
            scholarship: 'Environmental Leadership Award',
            amount: '$25,000'
        },
        {
            id: 4,
            name: 'David Kim',
            role: 'Business Administration',
            university: 'Wharton School',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            rating: 5,
            text: 'Akademi\'s platform is incredibly user-friendly and comprehensive. The deadline reminders and application tracking features kept me organized throughout the process. I secured funding for my MBA and couldn\'t be happier.',
            scholarship: 'Future Leaders Scholarship',
            amount: '$60,000'
        },
        {
            id: 5,
            name: 'Aisha Patel',
            role: 'International Student',
            university: 'MIT',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
            rating: 5,
            text: 'Coming from India, I was overwhelmed by the US scholarship landscape. Akademi simplified everything and connected me with scholarships specifically for international students. The cultural support was invaluable.',
            scholarship: 'Global Excellence Program',
            amount: '$50,000'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar
                key={i}
                className={`${i < rating ? 'text-green-500' : 'text-gray-300'} text-sm`}
            />
        ));
    };

    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
                        <span className="text-green-600 font-semibold text-sm">Success Stories</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
                        Students Love
                        <span className="block text-green-600">
                            Our Platform
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of successful students who have transformed their educational journey
                        with our scholarship platform.
                    </p>
                </motion.div>

                {/* Main Testimonial */}
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto mb-12"
                >
                    <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100 relative">
                        <FaQuoteLeft className="text-4xl text-green-200 absolute top-8 left-8" />

                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <img
                                    src={testimonials[activeIndex].image}
                                    alt={testimonials[activeIndex].name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                                />
                            </div>

                            <div className="flex-1 text-center lg:text-left">
                                <div className="flex justify-center lg:justify-start mb-4">
                                    {renderStars(testimonials[activeIndex].rating)}
                                </div>

                                <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                                    "{testimonials[activeIndex].text}"
                                </p>

                                <div className="border-t border-gray-200 pt-6">
                                    <h4 className="font-bold text-black text-lg">
                                        {testimonials[activeIndex].name}
                                    </h4>
                                    <p className="text-gray-600 mb-2">
                                        {testimonials[activeIndex].role} • {testimonials[activeIndex].university}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
                                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                            {testimonials[activeIndex].scholarship}
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 bg-black text-white rounded-full text-sm font-medium">
                                            {testimonials[activeIndex].amount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Testimonial Navigation */}
                <div className="flex justify-center gap-3 mb-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'bg-green-600 w-8'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.button
                            key={testimonial.id}
                            onClick={() => setActiveIndex(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-4 rounded-xl transition-all duration-300 ${index === activeIndex
                                    ? 'bg-green-100 border-2 border-green-300'
                                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                            />
                            <p className="text-xs font-medium text-gray-700 truncate">
                                {testimonial.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {testimonial.amount}
                            </p>
                        </motion.button>
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
                >
                    {[
                        { number: '98%', label: 'Success Rate' },
                        { number: '4.9/5', label: 'User Rating' },
                        { number: '24/7', label: 'Support' },
                        { number: '50K+', label: 'Happy Students' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;