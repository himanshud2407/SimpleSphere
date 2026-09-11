import React, { useState } from 'react';
import { SEO } from '@/components/SEO';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect } from 'react';

/* ───────────────────── data ───────────────────── */

const LEARNING_OBJECTIVES = [
  "Build fully responsive and mobile-first layouts",
  "Implement state management in modern JS frameworks",
  "Design accessible interfaces with ARIA roles",
  "Deploy secure cloud-based web applications",
  "Configure CI/CD pipelines for government clouds",
  "Automate testing for accessibility and security",
];

const CURRICULUM = [
  {
    title: "Section 1: Foundations & Accessibility Standards",
    lectures: 4,
    duration: "1h 45m",
    items: [
      { type: "video", title: "1. Introduction to Federal Digital Guidelines", meta: "Preview", isPreview: true },
      { type: "doc", title: "2. Section 508 and WCAG 2.1 Overview", meta: "15:00" },
    ],
  },
  {
    title: "Section 2: Secure Frontend Architecture",
    lectures: 8,
    duration: "3h 12m",
    items: [],
  },
  {
    title: "Section 3: Database Security & GSA Compliant Storage",
    lectures: 12,
    duration: "5h 20m",
    items: [],
  },
];

const MATERIALS = [
  { icon: "movie", label: "24 hours on-demand video" },
  { icon: "description", label: "15 downloadable resources" },
  { icon: "assignment", label: "4 coding assignments" },
  { icon: "workspace_premium", label: "Official Digital Certificate" },
];

const COURSE_META = [
  { icon: "bar_chart", label: "Level", value: "Intermediate" },
  { icon: "group", label: "Enrolled", value: "8,421 Students" },
  { icon: "schedule", label: "Duration", value: "24 Total Hours" },
  { icon: "update", label: "Last Updated", value: "Dec 2024" },
];

const TABS = ["Course Info", "Curriculum", "Instructor", "Reviews (1,248)"];

/* ───────────────── Material icon helper ───────────────── */
const MI = ({ name, className = "", fill = false }: { name: string; className?: string; fill?: boolean }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
  >
    {name}
  </span>
);

/* ───────────────── component ───────────────── */

