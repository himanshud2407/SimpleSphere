import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from '@/sections/Header/Header';
import Footer from '@/sections/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { NotFoundPage } from "@/components/ui/404-page-not-found";

// Pages
import Home from '@/pages/Home';
import BlogPage from '@/pages/BlogPage';
import ContactUsPage from '@/pages/ContactUsPage';
import AllCoursesPage from '@/pages/AllCoursesPage';
import FindCenterPage from '@/pages/FindCenterPage';
import AdminDashboard from '@/pages/AdminDashboard';
import LoginPage from '@/pages/LoginPage';
import BlogPostDetail from '@/pages/BlogPostDetail';
import BecomeInstructor from '@/pages/BecomeInstructor';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import CourseDetailPage from '@/pages/CourseDetailPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/login';
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/courses" element={<AllCoursesPage />} />
          <Route path="/Our-center" element={<FindCenterPage />} />
          <Route path="/become-instructor" element={<BecomeInstructor />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <ScrollToTop />
      {!isAuthPage && <Header />}
      <div className="flex-1 flex flex-col relative w-full">
        <main className="flex-1 flex flex-col">
          <AnimatedRoutes />
        </main>
        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

