import { STATS } from '@/constants';

export default function Stats() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const isCourses = stat.label === 'Courses';
            const displayLabel = isCourses ? 'Courses Available' : stat.label;

            return (
              <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#2563EB] shadow-sm transform transition-transform hover:scale-105 hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[10px] md:text-xs font-semibold text-white/90 uppercase tracking-widest text-center">{displayLabel}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
