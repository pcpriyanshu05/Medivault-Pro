import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section (Jo alag component hai) */}
      <HeroSection />

      {/* Features Section (medical features ya benefits) */}
      <FeaturesSection />

      {/* Call to Action Section (Get Started ya CTA) */}
      <CTASection />

      {/* Footer (bottom info) */}
      <Footer />
    </div>
  );
};

export default Home;
