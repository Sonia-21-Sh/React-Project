import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Sparkles, Center } from '@react-three/drei';
import { FiArrowRight, FiCpu, FiUsers, FiAward, FiTrendingUp, FiShield } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';

const Animated3DText = () => {
  return (
    <group>
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Center>
          <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
            size={0.4}
            height={0.1}
            curveSegments={32}
            bevelEnabled
            bevelThickness={0.03}
            bevelSize={0.02}
            bevelSegments={8}
          >
            STUDY HUB
            <meshStandardMaterial 
              color="#a78bfa" 
              emissive="#5b21b6"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </Text3D>
        </Center>
      </Float>
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-3, -2, -2]} intensity={0.8} color="#ec4899" />
    </group>
  );
};

const Home = () => {
  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });

  const features = [
    { icon: FiCpu, title: 'AI Powered Learning', desc: 'Personalized learning paths powered by advanced AI algorithms', color: 'from-blue-500 to-cyan-500' },
    { icon: FiUsers, title: 'Interactive 3D', desc: 'Engaging 3D visualizations that make complex concepts simple', color: 'from-purple-500 to-pink-500' },
    { icon: FiAward, title: 'Certified Courses', desc: 'Industry recognized certificates upon completion', color: 'from-green-500 to-emerald-500' },
    { icon: FiTrendingUp, title: 'Track Progress', desc: 'Detailed analytics and progress tracking', color: 'from-orange-500 to-red-500' },
    { icon: FiShield, title: 'Secure Learning', desc: 'Safe and secure environment for all learners', color: 'from-indigo-500 to-purple-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="overflow-hidden bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-950 via-slate-900 to-purple-950">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <Animated3DText />
            <Sparkles count={200} scale={10} size={0.3} speed={0.5} color="#c084fc" />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} enablePan={false} />
          </Canvas>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20 sm:mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 sm:space-y-6"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
            >
              Welcome to <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent block sm:inline">
                <TypeAnimation
                  sequence={[
                    '3D Learn Hub',
                    2000,
                    'Student Study Hub',
                    2000,
                    'The Future of Education',
                    2000,
                  ]}
                  wrapper="span"
                  speed={30}
                  repeat={Infinity}
                />
              </span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed px-2"
            >
              Experience the future of education with an AI-powered 3D interactive learning platform designed for modern minds.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 px-4"
            >
              <Link to="/signup" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-full text-white font-bold text-base sm:text-lg shadow-2xl flex items-center justify-center gap-2 group transition-all"
                >
                  Get Started Free
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </motion.button>
              </Link>
              <Link to="/features" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold text-base sm:text-lg transition-all"
                >
                  Explore Features
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-purple-400/50 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1 h-1.5 sm:w-1.5 sm:h-2 bg-purple-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 relative bg-slate-900/60 border-y border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {[
              { number: '50K+', label: 'Active Students' },
              { number: '500+', label: 'Interactive Courses' },
              { number: '100+', label: 'Expert Instructors' },
              { number: '98%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring" }}
                className="text-center"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {stat.number}
                </h3>
                <p className="text-gray-400 font-medium mt-1 sm:mt-2 tracking-wide uppercase text-[10px] sm:text-xs md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Responsive Grid */}
      <section ref={featuresRef} className="py-16 sm:py-20 md:py-24 relative bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-tight px-2">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">3D Learn Hub</span>?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light px-4">
              Discover next-gen features that make us the ultimate study hub for global learners.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 border border-white/5 transition-all duration-300"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}>
                    <Icon className="text-white text-xl sm:text-2xl" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 tracking-wide">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-light text-sm sm:text-base">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-950 to-pink-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.4))]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-4 sm:space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight px-2">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-purple-200/80 text-base sm:text-lg md:text-xl font-light max-w-xl mx-auto px-4">
              Join thousands of students already expanding their minds in the Student Study Hub.
            </p>
            <div className="pt-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-purple-950 font-extrabold text-base sm:text-lg rounded-full hover:bg-purple-50 transition shadow-2xl"
                >
                  Start Learning Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;