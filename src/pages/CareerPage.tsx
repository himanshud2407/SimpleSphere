import React, { useState } from 'react';

export default function CareerPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    resumeUrl: '' // In a real app, this would be a file upload URL
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/careers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="max-w-[1280px] mx-auto px-6 py-32 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-blue-50 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your interest in Simple Sphere. Our recruitment team will review your profile and get back to you shortly.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-blue-600 font-semibold hover:underline"
          >
            Back to Careers
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="max-w-[1280px] mx-auto px-6 pt-10 pb-16 md:py-16">
        {/* Hero Section */}
        <section className="pt-4 pb-16 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wider uppercase">Join Our Team</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">Build the Future of Enterprise</h1>
        <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
            At Simple Sphere, we're building the next generation of productivity tools. Join a mission-driven team where technical excellence and radical transparency drive everything we do.
        </p>
        <div className="flex flex-wrap gap-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">Fast Growth</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined">public</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">Remote First</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined">volunteer_activism</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">Inclusive Culture</span>
          </div>
        </div>
        </div>
        <div className="relative h-[480px] rounded-[2rem] overflow-hidden shadow-2xl">
          <img className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" alt="Team Collaboration" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"/>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
        </div>
        </section>

        {/* Bento Section: Why Join Us */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-10 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Engineering Excellence</h3>
              <p className="text-base text-gray-600 leading-relaxed">We pride ourselves on clean code, robust architecture, and a developer-first environment. Join a team where your technical contributions directly shape the product roadmap and impact millions of users.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2rem] flex flex-col justify-between text-white shadow-xl">
              <span className="material-symbols-outlined text-5xl">star</span>
              <div>
                <div className="text-4xl font-bold">4.9/5</div>
                <p className="text-sm font-medium opacity-90 mt-1">Glassdoor Rating</p>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600">
                <span className="material-symbols-outlined text-3xl">payments</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900">Competitive Equity</h4>
              <p className="text-sm text-gray-500 mt-2">True ownership in our collective success</p>
            </div>
            <div className="md:col-span-2 bg-white p-10 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Global Connectivity</h3>
                <p className="text-base text-gray-600 leading-relaxed">Work from anywhere in the world. We provide a comprehensive home-office stipend, premium health benefits, and yearly retreats to exotic locations to keep the sphere connected.</p>
              </div>
              <div className="absolute -right-12 -bottom-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 text-blue-900">
                <span className="material-symbols-outlined text-[200px]">language</span>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-16 max-w-3xl mx-auto">
          <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Apply to Simple Sphere</h2>
              <p className="text-base text-gray-600">Your journey towards impactful engineering starts here.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1" htmlFor="fullName">Full Name</label>
                  <input 
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" 
                    id="fullName" 
                    name="fullName" 
                    placeholder="Enter your full name" 
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1" htmlFor="email">Email Address</label>
                  <input 
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" 
                    id="email" 
                    name="email" 
                    placeholder="name@company.com" 
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1" htmlFor="university">College / University</label>
                <input 
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" 
                  id="university" 
                  name="university" 
                  placeholder="Name of your institution" 
                  type="text"
                  value={formData.university}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1" htmlFor="resumeUrl">Resume Link / Portfolio</label>
                <input 
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" 
                  id="resumeUrl" 
                  name="resumeUrl" 
                  placeholder="Google Drive, Dropbox, or Portfolio URL" 
                  type="url"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-xl border border-red-100">
                  {error}
                </p>
              )}

              <div className="pt-6">
                <button 
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl text-base font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-6">
                  By submitting, you agree to our recruitment and privacy policies.
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
