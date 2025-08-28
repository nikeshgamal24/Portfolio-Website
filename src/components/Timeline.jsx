import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Timeline = ({ items }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Function to get appropriate icon and color based on title with better contrast
  const getTimelineStyle = (title) => {
    if (title.includes('Convocation') || title.includes('University')) {
      return { 
        icon: '🎓', 
        color: 'from-purple-600 to-pink-600', 
        bgColor: 'from-white to-gray-50', 
        darkBg: 'from-gray-800 to-gray-700',
        textColor: 'text-gray-900',
        darkTextColor: 'dark:text-white',
        detailColor: 'text-gray-700',
        darkDetailColor: 'dark:text-gray-300'
      };
    } else if (title.includes('Project') || title.includes('Exhibition')) {
      return { 
        icon: '🚀', 
        color: 'from-blue-600 to-cyan-600', 
        bgColor: 'from-white to-blue-50', 
        darkBg: 'from-gray-800 to-blue-900/30',
        textColor: 'text-gray-900',
        darkTextColor: 'dark:text-white',
        detailColor: 'text-gray-700',
        darkDetailColor: 'dark:text-gray-300'
      };
    } else if (title.includes('Internship')) {
      return { 
        icon: '💼', 
        color: 'from-green-600 to-emerald-600', 
        bgColor: 'from-white to-green-50', 
        darkBg: 'from-gray-800 to-green-900/30',
        textColor: 'text-gray-900',
        darkTextColor: 'dark:text-white',
        detailColor: 'text-gray-700',
        darkDetailColor: 'dark:text-gray-300'
      };
    } else if (title.includes('Exam') || title.includes('GPA')) {
      return { 
        icon: '📚', 
        color: 'from-yellow-600 to-orange-600', 
        bgColor: 'from-white to-yellow-50', 
        darkBg: 'from-gray-800 to-yellow-900/30',
        textColor: 'text-gray-900',
        darkTextColor: 'dark:text-white',
        detailColor: 'text-gray-700',
        darkDetailColor: 'dark:text-gray-300'
      };
    } else if (title.includes('Competition')) {
      return { 
        icon: '🏆', 
        color: 'from-red-600 to-pink-600', 
        bgColor: 'from-white to-red-50', 
        darkBg: 'from-gray-800 to-red-900/30',
        textColor: 'text-gray-900',
        darkTextColor: 'dark:text-white',
        detailColor: 'text-gray-700',
        darkDetailColor: 'dark:text-gray-300'
      };
    }
    return { 
      icon: '⭐', 
      color: 'from-gray-600 to-slate-600', 
      bgColor: 'from-white to-gray-50', 
      darkBg: 'from-gray-800 to-gray-700',
      textColor: 'text-gray-900',
      darkTextColor: 'dark:text-white',
      detailColor: 'text-gray-700',
      darkDetailColor: 'dark:text-gray-300'
    };
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Enhanced Timeline line with gradient */}
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
      
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full opacity-60"
          animate={{
            y: [0, 15, 0],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-pink-500 rounded-full opacity-60"
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {items.map((item, index) => {
          const style = getTimelineStyle(item.title);
          
          return (
            <motion.div
              key={index}
              className="relative flex items-start space-x-6"
              variants={itemVariants}
            >
              {/* Enhanced Timeline dot with glow effect */}
              <div className="relative z-20 flex-shrink-0">
                <motion.div 
                  className={`w-12 h-12 bg-gradient-to-br ${style.color} rounded-full border-4 border-white dark:border-gray-900 shadow-2xl flex items-center justify-center text-white text-lg font-bold`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {style.icon}
                </motion.div>
                
                {/* Glow effect */}
                <div className={`absolute inset-0 w-12 h-12 bg-gradient-to-br ${style.color} rounded-full blur-xl opacity-30 animate-pulse`}></div>
                
                {/* Year badge */}
                <motion.div 
                  className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg border border-gray-200 dark:border-gray-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.year}</span>
                </motion.div>
              </div>
              
              {/* Enhanced Content Card with better contrast */}
              <motion.div 
                className="flex-1 min-w-0"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border-2 border-gray-200 dark:border-gray-600`}>
                  
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-400 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-400 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                  </div>
                  
                  {/* Content with improved readability */}
                  <div className="relative z-10">
                    <motion.h3 
                      className={`text-2xl font-bold ${style.textColor} ${style.darkTextColor} mb-4 leading-tight`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {item.title}
                    </motion.h3>
                    
                    <motion.p 
                      className={`text-lg ${style.detailColor} ${style.darkDetailColor} leading-relaxed font-medium`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {item.detail}
                    </motion.p>
                  </div>
                  
                  {/* Subtle accent border */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.color} rounded-t-2xl`}></div>
                  
                  {/* Hover glow effect */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-0 rounded-2xl transition-opacity duration-300`}
                    whileHover={{ opacity: 0.05 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Bottom decorative element */}
      <motion.div 
        className="absolute -bottom-8 left-6 w-4 h-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      />
    </div>
  );
};

export default Timeline;
