import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, BookOpen, Instagram, Linkedin, Twitter } from 'lucide-react';

const EXPERTS = [
  {
    id: 1,
    name: 'Pavan Shimpi',
    role: 'Director & Cyber Security Trainer',
    image: '/pavan-shimpi.png',
    socials: [
      { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/ipavanshimpi'},
      { name: 'Linkedin', icon: Linkedin, href: 'https://www.linkedin.com/in/ipavanshimpi/' },
      { name: 'Twitter', icon: Twitter, href: '#' }
    ]
  },
  {
    id: 2,
    name: 'Pankaj Wankhede',
    role: '15+ Years Experience',
    image: '/pankaj-wankhede.png' ,
    socials: [
      { name: 'Instagram', icon: Instagram, href: '#' },
      { name: 'Linkedin', icon: Linkedin, href: '#' },
      { name: 'Twitter', icon: Twitter, href: '#' }
    ]
  },
  {
    id: 3,
    name: 'Tejaswini Koparde',
    role: 'Human Resources, Business Development',
    image: '/tejaswini-koparde.png' ,
    socials: [
      { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/tejaswinikoparde/' },
      { name: 'Linkedin', icon: Linkedin, href: 'https://www.linkedin.com/in/tejaswini-koparde-a0ba24259/' },
      { name: 'Twitter', icon: Twitter, href: '#' }
    ]
  }
];

export default function OurExperts() {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggleSocials = (id: number) => {
    setOpenStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 bg-[#fafbfe]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl relative">
            <div className="inline-block bg-white text-blue-600 font-semibold py-1 px-4 rounded-full text-sm mb-6 shadow-sm border border-blue-100">
              Teachers
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your Learning Journey<br/> Starts with <span className="text-blue-600">Our Experts</span>
            </h2>
          </div>
          
          <div className="max-w-md flex flex-col lg:items-end gap-6">
            <div className="hidden lg:flex w-full items-center gap-4 justify-end mb-2">
               <div className="h-[1px] bg-blue-100 flex-1 ml-10"></div>
               <BookOpen className="text-blue-600 w-5 h-5" />
               <div className="h-[1px] bg-blue-100 w-16"></div>
            </div>
            <p className="text-gray-500 text-lg text-center">
              Learn from experienced experts who guide you with practical knowledge, real-world insights, and a clear path to skill growth.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {EXPERTS.map((expert, index) => {
            const isOpen = openStates[expert.id];
            return (
              <motion.div
                key={expert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
            >
              {/* Image Container with floating button */}
              <div className="relative mb-6">
                <div className="w-full h-[320px] rounded-[1.5rem] overflow-hidden bg-gray-100">
                  <img 
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Animated Social Links Button Group */}
                <div 
                  className="absolute -bottom-6 right-6 flex flex-col-reverse items-center"
                >
                  {/* Main Trigger Button */}
                  <motion.button 
                    onClick={() => toggleSocials(expert.id)}
                    animate={{ 
                      scale: isOpen ? 1.1 : 1, 
                      rotate: isOpen ? 45 : 0, 
                      y: isOpen ? -10 : 0 
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg z-20"
                  >
                    <ArrowUpRight size={24} />
                  </motion.button>

                  {/* Social Links Container */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          height: 'auto', 
                          y: 0,
                        }}
                        exit={{ opacity: 0, height: 0, y: 20 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="flex flex-col-reverse gap-3 mb-4 overflow-hidden"
                      >
                        {expert.socials.map((social, idx) => (
                          <motion.a
                            key={idx}
                            href={social.href}
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white transition-colors transform hover:scale-110"
                            title={social.name}
                          >
                            <social.icon size={20} />
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Info Section */}
              <div className="text-center pb-6 pt-4 px-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{expert.name}</h3>
                <p className="text-sm text-gray-500">{expert.role}</p>
              </div>
            </motion.div>
          )})}
        </div>

      </div>
    </section>
  );
}
