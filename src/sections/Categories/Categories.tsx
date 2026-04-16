import { CATEGORIES } from '@/constants';
import { motion } from 'motion/react';
import ButtonWithIconDemo from '@/components/ui/button-with-icon';

export default function Categories() {
  return (
    <section className="pt-8 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Live Training Categories
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Choose from our wide range of professional training programs designed to help you succeed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
            >
              {/* Image Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />  
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                {/* <div className={`absolute top-4 left-4 w-12 h-12 ${category.color} rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-500`}>
                  <category.icon className="w-6 h-6" />
                </div> */}
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-gray-600 line-clamp-2 mb-6">
                  {category.description}
                </p>
                
                <div className="mt-auto">
                  <ButtonWithIconDemo />
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
