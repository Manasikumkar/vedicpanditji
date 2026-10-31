import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND_INFO, CITIES, PUNE_LOCALITIES, TRADITIONS, SERVICES } from '../data/vedicPanditData';
import { MULTI_CITY_SEO_PAGES } from '../data/multiCitySeoData';
import { getLocationBySlug } from '../data/locations';
import { submitEnquiryToWebhook } from '../services/webhookService';
import { getSeoMetadata, applySeoMetadataToDom } from '../utils/seoMetadata';
import { Analytics } from '../utils/analytics';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Helper to parse route from pathname on initial load and browser refresh
  const parseRouteFromLocation = () => {
    if (typeof window === 'undefined') return { route: 'home', params: {} };
    
    // Normalize path by removing trailing slash except root
    const path = window.location.pathname.replace(/\/$/, '') || '/';

    // 1. Root Homepage
    if (path === '/') return { route: 'home', params: {} };

    // 2. Services / Catalogue
    if (path === '/catalogue' || path === '/services') return { route: 'catalogue', params: {} };
    
    // 3. Individual Service or Multi-City Landing Page
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      const isPoojaService = SERVICES.some(s => s.id === slug);
      if (isPoojaService) {
        return { route: 'service-detail', params: { serviceId: slug } };
      }

      const isMultiCity = MULTI_CITY_SEO_PAGES.some(p => p.slug === slug);
      if (isMultiCity) {
        return { route: 'seo-landing', params: { slug } };
      }
      
      // Check if it's a location slug mapped under /services/ (legacy alias)
      const locMatch = getLocationBySlug(slug);
      if (locMatch) {
        return { route: 'location-detail', params: { slug: locMatch.slug } };
      }

      // Legacy fallback
      return { route: 'seo-landing', params: { slug } };
    }

    // 4. Programmatic Location Pages (/locations/:slug)
    if (path.startsWith('/locations/')) {
      const slug = path.replace('/locations/', '');
      return { route: 'location-detail', params: { slug } };
    }

    // 5. Puja Guides Content Hub
    if (path === '/puja-guides') return { route: 'puja-guides-hub', params: {} };
    if (path.startsWith('/puja-guides/')) {
      const slug = path.replace('/puja-guides/', '');
      return { route: 'puja-guide-detail', params: { slug } };
    }

    // 6. Core Static Pages
    if (path === '/about' || path === '/about-us') return { route: 'about-us', params: {} };
    if (path === '/how-it-works' || path === '/how-we-work') return { route: 'how-it-works', params: {} };
    if (path === '/faqs') return { route: 'faqs', params: {} };
    if (path === '/contact' || path === '/contact-us') return { route: 'contact', params: {} };
    if (path === '/puja-materials') return { route: 'puja-materials', params: {} };
    if (path === '/temple-services') return { route: 'temple-services', params: {} };
    if (path === '/legal' || path === '/policies') return { route: 'policies', params: {} };
    if (path === '/sitemap' || path === '/sitemap.html') return { route: 'sitemap', params: {} };
    if (path === '/404' || path === '/404.html') return { route: 'not-found', params: {} };

    // 7. Any other unknown route triggers dedicated 404 page (no soft-404)
    return { route: 'not-found', params: { missingPath: path } };
  };

  const initialRoute = parseRouteFromLocation();

  // Navigation State
  const [currentRoute, setCurrentRoute] = useState(initialRoute.route);
  const [routeParams, setRouteParams] = useState(initialRoute.params);

  // Synchronize browser history popstate (Back / Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromLocation();
      setCurrentRoute(parsed.route);
      setRouteParams(parsed.params);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update Dynamic SEO Head Tags & Trigger Analytics Pageview on Route Change
  useEffect(() => {
    const meta = getSeoMetadata(currentRoute, routeParams);
    applySeoMetadataToDom(meta);
    Analytics.trackPageView(meta.title, window.location.pathname);
  }, [currentRoute, routeParams]);

  // Location & Tradition Preferences
  const [selectedCity, setSelectedCity] = useState(CITIES[0]); // Pune
  const [selectedLocality, setSelectedLocality] = useState('All Pune Areas');
  const [selectedTradition, setSelectedTradition] = useState(TRADITIONS[0]); // North Indian Pandit
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Booking & Enquiry Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [bookingSelectedPackage, setBookingSelectedPackage] = useState(null);

  // Transient Session User Details (Purely in-memory, no localStorage persistence)
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    email: '',
    phone: '',
    city: 'Pune',
    gotra: '',
    address: ''
  });

  // Toast System
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Route Navigation Helper with History PushState
  const navigateTo = (route, params = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    
    if (typeof window !== 'undefined') {
      let targetPath = '/';
      if (route === 'catalogue' || route === 'services') targetPath = '/services';
      else if (route === 'service-detail') targetPath = `/services/${params.serviceId || 'satyanarayan-puja'}`;
      else if (route === 'location-detail') targetPath = `/locations/${params.slug || 'pandit-in-pune'}`;
      else if (route === 'puja-guides-hub' || route === 'puja-guides') targetPath = '/puja-guides';
      else if (route === 'puja-guide-detail') targetPath = `/puja-guides/${params.slug || 'griha-pravesh-puja-vidhi-guide'}`;
      else if (route === 'about' || route === 'about-us') targetPath = '/about-us';
      else if (route === 'how-it-works') targetPath = '/how-it-works';
      else if (route === 'faqs') targetPath = '/faqs';
      else if (route === 'contact') targetPath = '/contact';
      else if (route === 'puja-materials') targetPath = '/puja-materials';
      else if (route === 'temple-services') targetPath = '/temple-services';
      else if (route === 'policies') targetPath = '/legal';
      else if (route === 'sitemap') targetPath = '/sitemap';
      else if (route === 'not-found') targetPath = '/404';
      else if (route === 'seo-landing') targetPath = `/services/${params.slug || 'north-indian-pandit-in-pune'}`;

      if (window.location.pathname !== targetPath) {
        window.history.pushState({ route, params }, '', targetPath);
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Direct WhatsApp & Phone Action Helpers
  const openWhatsAppEnquiry = (customText) => {
    const text = customText || `Namaste Panditji, I would like to enquire about booking a puja in Pune.`;
    const cleanPhone = BRAND_INFO.phoneClean.startsWith('91') ? BRAND_INFO.phoneClean : `91${BRAND_INFO.phoneClean}`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    Analytics.trackWhatsAppClick('direct_action', { customText });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const callHelpline = () => {
    Analytics.trackPhoneClick(BRAND_INFO.phoneClean, 'direct_action');
    window.location.href = `tel:${BRAND_INFO.phoneClean}`;
  };

  // Open booking / enquiry modal for a specific puja, city and optional package
  const openBookingModal = (service = null, preselectedLocality = null, preselectedCity = null, preselectedPackage = null) => {
    let matchedService = null;
    if (service) {
      if (typeof service === 'object' && service !== null) {
        matchedService = service;
      } else if (typeof service === 'string') {
        const query = service.toLowerCase().trim();
        matchedService = SERVICES.find(s => 
          s.id.toLowerCase() === query || 
          s.name.toLowerCase() === query || 
          (query.length > 5 && s.name.toLowerCase().includes(query)) ||
          (query.length > 5 && query.includes(s.name.toLowerCase()))
        ) || null;
      }
    }
    setBookingService(matchedService);
    if (preselectedLocality) {
      setSelectedLocality(preselectedLocality);
    }
    if (preselectedCity) {
      const cityObj = CITIES.find(c => c.id.toLowerCase() === preselectedCity.toLowerCase() || c.name.toLowerCase().includes(preselectedCity.toLowerCase()));
      setSelectedCity(cityObj || preselectedCity);
    }
    setBookingSelectedPackage(preselectedPackage || null);
    setBookingModalOpen(true);
    Analytics.trackFormStarted('booking_modal', { serviceName: matchedService?.name, city: preselectedCity });
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setBookingService(null);
    setBookingSelectedPackage(null);
  };

  // Submit Enquiry through Centralized Webhook
  const completeBooking = async (enquiryData) => {
    const bookingCity = enquiryData.city || (selectedCity ? (typeof selectedCity === 'string' ? selectedCity : selectedCity.name) : 'Pune');

    const result = await submitEnquiryToWebhook({
      ...enquiryData,
      city: bookingCity,
      formType: 'booking_enquiry'
    });

    if (result.success) {
      Analytics.trackFormSubmitted('booking_enquiry', enquiryData);
      showToast('Enquiry received! Senior Vedic Acharyas will review your Shubh Muhurat.');
    } else if (result.status === 'unavailable' || !result.isConfigured) {
      showToast('Online enquiry could not be sent. Please contact Panditji via WhatsApp or Phone.', 'warning');
    } else {
      showToast(result.message || 'Could not submit enquiry. Please call or WhatsApp Panditji directly.', 'error');
    }

    return result;
  };

  return (
    <AppContext.Provider
      value={{
        BRAND_INFO,
        currentRoute,
        setCurrentRoute,
        routeParams,
        setRouteParams,
        navigateTo,

        // Location & Tradition
        selectedCity,
        setSelectedCity,
        selectedLocality,
        setSelectedLocality,
        PUNE_LOCALITIES,
        selectedTradition,
        setSelectedTradition,
        TRADITIONS,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,

        // Enquiry & Booking
        bookingModalOpen,
        openBookingModal,
        closeBookingModal,
        bookingService,
        bookingSelectedPackage,
        setBookingSelectedPackage,
        completeBooking,

        // Quick Communication
        openWhatsAppEnquiry,
        callHelpline,

        // User & Toast
        user,
        setUser,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
