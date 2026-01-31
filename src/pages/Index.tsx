import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import BestSellers from '@/components/BestSellers';
import Locations from '@/components/Locations';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <BestSellers />
        <Testimonials />
        <Locations />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
