import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import StarField from './components/StarField';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ResearchPage from './pages/ResearchPage';
import RequestPage from './pages/RequestPage';
import ContactPage from './pages/ContactPage';

// ── Page order for swipe + direction calculation ─────────────
const pages = [
  '/',
  '/services',
  '/projects',
  '/research',
  '/request-project',
  '/contact',
];

// ── Old id → path (keeps all onNavigate calls working) ───────
const pageMap: Record<string, string> = {
  home:     '/',
  services: '/services',
  projects: '/projects',
  research: '/research',
  request:  '/request-project',
  contact:  '/contact',
};

// ── Path → old id (keeps Navbar active highlight working) ────
const reverseMap: Record<string, string> = {
  '/':                 'home',
  '/services':         'services',
  '/projects':         'projects',
  '/research':         'research',
  '/request-project':  'request',
  '/contact':          'contact',
};

// ── Page titles ───────────────────────────────────────────────
const pageTitles: Record<string, string> = {
  '/':                 'Moon Bow | AI Chatbot & Automation Agency',
  '/services':         'Services | Moon Bow',
  '/projects':         'Projects | Moon Bow',
  '/research':         'Research | Moon Bow',
  '/request-project':  'Request a Project | Moon Bow',
  '/contact':          'Contact | Moon Bow',
};

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
};

const pageTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
};

// ── Inner App (must be inside BrowserRouter) ─────────────────
function AppInner() {
  const navigate      = useNavigate();
  const location      = useLocation();
  const [direction, setDirection] = useState(0);
  const touchStartX   = useRef<number>(0);
  const touchEndX     = useRef<number>(0);

  // ── Page title + scroll on route change ───────────────────
  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? 'Moon Bow';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // ── Navigate by old id OR new path ────────────────────────
  const navigateToPage = (page: string) => {
    const path         = pageMap[page] ?? page;
    const currentIndex = pages.indexOf(location.pathname);
    const newIndex     = pages.indexOf(path);
    setDirection(newIndex > currentIndex ? 1 : -1);
    navigate(path);
  };

  // ── Swipe gestures (unchanged) ────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff           = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      const currentIndex = pages.indexOf(location.pathname);

      if (diff > 0 && currentIndex < pages.length - 1) {
        navigateToPage(pages[currentIndex + 1]);
      } else if (diff < 0 && currentIndex > 0) {
        navigateToPage(pages[currentIndex - 1]);
      }
    }
  };

  const currentPageId = reverseMap[location.pathname] ?? 'home';

  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <StarField />
      <Navbar currentPage={currentPageId} onNavigate={navigateToPage} />
      <main className="pt-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={location.pathname}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
          >
            <Routes location={location}>
              <Route path="/"                element={<HomePage onNavigate={navigateToPage} />} />
              <Route path="/services"        element={<ServicesPage />} />
              <Route path="/projects"        element={<ProjectsPage />} />
              <Route path="/research"        element={<ResearchPage />} />
              <Route path="/request-project" element={<RequestPage />} />
              <Route path="/contact"         element={<ContactPage />} />
              <Route path="*"               element={<HomePage onNavigate={navigateToPage} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}