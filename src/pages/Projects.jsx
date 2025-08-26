import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Have a project in mind?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and opportunities. 
              Let's discuss how we can work together to bring your ideas to life.
            </p>
            <motion.a
              href="/contact"
              className="btn-primary text-lg px-8 py-3 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Projects;
