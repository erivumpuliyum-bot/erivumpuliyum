import { useEffect, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Lazy load below-the-fold components
const BestSellers = lazy(() => import('@/components/BestSellers'));
const About = lazy(() => import('@/components/About'));

const Testimonials = lazy(() => import('@/components/Testimonials'));
const Locations = lazy(() => import('@/components/Locations'));
const Footer = lazy(() => import('@/components/Footer'));

const SectionFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  useEffect(() => {
    // Load JotForm only after user interaction (click/scroll/touch)
    let loaded = false;
    const loadJotForm = () => {
      if (loaded) return;
      loaded = true;
      const script = document.createElement('script');
      script.src = 'https://cdn.jotfor.ms/agent/embedjs/019bf74ce34b703180edb303e0e7f0c7a6a2/embed.js';
      script.async = true;
      document.body.appendChild(script);
      // Remove listeners after loading
      window.removeEventListener('scroll', loadJotForm);
      window.removeEventListener('click', loadJotForm);
      window.removeEventListener('touchstart', loadJotForm);
    };

    // Also load after 5s as fallback
    const timer = setTimeout(loadJotForm, 5000);
    window.addEventListener('scroll', loadJotForm, { once: true, passive: true });
    window.addEventListener('click', loadJotForm, { once: true });
    window.addEventListener('touchstart', loadJotForm, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', loadJotForm);
      window.removeEventListener('click', loadJotForm);
      window.removeEventListener('touchstart', loadJotForm);
      const existingScript = document.querySelector(`script[src*="jotfor.ms"]`);
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <BestSellers />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Locations />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
