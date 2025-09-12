import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = 'TravelPlanner - Plan Smarter, Travel Better';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create personalized travel itineraries with cost estimates and smart recommendations. Plan your perfect trip in minutes with AI-powered travel planning.');
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "TravelPlanner",
      "description": "AI-powered travel planning platform for creating personalized itineraries",
      "applicationCategory": "TravelApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup structured data on unmount
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
