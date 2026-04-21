import React, { useEffect } from 'react';
import { 
  Calendar, Shield, Edit, CheckCircle, Ban, 
  Mail, MapPin 
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { SEO } from '@/components/SEO';

const SECTION_IDS = ['introduction', 'eligibility', 'responsibilities', 'intellectual', 'prohibited', 'liability', 'contact'];

export default function TermsAndConditions() {
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
        title="Terms and Conditions" 
        description="SimpleSphere Terms and Conditions - Review the rules, regulations, and guidelines for using our educational platform."
        keywords="terms and conditions, user agreement, legal, simplesphere"
      />
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-white shadow-sm py-20 px-8 mb-16">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Legal Documentation
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-none">
            Terms and <br/><span className="text-blue-600">Conditions</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
            Welcome to SimpleSphere. These terms outline the rules and regulations for the use of our platform. By accessing this website, we assume you accept these terms and conditions.
          </p>
          <div className="mt-8 flex items-center gap-4 text-sm font-semibold text-slate-500">
            <Calendar className="text-blue-600 w-5 h-5" />
            Last Updated: November 24, 2024
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
      </header>

      {/* Content Shell */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Table of Contents Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h4 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#introduction" className={`text-sm font-semibold hover:text-blue-600 transition-colors flex items-center gap-3 ${activeSection === 'introduction' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}><span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'introduction' ? 'bg-blue-600' : 'bg-slate-300'}`}></span>Introduction</a></li>
              <li><a href="#eligibility" className={`text-sm font-semibold hover:text-blue-600 transition-colors flex items-center gap-3 ${activeSection === 'eligibility' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}><span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'eligibility' ? 'bg-blue-600' : 'bg-slate-300'}`}></span>User Eligibility</a></li>
              <li><a href="#responsibilities" className={`text-sm font-semibold hover:text-blue-600 transition-colors flex items-center gap-3 ${activeSection === 'responsibilities' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}><span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'responsibilities' ? 'bg-blue-600' : 'bg-slate-300'}`}></span>Account Responsibilities</a></li>
              <li><a href="#intellectual" className={`text-sm font-semibold hover:text-blue-600 transition-colors flex items-center gap-3 ${activeSection === 'intellectual' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}><span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'intellectual' ? 'bg-blue-600' : 'bg-slate-300'}`}></span>Intellectual Property</a></li>
              <li><a href="#prohibited" className={`text-sm font-semibold hover:text-blue-600 transition-colors flex items-center gap-3 ${activeSection === 'prohibited' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}><span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'prohibited' ? 'bg-blue-600' : 'bg-slate-300'}`}></span>Prohibited Activities</a></li>
              <li><a href="#liability" className={`text-sm font-semibold hover:text-blue-600 transition-colors flex items-center gap-3 ${activeSection === 'liability' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}><span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'liability' ? 'bg-blue-600' : 'bg-slate-300'}`}></span>Limitation of Liability</a></li>
              <li><a href="#contact" className={`text-sm font-semibold hover:text-blue-600 transition-colors flex items-center gap-3 ${activeSection === 'contact' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}><span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'contact' ? 'bg-blue-600' : 'bg-slate-300'}`}></span>Contact Information</a></li>
            </ul>
          </div>
        </aside>

        {/* Main Document Canvas */}
        <div className="lg:col-span-9 space-y-20">
          
          {/* Section: Introduction */}
          <section id="introduction" className="scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="text-6xl font-extrabold text-blue-100 select-none hidden md:block">01</div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                  <span className="md:hidden text-blue-600 mr-2">01.</span>Introduction
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                  <p>SimpleSphere provides an online educational platform designed to connect mentors with students worldwide. These terms govern your use of our website, applications, and services. By using SimpleSphere, you acknowledge that you have read, understood, and agreed to be bound by these terms.</p>
                  <p>If you disagree with any part of these terms and conditions, you must not use this website. The materials contained in this website are protected by applicable copyright and trademark law.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: User Eligibility */}
          <section id="eligibility" className="scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="text-6xl font-extrabold text-blue-100 select-none hidden md:block">02</div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                  <span className="md:hidden text-blue-600 mr-2">02.</span>User Eligibility
                </h2>
                <div className="bg-white p-8 rounded-xl border-l-4 border-blue-600 shadow-sm">
                  <p className="text-slate-600 leading-relaxed italic">
                    "To use SimpleSphere, you must be at least 18 years of age or the legal age of majority in your jurisdiction. By using our platform, you represent and warrant that you have the legal capacity to enter into a binding agreement."
                  </p>
                </div>
                <div className="mt-6 prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>Minors under the age of 18 may only use the services under the supervision of a parent or legal guardian who agrees to be bound by these terms. We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Account Responsibilities */}
          <section id="responsibilities" className="scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="text-6xl font-extrabold text-blue-100 select-none hidden md:block">03</div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                  <span className="md:hidden text-blue-600 mr-2">03.</span>Account Responsibilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <Shield className="text-blue-600 w-8 h-8 mb-4" />
                    <h4 className="font-bold mb-2 text-slate-900">Security</h4>
                    <p className="text-sm text-slate-600">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <Edit className="text-blue-600 w-8 h-8 mb-4" />
                    <h4 className="font-bold mb-2 text-slate-900">Accuracy</h4>
                    <p className="text-sm text-slate-600">You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Intellectual Property */}
          <section id="intellectual" className="scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="text-6xl font-extrabold text-blue-100 select-none hidden md:block">04</div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                  <span className="md:hidden text-blue-600 mr-2">04.</span>Intellectual Property
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                  <p>Unless otherwise stated, SimpleSphere and/or its licensors own the intellectual property rights for all material on the platform. All intellectual property rights are reserved.</p>
                  <ul className="list-none space-y-3 pl-0">
                    <li className="flex items-start gap-3"><CheckCircle className="text-blue-600 w-5 h-5 mt-1 shrink-0" /> <span>You may access this for your own personal use subjected to restrictions set in these terms.</span></li>
                    <li className="flex items-start gap-3"><Ban className="text-blue-600 w-5 h-5 mt-1 shrink-0" /> <span>You must not republish material from SimpleSphere.</span></li>
                    <li className="flex items-start gap-3"><Ban className="text-blue-600 w-5 h-5 mt-1 shrink-0" /> <span>You must not sell, rent or sub-license material from SimpleSphere.</span></li>
                    <li className="flex items-start gap-3"><Ban className="text-blue-600 w-5 h-5 mt-1 shrink-0" /> <span>You must not reproduce, duplicate or copy material from SimpleSphere.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Prohibited Activities */}
          <section id="prohibited" className="scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="text-6xl font-extrabold text-blue-100 select-none hidden md:block">05</div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                  <span className="md:hidden text-blue-600 mr-2">05.</span>Prohibited Activities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-5 rounded-lg border border-red-100">
                    <p className="text-sm font-bold text-red-600 mb-2">Harmful Behavior</p>
                    <p className="text-sm text-slate-600 leading-relaxed">Engaging in any activity that harms, threatens, or harasses other users or mentors.</p>
                  </div>
                  <div className="bg-red-50 p-5 rounded-lg border border-red-100">
                    <p className="text-sm font-bold text-red-600 mb-2">Data Mining</p>
                    <p className="text-sm text-slate-600 leading-relaxed">Using automated systems to scrape or harvest data from our servers.</p>
                  </div>
                  <div className="bg-red-50 p-5 rounded-lg border border-red-100">
                    <p className="text-sm font-bold text-red-600 mb-2">System Interference</p>
                    <p className="text-sm text-slate-600 leading-relaxed">Attempting to bypass security measures or disrupt service performance.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Limitation of Liability */}
          <section id="liability" className="scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="text-6xl font-extrabold text-blue-100 select-none hidden md:block">06</div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                  <span className="md:hidden text-blue-600 mr-2">06.</span>Limitation of Liability
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed bg-white border border-slate-100 shadow-sm p-8 rounded-2xl">
                  <p>To the maximum extent permitted by applicable law, SimpleSphere shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:</p>
                  <ul className="text-sm mt-4 space-y-2 list-disc pl-5">
                    <li>Your access to or use of or inability to access or use the services.</li>
                    <li>Any conduct or content of any third party on the services.</li>
                    <li>Any content obtained from the services.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Contact Information */}
          <section id="contact" className="scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="text-6xl font-extrabold text-blue-100 select-none hidden md:block">07</div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                  <span className="md:hidden text-blue-600 mr-2">07.</span>Contact Information
                </h2>
                <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-1 rounded-3xl">
                  <div className="bg-white p-8 rounded-[1.4rem] flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                      <p className="text-slate-600 font-medium mb-6">Questions about the Terms and Conditions? Get in touch with our legal team.</p>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <Mail className="text-blue-600 w-5 h-5" />
                          <span className="font-bold text-slate-900">legal@simplesphere.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="text-blue-600 w-5 h-5" />
                          <span className="font-bold text-slate-900">123 Learning Way, Suite 500, San Francisco, CA 94103</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 transition-all w-full md:w-auto">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
