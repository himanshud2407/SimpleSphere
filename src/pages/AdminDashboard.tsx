
import React, { useState, useEffect } from 'react';
import { Settings, Users, BookOpen, MessageSquare, Plus, Trash2, Edit, LogOut, GraduationCap, CheckCircle, Check, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { token, logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [leads, setLeads] = useState([]);
  const [courseEnquiries, setCourseEnquiries] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [careers, setCareers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedCourseEnquiry, setSelectedCourseEnquiry] = useState<any>(null);

  // Jobs Form State
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobFormData, setJobFormData] = useState({ title: '', description: '', vacancies: 1, pdf_url: '', id: null as string | null });
  const [jobFile, setJobFile] = useState<File | null>(null);

  // Form State
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showContentForm, setShowContentForm] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    title: '', img: '', inst: '', price: '', category: '', level: '', 
    description: '', about_course: '', duration: '', last_updated: '', 
    curriculum: '', materials_included: '', learning_objectives: '', feature_cards: '',
    original_price: '', enrolled_count: '', instructor_title: '', instructor_bio: '', instructor_image: '', id: null as string | null
  });

  const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

  useEffect(() => {
    fetchCourses();
    fetchLeads();
    fetchCourseEnquiries();
    fetchInstructors();
    fetchCareers();
    fetchJobs();
  }, []);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const handleResponse = async (res: Response) => {
    if (res.status === 401 || res.status === 403) {
      logout();
      return null;
    }
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error(`API Error (${res.status}):`, text.substring(0, 100));
      return null;
    }
    return res.json();
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/courses`, { headers: getHeaders() });
      const data = await handleResponse(res);
      if (data && Array.isArray(data)) setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}/leads`, { headers: getHeaders() });
      const data = await handleResponse(res);
      if (data && Array.isArray(data)) setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const fetchCourseEnquiries = async () => {
    try {
      const res = await fetch(`${API_URL}/course-enquiries`, { headers: getHeaders() });
      const data = await handleResponse(res);
      if (data && Array.isArray(data)) setCourseEnquiries(data);
    } catch (err) {
      console.error('Error fetching course enquiries:', err);
    }
  };

  const handleDeleteCourseEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await fetch(`${API_URL}/course-enquiries/${id}`, { method: 'DELETE', headers: getHeaders() });
      fetchCourseEnquiries();
    } catch (err) {
      console.error('Error deleting course enquiry:', err);
    }
  };

  const handleMarkCourseEnquiryDone = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'done' ? 'pending' : 'done';
      await fetch(`${API_URL}/course-enquiries/${id}`, { 
        method: 'PATCH', 
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      fetchCourseEnquiries();
    } catch (err) {
      console.error('Error updating course enquiry status:', err);
    }
  };

  const fetchInstructors = async () => {
    try {
      const res = await fetch(`${API_URL}/instructors`, { headers: getHeaders() });
      const data = await handleResponse(res);
      if (data && Array.isArray(data)) setInstructors(data);
    } catch (err) {
      console.error('Error fetching instructors:', err);
    }
  };

  const fetchCareers = async () => {
    try {
      const res = await fetch(`${API_URL}/careers`, { headers: getHeaders() });
      const data = await handleResponse(res);
      if (data && Array.isArray(data)) setCareers(data);
    } catch (err) {
      console.error('Error fetching careers:', err);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`, { headers: getHeaders() });
      const data = await handleResponse(res);
      if (data && Array.isArray(data)) setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let pdf_url = jobFormData.pdf_url;
      if (jobFile) {
        const fileData = new FormData();
        fileData.append('file', jobFile);
        const uploadRes = await fetch(`${API_URL}/upload`, { method: 'POST', body: fileData });
        const uploadResult = await uploadRes.json();
        if (uploadRes.ok) pdf_url = uploadResult.url;
      }

      const method = jobFormData.id ? 'PUT' : 'POST';
      const url = jobFormData.id ? `${API_URL}/jobs/${jobFormData.id}` : `${API_URL}/jobs`;
      
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify({ ...jobFormData, pdf_url })
      });
      
      if (res.ok) {
        setShowJobForm(false);
        setJobFormData({ title: '', description: '', vacancies: 1, pdf_url: '', id: null });
        setJobFile(null);
        fetchJobs();
      }
    } catch (err) {
      console.error('Error saving job:', err);
    }
    setLoading(false);
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    try {
      await fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE', headers: getHeaders() });
      fetchJobs();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const handleEditJob = (job: any) => {
    setJobFormData({
      title: job.title || '',
      description: job.description || '',
      vacancies: job.vacancies || 1,
      pdf_url: job.pdf_url || '',
      id: job.id
    });
    setJobFile(null);
    setShowJobForm(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = courseFormData.id ? 'PUT' : 'POST';
      const url = courseFormData.id ? `${API_URL}/courses/${courseFormData.id}` : `${API_URL}/courses`;
      
      // Convert simple text formats to JSON arrays for the API
      const payload = {
        ...courseFormData,
        learning_objectives: courseFormData.learning_objectives.split('\n').map(s => s.trim()).filter(Boolean),
        materials_included: courseFormData.materials_included.split('\n').map(line => {
          const [icon, label] = line.split('|').map(s => s.trim());
          return icon && label ? { icon, label } : null;
        }).filter(Boolean),
        feature_cards: courseFormData.feature_cards.split('\n').map(line => {
          const [icon, title, description] = line.split('|').map(s => s.trim());
          return icon && title ? { icon, title, description: description || '' } : null;
        }).filter(Boolean),
        curriculum: courseFormData.curriculum.split('\n').map(line => {
          const [title, lectures, duration] = line.split('|').map(s => s.trim());
          return title ? { title, lectures: lectures || '0', duration: duration || '0h', items: [] } : null;
        }).filter(Boolean)
      };

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setShowCourseForm(false);
        setShowContentForm(false);
        setCourseFormData({ 
          title: '', img: '', inst: '', price: '', category: '', level: '', 
          description: '', about_course: '', duration: '', last_updated: '', 
          curriculum: '', materials_included: '', learning_objectives: '', feature_cards: '',
          original_price: '', enrolled_count: '', instructor_title: '', instructor_bio: '', instructor_image: '', id: null 
        });
        fetchCourses();
      }
    } catch (err) {
      console.error('Error saving course:', err);
    }
    setLoading(false);
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await fetch(`${API_URL}/leads/${id}`, { method: 'DELETE', headers: getHeaders() });
      fetchLeads();
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const handleMarkLeadDone = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'done' ? 'pending' : 'done';
      await fetch(`${API_URL}/leads/${id}`, { 
        method: 'PATCH', 
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      fetchLeads();
    } catch (err) {
      console.error('Error updating lead status:', err);
    }
  };

  const handleDeleteInstructor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await fetch(`${API_URL}/instructors/${id}`, { method: 'DELETE', headers: getHeaders() });
      fetchInstructors();
    } catch (err) {
      console.error('Error deleting instructor:', err);
    }
  };

  const handleMarkInstructorDone = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'done' ? 'pending' : 'done';
      await fetch(`${API_URL}/instructors/${id}`, { 
        method: 'PATCH', 
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      fetchInstructors();
    } catch (err) {
      console.error('Error updating instructor status:', err);
    }
  };

  const handleDeleteCareer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this career application?')) return;
    try {
      await fetch(`${API_URL}/careers/${id}`, { method: 'DELETE', headers: getHeaders() });
      fetchCareers();
    } catch (err) {
      console.error('Error deleting career:', err);
    }
  };

  const handleMarkCareerDone = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'done' ? 'pending' : 'done';
      await fetch(`${API_URL}/careers/${id}`, { 
        method: 'PATCH', 
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      fetchCareers();
    } catch (err) {
      console.error('Error updating career status:', err);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await fetch(`${API_URL}/courses/${id}`, { 
        method: 'DELETE',
        headers: getHeaders()
      });
      fetchCourses();
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  const handleEditCourse = (course: any) => {
    setCourseFormData({
      title: course.title || '',
      img: course.img || '',
      inst: course.inst || '',
      price: course.price || '',
      category: course.category || '',
      level: course.level || '',
      description: course.description || '',
      about_course: course.about_course || '',
      duration: course.duration || '',
      last_updated: course.last_updated || '',
      curriculum: Array.isArray(course.curriculum) ? course.curriculum.map((c: any) => `${c.title} | ${c.lectures} | ${c.duration}`).join('\n') : '',
      materials_included: Array.isArray(course.materials_included) ? course.materials_included.map((m: any) => `${m.icon} | ${m.label}`).join('\n') : '',
      learning_objectives: Array.isArray(course.learning_objectives) ? course.learning_objectives.join('\n') : '',
      feature_cards: Array.isArray(course.feature_cards) ? course.feature_cards.map((f: any) => `${f.icon} | ${f.title} | ${f.description}`).join('\n') : '',
      original_price: course.original_price || '',
      enrolled_count: course.enrolled_count || '',
      instructor_title: course.instructor_title || '',
      instructor_bio: course.instructor_bio || '',
      instructor_image: course.instructor_image || '',
      id: course.id
    });
    setShowCourseForm(true);
    setShowContentForm(false);
  };

  const handleEditContent = (course: any) => {
    handleEditCourse(course);
    setShowContentForm(true);
    setShowCourseForm(false);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white border-r border-b lg:border-b-0 lg:min-h-screen p-6 shadow-sm flex flex-col">
        <Link to="/" className="block mb-6 hover:opacity-80 transition-opacity">
          <img
            src="/logo.svg"
            alt="SimpleSphere Logo"
            className="w-40 h-auto"
          />
        </Link>
        <p className="text-xs text-gray-500 mb-8 px-1">
          Logged in as {user?.email}
        </p>

        <ul className="space-y-2 flex-1">
          <li>
            <button
              onClick={() => setActiveTab("courses")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "courses" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <BookOpen className="w-5 h-5" /> Courses
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "leads" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <MessageSquare className="w-5 h-5" /> Contact Leads
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("courseEnquiries")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "courseEnquiries" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <BookOpen className="w-5 h-5" /> Course Enquiries
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("instructors")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "instructors" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <GraduationCap className="w-5 h-5" /> Instructors
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("careers")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "careers" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <MessageSquare className="w-5 h-5" /> Applications
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "jobs" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <Users className="w-5 h-5" /> Job Postings
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "settings" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <Settings className="w-5 h-5" /> Settings
            </button>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8">
        {/* COURSES TAB */}
        {activeTab === "courses" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
            <div className="bg-blue-50 p-8 rounded-[2.5rem] mb-8">
              <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Manage Your Courses
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                You have successfully migrated to **Sanity CMS**. To add, edit,
                or delete courses, please use the professional Sanity Studio
                interface. This ensures your content stays organized and looks
                premium across the platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://simplesphere-studio.sanity.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Open Sanity Studio
                </a>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("leads")}
                  className="px-8 py-3 rounded-xl border-gray-200"
                >
                  View Recent Leads
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left w-full">
              <div className="p-6 bg-white border rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-2">Why Sanity?</h3>
                <p className="text-sm text-gray-500">
                  Structured content, real-time collaboration, and a premium
                  editing experience for your curriculum.
                </p>
              </div>
              <div className="p-6 bg-white border rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-2">
                  Local Development
                </h3>
                <p className="text-sm text-gray-500">
                  Run{" "}
                  <code className="bg-gray-100 px-1 rounded">npm run dev</code>{" "}
                  inside the{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    /simplesphere
                  </code>{" "}
                  directory to start the studio.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* LEADS TAB */}
        {activeTab === "leads" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Contact Form Leads
              </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 font-semibold text-gray-600">Name</th>
                    <th className="p-4 font-semibold text-gray-600">Email</th>
                    <th className="p-4 font-semibold text-gray-600">Phone</th>
                    <th className="p-4 font-semibold text-gray-600">Subject</th>
                    <th className="p-4 font-semibold text-gray-600">Message</th>
                    <th className="p-4 font-semibold text-gray-600">Date</th>
                    <th className="p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-500">
                        No leads found yet.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead: any) => (
                      <tr
                        key={lead.id}
                        className={`border-b hover:bg-gray-50 ${lead.status === "done" ? "opacity-50" : ""}`}
                      >
                        <td className="p-4">{lead.name}</td>
                        <td className="p-4">{lead.email}</td>
                        <td className="p-4">{lead.phone || "N/A"}</td>
                        <td className="p-4">{lead.subject}</td>
                        <td className="p-4 max-w-xs">
                          <div className="flex items-center gap-2">
                            <span className="truncate flex-1">{lead.message}</span>
                            <button 
                              onClick={() => setSelectedLead(lead)}
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-semibold whitespace-nowrap"
                            >
                              <Eye className="w-3 h-3" /> View More
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 flex gap-2">
                          <button
                            onClick={() =>
                              handleMarkLeadDone(lead.id, lead.status)
                            }
                            className={`${lead.status === "done" ? "text-green-600" : "text-gray-400"} hover:text-green-700`}
                            title={
                              lead.status === "done"
                                ? "Mark as Pending"
                                : "Mark as Done"
                            }
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COURSE ENQUIRIES TAB */}
        {activeTab === "courseEnquiries" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Course Enquiries
              </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 font-semibold text-gray-600">Name</th>
                    <th className="p-4 font-semibold text-gray-600">Email</th>
                    <th className="p-4 font-semibold text-gray-600">Phone</th>
                    <th className="p-4 font-semibold text-gray-600">Course</th>
                    <th className="p-4 font-semibold text-gray-600">Message</th>
                    <th className="p-4 font-semibold text-gray-600">Date</th>
                    <th className="p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courseEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-500">
                        No course enquiries found yet.
                      </td>
                    </tr>
                  ) : (
                    courseEnquiries.map((enquiry: any) => (
                      <tr
                        key={enquiry.id}
                        className={`border-b hover:bg-gray-50 ${enquiry.status === "done" ? "opacity-50" : ""}`}
                      >
                        <td className="p-4">{enquiry.name}</td>
                        <td className="p-4">{enquiry.email}</td>
                        <td className="p-4">{enquiry.phone || "N/A"}</td>
                        <td className="p-4 font-medium text-blue-600">{enquiry.course_title}</td>
                        <td className="p-4 max-w-xs">
                          <div className="flex items-center gap-2">
                            <span className="truncate flex-1">{enquiry.message || "N/A"}</span>
                            <button 
                              onClick={() => setSelectedCourseEnquiry(enquiry)}
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-semibold whitespace-nowrap"
                            >
                              <Eye className="w-3 h-3" /> View More
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          {new Date(enquiry.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 flex gap-2">
                          <button
                            onClick={() =>
                              handleMarkCourseEnquiryDone(enquiry.id, enquiry.status)
                            }
                            className={`${enquiry.status === "done" ? "text-green-600" : "text-gray-400"} hover:text-green-700`}
                            title={
                              enquiry.status === "done"
                                ? "Mark as Pending"
                                : "Mark as Done"
                            }
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourseEnquiry(enquiry.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INSTRUCTORS TAB */}
        {activeTab === "instructors" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Instructor Applications
              </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 font-semibold text-gray-600">Name</th>
                    <th className="p-4 font-semibold text-gray-600">Email</th>
                    <th className="p-4 font-semibold text-gray-600">Phone</th>
                    <th className="p-4 font-semibold text-gray-600">
                      Expertise
                    </th>
                    <th className="p-4 font-semibold text-gray-600">
                      Date Applied
                    </th>
                    <th className="p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        No applications found yet.
                      </td>
                    </tr>
                  ) : (
                    instructors.map((inst: any) => (
                      <tr
                        key={inst.id}
                        className={`border-b hover:bg-gray-50 ${inst.status === "done" ? "opacity-50" : ""}`}
                      >
                        <td className="p-4">
                          {inst.fullname || inst.fullName}
                        </td>
                        <td className="p-4">{inst.email}</td>
                        <td className="p-4">{inst.phone || "N/A"}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                            {inst.expertise}
                          </span>
                        </td>
                        <td className="p-4">
                          {inst.created_at
                            ? new Date(inst.created_at).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="p-4 flex gap-2">
                          <button
                            onClick={() =>
                              handleMarkInstructorDone(inst.id, inst.status)
                            }
                            className={`${inst.status === "done" ? "text-green-600" : "text-gray-400"} hover:text-green-700`}
                            title={
                              inst.status === "done"
                                ? "Mark as Pending"
                                : "Mark as Done"
                            }
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteInstructor(inst.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete Application"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CAREERS TAB */}
        {activeTab === "careers" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Job Applications
              </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 font-semibold text-gray-600">
                      Candidate
                    </th>
                    <th className="p-4 font-semibold text-gray-600">Email</th>
                    <th className="p-4 font-semibold text-gray-600">Phone</th>
                    <th className="p-4 font-semibold text-gray-600">
                      Position
                    </th>
                    <th className="p-4 font-semibold text-gray-600">
                      Resume/Link
                    </th>
                    <th className="p-4 font-semibold text-gray-600">Date</th>
                    <th className="p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {careers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-500">
                        No applications found yet.
                      </td>
                    </tr>
                  ) : (
                    careers.map((app: any) => (
                      <tr
                        key={app.id}
                        className={`border-b hover:bg-gray-50 ${app.status === "done" ? "opacity-50" : ""}`}
                      >
                        <td className="p-4 font-medium">
                          {app.fullName || app.fullname}
                        </td>
                        <td className="p-4">{app.email}</td>
                        <td className="p-4">{app.phone || "N/A"}</td>
                        <td className="p-4 text-blue-700 font-semibold text-sm">
                          {app.position || "N/A"}
                        </td>
                        <td className="p-4">
                          <a
                            href={
                              (app.resumeUrl || app.resumeurl)?.startsWith(
                                "/uploads",
                              )
                                ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${app.resumeUrl || app.resumeurl}`
                                : app.resumeUrl || app.resumeurl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1 text-sm font-semibold"
                          >
                            <span className="material-symbols-outlined text-sm">
                              open_in_new
                            </span>
                            View Resume
                          </a>
                        </td>
                        <td className="p-4 text-gray-400 text-sm">
                          {app.created_at
                            ? new Date(app.created_at).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="p-4 flex gap-2">
                          <button
                            onClick={() =>
                              handleMarkCareerDone(app.id, app.status)
                            }
                            className={`${app.status === "done" ? "text-green-600" : "text-gray-400"} hover:text-green-700`}
                            title={
                              app.status === "done"
                                ? "Mark as Pending"
                                : "Mark as Done"
                            }
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCareer(app.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete Application"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* JOBS TAB */}
        {activeTab === "jobs" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
              <Button onClick={() => setShowJobForm(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Job
              </Button>
            </div>

            {showJobForm ? (
              <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">{jobFormData.id ? 'Edit Job' : 'Add New Job'}</h2>
                <form onSubmit={handleSaveJob} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                      <input required className="w-full px-4 py-2 border rounded-xl" value={jobFormData.title} onChange={e => setJobFormData({...jobFormData, title: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vacancies</label>
                      <input type="number" min="1" className="w-full px-4 py-2 border rounded-xl" value={jobFormData.vacancies} onChange={e => setJobFormData({...jobFormData, vacancies: parseInt(e.target.value) || 1})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                    <textarea required className="w-full px-4 py-2 border rounded-xl min-h-[100px]" value={jobFormData.description} onChange={e => setJobFormData({...jobFormData, description: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description PDF {jobFormData.pdf_url && <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${jobFormData.pdf_url}`} target="_blank" rel="noreferrer" className="text-blue-600 text-xs ml-2 hover:underline">(View Current)</a>}</label>
                    <input type="file" accept=".pdf" className="w-full px-4 py-2 border rounded-xl" onChange={e => { if (e.target.files && e.target.files[0]) setJobFile(e.target.files[0]) }} />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Job'}</Button>
                    <Button type="button" variant="outline" onClick={() => { setShowJobForm(false); setJobFile(null); }}>Cancel</Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="p-4 font-semibold text-gray-600">Title</th>
                      <th className="p-4 font-semibold text-gray-600">Vacancies</th>
                      <th className="p-4 font-semibold text-gray-600">Created</th>
                      <th className="p-4 font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.length === 0 ? (
                      <tr><td colSpan={4} className="p-4 text-center text-gray-500">No jobs found.</td></tr>
                    ) : (
                      jobs.map((job: any) => (
                        <tr key={job.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{job.title}</td>
                          <td className="p-4">{job.vacancies}</td>
                          <td className="p-4 text-sm text-gray-500">{new Date(job.created_at).toLocaleDateString()}</td>
                          <td className="p-4 flex gap-2">
                            <button onClick={() => handleEditJob(job)} className="text-blue-500 hover:text-blue-700"><Edit className="w-5 h-5" /></button>
                            <button onClick={() => handleDeleteJob(job.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5" /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message Modal */}
      {selectedLead && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Message Details</h3>
                <p className="text-sm text-gray-500">From {selectedLead.name}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Email</p>
                  <p className="font-semibold text-gray-900 break-all">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedLead.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedLead.created_at).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 mb-1">Subject</p>
                  <p className="font-semibold text-gray-900">{selectedLead.subject}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 mb-2 text-sm">Message</p>
                <div className="bg-gray-50 p-6 rounded-2xl border text-gray-700 leading-relaxed whitespace-pre-wrap max-h-[40vh] overflow-y-auto">
                  {selectedLead.message}
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t flex justify-end">
              <Button onClick={() => setSelectedLead(null)} className="rounded-xl px-8">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Course Enquiry Modal */}
      {selectedCourseEnquiry && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  {selectedCourseEnquiry.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedCourseEnquiry.name}</h3>
                  <p className="text-sm text-gray-500">Course Enquiry Details</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCourseEnquiry(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Email</p>
                  <p className="font-semibold text-gray-900 break-all">{selectedCourseEnquiry.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedCourseEnquiry.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedCourseEnquiry.created_at).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 mb-1">Course</p>
                  <p className="font-semibold text-gray-900 text-blue-600">{selectedCourseEnquiry.course_title}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 mb-2 text-sm">Message</p>
                <div className="bg-gray-50 p-6 rounded-2xl border text-gray-700 leading-relaxed whitespace-pre-wrap max-h-[40vh] overflow-y-auto">
                  {selectedCourseEnquiry.message || "No message provided."}
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t flex justify-end">
              <Button onClick={() => setSelectedCourseEnquiry(null)} className="rounded-xl px-8">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
