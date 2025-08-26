import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeViewer = ({ isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  // Close overlay on ESC key or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleReset = () => setZoom(1);
  
  const handleDownload = async () => {
    try {
      // Show loading state
      const downloadBtn = document.getElementById('downloadBtn');
      if (downloadBtn) {
        downloadBtn.textContent = 'Generating PDF...';
        downloadBtn.disabled = true;
      }

      // Get the resume content element
      const resumeElement = containerRef.current;
      if (!resumeElement) {
        throw new Error('Resume element not found');
      }

      // Convert HTML to canvas
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: resumeElement.scrollHeight
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download the PDF
      pdf.save('YourName_Resume.pdf');

      // Reset button state
      if (downloadBtn) {
        downloadBtn.textContent = 'Download PDF';
        downloadBtn.disabled = false;
      }

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
      
      // Reset button state on error
      const downloadBtn = document.getElementById('downloadBtn');
      if (downloadBtn) {
        downloadBtn.textContent = 'Download PDF';
        downloadBtn.disabled = false;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          ref={overlayRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
        >
          {/* Header Controls Bar */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold">ATS-Optimized Resume</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleZoomOut}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="min-w-[60px] text-center font-mono">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={handleZoomIn}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleReset}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm transition-colors"
              >
                Reset
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center space-x-2 transition-colors"
                id="downloadBtn"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download PDF</span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Resume Content Area */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <div className="h-full overflow-auto p-6">
              <div className="flex justify-center">
                <div
                  ref={containerRef}
                  className="bg-white shadow-lg border border-gray-200 dark:border-gray-700"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease',
                    width: '800px',
                    minHeight: '1200px'
                  }}
                >
                  {/* ATS-Optimized Resume Content - Always White Background with Black Text */}
                  <div className="p-8 font-['Arial',sans-serif] text-black leading-normal bg-white">
                    {/* Header - ATS Optimized */}
                    <div className="text-center border-b-2 border-black pb-4 mb-6">
                      <h1 className="text-4xl font-bold text-black mb-2">YOUR NAME</h1>
                      <p className="text-xl text-black mb-3 font-semibold">Full Stack Software Engineer</p>
                      <div className="text-sm text-black space-y-1">
                        <p>San Francisco, CA | your.email@example.com | +1 (555) 123-4567</p>
                        <p>LinkedIn: linkedin.com/in/yourprofile | GitHub: github.com/yourusername</p>
                      </div>
                    </div>

                    {/* Professional Summary - ATS Keywords */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">PROFESSIONAL SUMMARY</h2>
                      <p className="text-black text-sm leading-relaxed">
                        Results-driven Full Stack Software Engineer with 4+ years of experience in developing scalable web applications, 
                        RESTful APIs, and cloud-native solutions. Proficient in JavaScript, React, Node.js, Python, and AWS. 
                        Demonstrated expertise in Agile methodologies, CI/CD pipelines, and database optimization. 
                        Strong problem-solving skills with a track record of delivering high-quality software solutions 
                        that improve user experience and business performance.
                      </p>
                    </div>

                    {/* Core Competencies - ATS Keywords */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">CORE COMPETENCIES</h2>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-black">Programming Languages:</p>
                          <p className="text-black">JavaScript (ES6+), TypeScript, Python, Java, C++, SQL</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">Frontend Technologies:</p>
                          <p className="text-black">React.js, Redux, Next.js, HTML5, CSS3, Tailwind CSS, Bootstrap</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">Backend Technologies:</p>
                          <p className="text-black">Node.js, Express.js, Django, REST APIs, GraphQL, Microservices</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">Databases & Cloud:</p>
                          <p className="text-black">MongoDB, PostgreSQL, MySQL, Redis, AWS, Docker, Kubernetes</p>
                        </div>
                      </div>
                    </div>

                    {/* Professional Experience - ATS Optimized */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">PROFESSIONAL EXPERIENCE</h2>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-black text-lg">Senior Full Stack Software Engineer</h3>
                          <span className="text-black font-semibold">January 2022 - Present</span>
                        </div>
                        <p className="font-semibold text-black mb-2">TechCorp Inc., San Francisco, CA</p>
                        <ul className="text-black text-sm space-y-1 ml-4">
                          <li>• Developed and maintained 5+ full-stack web applications using React.js, Node.js, and MongoDB, serving over 100,000 active users</li>
                          <li>• Implemented RESTful APIs and microservices architecture, improving system performance by 40% and reducing API response time by 60%</li>
                          <li>• Designed and optimized database schemas, implemented MongoDB indexing strategies, and integrated Redis caching, resulting in 50% faster query performance</li>
                          <li>• Established CI/CD pipelines using Jenkins and GitHub Actions, reducing deployment time from 2 hours to 15 minutes</li>
                          <li>• Led code reviews and mentored 3 junior developers, improving team code quality and reducing bug reports by 30%</li>
                          <li>• Collaborated with product managers and UX designers to implement user-centered solutions, increasing user satisfaction scores by 25%</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-black text-lg">Full Stack Software Engineer</h3>
                          <span className="text-black font-semibold">June 2020 - December 2021</span>
                        </div>
                        <p className="font-semibold text-black mb-2">StartupXYZ, San Francisco, CA</p>
                        <ul className="text-black text-sm space-y-1 ml-4">
                          <li>• Built MVP applications from concept to deployment using React.js, Node.js, and PostgreSQL, contributing to 200% user growth</li>
                          <li>• Implemented responsive design principles and cross-browser compatibility, achieving 99.9% uptime across all platforms</li>
                          <li>• Developed RESTful APIs and integrated third-party services including Stripe for payment processing and SendGrid for email automation</li>
                          <li>• Participated in Agile development cycles, delivering features 2 weeks ahead of schedule on average</li>
                          <li>• Optimized database queries and implemented caching strategies, improving application load time by 45%</li>
                        </ul>
                      </div>
                    </div>

                    {/* Technical Projects - ATS Keywords */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">TECHNICAL PROJECTS</h2>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">E-Commerce Management System</h3>
                          <span className="text-black font-semibold">December 2024</span>
                        </div>
                        <p className="font-semibold text-black mb-2">Technologies: React.js, Node.js, Express.js, MongoDB, Redis, RTK Query, Tailwind CSS, AWS, Docker</p>
                        <p className="text-black text-sm mb-2">Full-stack e-commerce platform with role-based access control, inventory management, and analytics dashboard</p>
                        <ul className="text-black text-sm space-y-1 ml-4">
                          <li>• Implemented user authentication and authorization using JWT tokens and role-based access control (RBAC)</li>
                          <li>• Designed scalable database architecture with MongoDB, implemented data validation and error handling</li>
                          <li>• Integrated Redis caching layer, reducing database load by 40% and improving response times</li>
                          <li>• Built responsive admin dashboard with real-time analytics, inventory tracking, and order management</li>
                          <li>• Implemented QR code generation for product tracking and integrated thermal receipt printing using WebUSB API</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">Project Phoenix - College Management Platform</h3>
                          <span className="text-black font-semibold">August 2024</span>
                        </div>
                        <p className="font-semibold text-black mb-2">Technologies: React.js, Node.js, Express.js, MongoDB, RTK Query, Tailwind CSS, AWS, Docker</p>
                        <p className="text-black text-sm mb-2">Award-winning centralized project management platform streamlining student project lifecycle from submission to evaluation</p>
                        <ul className="text-black text-sm space-y-1 ml-4">
                          <li>• Developed intelligent supervisor assignment system using Cosine Similarity algorithms and machine learning</li>
                          <li>• Implemented automated result generation, progress tracking, and deadline management features</li>
                          <li>• Built comprehensive project management tools including extension requests, milestone tracking, and collaboration features</li>
                          <li>• Integrated real-time notifications, file upload/download, and version control for project documents</li>
                          <li>• Achieved 95% user satisfaction and reduced administrative overhead by 70%</li>
                        </ul>
                      </div>
                    </div>

                    {/* Education - ATS Standard */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">EDUCATION</h2>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-black text-lg">Master of Science in Software Engineering</h3>
                            <p className="text-black font-semibold">Tech Institute, San Francisco, CA</p>
                            <p className="text-black text-sm">GPA: 3.8/4.0 | Relevant Coursework: Advanced Algorithms, Software Architecture, Database Systems</p>
                          </div>
                          <span className="text-black font-semibold">2022 - 2024</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-black text-lg">Bachelor of Science in Computer Science</h3>
                            <p className="text-black font-semibold">University of Technology, San Francisco, CA</p>
                            <p className="text-black text-sm">GPA: 3.7/4.0 | Relevant Coursework: Data Structures, Object-Oriented Programming, Web Development</p>
                          </div>
                          <span className="text-black font-semibold">2018 - 2022</span>
                        </div>
                      </div>
                    </div>

                    {/* Certifications - ATS Keywords */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">CERTIFICATIONS</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-black">AWS Certified Developer Associate</p>
                            <p className="text-black text-sm">Amazon Web Services</p>
                          </div>
                          <span className="text-black font-semibold">2023</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-black">Google Cloud Professional Cloud Developer</p>
                            <p className="text-black text-sm">Google Cloud Platform</p>
                          </div>
                          <span className="text-black font-semibold">2022</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-black">MongoDB Certified Developer</p>
                            <p className="text-black text-sm">MongoDB University</p>
                          </div>
                          <span className="text-black font-semibold">2023</span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Skills - ATS Keywords */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">TECHNICAL SKILLS</h2>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-semibold text-black">Programming Languages:</p>
                          <p className="text-black">JavaScript (ES6+), TypeScript, Python, Java, C++, SQL, HTML5, CSS3</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">Frontend Development:</p>
                          <p className="text-black">React.js, Redux, Next.js, Vue.js, Angular, Bootstrap, Tailwind CSS, Sass, Webpack, Babel</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">Backend Development:</p>
                          <p className="text-black">Node.js, Express.js, Django, Flask, REST APIs, GraphQL, Microservices, Serverless Architecture</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">Databases & ORMs:</p>
                          <p className="text-black">MongoDB, PostgreSQL, MySQL, Redis, Mongoose, Sequelize, Prisma, Database Design, Data Modeling</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">DevOps & Cloud:</p>
                          <p className="text-black">AWS, Docker, Kubernetes, CI/CD, Jenkins, GitHub Actions, Git, Linux, Nginx, Load Balancing</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">Testing & Quality:</p>
                          <p className="text-black">Jest, Mocha, Chai, Cypress, Selenium, Unit Testing, Integration Testing, E2E Testing, Code Coverage</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Skills - ATS Keywords */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">ADDITIONAL SKILLS</h2>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-black">Methodologies:</p>
                          <p className="text-black">Agile, Scrum, Kanban, Test-Driven Development (TDD), Behavior-Driven Development (BDD)</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">Soft Skills:</p>
                          <p className="text-black">Leadership, Team Management, Problem Solving, Communication, Mentoring, Code Reviews</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">Tools & Platforms:</p>
                          <p className="text-black">VS Code, Postman, Jira, Confluence, Slack, Zoom, Microsoft Office Suite</p>
                        </div>
                        <div>
                          <p className="font-semibold text-black">Languages:</p>
                          <p className="text-black">English (Native), Spanish (Professional Working Proficiency)</p>
                        </div>
                      </div>
                    </div>

                    {/* References */}
                    <div>
                      <h2 className="text-xl font-bold text-black mb-3 border-b border-black pb-1">REFERENCES</h2>
                      <p className="text-black text-sm">
                        Available upon request. Professional references from previous employers and colleagues 
                        can speak to technical abilities, work ethic, and collaborative skills.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeViewer;
