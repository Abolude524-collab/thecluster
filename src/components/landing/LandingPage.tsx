import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { PlatformStrip } from './PlatformStrip';
import { ProblemSection } from './ProblemSection';
import { UnifiedAnalytics } from './UnifiedAnalytics';
import { DashboardPreview } from './DashboardPreview';
import { FeaturesSection } from './FeaturesSection';
import { PlatformSection } from './PlatformSection';
import { HowItWorks } from './HowItWorks';
import { MetricIntelligence } from './MetricIntelligence';
import { TrustSection } from './TrustSection';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200 selection:bg-[var(--accent-electric)] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <PlatformStrip />
        <ProblemSection />
        <UnifiedAnalytics />
        <DashboardPreview />
        <FeaturesSection />
        <PlatformSection />
        <HowItWorks />
        <MetricIntelligence />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};
