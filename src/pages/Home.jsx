import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import SkillsOverlay from '@/components/SkillsOverlay';
import DrawingCanvas from '@/components/DrawingCanvas';
import ResumeViewer from '@/components/ResumeViewer';

const Home = () => {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Scroll animation variants
  const scrollVariants = {
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

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const nowItems = [
    {
      text: "Building a new AI-powered recommendation system",
      icon: "🤖",
      color: "from-blue-500 to-purple-600"
    },
    {
      text: "Learning advanced React patterns and performance optimization",
      icon: "⚡",
      color: "from-green-500 to-blue-600"
    },
    {
      text: "Contributing to open-source projects in the React ecosystem",
      icon: "🌟",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const quickLinks = [
    { name: 'GitHub', url: siteConfig.social.github, icon: 'github' },
    { name: 'LinkedIn', url: siteConfig.social.linkedin, icon: 'linkedin' },
    { name: 'Email', url: siteConfig.social.email, icon: 'email' }
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'github':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'email':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section - Two Column Layout */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <motion.div className="space-y-8" variants={itemVariants}>
              {/* Welcome Message */}
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="mr-2">👋</span>
                Welcome to my world
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                variants={itemVariants}
              >
                Hi, I'm{' '}
                <motion.span
                  className="text-gradient relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {siteConfig.name}
                </motion.span>
                <br />
                <span className="text-3xl md:text-4xl text-gray-600 dark:text-gray-400">
                  {siteConfig.role}
                </span>
              </motion.h1>
              
              {/* Description */}
              <motion.p
                className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed"
                variants={itemVariants}
              >
                {siteConfig.tagline}
              </motion.p>

              {/* Interactive Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => setIsSkillsOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🎯</span>
                  <span>View Skills</span>
                  <motion.span
                    className="group-hover:translate-x-1 transition-transform duration-200"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>

                <motion.button
                  onClick={() => setIsResumeOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>📄</span>
                  <span>View Resume</span>
                  <motion.span
                    className="group-hover:translate-x-1 transition-transform duration-200"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  >
                    →
                  </motion.span>
                </motion.button>

                <motion.button
                  onClick={() => setIsDrawingOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🎨</span>
                  <span>Draw Something</span>
                  <motion.span
                    className="group-hover:translate-x-1 transition-transform duration-200"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* Social & Skills Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {/* Social Links */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Find with me
                  </h3>
                  <div className="flex space-x-4">
                    {quickLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        {getIcon(link.icon)}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Best Skills */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Best skills on
                  </h3>
                  <div className="flex space-x-3">
                    {['React', 'Node.js', 'Tailwind'].map((skill, index) => (
                      <motion.div
                        key={skill}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Profile & Stats */}
            <motion.div
              className="relative"
              variants={itemVariants}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Profile Image Placeholder */}
              <div className="relative mx-auto lg:mx-0">
                <div className="w-80 h-80 mx-auto lg:mx-0 relative">
                  {/* Creative Frame */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-1"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-3xl flex items-center justify-center overflow-hidden">
                      {/* Placeholder for profile image */}
                      <div className="text-center">
                        <motion.div
                          className="text-8xl mb-4"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          👨‍💻
                        </motion.div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                          Your Photo Here
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    ⭐
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg"
                    animate={{
                      y: [0, 10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🚀
                  </motion.div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { number: '50+', label: 'Projects', icon: '💼' },
                  { number: '3+', label: 'Years', icon: '⏰' },
                  { number: '100%', label: 'Satisfaction', icon: '😊' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium mb-4">
              <span className="mr-2">🔥</span>
              Featured Project
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Latest Work That Showcases My Skills
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A recent project that demonstrates my expertise in modern web development and design
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* Project Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
                    🚀
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI-Powered E-commerce Platform</h3>
                    <p className="text-gray-600 dark:text-gray-400">Full Stack Web Application</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Built a sophisticated e-commerce platform featuring AI-powered product recommendations, 
                  real-time inventory management, and seamless payment processing. The application serves 
                  10,000+ users with 99.9% uptime and has increased conversion rates by 35%.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>AI-powered product recommendations</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Real-time inventory tracking</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Secure payment processing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span>Responsive mobile design</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'PostgreSQL', 'Redis', 'OpenAI API', 'Stripe', 'Docker', 'AWS'].map((tech, index) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200/50 dark:border-gray-600/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Live Demo</span>
                    <span>→</span>
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Code</span>
                    <span>📁</span>
                  </motion.button>
                </div>
              </div>
              
              {/* Project Mockup */}
              <div className="relative">
                <div className="relative mx-auto lg:mx-0">
                  <div className="w-full max-w-md mx-auto">
                    {/* Device Frame */}
                    <div className="relative bg-gray-900 rounded-3xl p-3 shadow-2xl">
                      {/* Screen */}
                      <div className="bg-white rounded-2xl overflow-hidden">
                        {/* Mockup Content */}
                        <div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                          <div className="space-y-3">
                            <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg"></div>
                              <div className="h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg"></div>
                            </div>
                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      ⭐
                    </motion.div>
                    
                    <motion.div
                      className="absolute -bottom-4 -left-4 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                      animate={{
                        y: [0, 10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      🚀
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats & Achievements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Stats & Achievements 🏆
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Numbers that tell the story of my journey and expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                number: "50+",
                label: "Projects Completed",
                icon: "💼",
                color: "from-blue-500 to-cyan-600",
                description: "From small websites to enterprise applications"
              },
              {
                number: "3+",
                label: "Years Experience",
                icon: "⏰",
                color: "from-green-500 to-emerald-600",
                description: "Full-stack development & modern technologies"
              },
              {
                number: "100%",
                label: "Client Satisfaction",
                icon: "😊",
                color: "from-purple-500 to-pink-600",
                description: "Delivering quality that exceeds expectations"
              },
              {
                number: "15+",
                label: "Technologies",
                icon: "🚀",
                color: "from-orange-500 to-red-600",
                description: "Mastered across frontend & backend"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 h-full relative overflow-hidden">
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {stat.icon}
                  </div>
                  
                  {/* Number */}
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {stat.description}
                  </p>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Achievement Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-2xl relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Latest Achievement</h3>
                <p className="text-blue-100 mb-4">
                  Successfully delivered a complex e-commerce platform serving 10,000+ users with 99.9% uptime
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🎯</span>
                  <span className="font-medium">Performance Excellence Award</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-2xl relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Current Focus</h3>
                <p className="text-green-100 mb-4">
                  Leading development of AI-powered recommendation system using machine learning and real-time data
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🤖</span>
                  <span className="font-medium">AI/ML Innovation</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Now Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scrollVariants}
          >
            What I'm up to now
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
          >
            {nowItems.map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.2 }}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Floating icon */}
                <motion.div
                  className="text-4xl mb-4 relative z-10"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  {item.icon}
                </motion.div>
                
                <p className="text-gray-700 dark:text-gray-300 relative z-10">{item.text}</p>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-900 dark:text-white mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scrollVariants}
          >
            Let's connect
          </motion.h2>
          
          <motion.div
            className="flex justify-center space-x-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
          >
            {quickLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/80 dark:hover:bg-gray-700/80 backdrop-blur-sm rounded-xl transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -5, rotateY: 10 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Visit ${link.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon with floating animation */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  {getIcon(link.icon)}
                </motion.div>
                
                <p className="mt-2 text-sm font-medium relative z-10">{link.name}</p>
                
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-300/30 transition-colors duration-300"
                  whileHover={{
                    scale: 1.1,
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm font-medium mb-4">
              <span className="mr-2">⭐</span>
              My Best Quality Service
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What I Can Do For You
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I specialize in creating exceptional digital experiences that combine beautiful design with powerful functionality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "UI/UX Design",
                description: "Creating intuitive and beautiful user interfaces that enhance user experience and drive engagement",
                color: "from-blue-500 to-cyan-600"
              },
              {
                icon: "💻",
                title: "Frontend Development",
                description: "Building responsive, fast, and accessible web applications using modern technologies",
                color: "from-purple-500 to-pink-600"
              },
              {
                icon: "⚡",
                title: "Backend Development",
                description: "Developing robust server-side solutions and APIs that power your applications",
                color: "from-green-500 to-emerald-600"
              },
              {
                icon: "📱",
                title: "Mobile Development",
                description: "Creating cross-platform mobile applications that work seamlessly across devices",
                color: "from-orange-500 to-red-600"
              },
              {
                icon: "🔧",
                title: "DevOps & Deployment",
                description: "Setting up CI/CD pipelines and deploying applications to production environments",
                color: "from-indigo-500 to-purple-600"
              },
              {
                icon: "📊",
                title: "Performance Optimization",
                description: "Optimizing applications for speed, scalability, and better user experience",
                color: "from-teal-500 to-blue-600"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 h-full relative overflow-hidden">
                  {/* Service icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Read more button */}
                  <motion.button
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read More →
                  </motion.button>
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
        
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 text-green-800 dark:text-green-200 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <span className="mr-2">🚀</span>
              My Skills
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Explore Popular Skills and Experience
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I've been honing my skills across various technologies and frameworks to deliver the best possible solutions
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
          >
            {[
              {
                name: "React & Next.js",
                icon: "⚛️",
                color: "from-blue-500 to-cyan-600",
                description: "Building modern, scalable React applications with Next.js for optimal performance",
                tags: ["Hooks", "Context", "SSR", "SSG"],
                experience: "4+ years"
              },
              {
                name: "Node.js & Express",
                icon: "🟢",
                color: "from-green-500 to-emerald-600",
                description: "Developing robust backend APIs and server-side applications",
                tags: ["REST APIs", "Middleware", "Authentication", "Database"],
                experience: "3+ years"
              },
              {
                name: "TypeScript",
                icon: "🔷",
                color: "from-blue-600 to-indigo-600",
                description: "Writing type-safe, maintainable code with enhanced developer experience",
                tags: ["Types", "Interfaces", "Generics", "Utility Types"],
                experience: "2+ years"
              },
              {
                name: "Tailwind CSS",
                icon: "🎨",
                color: "from-cyan-500 to-blue-600",
                description: "Creating beautiful, responsive designs with utility-first CSS framework",
                tags: ["Responsive", "Custom CSS", "Animations", "Dark Mode"],
                experience: "3+ years"
              },
              {
                name: "PostgreSQL & MongoDB",
                icon: "🗄️",
                color: "from-purple-500 to-pink-600",
                description: "Designing and managing both relational and NoSQL databases",
                tags: ["SQL", "NoSQL", "Indexing", "Performance"],
                experience: "3+ years"
              },
              {
                name: "Docker & AWS",
                icon: "🐳",
                color: "from-blue-500 to-purple-600",
                description: "Containerizing applications and deploying to cloud infrastructure",
                tags: ["Containers", "CI/CD", "Cloud", "DevOps"],
                experience: "2+ years"
              }
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 h-full relative overflow-hidden group">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl`} />
                  
                  {/* Skill icon with enhanced styling */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative z-10`}>
                    {skill.icon}
                  </div>
                  
                  {/* Skill name with experience */}
                  <div className="mb-4 relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                      {skill.name}
                    </h3>
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700">
                      {skill.experience}
                    </div>
                  </div>
                  
                  {/* Description with enhanced typography */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm relative z-10 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {skill.description}
                  </p>
                  
                  {/* Enhanced tags with hover effects */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {skill.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className="px-3 py-1.5 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-medium border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm group-hover:bg-white/90 dark:group-hover:bg-gray-700/90 transition-all duration-300 cursor-default"
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 animate-pulse" />
                  <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 animate-pulse" />
                  <div className="absolute top-1/2 left-2 w-1 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Skills Showcase */}
          <motion.div
            className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                More Skills in My Arsenal
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Constantly expanding my knowledge and staying up-to-date with the latest technologies
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Git & GitHub", icon: "📚" },
                { name: "VS Code", icon: "💻" },
                { name: "Postman", icon: "📮" },
                { name: "Vercel", icon: "🚀" },
                { name: "Figma", icon: "🎨" },
                { name: "Linux", icon: "🐧" },
                { name: "Nginx", icon: "🌐" },
                { name: "Redis", icon: "⚡" }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="text-2xl mb-2">{skill.icon}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>



      {/* Enhanced Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm font-medium mb-4">
              <span className="mr-2">📞</span>
              Contact Now
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Get In Touch Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to start your next project? Let's discuss how I can help bring your ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
                    📞
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Call Me</h3>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email Me</h3>
                    <p className="text-gray-600 dark:text-gray-400">hello@yourname.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl">
                    📍
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Now
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Overlays */}
      <SkillsOverlay isOpen={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />
      <DrawingCanvas isOpen={isDrawingOpen} onClose={() => setIsDrawingOpen(false)} />
      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </motion.div>
  );
};

export default Home;
