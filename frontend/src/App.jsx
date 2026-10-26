import React, { useEffect, useRef } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BookingModal from './components/common/BookingModal';
import Toast from './components/common/Toast';

// Pages
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import TempleServicesPage from './pages/TempleServicesPage';
import PujaMaterialsPage from './pages/PujaMaterialsPage';
import HowWeWorkPage from './pages/HowWeWorkPage';
import FaqsPage from './pages/FaqsPage';
import ContactEnquiryPage from './pages/ContactEnquiryPage';
import AuthPage from './pages/AuthPage';
import MyAccountPage from './pages/MyAccountPage';
import LegalPage from './pages/LegalPage';
import AboutUsPage from './pages/AboutUsPage';
import SeoLandingPage from './pages/SeoLandingPage';
import SitemapPage from './pages/SitemapPage';

// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animatePageEntrance, initScrollReveals } from './utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { currentRoute } = useApp();
  const mainRef = useRef(null);

  // Trigger smooth GSAP animations on page transition
  useEffect(() => {
    // Reset scroll smoothly on route navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    const pageTween = animatePageEntrance(mainRef.current);
    const cleanupScroll = initScrollReveals(mainRef.current);

    // Refresh ScrollTrigger calculations after DOM paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      if (pageTween) pageTween.kill();
      if (cleanupScroll) cleanupScroll();
      clearTimeout(timer);
    };
  }, [currentRoute]);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'catalogue':
        return <CataloguePage />;
      case 'service-detail':
        return <ServiceDetailPage />;
      case 'temple-services':
        return <TempleServicesPage />;
      case 'puja-materials':
        return <PujaMaterialsPage />;
      case 'how-it-works':
        return <HowWeWorkPage />;
      case 'faqs':
        return <FaqsPage />;
      case 'contact':
        return <ContactEnquiryPage />;
      case 'auth':
      case 'login':
        return <AuthPage />;
      case 'account':
      case 'my-account':
      case 'booking-confirmation':
        return <MyAccountPage />;
      case 'checkout':
        return <CataloguePage />;
      case 'about':
      case 'about-us':
        return <AboutUsPage />;
      case 'seo-landing':
        return <SeoLandingPage />;
      case 'policies':
        return <LegalPage />;
      case 'sitemap':
        return <SitemapPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main ref={mainRef} style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>

      <Footer />

      {/* Global Interactive Elements */}
      <BookingModal />
      <Toast />
    </div>
  );
}
