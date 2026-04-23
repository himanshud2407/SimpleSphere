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
    { name: "Curriculum", id: "curriculum" },
    { name: "Instructor", id: "instructor" },
    { name: "Reviews (1,248)", id: "reviews" }
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
    { icon: "group", label: "Enrolled", value: course.enrolled_count || "0 Students" },
    { icon: "schedule", label: "Duration", value: course.duration || "Self-paced" },
    { icon: "update", label: "Last Updated", value: course.last_updated || "Recently" },
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
              <Link to="/contact">
                <button className="h-11 px-8 bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-200">
                  Enroll Now
                </button>
              </Link>
              <button className="h-11 px-6 border-2 border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all">
                Download Syllabus
              </button>
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
                  course.curriculum?.reduce((acc: number, curr: any) => acc + (parseInt(curr.lectures) || 0), 0)
                } Lectures • {
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
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4">
                      {section.lectures} Lectures • {section.duration}
                    </span>
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

          {/* Reviews Section */}
          <section id="reviews" className="pt-8">
            <h2 className="text-2xl font-semibold mb-6 text-slate-900">Student Reviews</h2>
            <div className="bg-slate-50 rounded-xl p-8 text-center border border-slate-200">
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <MI key={s} name="star" className="text-yellow-400" fill />
                ))}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{course.rating || "4.8"} out of 5</h4>
              <p className="text-slate-500">Based on {course.reviews || "1,248"} student ratings</p>
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
                  <span className="text-[32px] font-bold text-blue-700 leading-tight">{course.price || "Free"}</span>
                  {course.original_price && (
                    <span className="text-base text-slate-400 line-through">{course.original_price}</span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full h-12 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
                  Add to Cart
                </button>
                <button className="w-full h-12 border-2 border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all">
                  Buy Now
                </button>
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

            {/* Instructor Profile */}
            <div id="instructor" className="bg-white rounded-xl border border-slate-200 p-6">
              <h4 className="font-semibold text-base mb-4 text-slate-900">Instructor</h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-200">
                  <img
                    className="w-full h-full object-cover"
                    src={course.instructor_image || "/instructor-avatar.jpg"}
                    alt={course.inst || "Instructor"}
                  />
                </div>
                <div>
                  <h5 className="font-semibold text-base text-slate-900">{course.inst || "Industry Expert"}</h5>
                  <p className="text-xs text-slate-500">{course.instructor_title || "Senior Instructor"}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-wrap">
                {course.instructor_bio || "Expert instructor with years of experience building applications and mentoring students in the latest technologies."}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
