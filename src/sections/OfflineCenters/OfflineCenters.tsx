import React from "react";
import {
  MapPin,
  Search,
  Filter,
  CheckCircle,
  Phone,
  Clock,
  Plus,
  Minus,
  Locate,
  GraduationCap,
} from "lucide-react";

export default function OfflineCenters() {
  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-10 text-center">
        <h2 className="font-bold text-5xl md:text-6xl text-gray-900 tracking-tighter mb-6">
          Our Offline Centers
        </h2>
        <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
          Experience high-quality education in person. Our architectural
          learning spaces are designed for focus, collaboration, and community.
        </p>

        <div className="max-w-xl mx-auto relative">
          <div className="flex items-center bg-gray-50 p-2 rounded-xl shadow-sm ring-1 ring-gray-200 focus-within:ring-blue-500 transition-all">
            <MapPin className="ml-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              className="w-full border-none bg-transparent py-3 px-4 text-gray-900 focus:ring-0 placeholder:text-gray-400"
              placeholder="Enter city, state, or zip code"
            />
            <button className="bg-blue-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-800 transition-all">
              Search
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <span>Pune</span>
            <span>•</span>
            <span>Nashik</span>
            <span>•</span>
            <span>Jalgaon</span>
          </div>
        </div>
      </div>

      {/* Search & Map Split Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row h-[700px] overflow-hidden rounded-3xl border border-gray-100 shadow-2xl mb-24">
        {/* Left Side: Center List */}
        <aside className="w-full md:w-[450px] flex-shrink-0 bg-gray-50 overflow-y-auto px-6 py-8 scroll-smooth">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-blue-900">
              3 Locations Found
            </h3>
            <button className="text-xs font-bold text-blue-700 flex items-center gap-1 hover:underline">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="space-y-4">
            {/* Location Card 1: New York */}
            <div className="group flex flex-col bg-white p-6 rounded-xl transition-all cursor-pointer border border-transparent hover:border-blue-100 hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg text-blue-900 group-hover:text-blue-700 transition-colors">
                    Pune Center
                  </h4>
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                    Primary Hub
                  </span>
                </div>
                <CheckCircle className="text-blue-600 w-5 h-5 fill-blue-100" />
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                IIF JSPM RSCOE, Near Pune-Mumbai Bypass Highway , Thathawade,
                Pune - 411033, Maharashtra, India
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  +91 95290 44429
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 9AM - 8PM
                </span>
              </div>
              {/* <button className="w-full py-3 rounded-md bg-gray-100 text-blue-900 font-bold text-sm hover:bg-blue-700 hover:text-white transition-all duration-300">
                View Details
              </button> */}
            </div>

            {/* Location Card 2: Austin (Selected) */}
            <div className="group flex flex-col bg-blue-50/50 p-6 rounded-xl transition-all cursor-pointer border-l-4 border-blue-700 shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg text-blue-900">
                    Nashik Center
                  </h4>
                  <span className="inline-block bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                    New Center
                  </span>
                </div>
                <MapPin className="text-blue-700 w-5 h-5 fill-blue-100" />
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Office No. 18, Nice Sankul, Near ITI Signal, Trambak Road,
                Satpur, Nashik 422010
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  +91 95290 44429
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 9AM - 8PM
                </span>
              </div>
              {/* <button className="w-full py-3 rounded-md bg-blue-700 text-white font-bold text-sm shadow-md hover:bg-blue-800 transition-all">
                View Details
              </button> */}
            </div>

            {/* Location Card 3: San Francisco */}
            <div className="group flex flex-col bg-white p-6 rounded-xl transition-all cursor-pointer border border-transparent hover:border-blue-100 hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg text-blue-900 group-hover:text-blue-700 transition-colors">
                  Jalgaon Center
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Opp. Of Lenskart, Ring Road, Jalgaon
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> +91 95290 44429
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 10AM - 6PM
                </span>
              </div>
              {/* <button className="w-full py-3 rounded-md bg-gray-100 text-blue-900 font-bold text-sm hover:bg-blue-700 hover:text-white transition-all duration-300">
                View Details
              </button> */}
            </div>
          </div>
        </aside>

        {/* Right Side: Interactive Map */}
        <div className="flex-grow relative bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d947.1032317028105!2d73.74973145354893!3d19.993520794090667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1776762137159!5m2!1sen!2sin"
            width="600"
            height="450"
            className="w-full h-full object-cover"
          ></iframe>
        </div>
      </div>

      {/* Suggest Location CTA */}
      <div className="max-w-7xl mx-auto px-8 pb-24">
        <div className="bg-blue-700 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 max-w-xl text-white">
            <h2 className="font-bold text-3xl mb-4">
              Can't find a center nearby?
            </h2>
            <p className="text-blue-100 text-lg">
              Suggest a location or join our online community. We are rapidly
              expanding our physical presence across the globe.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-blue-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-100 transition-all">
              Suggest Location
            </button>
            <button className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all">
              Learn Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
