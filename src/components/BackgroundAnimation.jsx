import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BackgroundAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating shapes
  const shapes = [
    { id: 1, size: 60, x: 10, y: 20, delay: 0, duration: 20 },
    { id: 2, size: 40, x: 80, y: 60, delay: 2, duration: 25 },
    { id: 3, size: 80, x: 70, y: 10, delay: 4, duration: 30 },
    { id: 4, size: 50, x: 20, y: 70, delay: 6, duration: 22 },
    { id: 5, size: 70, x: 90, y: 30, delay: 8, duration: 28 },
    { id: 6, size: 45, x: 5, y: 50, delay: 10, duration: 24 },
  ];

  // Gradient orbs
  const orbs = [
    { id: 1, x: 20, y: 30, size: 200, color: 'from-blue-400/20 to-purple-400/20' },
    { id: 2, x: 80, y: 70, size: 150, color: 'from-green-400/20 to-blue-400/20' },
    { id: 3, x: 60, y: 20, size: 180, color: 'from-purple-400/20 to-pink-400/20' },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-1000" />
      
      {/* Moving gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-transparent to-purple-100/30 dark:from-blue-900/30 dark:to-purple-900/30"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Gradient orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute w-${orb.size} h-${orb.size} rounded-full bg-gradient-to-r ${orb.color} blur-3xl`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: orb.id * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-10 dark:opacity-20"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut"
          }}
        >
          <div
            className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 rounded-lg"
            style={{ width: shape.size, height: shape.size }}
          />
        </motion.div>
      ))}

      {/* Interactive mouse-following gradient */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x * window.innerWidth - 192,
          y: mousePosition.y * window.innerHeight - 192,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20
        }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 dark:bg-blue-300/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Wave effect at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-100/20 via-transparent to-transparent dark:from-blue-900/20"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;
