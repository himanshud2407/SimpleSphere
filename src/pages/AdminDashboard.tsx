import React, { useState, useEffect } from 'react';
import { Settings, Users, BookOpen, MessageSquare, Plus, Trash2, Edit, LogOut, GraduationCap, CheckCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';

export default function AdminDashboard() {
  const { token, logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [leads, setLeads] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);

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
    fetchInstructors();
    fetchCareers();
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
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Admin Panel</h2>
        <p className="text-xs text-gray-500 mb-8 px-1">Logged in as {user?.email}</p>
        
        <ul className="space-y-2 flex-1">
          <li>
            <button 
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'courses' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <BookOpen className="w-5 h-5" /> Courses
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'leads' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Users className="w-5 h-5" /> Leads
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('instructors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'instructors' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <GraduationCap className="w-5 h-5" /> Instructors
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('careers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'careers' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <MessageSquare className="w-5 h-5" /> Applications
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
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
        {activeTab === 'courses' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
            <div className="bg-blue-50 p-8 rounded-[2.5rem] mb-8">
              <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Manage Your Courses</h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                You have successfully migrated to **Sanity CMS**. To add, edit, or delete courses, 
                please use the professional Sanity Studio interface. This ensures your content 
                stays organized and looks premium across the platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="http://localhost:3333" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Open Sanity Studio
                </a>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('leads')}
                  className="px-8 py-3 rounded-xl border-gray-200"
                >
                  View Recent Leads
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left w-full">
              <div className="p-6 bg-white border rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-2">Why Sanity?</h3>
                <p className="text-sm text-gray-500">Structured content, real-time collaboration, and a premium editing experience for your curriculum.</p>
              </div>
              <div className="p-6 bg-white border rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-2">Local Development</h3>
                <p className="text-sm text-gray-500">Run <code className="bg-gray-100 px-1 rounded">npm run dev</code> inside the <code className="bg-gray-100 px-1 rounded">/simplesphere</code> directory to start the studio.</p>
              </div>
            </div>
          </div>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Contact Form Leads</h1>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 font-semibold text-gray-600">Name</th>
                    <th className="p-4 font-semibold text-gray-600">Email</th>
                    <th className="p-4 font-semibold text-gray-600">Subject</th>
                    <th className="p-4 font-semibold text-gray-600">Message</th>
                    <th className="p-4 font-semibold text-gray-600">Date</th>
                    <th className="p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr><td colSpan={5} className="p-4 text-center text-gray-500">No leads found yet.</td></tr>
                  ) : leads.map((lead: any) => (
                    <tr key={lead.id} className={`border-b hover:bg-gray-50 ${lead.status === 'done' ? 'opacity-50' : ''}`}>
                      <td className="p-4">{lead.name}</td>
                      <td className="p-4">{lead.email}</td>
                      <td className="p-4">{lead.subject}</td>
                      <td className="p-4 max-w-xs truncate">{lead.message}</td>
                      <td className="p-4">{new Date(lead.created_at).toLocaleDateString()}</td>
                      <td className="p-4 flex gap-2">
                        <button 
                          onClick={() => handleMarkLeadDone(lead.id, lead.status)} 
                          className={`${lead.status === 'done' ? 'text-green-600' : 'text-gray-400'} hover:text-green-700`}
                          title={lead.status === 'done' ? 'Mark as Pending' : 'Mark as Done'}
                        >
                          <CheckCircle className="w-5 h-5"/>
                        </button>
                        <button onClick={() => handleDeleteLead(lead.id)} className="text-red-500 hover:text-red-700" title="Delete Lead">
                          <Trash2 className="w-5 h-5"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INSTRUCTORS TAB */}
        {activeTab === 'instructors' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Instructor Applications</h1>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 font-semibold text-gray-600">Name</th>
                    <th className="p-4 font-semibold text-gray-600">Email</th>
                    <th className="p-4 font-semibold text-gray-600">Expertise</th>
                    <th className="p-4 font-semibold text-gray-600">Date Applied</th>
                    <th className="p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.length === 0 ? (
                    <tr><td colSpan={4} className="p-4 text-center text-gray-500">No applications found yet.</td></tr>
                  ) : instructors.map((inst: any) => (
                    <tr key={inst.id} className={`border-b hover:bg-gray-50 ${inst.status === 'done' ? 'opacity-50' : ''}`}>
                      <td className="p-4">{inst.fullname || inst.fullName}</td>
                      <td className="p-4">{inst.email}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                          {inst.expertise}
                        </span>
                      </td>
                      <td className="p-4">{inst.created_at ? new Date(inst.created_at).toLocaleDateString() : 'N/A'}</td>
                      <td className="p-4 flex gap-2">
                        <button 
                          onClick={() => handleMarkInstructorDone(inst.id, inst.status)} 
                          className={`${inst.status === 'done' ? 'text-green-600' : 'text-gray-400'} hover:text-green-700`}
                          title={inst.status === 'done' ? 'Mark as Pending' : 'Mark as Done'}
                        >
                          <CheckCircle className="w-5 h-5"/>
                        </button>
                        <button onClick={() => handleDeleteInstructor(inst.id)} className="text-red-500 hover:text-red-700" title="Delete Application">
                          <Trash2 className="w-5 h-5"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CAREERS TAB */}
        {activeTab === 'careers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 font-semibold text-gray-600">Candidate</th>
                    <th className="p-4 font-semibold text-gray-600">Email</th>
                    <th className="p-4 font-semibold text-gray-600">Institution</th>
                    <th className="p-4 font-semibold text-gray-600">Resume/Link</th>
                    <th className="p-4 font-semibold text-gray-600">Date</th>
                    <th className="p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {careers.length === 0 ? (
                    <tr><td colSpan={6} className="p-4 text-center text-gray-500">No applications found yet.</td></tr>
                  ) : careers.map((app: any) => (
                    <tr key={app.id} className={`border-b hover:bg-gray-50 ${app.status === 'done' ? 'opacity-50' : ''}`}>
                      <td className="p-4 font-medium">{app.fullName || app.fullname}</td>
                      <td className="p-4">{app.email}</td>
                      <td className="p-4 text-gray-500 text-sm">{app.university || 'N/A'}</td>
                      <td className="p-4">
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                          View Resume
                        </a>
                      </td>
                      <td className="p-4 text-gray-400 text-sm">{app.created_at ? new Date(app.created_at).toLocaleDateString() : 'N/A'}</td>
                      <td className="p-4 flex gap-2">
                        <button 
                          onClick={() => handleMarkCareerDone(app.id, app.status)} 
                          className={`${app.status === 'done' ? 'text-green-600' : 'text-gray-400'} hover:text-green-700`}
                          title={app.status === 'done' ? 'Mark as Pending' : 'Mark as Done'}
                        >
                          <CheckCircle className="w-5 h-5"/>
                        </button>
                        <button onClick={() => handleDeleteCareer(app.id)} className="text-red-500 hover:text-red-700" title="Delete Application">
                          <Trash2 className="w-5 h-5"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
