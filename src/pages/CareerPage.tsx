import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


export default function CareerPage() {
  const initialFormState = {
    fullName: '',
    email: '',
    phone: '',
    position: '',
    resumeUrl: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const [jobs, setJobs] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsJobsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/jobs`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setJobs(data);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setIsJobsLoading(false);
      }
    };
    fetchJobs();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload your resume.');
      return;
    }
    setLoading(true);
    setError('');
    setSubmitted(false);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // 1. Upload file
      const fileData = new FormData();
      fileData.append('file', file);
      
      const uploadRes = await fetch(`${apiUrl}/api/upload`, {
        method: 'POST',
        body: fileData,
      });
      
      const uploadResult = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadResult.error || 'File upload failed');

      // 2. Submit application with file URL
      const response = await fetch(`${apiUrl}/api/careers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          resumeUrl: uploadResult.url
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setFormData(initialFormState);
        setFile(null);
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.error || 'Failed to submit application');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="max-w-[1280px] mx-auto px-6 pt-10 pb-16 md:py-16">
        {/* Hero Section */}
        {/* <section className="pt-4 pb-16 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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
        </section> */}

        {/* Bento Section: Why Join Us */}
        {/* <section className="py-16">
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
        </section> */}

        {/* Current Openings Section */}
        <section className="py-1">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Current Openings</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">Join us in building the future. We're looking for passionate individuals to fill these roles.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isJobsLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between h-[320px]">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <Skeleton className="h-7 w-3/4 rounded-lg" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <div className="space-y-3 mb-6">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex gap-3">
                    <Skeleton className="h-12 flex-1 rounded-xl" />
                    <Skeleton className="h-12 w-12 rounded-xl" />
                  </div>
                </div>
              ))
            ) : jobs.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-[2rem] border border-gray-100">
                <p className="text-gray-500 font-medium">No open positions at the moment. Check back later!</p>
              </div>
            ) : (

              jobs.map((job: any) => (
                <div key={job.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                        {job.vacancies} {job.vacancies === 1 ? 'Vacancy' : 'Vacancies'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-6 line-clamp-4">{job.description}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex gap-3">
                    <button 
                      onClick={() => {
                        setFormData({ ...formData, position: job.title });
                        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1 bg-gray-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors text-center"
                    >
                      Apply Now
                    </button>
                    {job.pdf_url && (
                      <a 
                        href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${job.pdf_url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 flex items-center justify-center bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                        title="Download JD"
                      >
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Application Form Section */}
        <section id="application-form" className="py-16 max-w-3xl mx-auto">
          <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Apply to Simple Sphere</h2>
              <p className="text-base text-gray-600">Your journey towards impactful engineering starts here.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8" onDragEnter={handleDrag}>
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
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1" htmlFor="phone">Phone Number</label>
                  <input 
                    required
                    maxLength={10}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" 
                    id="phone" 
                    name="phone" 
                    placeholder="+91 XXXXX XXXXX" 
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1" htmlFor="position">Applying for Position</label>
                  <div className="relative">
                    <select 
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all appearance-none" 
                      id="position" 
                      name="position" 
                      value={formData.position}
                      onChange={handleChange as any}
                    >
                      <option value="" disabled>Select a position</option>
                      {jobs.map((job: any) => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Resume / Portfolio (PDF)</label>
                <div 
                  className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-[2rem] transition-all cursor-pointer ${dragActive ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 bg-gray-50/30 hover:border-blue-400 hover:bg-gray-50/50'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${file ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      <span className="material-symbols-outlined text-2xl font-bold">
                        {file ? 'description' : 'upload_file'}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-800">
                        {file ? file.name : 'Drop your resume here'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'or click to browse from device'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                  <span className="material-symbols-outlined font-bold">check_circle</span>
                  <p className="text-sm font-semibold">Application submitted successfully! We'll be in touch soon.</p>
                </div>
              )}

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
                      Processing Application...
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
