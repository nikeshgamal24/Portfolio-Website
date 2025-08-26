import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const SkillsOverlay = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const overlayRef = useRef(null);

  // Handle ESC key and click outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset'; // Restore scrolling
    };
  }, [isOpen, onClose]);

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: '🎨',
      skills: [
        { 
          name: 'React', 
          level: 'Expert',
          description: 'Building modern, scalable React applications with hooks and context',
          tags: ['Hooks', 'Context', 'Redux', 'Next.js'],
          color: 'from-blue-500 to-cyan-500'
        },
        { 
          name: 'JavaScript', 
          level: 'Expert',
          description: 'ES6+ features, async programming, and modern JavaScript patterns',
          tags: ['ES6+', 'Async/Await', 'Promises', 'Modules'],
          color: 'from-yellow-500 to-orange-500'
        },
        { 
          name: 'Tailwind CSS', 
          level: 'Advanced',
          description: 'Utility-first CSS framework for rapid UI development',
          tags: ['Responsive', 'Custom CSS', 'Dark Mode', 'Animations'],
          color: 'from-cyan-500 to-blue-500'
        },
        { 
          name: 'HTML/CSS', 
          level: 'Expert',
          description: 'Semantic HTML and modern CSS with animations and layouts',
          tags: ['Semantic', 'Flexbox', 'Grid', 'Animations'],
          color: 'from-orange-500 to-red-500'
        },
        { 
          name: 'Framer Motion', 
          level: 'Advanced',
          description: 'Creating smooth animations and micro-interactions',
          tags: ['Animations', 'Transitions', 'Gestures', 'Variants'],
          color: 'from-purple-500 to-pink-500'
        }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: '⚙️',
      skills: [
        { 
          name: 'Node.js', 
          level: 'Advanced',
          description: 'Server-side JavaScript runtime for building scalable applications',
          tags: ['Runtime', 'NPM', 'Modules', 'Performance'],
          color: 'from-green-500 to-emerald-500'
        },
        { 
          name: 'Express.js', 
          level: 'Advanced',
          description: 'Fast, unopinionated web framework for Node.js',
          tags: ['REST APIs', 'Middleware', 'Routing', 'Error Handling'],
          color: 'from-gray-500 to-slate-500'
        },
        { 
          name: 'Python', 
          level: 'Intermediate',
          description: 'Versatile programming language for backend and automation',
          tags: ['Django', 'Flask', 'Data Analysis', 'Automation'],
          color: 'from-blue-500 to-indigo-500'
        },
        { 
          name: 'PostgreSQL', 
          level: 'Intermediate',
          description: 'Advanced open-source relational database',
          tags: ['SQL', 'Indexing', 'Performance', 'ACID'],
          color: 'from-blue-600 to-cyan-600'
        },
        { 
          name: 'MongoDB', 
          level: 'Intermediate',
          description: 'NoSQL document database for flexible data storage',
          tags: ['NoSQL', 'Documents', 'Aggregation', 'Indexing'],
          color: 'from-green-600 to-emerald-600'
        }
      ]
    },
    tools: {
      title: 'Tools & DevOps',
      icon: '🛠️',
      skills: [
        { 
          name: 'Git/GitHub', 
          level: 'Advanced',
          description: 'Version control and collaborative development platform',
          tags: ['Version Control', 'Branches', 'PRs', 'CI/CD'],
          color: 'from-gray-700 to-gray-900'
        },
        { 
          name: 'Docker', 
          level: 'Intermediate',
          description: 'Containerization platform for consistent deployments',
          tags: ['Containers', 'Images', 'Dockerfile', 'Compose'],
          color: 'from-blue-600 to-cyan-600'
        },
        { 
          name: 'VS Code', 
          level: 'Expert',
          description: 'Powerful code editor with extensive extensions',
          tags: ['Extensions', 'Debugging', 'Git Integration', 'Terminal'],
          color: 'from-blue-500 to-purple-500'
        },
        { 
          name: 'Postman', 
          level: 'Advanced',
          description: 'API development and testing platform',
          tags: ['API Testing', 'Collections', 'Environments', 'Automation'],
          color: 'from-orange-500 to-red-500'
        },
        { 
          name: 'Vercel', 
          level: 'Advanced',
          description: 'Cloud platform for static sites and serverless functions',
          tags: ['Deployment', 'Serverless', 'Edge Functions', 'Analytics'],
          color: 'from-black to-gray-700'
        }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.8, y: 50 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={overlayRef}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <motion.div
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {skillCategories[selectedCategory].icon}
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Skills & Expertise
              </h2>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Category Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-1 px-6 py-4 text-center transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <motion.div
                  className="text-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {skillCategories[category].title}
                </motion.div>
              </button>
            ))}
          </div>

          {/* Skills Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Debug info - remove this later */}
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
              <strong>Debug:</strong> Selected Category: {selectedCategory} | Skills Count: {skillCategories[selectedCategory]?.skills?.length || 0}
            </div>
            
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skillCategories[selectedCategory]?.skills?.map((skill, index) => (
                <motion.div
                  key={`${selectedCategory}-${skill.name}-${index}`}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 h-full relative overflow-hidden">
                    {/* Skill icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    
                    {/* Skill name and level */}
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {skill.name}
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                        {skill.level}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {skill.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {skill.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Fun Interactive Element */}
            <motion.div
              className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-2xl mb-2"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎯
                </motion.div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Fun Fact:</strong> I'm constantly learning and these skills are always evolving! 
                  Click on different categories to explore my expertise areas.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillsOverlay;
