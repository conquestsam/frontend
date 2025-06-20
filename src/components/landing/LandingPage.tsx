import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
// import { AboutSection } from './about';

// Lazy load components for code splitting
const LandingNavigation = lazy(() => import('./LandingNavigation').then(module => ({ default: module.LandingNavigation })));
const HeroSection = lazy(() => import('./HeroSection').then(module => ({ default: module.HeroSection })));
const FeaturesSection = lazy(() => import('./FeatureSection').then(module => ({ default: module.FeaturesSection })));
const TestimonialsSection = lazy(() => import('./TestimonialSection').then(module => ({ default: module.TestimonialsSection })));
const MovieShowcase = lazy(() => import('./MovieShowcase').then(module => ({ default: module.MovieShowcase })));
const CTASection = lazy(() => import('./CTASection').then(module => ({ default: module.CTASection })));
const AboutSection = lazy(() => import('./about').then(module => ({ default: module.AboutSection })));
const ImpactOfProgram = lazy(() => import('./impactProgram').then(module => ({ default: module.ImpactOfProgram })));
const Footer = lazy(() => import('./Footer').then(module => ({ default: module.Footer })));

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

// Loading component
const SectionLoader: React.FC = () => (
  <div className="flex items-center justify-center py-20">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full"
    />
  </div>
);

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onSignIn
}) => {
  const handleWatchDemo = () => {
    // Scroll to showcase section
    const showcaseElement = document.getElementById('showcase');
    if (showcaseElement) {
      showcaseElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <Suspense fallback={<div className="h-16 bg-black" />}>
        <LandingNavigation 
          onGetStarted={onGetStarted}
          onSignIn={onSignIn}
        />
      </Suspense>

      {/* Hero Section */}
      <Suspense fallback={<SectionLoader />}>
        <HeroSection 
          onGetStarted={onGetStarted}
          onWatchDemo={handleWatchDemo}
        />
      </Suspense>

      {/* Features Section */}
      <Suspense fallback={<SectionLoader />}>
        <FeaturesSection />
      </Suspense>

      {/* Movie Showcase */}
      <Suspense fallback={<SectionLoader />}>
        <MovieShowcase />
      </Suspense>

      {/* Testimonials Section */}
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<SectionLoader />}>
        <CTASection 
          onGetStarted={onGetStarted}
          onSignIn={onSignIn}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<SectionLoader />}>
        <AboutSection 
          onGetStarted={onGetStarted}
          onSignIn={onSignIn}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<SectionLoader />}>
        <ImpactOfProgram 
          onGetStarted={onGetStarted}
          onSignIn={onSignIn}
        />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};