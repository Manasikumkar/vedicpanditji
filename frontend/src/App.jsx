import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BookingModal from './components/common/BookingModal';
import Toast from './components/common/Toast';

// Core Homepage (Synchronous for instant first paint and robust reliability)
import HomePage from './pages/HomePage';

// Route-level Lazy Loaded Pages
const CataloguePage = lazy(() => import('./pages/CataloguePage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const SeoLandingPage = lazy(() => import('./pages/SeoLandingPage'));
const PujaGuidesHubPage = lazy(() => import('./pages/PujaGuidesHubPage'));
const PujaGuideDetailPage = lazy(() => import('./pages/PujaGuideDetailPage'));
const TempleServicesPage = lazy(() => import('./pages/TempleServicesPage'));
const PujaMaterialsPage = lazy(() => import('./pages/PujaMaterialsPage'));
const HowWeWorkPage = lazy(() => import('./pages/HowWeWorkPage'));
const FaqsPage = lazy(() => import('./pages/FaqsPage'));
const ContactEnquiryPage = lazy(() => import('./pages/ContactEnquiryPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animatePageEntrance, initScrollReveals } from './utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

function RouteLoadingFallback() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          border: '3px solid #EAE5D9',
          borderTopColor: '#BD4B23',
          borderRadius: '50%',
          animation: 'vpRouteSpin 0.7s linear infinite',
        }}
      />
      <style>{`@keyframes vpRouteSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

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
      case 'services':
        return <CataloguePage />;
      case 'service-detail':
        return <ServiceDetailPage />;
      case 'location-detail':
        return <LocationPage />;
      case 'seo-landing':
        return <SeoLandingPage />;
      case 'puja-guides-hub':
      case 'puja-guides':
        return <PujaGuidesHubPage />;
      case 'puja-guide-detail':
        return <PujaGuideDetailPage />;
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
      case 'about':
      case 'about-us':
        return <AboutUsPage />;
      case 'policies':
      case 'legal':
        return <LegalPage />;
      case 'sitemap':
        return <SitemapPage />;
      case 'not-found':
        return <NotFoundPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main ref={mainRef} style={{ flex: 1 }}>
        <Suspense fallback={<RouteLoadingFallback />}>
          {renderCurrentPage()}
        </Suspense>
      </main>

      <Footer />

      {/* Global Interactive Elements */}
      <BookingModal />
      <Toast />
    </div>
  );
}
