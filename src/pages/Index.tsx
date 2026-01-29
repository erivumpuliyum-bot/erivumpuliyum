import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BestSellers from '@/components/BestSellers';
import About from '@/components/About';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import Locations from '@/components/Locations';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <BestSellers />
        <About />
        <Menu />
        <Gallery />
        <Locations />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
