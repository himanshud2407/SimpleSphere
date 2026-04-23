import React from 'react';
import Hero from '@/sections/Hero/Hero';
import MacbookScrollDemo from '@/components/macbook-scroll-demo';
import Categories from '@/sections/Categories/Categories';
import Stats from '@/sections/Stats/Stats';
import ExplorePrograms from '@/sections/ExplorePrograms/ExplorePrograms';
import InstructorBanner from '@/sections/Instructor/InstructorBanner';
import Certification from '@/sections/Certification/Certification';
import WhyChooseUs from '@/sections/WhyChooseUs/WhyChooseUs';
import OurExperts from '@/sections/OurExperts/OurExperts';
import Testimonials from '@/sections/Testimonials/Testimonials';
import FAQ from '@/sections/FAQ/FAQ';
import Blog from '@/sections/Blog/Blog';
import MobileHome from '@/sections/MobileHome/MobileHome';
import { SEO } from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        title="Home" 
        description="SimpleSphere - The ultimate platform for professional growth. Learn from industry experts, master high-demand skills in AI, Software, and Data Science, and accelerate your career."
        keywords="online learning, career growth, tech education, AI training, software development bootcamp, simplesphere"
      />

      {/* Mobile-only: Stitch redesigned home */}
      <div className="block md:hidden">
        <MobileHome />
      </div>

      {/* Desktop-only: Original home sections */}
      <div className="hidden md:block">
        <Hero />
        {/*    */}
        <div className="hidden md:block">
          <MacbookScrollDemo />
        </div>
        <Categories />
        <Stats />
        <ExplorePrograms />
        <InstructorBanner />
        <Certification />
        <WhyChooseUs />
        <OurExperts />

        <Testimonials />
        <FAQ />
        <Blog />
      </div>
    </>
  );
}
