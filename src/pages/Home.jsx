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
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
      text: "Learning Machine Learning & completed ML section, now studying LLM/NLP from scratch since March 2025",
      icon: "🧠",
      color: "from-blue-500 to-purple-600"
    },
    {
      text: "Exploring AI tools like Cursor.ai, ChatGPT-5, and building projects on GitHub",
      icon: "🤖",
      color: "from-green-500 to-blue-600"
    },
    {
      text: "Studying LLM fundamentals through YouTube and Udemy courses to master AI/ML technologies",
      icon: "📚",
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

  // Contact form handlers
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Check if EmailJS is configured
      if (import.meta.env.VITE_EMAILJS_SERVICE_ID && 
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID && 
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        
        // Import EmailJS dynamically
        const emailjs = await import('@emailjs/browser');
        
        // Initialize EmailJS
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
        
        // Send email using EmailJS
        const result = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: contactForm.name,
            from_email: contactForm.email,
            message: `Subject: ${contactForm.subject}\n\nMessage: ${contactForm.message}`,
            name: contactForm.name,
            email: contactForm.email
          }
        );
        
        console.log('Email sent successfully:', result);
        setSubmitStatus('success');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback to mailto
        const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage: ${contactForm.message}`)}`;
        window.open(mailtoUrl);
        setSubmitStatus('mailto');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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

                          {/* Social Links Section */}
            <div className="space-y-3 pt-8">
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
            </motion.div>

            {/* Right Column - Profile & Stats */}
            <motion.div
              className="relative lg:ml-8"
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
                      {/* Profile Image */}
                      <img
                        src="/images/personal-photo.jpg"
                        alt="Nikesh Gamal - Software Engineer"
                        className="w-full h-full object-cover rounded-3xl"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div className="text-center hidden">
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

              {/* Best Skills Section - Below Profile Photo */}
              <div className="mt-8 space-y-3">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Best skills on
                </h3>
                <div className="flex flex-wrap gap-3 w-full">
                  {['Node.js', 'Express.js', 'Python','Javascript','MongoDB','MSSQL','PostgreSQL','Postman','React','CSS','Docker'].map((skill, index) => (
                  <motion.div
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium shadow-lg whitespace-nowrap"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                  </motion.div>
                ))}
              </div>
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
              Project Phoenix - College Project Management System
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive web-based platform that streamlines project management for college students and faculty
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
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start relative z-10">
              {/* Project Info */}
              <div className="space-y-6 lg:col-span-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
                    🎓
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Project Phoenix</h3>
                    <p className="text-gray-600 dark:text-gray-400">College Project Management System</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Developed a comprehensive end-to-end project management system that streamlines the entire 
                  academic project lifecycle from proposal submission to final defense. The platform features 
                  multi-role portals, automated defense scheduling, real-time progress logging, structured 
                  evaluation forms, and comprehensive reporting, serving 500+ active users across multiple 
                  departments with 95% user satisfaction.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Multi-role portal system (Admin, Faculty, Supervisor, Student, Evaluator)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Automated defense scheduling & evaluation management</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Real-time progress logging & supervisor verification</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span>Structured evaluation forms & automated grading system</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>Comprehensive reporting & analytics dashboard</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Workflow Phases:</h4>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        'Admin Initiation',
                        'Team Formation', 
                        'Proposal Review',
                        'Defense Scheduling',
                        'Progress Logging',
                        'Evaluation',
                        'Final Defense',
                        'Reporting'
                      ].map((phase, index) => (
                        <span
                          key={phase}
                          className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-200/50 dark:border-blue-600/50 text-center"
                        >
                          {phase}
                        </span>
                      ))}
                    </div>
                    
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="https://college-project-management-frontend-system.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Project Demo</span>
                    <span>→</span>
                  </motion.a>
                  <motion.a
                    href="https://github.com/nikeshgamal24/College-Project-Management-System"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Source Code</span>
                    <span>📁</span>
                  </motion.a>
                </div>
              </div>
              
              {/* Project Video Demo */}
              <div className="relative lg:col-span-2">
                <div className="relative mx-auto lg:mx-0">
                  <div className="w-full max-w-3xl mx-auto">
                    {/* Video Container */}
                    <div className="relative bg-gray-900 rounded-3xl p-3 shadow-2xl">
                      {/* Video Player */}
                      <div className="bg-white rounded-2xl overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 relative">
                          {/* Video Placeholder - Replace with your Google Drive video link */}
                                              {/* Google Drive Video Embed - Alternative Method */}
                          <iframe
                            className="w-full h-full rounded-xl"
                            src="https://drive.google.com/file/d/1BghJH2jmCPf4Dxk6U40kVhhLY05znUSS/preview?usp=sharing"
                            title="Project Phoenix Demo Video"
                            frameBorder="0"
                            allowFullScreen
                            style={{ border: 'none' }}
                          ></iframe>
                          
                          {/* Fallback - If iframe doesn't work, show direct link */}
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90" style={{ display: 'none' }}>
                            <div className="text-center">
                              <div className="text-4xl mb-2">🎥</div>
                              <p className="text-gray-700 font-medium mb-2">Video Not Loading?</p>
                              <a 
                                href="https://drive.google.com/file/d/1BghJH2jmCPf4Dxk6U40kVhhLY05znUSS/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Watch on Google Drive
                              </a>
                            </div>
                          </div>
                        
                        </div>
                      </div>
                    </div>
                    
                    {/* Technologies Used - Moved under video */}
                    <div className="mt-8 px-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-3 justify-center">
                        {['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'Bootstrap', 'Git'].map((tech, index) => (
                          <span
                            key={tech}
                            className="px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300 rounded-lg text-base font-medium border border-blue-200/50 dark:border-blue-600/50"
                          >
                            {tech}
                          </span>
                        ))}
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
              Academic Excellence & Achievements 🏆
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Outstanding academic performance and competition wins that showcase my dedication and skills
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                number: "3.92",
                label: "CGPA Score",
                icon: "🎓",
                color: "from-blue-500 to-cyan-600",
                description: "University topper in Software Engineering Faculty"
              },
              {
                number: "1st",
                label: "Position",
                icon: "🏆",
                color: "from-green-500 to-emerald-600",
                description: "NCIT Final Year Project Exhibition 2024"
              },
              {
                number: "7th",
                label: "University Rank",
                icon: "⭐",
                color: "from-purple-500 to-pink-600",
                description: "Overall university topper ranking"
              },
              {
                number: "1st",
                label: "Runner Up",
                icon: "🥈",
                color: "from-orange-500 to-red-600",
                description: "Model Competition by Civil Engineering Society 2018"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-2xl relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">🏆 Project Exhibition Winner</h3>
                <p className="text-blue-100 mb-4">
                  Secured 1st Position in NCIT Final Year Project Exhibition 2024 with Project Phoenix - 
                  a comprehensive College Project Management System
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🎓</span>
                  <span className="font-medium">Nepal College of Information Technology</span>
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
                <h3 className="text-2xl font-bold mb-4">⭐ Academic Excellence</h3>
                <p className="text-green-100 mb-4">
                  University topper in Software Engineering Faculty with CGPA 3.92 and ranked 7th overall 
                  among all university students
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🏅</span>
                  <span className="font-medium">Outstanding Academic Performance</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 rounded-2xl relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">🥈 Model Competition</h3>
                <p className="text-orange-100 mb-4">
                  Secured Runner Up position in Model Competition organized by Civil Engineering Students Society 
                  in 2018 during +2 level
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🏗️</span>
                  <span className="font-medium">Civil Engineering Society</span>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 -translate-x-10" />
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
              My Technical Skills & Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Organized by category to showcase my comprehensive development capabilities
            </p>
          </motion.div>

          {/* Skills Categories Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
          >
            {/* Frontend Development */}
              <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl" />
                
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative z-10">
                  🌐
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300 relative z-10">
                  Frontend Development
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm relative z-10 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Creating responsive, interactive user interfaces with modern web technologies and frameworks
                </p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {['HTML', 'CSS', 'JavaScript', 'React'].map((tech, index) => (
                    <motion.span
                key={index}
                      className="px-3 py-1.5 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm group-hover:bg-white/90 dark:group-hover:bg-gray-700/90 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Backend Development */}
            <motion.div
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl" />
                  
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative z-10">
                  ⚡
                  </div>
                  
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300 relative z-10">
                  Backend Development
                    </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm relative z-10 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Building robust server-side applications, APIs, and scalable backend solutions
                </p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {['Node.js', 'Express.js', 'Python'].map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1.5 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm group-hover:bg-white/90 dark:group-hover:bg-gray-700/90 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                    </div>
                  </div>
            </motion.div>

            {/* API Testing Tools */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl" />
                
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative z-10">
                  🔌
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300 relative z-10">
                  API Testing Tools
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm relative z-10 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Testing and debugging REST APIs with professional tools for quality assurance
                </p>
                
                  <div className="flex flex-wrap gap-2 relative z-10">
                  {['Postman', 'Thunder Client'].map((tech, index) => (
                      <motion.span
                      key={index}
                      className="px-3 py-1.5 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm group-hover:bg-white/90 dark:group-hover:bg-gray-700/90 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                      {tech}
                      </motion.span>
                    ))}
                  </div>
              </div>
            </motion.div>

            {/* Databases */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl" />
                
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative z-10">
                  🗄️
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300 relative z-10">
                  Databases
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm relative z-10 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Designing and managing both relational and NoSQL databases for optimal performance
                </p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {['MongoDB', 'MSSQL', 'PostgreSQL', 'MySQL'].map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1.5 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm group-hover:bg-white/90 dark:group-hover:bg-gray-700/90 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                </div>
              </motion.div>

            {/* DevOps & Tools */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl" />
                
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative z-10">
                  🐳
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-200 transition-all duration-300 relative z-10">
                  DevOps & Tools
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm relative z-10 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Containerizing applications and implementing modern deployment practices
                </p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {['Docker'].map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1.5 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm group-hover:bg-white/90 dark:group-hover:bg-gray-700/90 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* AI/ML Learning */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl" />
                
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative z-10">
                  🤖
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-200 transition-all duration-300 relative z-10">
                  AI/ML Learning
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm relative z-10 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  Actively learning machine learning algorithms, LLM/NLP, and AI tools
                </p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {['Machine Learning', 'LLM/NLP', 'AI Tools', 'ChatGPT-5', 'Cursor AI', 'Gemini'].map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1.5 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm group-hover:bg-white/90 dark:group-hover:bg-gray-700/90 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
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
                { name: "GitLab", icon: "🦊" },
                { name: "VS Code", icon: "💻" },
                { name: "Postman", icon: "📮" },
                { name: "Vercel", icon: "🚀" },
                { name: "Neon Postgres", icon: "💚" },
                { name: "Linux", icon: "🐧" },
                { name: "MSSQL", icon: "🗄️" },
                { name: "Cursor AI", icon: "🤖" },
                { name: "ChatGPT", icon: "💬" },
                { name: "Gemini", icon: "✨" }
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
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email Me</h3>
                    <p className="text-gray-600 dark:text-gray-400">nikeshgamal24@gmail.com</p>
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
                    <p className="text-gray-600 dark:text-gray-400">Pokhara, Nepal</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleContactSubmit}
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactInputChange}
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
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactInputChange}
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
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Sending...' : 'Submit Now'}
              </motion.button>

              {/* Status Messages */}
              {submitStatus && (
                <motion.div
                  className={`p-4 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : submitStatus === 'mailto'
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {submitStatus === 'success' && (
                    <p className="text-green-800 dark:text-green-200 text-sm">
                      ✅ Message sent successfully! I'll get back to you soon.
                    </p>
                  )}
                  {submitStatus === 'mailto' && (
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      📧 Opening your email client to send a message directly.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-800 dark:text-red-200 text-sm">
                      ❌ Something went wrong. Please try again or use the email link above.
                    </p>
                  )}
                </motion.div>
              )}
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
