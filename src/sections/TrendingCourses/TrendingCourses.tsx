import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import ButtonWithIconDemo from '@/components/ui/button-with-icon';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function TrendingCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/courses');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data.slice(0, 4)); // Show top 4 trending
        }
      } catch (err) {
        console.error('Error fetching trending courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10 lg:gap-14 mb-8">
          {/* Left: Title (Desktop) */}
          <div className="hidden md:flex flex-col items-start text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2563EB] leading-tight">
              Trending Courses to<br/><span className="text-blue-600">Power Your Career</span>
            </h2>
          </div>

          {/* Mobile Only Heading */}
          <div className="md:hidden mb-2">
            <h2 className="text-4xl font-black text-[#2563EB] tracking-tighter">
              Start Your Coding Journey
            </h2>
          </div>
          
          {/* Middle: Centered text with book icon on border - Desktop Only */}
          <div className="hidden md:flex md:w-[30%] relative flex flex-col items-center justify-center text-center -mx-4 md:mx-0 min-w-0">
            <div className="w-full absolute top-6 -z-10 bg-gray-200 h-[1px]"></div>
            <div className="bg-white px-3 inline-block -mt-1 md:mt-2 mb-3">
              <BookOpen className="text-blue-600 w-6 h-6 transform -translate-y-1" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed relative bg-white mix-blend-normal">
              Upgrade your skills with industry-focused courses designed to boost your career and prepare you for real opportunities
            </p>
          </div>
          
          {/* Right: Space filler or hidden for desktop */}
          <div className="hidden md:block">
            <Link to="/courses">
              <button className="bg-[#2563EB] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shrink-0">View All</button>
            </Link>
          </div>
        </div>

        {/* Featured Course for Mobile (Matches Reference) */}
        <div className="md:hidden mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[3rem]">
              <img
                src={courses[0]?.img || "https://plus.unsplash.com/premium_photo-1771659002617-a002773adcc6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt="Featured Course"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8">
                <span className="px-5 py-2 bg-[#FF6B00] text-white text-[0.7rem] font-black rounded-full uppercase tracking-[0.1em]">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-10 pt-8 flex flex-col items-center">
              <h3 className="text-[2.2rem] font-black text-slate-900 mb-1 leading-tight tracking-tight text-center">{courses[0]?.title || 'Master Web Development'}</h3>
              <p className="text-slate-500 font-semibold text-base mb-8 text-center leading-relaxed">{courses[0]?.description || 'Build real-world projects & get certified'}</p>
                <Link to="/courses" className="w-full">
                  <button className="w-full border-2 border-[#2563EB] text-[#2563EB] py-4 rounded-full font-bold text-base hover:bg-[#2563EB] hover:text-white transition-all active:scale-[0.98]">
                      Explore all courses
                  </button>
                </Link>
            </div>
          </motion.div>
        </div>

        {/* Course Grid for Desktop / Horizontal Scroll for Mobile */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-6 pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {loading ? (
            <div className="col-span-full py-20 text-center text-slate-400 font-medium">Loading trending courses...</div>
          ) : courses.map((course, index) => (
            <motion.div
              key={course.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "min-w-[280px] md:min-w-0 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all group snap-center",
                index === 0 && "md:block hidden" // Hide first course as it's featured above on mobile
              )}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.img || 'https://picsum.photos/seed/course/400/250'}
                  alt={course.title}
                  className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    {course.badge || 'Trending'}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2">{course.description || 'Improve your skills with this course.'}</p>
                <div className="flex items-center justify-between mt-auto">
                  <ButtonWithIconDemo text="Enroll Now" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile: View All Button at Bottom - Replaced by pill button in featured section */}
      </div>
    </section>
  );
}

