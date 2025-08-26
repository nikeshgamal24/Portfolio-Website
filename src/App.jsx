import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { initializeTheme } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import ParticleEffect from '@/components/ParticleEffect';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <BackgroundAnimation />
        <ParticleEffect />
        <div className="min-h-screen bg-transparent">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
