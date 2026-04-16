import { Award, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Certification() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
             <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 mb-6 border border-blue-100 shadow-sm">
               <Award className="w-5 h-5 text-blue-600" />
               <span className="text-blue-600 font-semibold text-sm">Achieve Recognition</span>
             </div>
             <h2 className="text-4xl md:text-5xl lg:text-[45px] font-bold text-gray-900 mb-6 leading-tight tracking-tight">
               Earn Your <span className="text-blue-600">Industry-Recognized</span> Certificate
             </h2>
             <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
               Stand out to employers with a verified certificate upon completion. Validate your skills and showcase your expertise to the world.
             </p>
             <ul className="space-y-4 mb-10">
               {[
                 'Shareable on LinkedIn and resumes',
                 'Globally recognized credentials',
                 'Prove your practical project experience',
                 'Lifetime access to your digital certificate'
               ].map((feature, idx) => (
                 <li key={idx} className="flex items-center gap-3">
                   <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                     <CheckCircle className="w-4 h-4 text-green-600" />
                   </div>
                   <span className="text-gray-700 font-medium">{feature}</span>
                 </li>
               ))}
             </ul>
             <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.5)] active:scale-95">
               View Sample Certificate
             </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-xl lg:max-w-none mx-auto relative group"
          >
             <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full z-0 pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>
             <img src="/deom-certifiacate.png" alt="Demo Certificate" className="w-full h-auto rounded-[2rem] shadow-2xl relative z-10 border-4 border-white border-opacity-50 transform group-hover:scale-[1.02] group-hover:-rotate-1 transition-all duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