import { sanityClient } from '@/lib/sanity';
import { getCourseByIdQuery } from '@/lib/sanityQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Enquiry Modal State
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [isEnquiring, setIsEnquiring] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryFormData, setEnquiryFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnquiring(true);
    try {
      const res = await fetch('http://localhost:5000/api/course-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...enquiryFormData, course_title: course.title })
      });
      if (res.ok) {
        setEnquirySuccess(true);
        setTimeout(() => {
          setShowEnquiryModal(false);
          setEnquirySuccess(false);
          setEnquiryFormData({ name: '', email: '', phone: '', message: '' });
        }, 2000);
      } else {
        alert("Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting enquiry.");
    } finally {
      setIsEnquiring(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await sanityClient.fetch(getCourseByIdQuery, { id });
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course details from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for sticky header and tabs
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const tabs = [
    { name: "Course Info", id: "about" },
    { name: "Curriculum", id: "curriculum" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Skeleton */}
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <Skeleton className="h-8 w-48 rounded-full" />
            <Skeleton className="h-12 w-full max-w-xl" />
            <Skeleton className="h-20 w-full max-w-lg" />
            <div className="flex gap-4">
              <Skeleton className="h-11 w-32 rounded-lg" />
              <Skeleton className="h-11 w-32 rounded-lg" />
            </div>
          </div>
          <div className="flex-1 w-full">
            <Skeleton className="aspect-video w-full rounded-xl" />
          </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-80 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-screen">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Course Not Found</h2>
        <p className="text-slate-500 mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/courses">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Browse All Courses
          </button>
        </Link>
      </div>
    );
  }

  const curriculum = (Array.isArray(course.curriculum) && course.curriculum.length > 0) ? course.curriculum : CURRICULUM;
  const materials = (Array.isArray(course.materials_included) && course.materials_included.length > 0) ? course.materials_included : MATERIALS;
  const learning_objectives = (Array.isArray(course.learning_objectives) && course.learning_objectives.length > 0) ? course.learning_objectives : LEARNING_OBJECTIVES;
  const courseMeta = [
    { icon: "bar_chart", label: "Level", value: course.level || "Beginner" },
    { icon: "schedule", label: "Duration", value: course.duration || "Self-paced" },
  ];

  return (
    <>
      <SEO
        title={`${course.title} | SimpleSphere`}
        description={course.description || "Master modern skills through our industry-vetted curriculum."}
        keywords="course, learning, education, simpleSphere"
      />

      {/* Google Material Symbols font (loaded once) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          vertical-align: middle;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ────── Hero ────── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 items-center">
          {/* Text */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-700 rounded-full">
              <MI name="verified" className="text-[18px]" fill />
              <span className="text-sm font-semibold tracking-wide">Government-Certified Program</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[48px] leading-tight font-bold text-slate-900 max-w-2xl tracking-tight">
              {course.title}
            </h1>

            <p className="text-lg text-slate-500 max-w-xl leading-relaxed mx-auto lg:mx-0">
              {course.description || "Master new technologies through a comprehensive curriculum. Prepare for a successful career in your chosen field."}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 flex-wrap">
              <button 
                onClick={() => setShowEnquiryModal(true)}
                className="h-11 px-8 bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-200"
              >
                Enroll Now
              </button>
              {course.syllabus_pdf ? (
                <a href={course.syllabus_pdf} target="_blank" rel="noopener noreferrer">
                  <button className="h-11 px-6 border-2 border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all">
                    Download Syllabus
                  </button>
                </a>
              ) : (
                <button className="h-11 px-6 border-2 border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all opacity-50 cursor-not-allowed" title="Syllabus not available">
                  Download Syllabus
                </button>
              )}
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video border border-slate-100">
              <img
                className="w-full h-full object-cover"
                src={course.img || "/course-hero.jpg"}
                alt={course.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────── Sticky Tab Bar ────── */}
      <div className="sticky top-[64px] bg-white/95 backdrop-blur-md z-40 border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex gap-8 h-14 overflow-x-auto scrollbar-hide">
            {tabs.map((tab, i) => (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(i);
                  scrollToSection(tab.id);
                }}
                className={`whitespace-nowrap text-sm font-semibold px-2 flex items-center transition-all relative ${
                  activeTab === i
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-blue-600"
                }`}
              >
                {tab.name}
                {activeTab === i && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ────── Main Content Grid ────── */}
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10 pb-16">
        {/* ── Left Column ── */}
        <div className="lg:col-span-8 space-y-16">
          {/* About Section */}
          <section id="about">
            <h2 className="text-2xl font-semibold mb-6 text-slate-900">About the Course</h2>
            <div className="space-y-4 text-base text-slate-500 leading-relaxed whitespace-pre-wrap">
              {course.about_course || (
                <>
                  <p>
                    This comprehensive program is designed to transform aspiring learners into certified professionals
                    ready for the rigorous demands of the modern workplace. You will learn the best practices and
                    standards in your field.
                  </p>
                  <p>
                    Throughout the course, we focus on the core pillars of the subject matter. By the end of this certification, you will
                    have completed several projects that demonstrate your ability to handle complex problems.
                  </p>
                </>
              )}
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {(Array.isArray(course.feature_cards) && course.feature_cards.length > 0 ? course.feature_cards : [
                { icon: "security", title: "Cybersecurity Focus", description: "Learn OWASP Top 10 vulnerabilities and how to mitigate them in federal apps." },
                { icon: "accessibility_new", title: "508 Compliance", description: "Master accessibility requirements for all government digital products." }
              ]).map((fc: any, idx: number) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex gap-4">
                  <MI name={fc.icon || "star"} className="text-blue-600 text-2xl" />
                  <div>
                    <h4 className="font-semibold text-base mb-1 text-slate-900">{fc.title}</h4>
                    <p className="text-xs text-slate-500">{fc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Learning Objectives */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-slate-900">What Will You Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learning_objectives.map((obj: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <MI name="check_circle" className="text-blue-600 text-[20px] mt-0.5" fill />
                  <span className="text-base text-slate-800">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum Accordion */}
          <section id="curriculum">
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
              <h2 className="text-2xl font-semibold text-slate-900">Course Content</h2>
              <span className="text-xs text-slate-400">
                {course.curriculum?.length || 0} Sections • {
                  course.curriculum?.reduce((acc: string, curr: any) => acc || curr.duration, "") ? "Multiple Hours" : course.duration
                }
              </span>
            </div>

            <div className="space-y-4">
              {(course.curriculum || []).map((section: any, idx: number) => (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {/* Section Header */}
                  <button
                    onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                    className="w-full bg-slate-50 px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <MI
                        name={expandedSection === idx ? "expand_less" : "expand_more"}
                        className="text-slate-500"
                      />
                      <h3 className="font-semibold text-base text-left">{section.title}</h3>
                    </div>
                    {section.duration && (
                      <span className="text-xs text-slate-400 whitespace-nowrap ml-4">
                        {section.duration}
                      </span>
                    )}
                  </button>

                  {/* Section Items */}
                  {expandedSection === idx && section.items && section.items.length > 0 && (
                    <div className="border-t border-slate-100">
                      {section.items.map((item: any, iIdx: number) => (
                        <div
                          key={iIdx}
                          className={`px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                            iIdx > 0 ? "border-t border-slate-100" : ""
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <MI
                              name={item.type === "video" ? "play_circle" : "description"}
                              className="text-indigo-500"
                            />
                            <span className="text-base">{item.title}</span>
                          </div>
                          <span className={`text-xs ${item.isPreview ? "text-blue-600 font-semibold" : "text-slate-400"}`}>
                            {item.meta}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>


        </div>

        {/* ── Right Column — Sticky Sidebar ── */}
        <aside className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold text-blue-700 leading-tight">{course.price ? (String(course.price).toLowerCase() === 'free' ? 'Free' : `₹${course.price}`.replace('₹₹', '₹')) : 'Free'}</span>
                  {course.original_price && (
                    <span className="text-base text-slate-400 line-through">{course.original_price}</span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setShowEnquiryModal(true)}
                  className="w-full h-12 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                >
                  Enquire Now
                </button>
                {course.brochure_pdf ? (
                  <a href={course.brochure_pdf} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <button className="w-full h-12 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                      <MI name="download" className="text-[18px]" />
                      Download Brochure
                    </button>
                  </a>
                ) : (
                  <button className="w-full h-12 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 opacity-50 cursor-not-allowed" title="Brochure not available">
                    <MI name="download" className="text-[18px]" />
                    Download Brochure
                  </button>
                )}
              </div>

              <p className="text-center text-xs text-slate-400 mt-4">30-Day Money-Back Guarantee</p>
            </div>

            {/* Course Metadata */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div className="space-y-4">
                {courseMeta.map((m) => (
                  <div key={m.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-500">
                      <MI name={m.icon} className="text-[20px]" />
                      <span className="text-base">{m.label}</span>
                    </div>
                    <span className="text-base font-semibold text-slate-800">{m.value}</span>
                  </div>
                ))}
              </div>

              <hr className="border-slate-200" />

              {/* Material Includes */}
              <div>
                <h4 className="font-semibold text-base mb-4 text-slate-900">Material Includes</h4>
                <ul className="space-y-3">
                  {materials.map((mat: any) => (
                    <li key={mat.label} className="flex items-center gap-3 text-base">
                      <MI name={mat.icon} className="text-blue-600 text-[20px]" />
                      {mat.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>


          </div>
        </aside>
      </div>
      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Enquire About This Course</h3>
              <button onClick={() => setShowEnquiryModal(false)} className="text-slate-400 hover:text-slate-600">
                <MI name="close" className="text-2xl" />
              </button>
            </div>
            
            <div className="p-6">
              {enquirySuccess ? (
                <div className="text-center py-8">
                  <MI name="check_circle" className="text-5xl text-green-500 mb-4 mx-auto" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Enquiry Sent!</h4>
                  <p className="text-slate-500">We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input 
                      required
                      minLength={3}
                      type="text" 
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" 
                      value={enquiryFormData.name}
                      onChange={e => setEnquiryFormData({...enquiryFormData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                    <input 
                      required
                      type="email" 
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" 
                      value={enquiryFormData.email}
                      onChange={e => setEnquiryFormData({...enquiryFormData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit phone number"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" 
                      value={enquiryFormData.phone}
                      onChange={e => setEnquiryFormData({...enquiryFormData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message (Optional)</label>
                    <textarea 
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" 
                      rows={3}
                      value={enquiryFormData.message}
                      onChange={e => setEnquiryFormData({...enquiryFormData, message: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <button 
                    disabled={isEnquiring}
                    type="submit" 
                    className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {isEnquiring ? 'Sending...' : 'Submit Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
