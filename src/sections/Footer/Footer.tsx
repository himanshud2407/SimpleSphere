import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import FooterSection from "@/components/ui/footer";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* Mobile Footer (New) */}
      <div className="md:hidden">
        <FooterSection />
      </div>

      {/* Desktop Footer (Old) */}
      <footer className="bg-[#0f172a] text-white pt-20 pb-10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="w-auto h-16 brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 leading-relaxed mb-8">
                Empowering learners worldwide with high-quality education and
                industry-recognized certificates.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  { label: "Home", href: "/" },
                  { label: "All Courses", href: "/courses" },
                  { label: "Blogs", href: "/blog" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "Become an Instructor", href: "/become-instructor" },
                  { label: "Our Center", href: "/Our-center" },
                ].map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h4 className="text-lg font-bold mb-6">Top Categories</h4>
              <ul className="space-y-4">
                {[
                  "Web Development",
                  "Digital Marketing",
                  "Data Science",
                  "Cyber Security",
                  "IoT  ",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="/courses"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0 text-blue-500" />
                  <a href="mailto:contact@simplesphere.in" className="hover:text-white transition-colors">
                    contact@simplesphere.in
                  </a>
                </li>
                <li className="flex items-center gap-2 pb-2">
                  <Phone className="w-4 h-4 shrink-0 text-blue-500" />
                  <a href="tel:+919529044429" className="hover:text-white transition-colors">+91 9529044429</a>
                </li>
                
                <li className="flex items-start gap-2 pt-2 border-t border-white/10">
                  <MapPin className="w-4 h-4 shrink-0 mt-1 text-blue-500" />
                  <div>
                    <strong className="text-white block mb-0.5">Pune Center</strong>
                    IIF JSPM RSCOE, Near Pune-Mumbai Bypass Highway, Thathawade, Pune - 411033
                  </div>
                </li>
                <li className="flex items-start gap-2 pt-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-1 text-blue-500" />
                  <div>
                    <strong className="text-white block mb-0.5">Nashik Center</strong>
                    Office No. 18, Nice Sankul, Near ITI Signal, Satpur, Nashik - 422010
                  </div>
                </li>
                <li className="flex items-start gap-2 pt-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-1 text-blue-500" />
                  <div>
                    <strong className="text-white block mb-0.5">Jalgaon Center</strong>
                    Opp. Of Lenskart, Ring Road, Jalgaon
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2026 Simplesphere. All rights reserved.</p>
            <div className="flex gap-8">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
