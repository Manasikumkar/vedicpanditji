import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import './AdminDashboard.css';

import AdminOverview from './AdminOverview';
import AdminEnquiries from './AdminEnquiries';
import AdminBookings from './AdminBookings';
import AdminServices from './AdminServices';
import AdminPackages from './AdminPackages';
import AdminCustomers from './AdminCustomers';
import AdminSettings from './AdminSettings';

import {
  LayoutDashboard,
  Inbox,
  CalendarCheck,
  Sparkles,
  Tag,
  Users,
  Settings,
  Menu,
  X,
  ExternalLink,
  Flame,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboard({ section = 'overview' }) {
  const { navigateTo, routeParams } = useApp();
  const [activeSection, setActiveSection] = useState(routeParams?.section || section || 'overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    if (routeParams?.section) {
      setActiveSection(routeParams.section);
    }
  }, [routeParams]);

  // Live IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-IN', {
          timeZone: 'Asia/Kolkata',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigateSection = (sec) => {
    setActiveSection(sec);
    setMobileMenuOpen(false);
    navigateTo('admin', { section: sec });
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'enquiries', label: 'Enquiries Management', icon: Inbox },
    { id: 'bookings', label: 'Bookings Management', icon: CalendarCheck },
    { id: 'services', label: 'Puja Services', icon: Sparkles },
    { id: 'packages', label: 'Packages & Pricing', icon: Tag },
    { id: 'customers', label: 'Devotee Directory', icon: Users },
    { id: 'settings', label: 'Admin Settings', icon: Settings }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminOverview onNavigate={handleNavigateSection} />;
      case 'enquiries':
        return <AdminEnquiries onNavigate={handleNavigateSection} />;
      case 'bookings':
        return <AdminBookings />;
      case 'services':
        return <AdminServices />;
      case 'packages':
        return <AdminPackages />;
      case 'customers':
        return <AdminCustomers />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview onNavigate={handleNavigateSection} />;
    }
  };

  const sectionTitles = {
    overview: { title: 'Dashboard Overview', subtitle: 'Live ritual enquiries, bookings pipeline & operational metrics' },
    enquiries: { title: 'Enquiries Management', subtitle: 'Review devotee submissions, record internal notes & promote to bookings' },
    bookings: { title: 'Bookings Registry', subtitle: 'Verified quotations, pandit allocations & ceremony confirmations' },
    services: { title: 'Puja Services Catalog', subtitle: 'Manage ritual specifications, city availability & SEO metadata' },
    packages: { title: 'Packages & Pricing', subtitle: 'Two-tier packages, verified rates & optional samagri catalog' },
    customers: { title: 'Devotee Management', subtitle: 'Devotee directory and ceremony timeline aggregated from genuine records' },
    settings: { title: 'Administrator Settings', subtitle: 'Session security, role permissions & Supabase readiness checklist' }
  };

  const currentMeta = sectionTitles[activeSection] || sectionTitles.overview;

  return (
    <div className="admin-shell">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 95
          }}
        />
      )}

      {/* Persistent Sidebar */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-logo-lockup">
            <div className="admin-logo-symbol">
              <Flame size={20} />
            </div>
            <div className="admin-logo-text">
              <span className="admin-logo-title">VedicPanditji</span>
              <span className="admin-logo-badge">Admin Dashboard</span>
            </div>
          </div>
          {mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="admin-btn admin-btn-outline admin-btn-sm"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigateSection(item.id)}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-mode-pill">
            <AlertTriangle size={14} />
            <span>Dev Fixture Mode</span>
          </div>
          <button
            onClick={() => navigateTo('home')}
            className="admin-site-link"
            style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            <ExternalLink size={14} />
            <span>Visit Public Website</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="admin-btn admin-btn-outline admin-btn-sm"
              style={{ display: 'none' }}
              id="admin-mobile-toggle"
            >
              <Menu size={18} />
            </button>
            <div className="admin-header-title">
              <h1>{currentMeta.title}</h1>
              <p>{currentMeta.subtitle}</p>
            </div>
          </div>

          <div className="admin-header-actions">
            <div style={{ fontSize: '0.8rem', color: '#575D56', fontWeight: 500 }} className="admin-clock">
              {currentTime}
            </div>

            <div className="admin-user-badge">
              <div className="admin-avatar">VP</div>
              <div className="admin-user-info">
                <span className="admin-user-name">Coordinator</span>
                <span className="admin-user-role">Senior Acharya Liaison</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="admin-content">
          {renderActiveSection()}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #admin-mobile-toggle {
            display: inline-flex !important;
          }
          .admin-clock {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
