import React, { useEffect } from 'react';
import { 
  Calendar, ShieldCheck, Info, Database, Brain, 
  ShieldAlert, Cookie, Share2, Gavel, CheckCircle, 
  GraduationCap, BarChart, Mail, Shield, Download, 
  Edit, Trash2, Ban 
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { SEO } from '@/components/SEO';

const SECTION_IDS = ['intro', 'collection', 'usage', 'security', 'cookies', 'rights', 'changes'];

export default function PrivacyPolicy() {
  const { hash } = useLocation();
  const activeSection = useScrollSpy(SECTION_IDS, 150);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <main className="pt-8 pb-20 bg-slate-50 min-h-screen">
      <SEO 
        title="Privacy Policy" 
        description="SimpleSphere Privacy Policy - Learn how we collect, use, and protect your personal information on our educational platform."
        keywords="privacy policy, data protection, security, simplesphere"
      />
      {/* Hero Section */}
      <header className="relative py-20 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-6">
            Legal Documentation
          </div>
          <h1 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 max-w-3xl">
            Privacy Policy
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-600 w-5 h-5" />
              <span>Last Updated: October 24, 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-600 w-5 h-5" />
              <span>GDPR & CCPA Compliant</span>
            </div>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 translate-x-20 -z-0"></div>
      </header>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
          <nav className="space-y-1">
            <a href="#intro" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === 'intro' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
              <Info className="w-5 h-5" />
              Introduction
            </a>
            <a href="#collection" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === 'collection' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
              <Database className="w-5 h-5" />
              Information We Collect
            </a>
            <a href="#usage" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === 'usage' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
              <Brain className="w-5 h-5" />
              How We Use Information
            </a>
            <a href="#security" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === 'security' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
              <ShieldAlert className="w-5 h-5" />
              Data Storage & Security
            </a>
            <a href="#cookies" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === 'cookies' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
              <Cookie className="w-5 h-5" />
              Cookies & Tracking
            </a>
            <a href="#rights" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === 'rights' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
              <Gavel className="w-5 h-5" />
              Your Rights
            </a>
            <a href="#changes" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === 'changes' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
              <Edit className="w-5 h-5" />
              Changes to Policy
            </a>
          </nav>
        </aside>

        {/* Main Text Content */}
        <div className="lg:col-span-9 space-y-16">
          <section id="intro" className="space-y-6 pt-4">
            <p className="text-xl leading-relaxed text-slate-700 font-medium">
              At SimpleSphere, we believe that education should be accessible, and your privacy should be non-negotiable. This Policy explains how we handle your data with the transparency and respect it deserves.
            </p>
            <p className="text-slate-600 leading-relaxed">
              By accessing our platform, you trust us with your personal information. This isn't just a legal requirement for us—it's a commitment to building a learning environment where you feel secure.
            </p>
          </section>

          {/* Section: Information We Collect */}
          <section id="collection" className="p-8 md:p-10 rounded-[2rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] pt-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight">Information We Collect</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-sans text-xl font-bold text-blue-600">Directly Provided</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 w-5 h-5 mt-0.5 shrink-0" />
                    <span>Account details (name, email, password)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 w-5 h-5 mt-0.5 shrink-0" />
                    <span>Profile information and educational preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 w-5 h-5 mt-0.5 shrink-0" />
                    <span>Payment and billing information</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-sans text-xl font-bold text-blue-600">Automatically Collected</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 w-5 h-5 mt-0.5 shrink-0" />
                    <span>Usage data and learning progress metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 w-5 h-5 mt-0.5 shrink-0" />
                    <span>Device metadata and IP addresses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 w-5 h-5 mt-0.5 shrink-0" />
                    <span>Interaction logs with our support teams</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: How We Use Your Information */}
          <section id="usage" className="space-y-8 pt-8">
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight">How We Use Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100">
                <GraduationCap className="text-blue-600 w-8 h-8 mb-4" />
                <h4 className="font-bold mb-2">Personalization</h4>
                <p className="text-sm text-slate-600">We tailor your learning path based on your progress and interests.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100">
                <BarChart className="text-blue-600 w-8 h-8 mb-4" />
                <h4 className="font-bold mb-2">Improvement</h4>
                <p className="text-sm text-slate-600">Aggregated data helps us refine our course content and UI.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100">
                <Mail className="text-blue-600 w-8 h-8 mb-4" />
                <h4 className="font-bold mb-2">Communication</h4>
                <p className="text-sm text-slate-600">Sending critical updates, certificates, and occasional newsletters.</p>
              </div>
            </div>
          </section>

          {/* Section: Data Storage and Security */}
          <section id="security" className="relative group pt-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 opacity-5 rounded-[2.25rem] blur transition group-hover:opacity-10"></div>
            <div className="relative p-8 md:p-10 rounded-[2rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-1/3">
                  <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-200">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="Server security" 
                      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800" 
                    />
                  </div>
                </div>
                <div className="md:w-2/3 space-y-6">
                  <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight">Data Storage and Security</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We employ industry-standard encryption protocols (TLS/SSL) for all data in transit and at rest. Your information is stored on high-security servers located in the European Union and North America.
                  </p>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                    <Shield className="text-blue-600 w-5 h-5" />
                    <span className="text-sm font-semibold text-slate-800">256-bit AES Encryption enabled by default</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Cookies and Tracking */}
          <section id="cookies" className="space-y-8 pt-8">
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight">Cookies and Tracking</h2>
            <div className="bg-slate-100/50 p-8 rounded-3xl border border-slate-200/50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white px-6 py-5 rounded-2xl shadow-sm">
                  <h4 className="font-bold text-blue-600 mb-1">Essential</h4>
                  <p className="text-sm text-slate-600">Necessary for the platform to function properly.</p>
                </div>
                <div className="bg-white px-6 py-5 rounded-2xl shadow-sm">
                  <h4 className="font-bold text-blue-600 mb-1">Functional</h4>
                  <p className="text-sm text-slate-600">Remembers your preferences and settings.</p>
                </div>
                <div className="bg-white px-6 py-5 rounded-2xl shadow-sm">
                  <h4 className="font-bold text-blue-600 mb-1">Analytical</h4>
                  <p className="text-sm text-slate-600">Helps us understand how you use the site.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Your Rights */}
          <section id="rights" className="bg-blue-600 text-white p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden pt-8">
            <div className="relative z-10 space-y-8">
              <h2 className="font-sans text-2xl md:text-3xl font-bold">Your Rights & Control</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Right to Access
                  </h4>
                  <p className="text-blue-100 text-sm">Request a copy of all personal data we hold about you at any time.</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    Right to Correction
                  </h4>
                  <p className="text-blue-100 text-sm">Update or rectify any inaccurate or incomplete personal information.</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Right to Erasure
                  </h4>
                  <p className="text-blue-100 text-sm">Request that we delete your data permanently from our systems.</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <Ban className="w-5 h-5" />
                    Right to Object
                  </h4>
                  <p className="text-blue-100 text-sm">Opt-out of data processing for marketing or research purposes.</p>
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mb-32 -mr-32"></div>
          </section>

          <section id="changes" className="py-8 border-t border-slate-200 pt-8">
            <h2 className="font-sans text-2xl font-bold tracking-tight mb-4">Changes to This Policy</h2>
            <p className="text-slate-600">
              We may update this policy periodically to reflect changes in our practices or for legal reasons. We will notify you of any significant changes via email or through a prominent notice on our platform.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
