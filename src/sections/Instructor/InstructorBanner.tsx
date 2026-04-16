import { GraduationCap, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InstructorBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full flex flex-col md:flex-row items-stretch gap-6 lg:gap-8">

        {/* Left Card */}
        <div className="flex-[3] bg-[#2563EB] rounded-[2rem] p-8 sm:p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center min-h-[350px] shadow-xl group">
          <div className="absolute right-8 bottom-8 opacity-20 pointer-events-none transform rotate-12">
            <GraduationCap size={120} className="text-white" />
          </div>

          <div className="relative z-10 max-w-sm md:max-w-md">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Upgrade Your Skills.<br /> Transform Your Future.
            </h2>
            <p className="text-blue-50 text-base mb-10 leading-relaxed">
              Join thousands of learners who've already taken their career to the next level with expert-led courses.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-[#E0E7FF] text-gray-800 font-bold rounded-xl hover:bg-white transition-all shadow-md"
            >
              Get Started Now
            </button>
          </div>
        </div>

        {/* Middle Overlapping Image (Visible on Desktop/Tablet) */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-full pointer-events-none">
          <img
            src="/instructor.png"
            alt="Instructor"
            className="h-[110%] object-contain mt-[-11%]"
          />
        </div>

        {/* Right Card */}
        <div className="flex-[2] bg-[#2563EB] rounded-[2rem] p-8 sm:p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center min-h-[350px] shadow-xl group">
          <div className="absolute right-8 bottom-8 opacity-20 pointer-events-none transform -rotate-12">
            <Rocket size={100} className="text-white" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Become Instructor</h2>
            <p className="text-blue-50 text-base mb-10 leading-relaxed">
              Join our teaching community and reach thousands of students around the world with your expertise.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-[#E0E7FF] text-gray-800 font-bold rounded-xl hover:bg-white transition-all shadow-md mt-auto"
            >
              Drop Information
            </button>
          </div>
        </div>
      </div>

    </section>
  );
} 
