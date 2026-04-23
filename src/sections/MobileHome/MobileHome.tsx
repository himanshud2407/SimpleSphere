import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { sanityClient } from '@/lib/sanity';
import { getCoursesQuery } from '@/lib/sanityQueries';

// Import existing sections to reuse on mobile
import Stats from '@/sections/Stats/Stats';
import ExplorePrograms from '@/sections/ExplorePrograms/ExplorePrograms';
import InstructorBanner from '@/sections/Instructor/InstructorBanner';
import Certification from '@/sections/Certification/Certification';
import OurExperts from '@/sections/OurExperts/OurExperts';
import Testimonials from '@/sections/Testimonials/Testimonials';
import FAQ from '@/sections/FAQ/FAQ';
import Blog from '@/sections/Blog/Blog';
import TrendingCourses from '@/sections/TrendingCourses/TrendingCourses';

// ---------- data ----------
const MOBILE_CATEGORIES = [
  { label: 'Digital Marketing', icon: 'campaign' },
  { label: 'Web Dev', icon: 'code' },
  { label: 'IoT Systems', icon: 'router' },
  { label: 'Cybersecurity', icon: 'enhanced_encryption' },
  { label: 'Web3 & Crypto', icon: 'currency_bitcoin' },
];

const WHY_FEATURES = [
  {
    icon: 'verified',
    title: 'Certified Instructors',
    desc: 'Learn from industry experts with real-world experience.',
    span: 2,
  },
  {
    icon: 'schedule',
    title: 'Flexible Schedule',
    desc: 'Learn at your own pace anytime.',
    span: 1,
  },
  {
    icon: 'terminal',
    title: 'Hands-on Labs',
    desc: 'Practical sandboxes for practice.',
    span: 1,
  },
];

// ---------- component ----------
export default function MobileHome() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await sanityClient.fetch(getCoursesQuery);
        if (Array.isArray(data) && data.length > 0) setCourses(data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching courses', err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="mobile-home-root bg-[#f7f9fb] min-h-screen font-sans text-[#191c1e]">
      {/* ─── Hero Section ─── */}
      <section className="px-5 pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#004ac6] to-[#1e40af] p-8 text-white"
        >
          <div className="relative z-10 max-w-md">
            <h2
              className="text-[26px] font-bold mb-4 leading-[1.15] tracking-tight"
              style={{ fontFamily: 'Lexend, Inter, sans-serif' }}
            >
              Master Cybersecurity &amp; Web3 with a Smarter, Faster Learning System
            </h2>
            <p className="text-[15px] opacity-90 mb-8 leading-relaxed font-normal">
              Personalized pathways for future-proof skills. Join 50k+ learners globally.
            </p>

            {/* Search Bar */}
            <div className="relative flex items-center group">
              <span className="material-symbols-outlined absolute left-4 text-[#434655] group-focus-within:text-[#004ac6] transition-colors text-xl">
                search
              </span>
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchValue.trim()) {
                    navigate(`/courses?q=${encodeURIComponent(searchValue.trim())}`);
                  }
                }}
                className="w-full h-14 pl-12 pr-4 rounded-xl border-none bg-white/95 text-[#191c1e] placeholder:text-slate-400 focus:ring-2 focus:ring-[#2563eb] shadow-lg transition-all text-[15px] outline-none"
                placeholder="Search courses, skills..."
                type="text"
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute right-4 bottom-4 opacity-20">
            <span className="material-symbols-outlined text-[120px]">security</span>
          </div>
        </motion.div>
      </section>

      {/* ─── Training Categories ─── */}
      <section className="space-y-3">
        <div className="px-5 flex justify-between items-end">
          <h3
            className="text-[20px] font-semibold"
            style={{ fontFamily: 'Lexend, Inter, sans-serif' }}
          >
            Live Training Categories
          </h3>
          <Link to="/courses" className="text-[#004ac6] font-semibold text-sm hover:underline">
            View all
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-4 px-5 scrollbar-hide snap-x pb-2">
          {MOBILE_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.label}
              whileTap={{ scale: 0.95 }}
              className="snap-start flex-shrink-0 w-[7.5rem] flex flex-col items-center gap-2 group cursor-pointer"
              onClick={() => navigate('/courses')}
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#004ac6] group-hover:bg-[#004ac6] group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
              </div>
              <span className="text-xs font-medium text-center">{cat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Why Choose Us (Bento Grid) ─── */}
      <section className="px-5 pt-10 space-y-6">
        <h3
          className="text-[20px] font-semibold"
          style={{ fontFamily: 'Lexend, Inter, sans-serif' }}
        >
          Why Choose Us
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {WHY_FEATURES.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`${
                f.span === 2 ? 'col-span-2' : ''
              } p-6 rounded-2xl bg-white shadow-[0_4px_12px_rgba(37,99,235,0.06)] border border-slate-50`}
            >
              {f.span === 2 ? (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#004ac6] shrink-0">
                    <span className="material-symbols-outlined">{f.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{f.title}</h4>
                    <p className="text-xs text-[#434655] mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <span className="material-symbols-outlined text-[#004ac6] text-3xl">
                    {f.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold">{f.title}</h4>
                    <p className="text-xs text-[#434655] mt-0.5">{f.desc}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Popular Courses ─── */}
      <section className="px-5 pt-10 space-y-3">
        <h3
          className="text-[20px] font-semibold"
          style={{ fontFamily: 'Lexend, Inter, sans-serif' }}
        >
          Popular Courses
        </h3>

        <div className="space-y-4">
          {(courses.length > 0 ? courses : [
            {
              id: 'placeholder',
              title: 'Ethical Hacking & Network Security',
              img: '/cyber-security.png',
              rating: '4.9',
              reviews: '2.4k',
              price: '₹4,999',
            },
          ]).map((course, idx) => (
            <motion.div
              key={course.id || idx}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              className="flex gap-4 p-3 bg-white rounded-2xl shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
              onClick={() => navigate(course.enrollmentUrl ? course.enrollmentUrl : `/course/${course.id}`)}
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  alt={course.title}
                  className="w-full h-full object-cover"
                  src={course.img || '/cyber-security.png'}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center flex-grow min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span className="text-[11px] text-[#434655]">
                    {course.rating || '4.8'} ({course.reviews || '1k'} reviews)
                  </span>
                </div>
                <h4 className="text-sm font-semibold truncate">{course.title}</h4>
                <p className="text-[#004ac6] text-sm font-semibold mt-1">
                  {course.price || 'Free'}
                </p>
              </div>
              <div className="flex items-start pt-1">
                <button className="p-1 text-slate-300" onClick={(e) => e.stopPropagation()}>
                  <span className="material-symbols-outlined">bookmark</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Existing Sections (reused components) ─── */}
      <Stats />
      <ExplorePrograms />
      
      <InstructorBanner />
      <Certification />
      <OurExperts />
      <Testimonials />
      <FAQ />
      <Blog />
    </div>
  );
}
