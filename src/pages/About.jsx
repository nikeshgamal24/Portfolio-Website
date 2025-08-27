import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import Badge from '@/components/Badge';
import Timeline from '@/components/Timeline';
import timelineData from '@/data/timeline.json';

const About = () => {
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

  const skills = [
    // Frontend Development
    { 
      name: 'HTML', 
      category: 'Frontend',
      description: 'Semantic HTML markup for accessible and well-structured web content',
      tags: ['Semantic', 'Accessibility', 'SEO', 'Standards'],
      icon: '🌐',
      color: 'from-orange-500 to-red-500'
    },
    { 
      name: 'CSS', 
      category: 'Frontend',
      description: 'Modern CSS with Flexbox, Grid, animations and responsive design',
      tags: ['Flexbox', 'Grid', 'Animations', 'Responsive'],
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'JavaScript', 
      category: 'Frontend',
      description: 'ES6+ features, async programming, and modern JavaScript patterns',
      tags: ['ES6+', 'Async/Await', 'Promises', 'Modules'],
      icon: '🟨',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      name: 'React', 
      category: 'Frontend',
      description: 'Building modern, scalable React applications with hooks and context',
      tags: ['Hooks', 'Context', 'Redux', 'Next.js'],
      icon: '⚛️',
      color: 'from-cyan-500 to-blue-500'
    },

    // Backend Development
    { 
      name: 'Node.js', 
      category: 'Backend',
      description: 'Server-side JavaScript runtime for building scalable applications',
      tags: ['Runtime', 'NPM', 'Modules', 'Performance'],
      icon: '🟢',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'Express.js', 
      category: 'Backend',
      description: 'Fast, unopinionated web framework for Node.js',
      tags: ['REST APIs', 'Middleware', 'Routing', 'Error Handling'],
      icon: '🚀',
      color: 'from-gray-500 to-slate-500'
    },
    { 
      name: 'Django', 
      category: 'Backend',
      description: 'High-level Python web framework for rapid development',
      tags: ['MVT', 'Admin', 'ORM', 'Security'],
      icon: '🐍',
      color: 'from-green-600 to-emerald-600'
    },
    { 
      name: 'Python', 
      category: 'Backend',
      description: 'Versatile programming language for backend and automation',
      tags: ['Web Development', 'Data Analysis', 'Automation', 'APIs'],
      icon: '🐍',
      color: 'from-blue-500 to-indigo-500'
    },

    // Programming Languages
    { 
      name: 'JavaScript', 
      category: 'Language',
      description: 'ES6+ features, async programming, and modern JavaScript patterns',
      tags: ['ES6+', 'Async/Await', 'Promises', 'Modules'],
      icon: '🟨',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      name: 'Python', 
      category: 'Language',
      description: 'Versatile programming language for backend and automation',
      tags: ['Web Development', 'Data Analysis', 'Automation', 'APIs'],
      icon: '🐍',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      name: 'Java', 
      category: 'Language',
      description: 'Object-oriented programming language for enterprise applications',
      tags: ['OOP', 'Spring', 'Enterprise', 'Android'],
      icon: '☕',
      color: 'from-orange-600 to-red-600'
    },
    { 
      name: 'C++', 
      category: 'Language',
      description: 'High-performance programming language for system development',
      tags: ['Performance', 'Memory Management', 'STL', 'Templates'],
      icon: '⚡',
      color: 'from-blue-700 to-indigo-700'
    },

    // Database
    { 
      name: 'PostgreSQL', 
      category: 'Database',
      description: 'Advanced open-source relational database',
      tags: ['SQL', 'Indexing', 'Performance', 'ACID'],
      icon: '🗄️',
      color: 'from-blue-600 to-cyan-600'
    },
    { 
      name: 'MongoDB', 
      category: 'Database',
      description: 'NoSQL document database for flexible data storage',
      tags: ['NoSQL', 'Documents', 'Aggregation', 'Indexing'],
      icon: '🍃',
      color: 'from-green-600 to-emerald-600'
    },
    { 
      name: 'MS SQL Server', 
      category: 'Database',
      description: 'Microsoft relational database management system',
      tags: ['SQL', 'T-SQL', 'Integration Services', 'Analysis Services'],
      icon: '💾',
      color: 'from-blue-700 to-indigo-700'
    },

    // DevOps
    { 
      name: 'Docker', 
      category: 'DevOps',
      description: 'Containerization platform for consistent deployments',
      tags: ['Containers', 'Images', 'Dockerfile', 'Compose'],
      icon: '🐳',
      color: 'from-blue-600 to-cyan-600'
    }
  ];

  const skillCategories = [...new Set(skills.map(skill => skill.category))];

  return (
    <>
      <Helmet>
        <title>About - {siteConfig.seo.title}</title>
        <meta name="description" content="Learn more about my background, skills, and experience in software development." />
        <meta property="og:title" content={`About - ${siteConfig.seo.title}`} />
        <meta property="og:description" content="Learn more about my background, skills, and experience in software development." />
        <meta property="og:image" content={siteConfig.seo.image} />
      </Helmet>

      <motion.div
        className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Passionate about creating meaningful software solutions and continuously learning new technologies.
            </p>
          </motion.div>

          {/* Bio Section */}
          <motion.section className="mb-20" variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Who I Am
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  I'm a {siteConfig.role} with a passion for building digital experiences that make a difference. 
                  With several years of experience in software development, I've worked on projects ranging from 
                  small business solutions to large-scale enterprise applications.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  My journey in tech started with a curiosity about how things work on the web, which led me to 
                  pursue a degree in Computer Science. Since then, I've been fortunate to work with amazing teams 
                  and contribute to projects that impact thousands of users.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  When I'm not coding, you can find me exploring new technologies, contributing to open source, 
                  or sharing knowledge with the developer community. I believe in continuous learning and 
                  staying curious about emerging trends in software development.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Skills Section - New Creative Design */}
          <motion.section className="mb-20 relative overflow-hidden" variants={itemVariants}>
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10 rounded-3xl"></div>
            
            {/* Floating Tech Icons */}
            <motion.div
              className="absolute top-10 left-10 w-16 h-16 text-5xl opacity-10 dark:opacity-20"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⚛️
            </motion.div>
            <motion.div
              className="absolute top-20 right-16 w-12 h-12 text-4xl opacity-10 dark:opacity-20"
              animate={{
                y: [0, 20, 0],
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              🐍
            </motion.div>
            <motion.div
              className="absolute bottom-16 left-1/3 w-14 h-14 text-3xl opacity-10 dark:opacity-20"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            >
              🐳
            </motion.div>
            
            <div className="relative z-10 p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Skills & Technologies
              </h2>
              
              {/* Skills Categories with Interactive Design */}
              <div className="space-y-12">
                {/* Frontend Development */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl text-white mr-4 shadow-lg">
                      🎨
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Frontend Development</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent ml-6"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.filter(skill => skill.category === 'Frontend').map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="group relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 relative overflow-hidden">
                          {/* Skill Icon with Glow Effect */}
                          <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                            {skill.icon}
                          </div>
                          
                          {/* Skill Info */}
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{skill.description}</p>
                          
                          {/* Tags with Hover Effect */}
                          <div className="flex flex-wrap gap-2">
                            {skill.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium transition-all duration-200 group-hover:bg-blue-100 group-hover:text-blue-700 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-300"
                                whileHover={{ scale: 1.05 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                          
                          {/* Hover Glow Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Backend Development */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl text-white mr-4 shadow-lg">
                      ⚙️
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Backend Development</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent ml-6"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.filter(skill => skill.category === 'Backend').map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="group relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 relative overflow-hidden">
                          {/* Skill Icon with Glow Effect */}
                          <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                            {skill.icon}
                          </div>
                          
                          {/* Skill Info */}
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{skill.description}</p>
                          
                          {/* Tags with Hover Effect */}
                          <div className="flex flex-wrap gap-2">
                            {skill.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium transition-all duration-200 group-hover:bg-green-100 group-hover:text-green-700 dark:group-hover:bg-green-900/30 dark:group-hover:text-green-300"
                                whileHover={{ scale: 1.05 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                          
                          {/* Hover Glow Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Language Skills */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl text-white mr-4 shadow-lg">
                      💻
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Programming Languages</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-yellow-500 to-transparent ml-6"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.filter(skill => skill.category === 'Language').map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="group relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 relative overflow-hidden">
                          {/* Skill Icon with Glow Effect */}
                          <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                            {skill.icon}
                          </div>
                          
                          {/* Skill Info */}
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{skill.description}</p>
                          
                          {/* Tags with Hover Effect */}
                          <div className="flex flex-wrap gap-2">
                            {skill.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium transition-all duration-200 group-hover:bg-yellow-100 group-hover:text-yellow-700 dark:group-hover:bg-yellow-900/30 dark:group-hover:text-yellow-300"
                                whileHover={{ scale: 1.05 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                          
                          {/* Hover Glow Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Other Categories */}
                {['Database', 'DevOps'].map((category, categoryIndex) => (
                  <motion.div
                    key={category}
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + categoryIndex * 0.1 }}
                  >
                    <div className="flex items-center mb-8">
                      <div className={`w-12 h-12 bg-gradient-to-br ${
                        category === 'Database' ? 'from-blue-600 to-cyan-600' :
                        'from-purple-500 to-pink-500'
                      } rounded-xl flex items-center justify-center text-2xl text-white mr-4 shadow-lg`}>
                        {category === 'Database' ? '🗄️' : '🛠️'}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category}</h3>
                      <div className={`flex-1 h-px bg-gradient-to-r ${
                        category === 'Database' ? 'from-blue-600' :
                        'from-purple-500'
                      } to-transparent ml-6`}></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {skills.filter(skill => skill.category === category).map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="group relative"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/50 relative overflow-hidden">
                            {/* Skill Icon with Glow Effect */}
                            <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                              {skill.icon}
                            </div>
                            
                            {/* Skill Info */}
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{skill.description}</p>
                            
                            {/* Tags with Hover Effect */}
                            <div className="flex flex-wrap gap-2">
                              {skill.tags.map((tag, tagIndex) => (
                                <motion.span
                                  key={tagIndex}
                                  className={`px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium transition-all duration-200 ${
                                    category === 'Database' ? 'group-hover:bg-blue-100 group-hover:text-blue-700 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-300' :
                                    'group-hover:bg-purple-100 group-hover:text-purple-700 dark:group-hover:bg-purple-900/30 dark:group-hover:text-purple-300'
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {tag}
                                </motion.span>
                              ))}
                            </div>
                            
                            {/* Hover Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Timeline Section */}
          <motion.section className="mb-20" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              My Journey
            </h2>
            <Timeline items={timelineData} />
          </motion.section>

          {/* Values Section */}
          <motion.section className="mb-20" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              What I Value
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Quality',
                  description: 'Writing clean, maintainable code that stands the test of time.',
                  icon: '✨'
                },
                {
                  title: 'Learning',
                  description: 'Continuously improving and staying up-to-date with new technologies.',
                  icon: '🚀'
                },
                {
                  title: 'Collaboration',
                  description: 'Working together to achieve better results than working alone.',
                  icon: '🤝'
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section className="text-center" variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a chat about technology and development.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="btn-primary text-lg px-8 py-3 inline-block"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.section>
        </div>
      </motion.div>
    </>
  );
};

export default About;
