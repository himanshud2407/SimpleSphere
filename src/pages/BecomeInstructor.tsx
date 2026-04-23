import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Globe, 
  Calendar, 
  Banknote, 
  GraduationCap, 
  Headphones, 
  Users, 
  Quote, 
  ArrowRight,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { SEO } from "@/components/SEO";

export default function BecomeInstructor() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    expertise: "Software Engineering",
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: '', message: '' });
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/instructors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitStatus({ type: 'success', message: "Thank you for applying! We will be in touch within 48 hours." });
        setFormData({ fullName: "", email: "", expertise: "Software Engineering" });
      } else {
        const errorData = await res.json().catch(() => ({}));
        setSubmitStatus({ type: 'error', message: `Error: ${errorData.error || 'There was an error submitting your application. Please try again.'}` });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus({ type: 'error', message: "Failed to connect to the server. Please check your internet connection and try again." });
    }
    setLoading(false);
  };

  return (
    <div className="bg-surface font-body text-on-surface flex flex-col">
      <SEO 
        title="Become an Instructor" 
        description="Join SimpleSphere's community of world-class instructors. Share your expertise, reach global students, and empower the next generation of tech leaders."
        keywords="teach online, instructor application, online teaching, education, tech leaders, simplesphere"
      />
      <main className="flex-grow pb-10 md:pb-0">
        {/* Hero Section */}
        

        {/* Why Teach Section */}
        <section className="bg-surface-container-low md:bg-surface py-16 md:py-24 px-6 md:px-0">
          <div className="max-w-7xl mx-auto md:px-8">
            <div className="mb-10 md:mb-16 text-center md:text-left">
              <h2 className="font-headline text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-on-surface">
                Why Teach with SimpleSphere?
              </h2>
              <div className="hidden md:block w-20 h-1.5 bg-primary-container rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1 */}
              <div className="bg-surface-container-lowest p-6 md:p-10 rounded-3xl editorial-shadow group hover:bg-surface-bright md:hover:translate-y-[-8px] transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-fixed-dim/30 md:bg-surface-container-high rounded-2xl flex items-center justify-center mb-4 md:mb-8 text-primary-stitch">
                  <Globe className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface mb-2 md:mb-4">
                  Reach Global Students
                </h3>
                <p className="text-on-secondary-container text-sm md:text-base leading-relaxed">
                  Connect with thousands of students from over 120 countries,
                  all eager to learn from your industry insights.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-lowest p-6 md:p-10 rounded-3xl editorial-shadow group hover:bg-surface-bright md:hover:translate-y-[-8px] transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-fixed-dim/30 md:bg-surface-container-high rounded-2xl flex items-center justify-center mb-4 md:mb-8 text-primary-stitch">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface mb-2 md:mb-4">
                  Flexible Schedule
                </h3>
                <p className="text-on-secondary-container text-sm md:text-base leading-relaxed">
                  Teach on your own terms. Create courses and manage your
                  classes whenever and wherever suits your lifestyle.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-lowest p-6 md:p-10 rounded-3xl editorial-shadow group hover:bg-surface-bright md:hover:translate-y-[-8px] transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-fixed-dim/30 md:bg-surface-container-high rounded-2xl flex items-center justify-center mb-4 md:mb-8 text-primary-stitch">
                  <Banknote className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface mb-2 md:mb-4">
                  Earn While You Teach
                </h3>
                <p className="text-on-secondary-container text-sm md:text-base leading-relaxed">
                  Monetize your knowledge. Our competitive revenue share model
                  ensures you are rewarded for your impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-16 md:py-24 md:bg-surface-container-low px-6 md:px-0">
          <div className="max-w-7xl mx-auto md:px-8">
            <h2 className="font-headline text-2xl md:text-4xl font-extrabold tracking-tight mb-12 md:mb-16 text-on-surface md:text-center">
              The Journey to Teaching
            </h2>

            {/* Desktop Layout */}
            <div className="hidden md:grid relative grid-cols-3 gap-12">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 hidden md:block"></div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full signature-gradient text-white flex items-center justify-center font-headline font-bold text-xl mb-6 z-10 shadow-lg shadow-primary-container/20">
                  1
                </div>
                <h3 className="font-headline text-2xl font-bold mb-3">Apply</h3>
                <p className="text-on-secondary-container max-w-xs">
                  Submit your application and portfolio for review by our
                  editorial board.
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full signature-gradient text-white flex items-center justify-center font-headline font-bold text-xl mb-6 z-10">
                  2
                </div>
                <h3 className="font-headline text-2xl font-bold mb-3">
                  Design Your Course
                </h3>
                <p className="text-on-secondary-container max-w-xs">
                  Work with our content strategists to structure your curriculum
                  for maximum impact.
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full signature-gradient text-white flex items-center justify-center font-headline font-bold text-xl mb-6 z-10">
                  3
                </div>
                <h3 className="font-headline text-2xl font-bold mb-3">
                  Launch & Grow
                </h3>
                <p className="text-on-secondary-container max-w-xs">
                  Go live on the platform and start building your global student
                  community.
                </p>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="relative space-y-12 pl-4 md:hidden">
              <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-surface-container-highest rounded-full"></div>

              <div className="relative flex gap-6">
                <div className="z-10 w-12 h-12 rounded-full bg-primary-stitch flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-primary-stitch/20">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface mb-2 font-headline">
                    Apply
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Submit your application with your professional background
                    and teaching interests.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-6">
                <div className="z-10 w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary-stitch font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface mb-2 font-headline">
                    Design Your Course
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Use our intuitive course builder and curriculum tools to
                    create an engaging learning experience.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-6">
                <div className="z-10 w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary-stitch font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface mb-2 font-headline">
                    Launch & Grow
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Go live to our student community and start growing your
                    personal educational brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructor Support Section */}
        <section className="py-16 md:py-20 inverse-surface text-inverse-on-surface px-6 md:px-0 md:bg-inverse-surface">
          <div className="max-w-7xl mx-auto md:px-8">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-3 gap-12 text-center">
              <div className="p-6">
                <GraduationCap className="w-10 h-10 md:w-12 md:h-12 mx-auto text-primary-fixed-dim mb-4" />
                <h3 className="text-xl font-headline font-bold mb-2">
                  Instructor Academy
                </h3>
                <p className="text-surface-container-high/70">
                  Master the art of online teaching with curated workshops.
                </p>
              </div>
              <div className="p-6">
                <Headphones className="w-10 h-10 md:w-12 md:h-12 mx-auto text-primary-fixed-dim mb-4" />
                <h3 className="text-xl font-headline font-bold mb-2">
                  Technical Support
                </h3>
                <p className="text-surface-container-high/70">
                  24/7 assistance for video production and platform navigation.
                </p>
              </div>
              <div className="p-6">
                <Users className="w-10 h-10 md:w-12 md:h-12 mx-auto text-primary-fixed-dim mb-4" />
                <h3 className="text-xl font-headline font-bold mb-2">
                  Peer Network
                </h3>
                <p className="text-surface-container-high/70">
                  Collaborate with fellow world-class instructors.
                </p>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden bg-inverse-surface text-inverse-on-surface rounded-3xl p-8 editorial-shadow relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              <h2 className="text-2xl font-bold mb-4 font-headline">
                You're Never Alone
              </h2>
              <p className="opacity-80 text-sm leading-relaxed mb-6">
                Access our dedicated Instructor Academy, 24/7 technical support,
                and a vibrant community of fellow educators to help you succeed.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-medium border border-white/10">
                  Resource Library
                </span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-medium border border-white/10">
                  Peer Network
                </span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-medium border border-white/10">
                  1-on-1 Mentoring
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Voices of Influence Section */}
       

        {/* Final CTA/Form */}
        <section className="py-20 md:py-24 md:bg-surface-container-low px-6 md:px-0">
          <div className="max-w-2xl mx-auto md:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-3 md:mb-4">
                {/* Mobile/Desktop text variation */}
                <span className="md:hidden">Ready to Start?</span>
                <span className="hidden md:inline">Start Your Application</span>
              </h2>
              <p className="text-on-surface-variant md:text-on-secondary-container">
                <span className="md:hidden">
                  Take the first step toward becoming a Lucid Scholar.
                </span>
                <span className="hidden md:inline">
                  Fill in your details below and we'll be in touch within 48
                  hours.
                </span>
              </p>
            </div>

            {submitStatus.message && (
              <div className={`mb-6 p-4 rounded-xl text-center font-bold ${submitStatus.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {submitStatus.message}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 md:space-y-8 bg-surface-container-lowest p-0 md:p-12 md:rounded-[2.5rem] md:editorial-shadow bg-transparent md:bg-surface-container-lowest"
            >
              <div>
                <label className="block md:font-label text-xs md:text-sm font-bold md:font-semibold text-on-surface-variant uppercase md:normal-case tracking-widest md:tracking-normal mb-2 ml-1">
                  Full Name
                </label>
                <input
                  required
                  className="w-full px-5 md:px-6 py-4 rounded-2xl md:rounded-xl bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-stitch/20 transition-all text-on-surface"
                  placeholder="e.g. Sarah Jenkins"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block md:font-label text-xs md:text-sm font-bold md:font-semibold text-on-surface-variant uppercase md:normal-case tracking-widest md:tracking-normal mb-2 ml-1">
                  Email Address
                </label>
                <input
                  required
                  className="w-full px-5 md:px-6 py-4 rounded-2xl md:rounded-xl bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-stitch/20 transition-all text-on-surface"
                  placeholder="sarah@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block md:font-label text-xs md:text-sm font-bold md:font-semibold text-on-surface-variant uppercase md:normal-case tracking-widest md:tracking-normal mb-2 ml-1">
                  Expertise Area
                </label>
                <select
                  className="w-full px-5 md:px-6 py-4 rounded-2xl md:rounded-xl bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-stitch/20 transition-all text-on-surface appearance-none"
                  value={formData.expertise}
                  onChange={(e) =>
                    setFormData({ ...formData, expertise: e.target.value })
                  }
                >
                  <option>Software Engineering</option>
                  <option>Data Science & AI</option>
                  <option>Digital Marketing</option>
                  <option>Business & Strategy</option>
                  <option>Creative Design</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full signature-gradient text-white py-5 rounded-3xl md:rounded-2xl font-headline font-bold text-lg hover:shadow-xl transition-all active:scale-95 mt-4 editorial-shadow md:shadow-none ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Submitting...' : 'Apply Now'}
              </button>

              <p className="hidden md:block text-xs text-center text-outline leading-relaxed px-8">
                By applying, you agree to our Instructor Terms and Privacy
                Policy. We value intellectual property and data privacy.
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
