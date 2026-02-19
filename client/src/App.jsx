import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './views/components/Layout';
import Home from './views/pages/Home';
import About from './views/pages/About';
import Services from './views/pages/Services';
import Portfolio from './views/pages/Portfolio';
import Videos from './views/pages/Videos';
import Contact from './views/pages/Contact';
import Pricing from './views/pages/Pricing';
import AdminLayout from './views/admin/AdminLayout';
import AdminHome from './views/admin/AdminHome';
import AdminPortfolio from './views/admin/AdminPortfolio';
import AdminVideos from './views/admin/AdminVideos';
import AdminContacts from './views/admin/AdminContacts';
import AdminLogin from './views/admin/AdminLogin';
import RequireAdmin from './views/admin/RequireAdmin';
import NotFound from './views/pages/NotFound';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* <Route path="/videos" element={<Videos />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
            <Route index element={<AdminHome />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="videos" element={<AdminVideos />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
