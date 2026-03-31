/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './views/components/Layout';
import Loader from './views/components/Loader';
import PageTransition from './views/components/PageTransition';

// Lazy load all page components for better code splitting
const Home = React.lazy(() => import('./views/pages/Home'));
const About = React.lazy(() => import('./views/pages/About'));
const Services = React.lazy(() => import('./views/pages/Services'));
const Portfolio = React.lazy(() => import('./views/pages/Portfolio'));
const Videos = React.lazy(() => import('./views/pages/Videos'));
const Contact = React.lazy(() => import('./views/pages/Contact'));
const AdminLayout = React.lazy(() => import('./views/admin/AdminLayout'));
const AdminHome = React.lazy(() => import('./views/admin/AdminHome'));
const AdminPortfolio = React.lazy(() => import('./views/admin/AdminPortfolio'));
const AdminVideos = React.lazy(() => import('./views/admin/AdminVideos'));
const AdminContacts = React.lazy(() => import('./views/admin/AdminContacts'));
const AdminLogin = React.lazy(() => import('./views/admin/AdminLogin'));
const RequireAdmin = React.lazy(() => import('./views/admin/RequireAdmin'));
const NotFound = React.lazy(() => import('./views/pages/NotFound'));
/* eslint-enable no-unused-vars */

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<Loader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
              <Route path="/videos" element={<PageTransition><Videos /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
              <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
                <Route index element={<AdminHome />} />
                <Route path="portfolio" element={<AdminPortfolio />} />
                <Route path="videos" element={<AdminVideos />} />
                <Route path="contacts" element={<AdminContacts />} />
              </Route>
              {/* Catch-all route for 404 Not Found */}
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Layout>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
