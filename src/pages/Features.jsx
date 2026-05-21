import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiCpu, FiUsers, FiAward, FiTrendingUp, FiShield, FiVideo, 
  FiBookOpen, FiBarChart2, FiGlobe, FiMessageCircle, FiCloud, FiSmartphone 
} from 'react-icons/fi';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    { icon: FiCpu, title: 'AI-Powered Learning', desc: 'Personalized learning paths that adapt to your progress and learning style', color: 'from-blue-500 to-cyan-500' },
    { icon: FiVideo, title: '3D Interactive Content', desc: 'Immersive 3D visualizations that make complex concepts easy to understand', color: 'from-purple-500 to-pink-500' },
    { icon: FiBookOpen, title: 'Comprehensive Courses', desc: 'Extensive library of courses covering various topics and skill levels', color: 'from-green-500 to-emerald-500' },
    { icon: FiBarChart2, title: 'Progress Tracking', desc: 'Detailed analytics and insights to monitor your learning journey', color: 'from-orange-500 to-red-500' },
    { icon: FiAward, title: 'Certificates', desc: 'Earn industry-recognized certificates upon course completion', color: 'from-yellow-500 to-amber-500' },
    { icon: FiUsers, title: 'Community Learning', desc: 'Connect with fellow learners and experts in our community forums', color: 'from-indigo-500 to-purple-500' },
    { icon: FiShield, title: 'Secure Platform', desc: 'Enterprise-grade security to protect your data and privacy', color: 'from-red-500 to-pink-500' },
    { icon: FiGlobe, title: 'Global Access', desc: 'Learn from anywhere, anytime with cloud-based platform', color: 'from-teal-500 to-green-500' },
    { icon: FiMessageCircle, title: 'AI Tutor', desc: '24/7 AI-powered assistant to answer your questions instantly', color: 'from-pink-500 to-rose-500' },
    { icon: FiTrendingUp, title: 'Career Guidance', desc: 'Personalized career recommendations based on your skills', color: 'from-violet-500 to-purple-500' },
    { icon: FiCloud, title: 'Cloud Sync', desc: 'Your progress syncs seamlessly across all devices', color: 'from-sky-500 to-blue-500' },
    { icon: FiSmartphone, title: 'Mobile Friendly', desc: 'Learn on the go with our responsive mobile platform', color: 'from-lime-500 to-green-500' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Powerful Features
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-purple-100 max-w-2xl mx-auto"
          >
            Everything you need to succeed in your learning journey
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the Future of Learning?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Join thousands of students already using 3D Learn
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Start Your Free Trial
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;