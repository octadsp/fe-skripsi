import Header from './Components/Header'
import HeroSection from './Components/HeroSection'
import PartnerSection from './Components/PartnerSection'
import AboutUs from './Components/AboutUs'
import ServiceOverviewSection from './Components/ServiceOverviewSection'
import ServicesSection from './Components/ServiceSection'
import TrademarkSection from './Components/TrademarkSection'
import ServiceStatistic from './Components/ServiceStatistic'
import TestimonialSection from './Components/TestimonialSection'
import ContactSection from './Components/ContactSection'
import Footer from './Components/Footer'

function LandingPage() {

    return (
        <>
            <Header />
            <HeroSection />
            <PartnerSection />
            <AboutUs />
            <ServiceOverviewSection />
            <ServicesSection />
            <TrademarkSection />
            <ServiceStatistic />
            <TestimonialSection />
            <Footer />
        </>
    );
}

export default LandingPage