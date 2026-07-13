import BenefitsSection from "./components/BenefitSection";
import CareersCTA from "./components/CareersCTA";
import CareersHero from "./components/CareersHero";
import HiringProcess from "./components/HiringProcess";
import OpenPositions from "./components/OpenPositions";
import NoticeBanner from "./components/NoticeBanner";

export default function CareersPage() {
    return (
        <>
            <NoticeBanner />
            <CareersHero />
            <BenefitsSection />
            <OpenPositions />
            <HiringProcess />
            <CareersCTA />
        </>
    );
}