import React, { useState, useEffect } from 'react';
import { Settings, Users, BookOpen, MessageSquare, Plus, Trash2, Edit, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';

export default function AdminDashboard() {
  const { token, logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    title: '', img: '', inst: '', price: '', category: '', level: '', id: null
  });

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchCourses();
    fetchLeads();
  }, []);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/courses`, { headers: getHeaders() });
      const data = await res.json();
      if (Array.isArray(data)) setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}/leads`, { headers: getHeaders() });
      const data = await res.json();
      if (Array.isArray(data)) setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = courseFormData.id ? 'PUT' : 'POST';
      const url = courseFormData.id ? `${API_URL}/courses/${courseFormData.id}` : `${API_URL}/courses`;
      
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(courseFormData)
      });
      
      if (res.ok) {
        setShowCourseForm(false);
        setCourseFormData({ title: '', img: '', inst: '', price: '', category: '', level: '', id: null });
        fetchCourses();
      }
    } catch (err) {
      console.error('Error saving course:', err);
    }
    setLoading(false);
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
    setCourseFormData(course);
    setShowCourseForm(true);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r min-h-screen p-6 shadow-sm flex flex-col">
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
              <Users className="w-5 h-5" /> Leads (Sheets)
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
      <div className="flex-1 p-8">
        
        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
              <Button onClick={() => { setShowCourseForm(true); setCourseFormData({ title: '', img: '', inst: '', price: '', category: '', level: '', id: null }); }} className="bg-blue-700 hover:bg-blue-800 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Course
              </Button>
            </div>

            {showCourseForm ? (
              <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
                <h3 className="text-xl font-bold mb-4">{courseFormData.id ? 'Edit Course' : 'Add New Course'}</h3>
                <form onSubmit={handleSaveCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="Course Title" className="border p-3 rounded-lg" value={courseFormData.title} onChange={e => setCourseFormData({...courseFormData, title: e.target.value})} />
                  <input placeholder="Image URL" className="border p-3 rounded-lg" value={courseFormData.img} onChange={e => setCourseFormData({...courseFormData, img: e.target.value})} />
                  <input required placeholder="Instructor" className="border p-3 rounded-lg" value={courseFormData.inst} onChange={e => setCourseFormData({...courseFormData, inst: e.target.value})} />
                  <input required placeholder="Price" className="border p-3 rounded-lg" value={courseFormData.price} onChange={e => setCourseFormData({...courseFormData, price: e.target.value})} />
                  <input required placeholder="Category" className="hidden" value={courseFormData.category} />
                  <select 
                    required 
                    className="border p-3 rounded-lg bg-white" 
                    value={courseFormData.category} 
                    onChange={e => setCourseFormData({...courseFormData, category: e.target.value})}
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="genai">GenAI</option>
                    <option value="software">Software Engineering</option>
                    <option value="data">Data Science</option>
                    <option value="cyber">Cybersecurity</option>
                    <option value="cloud">Cloud Computing</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="gniit">GNIIT</option>
                    <option value="finance">Banking & Finance</option>
                    <option value="certification">Industry Certification</option>
                  </select>
                  <select 
                    required 
                    className="border p-3 rounded-lg bg-white" 
                    value={courseFormData.level} 
                    onChange={e => setCourseFormData({...courseFormData, level: e.target.value})}
                  >
                    <option value="" disabled>Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <div className="md:col-span-2 flex gap-4">
                    <Button type="submit" disabled={loading} className="bg-blue-700">{loading ? 'Saving...' : 'Save Course'}</Button>
                    <Button type="button" variant="outline" onClick={() => setShowCourseForm(false)}>Cancel</Button>
                  </div>
                </form>
              </div>
            ) : null}

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 font-semibold text-gray-600">Title</th>
                    <th className="p-4 font-semibold text-gray-600">Instructor</th>
                    <th className="p-4 font-semibold text-gray-600">Price</th>
                    <th className="p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr><td colSpan={4} className="p-4 text-center text-gray-500">No courses found. Connect backend & Supabase to view courses.</td></tr>
                  ) : courses.map((course: any) => (
                    <tr key={course.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{course.title}</td>
                      <td className="p-4">{course.inst}</td>
                      <td className="p-4">{course.price}</td>
                      <td className="p-4 flex gap-2">
                        <button onClick={() => handleEditCourse(course)} className="text-blue-600 hover:text-blue-800"><Edit className="w-5 h-5"/></button>
                        <button onClick={() => handleDeleteCourse(course.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Contact Form Leads</h1>
              <a href="https://docs.google.com/spreadsheets" target="_blank" rel="noreferrer" className="text-blue-700 font-medium hover:underline">
                Open in Google Sheets ↗
              </a>
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
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr><td colSpan={5} className="p-4 text-center text-gray-500">No leads found yet.</td></tr>
                  ) : leads.map((lead: any) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{lead.name}</td>
                      <td className="p-4">{lead.email}</td>
                      <td className="p-4">{lead.subject}</td>
                      <td className="p-4 max-w-xs truncate">{lead.message}</td>
                      <td className="p-4">{new Date(lead.created_at).toLocaleDateString()}</td>
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
