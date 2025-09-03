import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { fetchRepos } from '@/lib/github';
import ProjectGrid from '@/components/ProjectGrid';
import projectsData from '@/data/projects.json';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from GitHub API first
        const githubProjects = await fetchRepos({
          username: siteConfig.githubUsername
        });

        if (githubProjects && githubProjects.length > 0) {
          // Merge with manual projects and deduplicate
          const allProjects = [...githubProjects];
          
          // Add manual projects that aren't already in GitHub projects
          projectsData.forEach(manualProject => {
            const exists = allProjects.find(p => p.slug === manualProject.slug);
            if (!exists) {
              allProjects.push(manualProject);
            }
          });

          setProjects(allProjects);
        } else {
          // Fallback to manual projects only
          setProjects(projectsData);
        }
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects from GitHub. Showing manual projects instead.');
        setProjects(projectsData);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">
              Loading projects...
            </h2>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Projects - {siteConfig.seo.title}</title>
        <meta name="description" content="Explore my latest projects and work. From web applications to open source contributions." />
        <meta property="og:title" content={`Projects - ${siteConfig.seo.title}`} />
        <meta property="og:description" content="Explore my latest projects and work. From web applications to open source contributions." />
        <meta property="og:image" content={siteConfig.seo.image} />
      </Helmet>

      <motion.div
        className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              My Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A collection of my work, from personal projects to open source contributions. 
              Each project represents a learning experience and a step forward in my development journey.
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-yellow-800 dark:text-yellow-200 text-sm">
                  {error}
                </span>
              </div>
            </motion.div>
          )}

          {/* Projects Grid */}
          <motion.div variants={itemVariants}>
            <ProjectGrid projects={projects} />
          </motion.div>

          {/* View More Projects Button */}
          <motion.div
            className="text-center mt-16"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>View More Projects on GitHub</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Have a project in mind?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and opportunities. 
              Let's discuss how we can work together to bring your ideas to life.
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
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Projects;
