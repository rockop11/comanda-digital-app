import { NavbarLanding } from '@/components/LandingPage/NavbarLanding';
import { HeroSection } from '@/components/LandingPage/HeroSection';
import { FeatureSection } from '@/components/LandingPage/FeaturesSection';
import { HowItWorksSection } from '@/components/LandingPage/HowItWorsksSection';
import { ContactSection } from '@/components/LandingPage/ContactSection';
import { Footer } from '@/components/LandingPage/Footer';

export default function Home() {

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <NavbarLanding />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <ContactSection />
      <Footer />      
    </div>
  );
}
