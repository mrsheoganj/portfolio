import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero';
import AboutSection from '@/components/about';
import PortfolioGrid from '@/components/portfolio-grid';
import ContactSection from '@/components/contact';
import Footer from '@/components/footer';
import { getPortfolioItems, getSiteConfig } from '@/app/actions';

export default async function Home() {
  const config = await getSiteConfig();
  const projects = await getPortfolioItems();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <HeroSection 
            title={config['hero_title']} 
            subtitle={config['hero_subtitle']} 
        />
        
        <AboutSection text={config['about_text']} />
        
        <PortfolioGrid projects={projects} />
        
        <ContactSection email={config['contact_email']} />
      </main>

      <Footer />
    </div>
  );
}
