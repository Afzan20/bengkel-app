import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import ServicesSection from "../components/landing/ServicesSection";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import StatisticsSection from "../components/landing/StatisticsSection";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white">

      <Navbar />

      <HeroSection />

      <ServicesSection />

      <WhyChooseUs />

      <StatisticsSection />

      <Testimonials />

      <Footer />

    </div>
  );
}