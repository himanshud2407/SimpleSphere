import React, { useState, useEffect } from 'react';
import { Users, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function AllCoursesPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedPriceTypes, setSelectedPriceTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/courses');
        const data = await res.json();
        if (Array.isArray(data)) {
          setCourses(data);
        }
      } catch (err) {
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const toggleFilter = (state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setState(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat => 
        course.category?.toLowerCase()?.includes(cat.toLowerCase()) || 
        cat.toLowerCase()?.includes(course.category?.toLowerCase())
    );
    const levelMatch = selectedLevels.length === 0 || selectedLevels.includes(course.level);
    
    let priceType = 'Paid';
    if (course.price?.toLowerCase() === 'free') priceType = 'Free';
    else if (course.price?.toLowerCase()?.includes('subscription')) priceType = 'Subscription';
    
    const priceMatch = selectedPriceTypes.length === 0 || selectedPriceTypes.includes(priceType);
    
    return categoryMatch && levelMatch && priceMatch;
  });

  const FilterSidebar = () => (
    <div className="space-y-8 border pr-4 p-4 rounded-xl border-gray-100 shadow-sm align-start self-start bg-white">
      <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Filters</h2>
      
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex justify-between">Category</h3>
        <div className="space-y-2">
          {[
            { id: 'genai', label: 'GenAI' },
            { id: 'software', label: 'Software' },
            { id: 'data', label: 'Data Science' },
            { id: 'cyber', label: 'Cyber Security' },
            { id: 'cloud', label: 'Cloud' },
            { id: 'marketing', label: 'Digital Marketing' }
          ].map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat.id)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300" 
              />
              <span className="text-sm text-gray-700">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex justify-between">Price</h3>
        <div className="space-y-2 mb-4">
          {['Free', 'Paid', 'Subscription'].map(price => (
            <label key={price} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedPriceTypes.includes(price)}
                onChange={() => toggleFilter(selectedPriceTypes, setSelectedPriceTypes, price)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300" 
              />
              <span className="text-sm text-gray-700">{price}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex justify-between">Level</h3>
        <div className="space-y-2">
          {['Beginner', 'Intermediate', 'Advanced'].map(level => (
            <label key={level} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedLevels.includes(level)}
                onChange={() => toggleFilter(selectedLevels, setSelectedLevels, level)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300" 
              />
              <span className="text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full text-xs" 
        onClick={() => {
          setSelectedCategories([]);
          setSelectedLevels([]);
          setSelectedPriceTypes([]);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden w-full mb-4">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex justify-between items-center bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100 rounded-xl py-6 px-5"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-700" />
              <span className="font-bold text-base">Filters ({selectedCategories.length + selectedLevels.length + selectedPriceTypes.length})</span>
            </div>
            {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-4"
              >
                <FilterSidebar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-full lg:w-64 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">All Courses</h1>
            <div className="border border-blue-100 bg-blue-50/30 px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 md:gap-3">
              <div>
                <div className="text-lg md:text-xl font-bold text-blue-900">{filteredCourses.length}</div>
                <div className="text-[10px] md:text-xs font-semibold text-gray-500 leading-none">Courses Found</div>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                 <Users className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-slate-500 font-medium font-inter">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
              <p className="text-gray-500 font-medium text-lg">No courses match your filters.</p>
              <button 
                onClick={() => { setSelectedCategories([]); setSelectedLevels([]); setSelectedPriceTypes([]); }}
                className="text-blue-600 font-bold mt-4 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  <div className="h-48 relative">
                    <img src={course.img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Instructor: {course.inst}</p>
                    <p className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span> {course.rating || '4.5'} <span className="text-gray-500 font-normal">({course.reviews || '0'} Reviews)</span>
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-bold text-lg text-gray-900">{course.price}</span>
                      <Link to="/contact">
                        <button className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-blue-900">Enroll Now</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

