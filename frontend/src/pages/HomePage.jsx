import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CounterSection from '../components/home/CounterSection';
import ServiceCategories from '../components/home/ServiceCategories';
import FeaturedPujas from '../components/home/FeaturedPujas';
import MultiCitySection from '../components/home/MultiCitySection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TempleServicesSection from '../components/home/TempleServicesSection';
import ReviewsSection from '../components/home/ReviewsSection';
import TrustCredentials from '../components/home/TrustCredentials';
import MediaCoverage from '../components/home/MediaCoverage';

export default function HomePage() {
  return (
    <div className="homepage-root">
      <HeroSection />
      <CounterSection />
      <ServiceCategories />
      <FeaturedPujas />
      <MultiCitySection />
      <HowItWorksSection />
      <TempleServicesSection />
      {/* Devotee feedback hidden from public display pending business authenticity verification */}
      <TrustCredentials />
      <MediaCoverage />
    </div>
  );
}
