import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
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

  return (
    <>
      <Helmet>
        <title>Page Not Found - Portfolio</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <motion.div
        className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <div className="text-8xl md:text-9xl font-bold text-gray-200 dark:text-gray-700 mb-8">
              404
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            variants={itemVariants}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 mb-8"
            variants={itemVariants}
          >
            Oops! The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link to="/">
              <motion.button
                className="btn-primary text-lg px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Go Home
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                className="btn-outline text-lg px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 text-gray-500 dark:text-gray-400"
            variants={itemVariants}
          >
            <p className="text-sm">
              If you believe this is an error, please{' '}
              <a
                href="/contact"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                let me know
              </a>
              .
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default NotFound;
