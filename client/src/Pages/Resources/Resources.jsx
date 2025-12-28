import { motion } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt, FaFileAlt, FaVideo, FaBook, FaTools } from 'react-icons/fa';

const Resources = () => {
    const resourceCategories = [
        {
            title: 'Application Templates',
            icon: FaFileAlt,
            color: 'black',
            resources: [
                {
                    name: 'Scholarship Application Template',
                    description: 'A comprehensive template for scholarship applications',
                    type: 'PDF',
                    size: '2.5 MB',
                    downloads: 1250
                },
                {
                    name: 'Personal Statement Guide',
                    description: 'Step-by-step guide to writing compelling personal statements',
                    type: 'PDF',
                    size: '1.8 MB',
                    downloads: 980
                },
                {
                    name: 'Recommendation Letter Template',
                    description: 'Template for requesting recommendation letters',
                    type: 'DOCX',
                    size: '0.5 MB',
                    downloads: 750
                }
            ]
        },
        {
            title: 'Video Tutorials',
            icon: FaVideo,
            color: 'green',
            resources: [
                {
                    name: 'How to Search for Scholarships',
                    description: 'Learn effective strategies for finding scholarships',
                    type: 'Video',
                    duration: '15 min',
                    views: 5200
                },
                {
                    name: 'Interview Preparation Tips',
                    description: 'Ace your scholarship interviews with these tips',
                    type: 'Video',
                    duration: '22 min',
                    views: 3800
                },
                {
                    name: 'Financial Aid Workshop',
                    description: 'Understanding different types of financial aid',
                    type: 'Video',
                    duration: '45 min',
                    views: 2900
                }
            ]
        },
        {
            title: 'Study Guides',
            icon: FaBook,
            color: 'black',
            resources: [
                {
                    name: 'SAT Preparation Guide',
                    description: 'Comprehensive SAT study materials and practice tests',
                    type: 'PDF',
                    size: '15.2 MB',
                    downloads: 2100
                },
                {
                    name: 'Essay Writing Handbook',
                    description: 'Master the art of academic essay writing',
                    type: 'PDF',
                    size: '8.7 MB',
                    downloads: 1650
                },
                {
                    name: 'College Planning Checklist',
                    description: 'Year-by-year college preparation checklist',
                    type: 'PDF',
                    size: '1.2 MB',
                    downloads: 1890
                }
            ]
        },
        {
            title: 'Tools & Calculators',
            icon: FaTools,
            color: 'green',
            resources: [
                {
                    name: 'College Cost Calculator',
                    description: 'Estimate your total college expenses',
                    type: 'Web Tool',
                    link: '#calculator',
                    users: 8500
                },
                {
                    name: 'GPA Calculator',
                    description: 'Calculate your cumulative GPA',
                    type: 'Web Tool',
                    link: '#gpa',
                    users: 12000
                },
                {
                    name: 'Scholarship Tracker',
                    description: 'Keep track of your scholarship applications',
                    type: 'Excel',
                    size: '0.8 MB',
                    downloads: 950
                }
            ]
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            black: 'bg-black text-green-400 border-green-600/30',
            green: 'bg-green-100 text-green-700 border-green-200'
        };
        return colors[color] || colors.black;
    };

    const getButtonClasses = (color) => {
        const colors = {
            black: 'bg-black hover:bg-green-700',
            green: 'bg-green-600 hover:bg-green-700'
        };
        return colors[color] || colors.black;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black py-20 px-4 border-b border-green-600/20"
            >
                <div className="max-w-6xl mx-auto text-center text-white">
                    <h1 className="text-5xl font-bold mb-6">Student <span className="text-green-500">Resources</span></h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto text-gray-400">
                        Free tools, templates, and guides to help you succeed in your scholarship journey
                    </p>
                </div>
            </motion.section>

            {/* Quick Stats */}
            <section className="py-12 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-6"
                        >
                            <h3 className="text-3xl font-bold text-black mb-2">50+</h3>
                            <p className="text-gray-600">Free Resources</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-6"
                        >
                            <h3 className="text-3xl font-bold text-green-600 mb-2">25K+</h3>
                            <p className="text-gray-600">Downloads</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-6"
                        >
                            <h3 className="text-3xl font-bold text-black mb-2">15K+</h3>
                            <p className="text-gray-600">Students Helped</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-6"
                        >
                            <h3 className="text-3xl font-bold text-green-600 mb-2">100%</h3>
                            <p className="text-gray-600">Free Access</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Resource Categories */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {resourceCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1 }}
                            className="mb-16"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-4 rounded-lg border-2 ${getColorClasses(category.color)}`}>
                                    <category.icon className="text-2xl" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800">{category.title}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.resources.map((resource, resourceIndex) => (
                                    <motion.div
                                        key={resourceIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: resourceIndex * 0.1 }}
                                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                                            {resource.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {resource.description}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(category.color)}`}>
                                                {resource.type}
                                            </span>
                                            <div className="text-sm text-gray-500">
                                                {resource.size && `${resource.size}`}
                                                {resource.duration && `${resource.duration}`}
                                                {resource.link && 'Interactive Tool'}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                                            <span>
                                                {resource.downloads && `${resource.downloads} downloads`}
                                                {resource.views && `${resource.views} views`}
                                                {resource.users && `${resource.users} users`}
                                            </span>
                                        </div>

                                        <button className={`w-full ${getButtonClasses(category.color)} text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2`}>
                                            {resource.link ? (
                                                <>
                                                    <FaExternalLinkAlt />
                                                    Open Tool
                                                </>
                                            ) : (
                                                <>
                                                    <FaDownload />
                                                    Download
                                                </>
                                            )}
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Help Section */}
            <section className="py-16 px-4 bg-black border-t border-green-600/20">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
                    <p className="text-xl opacity-90 mb-8 text-gray-400">
                        Our support team is here to help you make the most of these resources
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                            Contact Support
                        </button>
                        <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors">
                            Schedule Consultation
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Resources;