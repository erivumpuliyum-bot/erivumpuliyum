import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import BestSellers from '@/components/BestSellers';
import Gallery from '@/components/Gallery';
import Locations from '@/components/Locations';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <BestSellers />
        <Menu />
        <Gallery />
        <Locations />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
