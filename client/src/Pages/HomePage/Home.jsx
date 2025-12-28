import Banner from './Banner';
import FeaturesSection from './FeaturesSection';
import TopScholarships from './TopScholarships';
import TestimonialsSection from './TestimonialsSection';
import HowItWorks from './HowItWorks';
import Contact from './Contact';
import LatestBlogs from './LatestBlogs';
import NewsLetter from './NewsLetter';
import FAQ from './FAQ';

const Home = () => {
    return (
        <>
            <Banner />
            <FeaturesSection />
            <TopScholarships />
            <TestimonialsSection />
            <HowItWorks />
            <Contact />
            <LatestBlogs />
            <NewsLetter />
            <FAQ />
        </>
    );
};

export default Home;