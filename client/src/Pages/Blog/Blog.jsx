import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight, FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const blogPosts = [
        {
            id: 1,
            title: 'Top 10 Scholarship Application Tips for 2025',
            excerpt: 'Learn the insider secrets to writing winning scholarship applications that stand out from the crowd.',
            content: 'Scholarship applications can be overwhelming, but with the right approach, you can significantly increase your chances of success...',
            author: 'Sarah Johnson',
            date: '2024-12-20',
            category: 'tips',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop',
            readTime: '5 min read'
        },
        {
            id: 2,
            title: 'New STEM Scholarships Available for 2025',
            excerpt: 'Exciting new opportunities for science, technology, engineering, and mathematics students.',
            content: 'We are thrilled to announce several new STEM scholarship programs launching in 2025...',
            author: 'Michael Chen',
            date: '2024-12-18',
            category: 'news',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop',
            readTime: '3 min read'
        },
        {
            id: 3,
            title: 'How to Write a Compelling Personal Statement',
            excerpt: 'Your personal statement is your chance to shine. Here\'s how to make it memorable.',
            content: 'A compelling personal statement can make the difference between acceptance and rejection...',
            author: 'Emily Rodriguez',
            date: '2024-12-15',
            category: 'tips',
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=300&fit=crop',
            readTime: '7 min read'
        },
        {
            id: 4,
            title: 'Success Story: From Community College to Harvard',
            excerpt: 'Meet Maria, who used scholarships to transfer from community college to Harvard University.',
            content: 'Maria\'s journey from a small community college to Harvard University is truly inspiring...',
            author: 'David Wilson',
            date: '2024-12-12',
            category: 'success-stories',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=600&h=300&fit=crop',
            readTime: '6 min read'
        },
        {
            id: 5,
            title: 'Understanding Financial Aid vs Scholarships',
            excerpt: 'Learn the key differences between financial aid and scholarships to make informed decisions.',
            content: 'Many students confuse financial aid with scholarships. Here\'s what you need to know...',
            author: 'Lisa Wang',
            date: '2024-12-10',
            category: 'education',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop',
            readTime: '4 min read'
        },
        {
            id: 6,
            title: 'International Students: Scholarship Opportunities',
            excerpt: 'A comprehensive guide to scholarships available for international students in the US.',
            content: 'International students face unique challenges when seeking scholarships...',
            author: 'Ahmed Hassan',
            date: '2024-12-08',
            category: 'international',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop',
            readTime: '8 min read'
        }
    ];

    const categories = [
        { value: 'all', label: 'All Posts' },
        { value: 'tips', label: 'Tips & Advice' },
        { value: 'news', label: 'News' },
        { value: 'success-stories', label: 'Success Stories' },
        { value: 'education', label: 'Education' },
        { value: 'international', label: 'International' }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black py-20 px-4 border-b border-green-600/20"
            >
                <div className="max-w-6xl mx-auto text-center text-white">
                    <h1 className="text-5xl font-bold mb-6">Scholarship Blog</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Stay updated with the latest scholarship opportunities, tips, and success stories
                    </p>
                </div>
            </motion.section>

            {/* Search and Filter */}
            <section className="py-8 px-4 bg-white shadow-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {categories.map(category => (
                                <button
                                    key={category.value}
                                    onClick={() => setSelectedCategory(category.value)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.value
                                            ? 'bg-black text-white border border-green-600/50'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <FaCalendar />
                                            {new Date(post.date).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaUser />
                                            {post.author}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-green-600 font-medium">
                                            {post.readTime}
                                        </span>
                                        <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                                            Read More <FaArrowRight className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-16 px-4 bg-black border-t border-green-600/20">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-xl opacity-90 mb-8">
                        Subscribe to our newsletter for the latest scholarship opportunities and tips
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                        <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;