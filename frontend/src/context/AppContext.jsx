import React, { createContext, useContext, useState } from 'react';
import { BRAND_INFO, CITIES, PUNE_LOCALITIES, TRADITIONS, SERVICES } from '../data/vedicPanditData';
import { submitEnquiryToServer } from '../services/enquiryApi';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Helper to parse route from pathname on initial load and refresh
  const parseRouteFromLocation = () => {
    if (typeof window === 'undefined') return { route: 'home', params: {} };
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    if (path === '/') return { route: 'home', params: {} };
    if (path === '/sitemap' || path === '/sitemap.html') return { route: 'sitemap', params: {} };
    if (path === '/catalogue' || path === '/services') return { route: 'catalogue', params: {} };
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      const isPoojaService = SERVICES.some(s => s.id === slug);
      if (isPoojaService) {
        return { route: 'service-detail', params: { serviceId: slug } };
      }
      return { route: 'seo-landing', params: { slug } };
    }
    if (path === '/about' || path === '/about-us') return { route: 'about-us', params: {} };
    if (path === '/how-it-works' || path === '/how-we-work') return { route: 'how-it-works', params: {} };
    if (path === '/faqs') return { route: 'faqs', params: {} };
    if (path === '/contact' || path === '/contact-us') return { route: 'contact', params: {} };
    if (path === '/puja-materials') return { route: 'puja-materials', params: {} };
    if (path === '/temple-services') return { route: 'temple-services', params: {} };
    if (path === '/legal' || path === '/policies') return { route: 'policies', params: {} };
    if (path === '/checkout') return { route: 'catalogue', params: {} };
    if (path === '/login' || path === '/auth' || path === '/signin' || path === '/register') return { route: 'auth', params: {} };
    if (path === '/my-account' || path === '/account' || path === '/profile') return { route: 'account', params: {} };
    return { route: 'home', params: {} };
  };

  const initialRoute = parseRouteFromLocation();

  // Navigation State
  const [currentRoute, setCurrentRoute] = useState(initialRoute.route);
  const [routeParams, setRouteParams] = useState(initialRoute.params);

  // Synchronize browser history popstate (Back / Forward buttons)
  React.useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromLocation();
      setCurrentRoute(parsed.route);
      setRouteParams(parsed.params);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Location & Tradition Preferences
  const [selectedCity, setSelectedCity] = useState(CITIES[0]); // Pune
  const [selectedLocality, setSelectedLocality] = useState('All Pune Areas');
  const [selectedTradition, setSelectedTradition] = useState(TRADITIONS[0]); // North Indian Pandit
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Booking & Enquiry Modal & Selected Package
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [bookingSelectedPackage, setBookingSelectedPackage] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Client User Profile with Local Storage Persistence
  const [user, setUserState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedUser = localStorage.getItem('vedic_user');
        if (savedUser) return JSON.parse(savedUser);
      } catch (err) {
        console.error('Error loading user session:', err);
      }
    }
    return {
      isLoggedIn: false,
      name: '',
      email: '',
      phone: '',
      city: 'Pune',
      gotra: '',
      nakshatra: '',
      address: ''
    };
  });

  const setUser = (newUser) => {
    setUserState(newUser);
    if (typeof window !== 'undefined') {
      try {
        if (newUser && newUser.isLoggedIn) {
          localStorage.setItem('vedic_user', JSON.stringify(newUser));
        } else {
          localStorage.removeItem('vedic_user');
        }
      } catch (err) {
        console.error('Error saving user session:', err);
      }
    }
  };

  // Enquiries & Booking Requests with Local Storage Persistence (No mock data)
  const defaultEnquiries = [];

  const [enquiries, setEnquiriesState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedEnquiries = localStorage.getItem('vedic_enquiries');
        if (savedEnquiries) return JSON.parse(savedEnquiries);
      } catch (err) {
        console.error('Error loading enquiries:', err);
      }
    }
    return defaultEnquiries;
  });

  const setEnquiries = (updater) => {
    setEnquiriesState(prev => {
      const nextVal = typeof updater === 'function' ? updater(prev) : updater;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('vedic_enquiries', JSON.stringify(nextVal));
        } catch (err) {
          console.error('Error saving enquiries:', err);
        }
      }
      return nextVal;
    });
  };

  // Toast System
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Route Navigation Helper with History PushState
  const navigateTo = (route, params = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    
    if (typeof window !== 'undefined') {
      let targetPath = '/';
      if (route === 'catalogue') targetPath = '/catalogue';
      else if (route === 'seo-landing') targetPath = `/services/${params.slug || 'north-indian-pandit-in-pune'}`;
      else if (route === 'service-detail') targetPath = `/services/${params.serviceId || 'satyanarayan-puja'}`;
      else if (route === 'about' || route === 'about-us') targetPath = '/about-us';
      else if (route === 'how-it-works') targetPath = '/how-it-works';
      else if (route === 'faqs') targetPath = '/faqs';
      else if (route === 'contact') targetPath = '/contact';
      else if (route === 'puja-materials') targetPath = '/puja-materials';
      else if (route === 'temple-services') targetPath = '/temple-services';
      else if (route === 'policies') targetPath = '/legal';
      else if (route === 'auth' || route === 'login') targetPath = '/login';
      else if (route === 'account' || route === 'my-account') targetPath = '/my-account';
      else if (route === 'sitemap') targetPath = '/sitemap';
      else if (route === 'checkout') {
        targetPath = '/catalogue';
      }

      if (window.location.pathname !== targetPath) {
        window.history.pushState({ route, params }, '', targetPath);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct WhatsApp & Phone Action Helpers
  const openWhatsAppEnquiry = (customText) => {
    const text = customText || `Namaste Panditji, I would like to enquire about booking a puja in Pune.`;
    const cleanPhone = BRAND_INFO.phoneClean.startsWith('91') ? BRAND_INFO.phoneClean : `91${BRAND_INFO.phoneClean}`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const callHelpline = () => {
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
        // Match only against authentic Vedic ceremony services in SERVICES
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
      if (cityObj) {
        setSelectedCity(cityObj);
      } else {
        setSelectedCity(preselectedCity);
      }
    }
    setBookingSelectedPackage(preselectedPackage || null);
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setBookingService(null);
    setBookingSelectedPackage(null);
  };

  // Complete an Enquiry / Booking submission (Pure Enquiry Model - NO automatic WhatsApp redirect)
  const completeBooking = async (enquiryData) => {
    const bookingCity = enquiryData.city || (selectedCity ? (typeof selectedCity === 'string' ? selectedCity : selectedCity.name) : 'Pune');
    
    // Attempt remote server transmission if an endpoint is configured
    const apiResult = await submitEnquiryToServer(enquiryData);
    const isServerSuccess = apiResult && apiResult.success && !apiResult.isDraftOnly;

    const newEnquiry = {
      id: `VP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      serviceName: enquiryData.serviceName || (bookingService ? bookingService.name : 'Vedic Ceremony'),
      packageName: enquiryData.packageName || (bookingSelectedPackage ? bookingSelectedPackage.name : 'Ritual Vidhi'),
      packagePrice: enquiryData.packagePrice || (bookingSelectedPackage ? bookingSelectedPackage.priceDisplay : 'Custom Quote'),
      samagriPolicy: enquiryData.samagriPolicy || (bookingSelectedPackage ? bookingSelectedPackage.samagriPolicy : 'Devotee Arranges Samagri'),
      city: enquiryData.locality ? `${bookingCity} (${enquiryData.locality})` : bookingCity,
      tradition: enquiryData.tradition || selectedTradition.name,
      status: isServerSuccess 
        ? 'Enquiry Received — Pending Panditji Confirmation' 
        : 'Enquiry Draft Saved (Local Device Only)',
      isDraftOnly: !isServerSuccess,
      assignedPandit: isServerSuccess 
        ? 'Pending Review by Pandit Jitendra Chaubey' 
        : 'Not assigned yet (Allocated by Panditji after direct contact)',
      scheduledDate: `${enquiryData.date || 'Date to be calculated'} (${enquiryData.timeSlot || 'Morning Shubh Muhurat'})`,
      customerName: enquiryData.customerName || (user?.name || 'Devotee'),
      phone: enquiryData.phone || user?.phone || '',
      address: enquiryData.address || user?.address || '',
      language: enquiryData.language || 'Hindi & Sanskrit',
      notes: enquiryData.notes || ''
    };

    setEnquiries(prev => [newEnquiry, ...prev]);
    
    if (isServerSuccess) {
      showToast(`Enquiry #${newEnquiry.id} submitted! Panditji team will confirm availability.`);
    } else {
      showToast(`Enquiry #${newEnquiry.id} saved on your device. Please send to Panditji via WhatsApp or Call.`);
    }
    
    // Note: Do NOT automatically redirect or open WhatsApp here.
    // The user will review the saved enquiry and can choose to WhatsApp Panditji explicitly.
    return newEnquiry;
  };

  const deleteEnquiry = (enquiryId) => {
    setEnquiries(prev => prev.filter(e => e.id !== enquiryId));
    showToast(`Enquiry #${enquiryId} removed from local draft history.`);
  };

  // Backward compatibility stubs (no fake payment/cart)
  const [cart] = useState([]);
  const addToCart = (service) => openBookingModal(service);
  const removeFromCart = () => {};
  const clearCart = () => {};

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
        deleteEnquiry,
        enquiries,
        orders: enquiries, // backward compatibility mapping
        cartDrawerOpen,
        setCartDrawerOpen,
        cart,
        addToCart,
        removeFromCart,
        clearCart,

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
