import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sanityClient, urlFor } from '@/lib/sanity';
import { getLatestBlogsQuery } from '@/lib/sanityQueries';

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await sanityClient.fetch(getLatestBlogsQuery);
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          Loading stories...
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="md:hidden">Latest Stories</span>
              <span className="hidden md:block">Explore Expert Articles</span>
            </h2>
            <p className="hidden md:block text-gray-500 mt-2">Learn from our experts and stay updated with the latest trends.</p>
          </div>
          <Link to="/blog">
            <button className="hidden md:block text-blue-600 font-semibold hover:underline">View All</button>
          </Link>
        </div>
        
        {/* Mobile: Latest Stories Layout */}
        <div className="md:hidden space-y-12">
          {/* Featured Story */}
          {blogs[0] && (
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6">
                <img 
                  src={blogs[0].mainImage ? urlFor(blogs[0].mainImage).url() : "/hero/featured_blog.png"} 
                  alt={blogs[0].title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="text-slate-500 text-sm font-semibold uppercase">{blogs[0].categories?.[0] || 'Education & Career'}</div>
                <h3 className="text-[1.8rem] font-bold text-slate-900 leading-[1.15]">
                  {blogs[0].title}
                </h3>
                <div className="text-slate-400 text-xs font-semibold flex items-center gap-2">
                  <span>{new Date(blogs[0].publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
                <p className="text-slate-500 text-base leading-relaxed line-clamp-3">
                  {blogs[0].excerpt || "Accelerate your career with industry-recognized certifications. Master in-demand skills and secure your dream internship today."}
                </p>
                <Link to={`/blog/${blogs[0].slug?.current}`} className="inline-block mt-4 text-blue-600 font-bold hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          )}

          {/* List of Secondary Stories */}
          <div className="space-y-8">
            {blogs.slice(1).map((blog) => (
              <Link key={blog._id} to={`/blog/${blog.slug?.current}`} className="flex gap-4 items-start group">
                <div className="w-[120px] h-[120px] shrink-0 rounded-[1.5rem] overflow-hidden">
                  <img src={blog.mainImage ? urlFor(blog.mainImage).url() : "https://via.placeholder.com/120"} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col justify-between py-1 h-[120px]">
                  <div className="space-y-1">
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{blog.categories?.[0] || 'Technology'}</div>
                    <h4 className="text-base font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {blog.title}
                    </h4>
                  </div>
                  <div className="text-slate-400 text-[10px] font-bold">
                    {new Date(blog.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • 4 min read
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile View All Pill */}
          <div className="flex justify-center pt-4">
            <Link to="/blog">
              <button className="border-2 border-slate-900 text-slate-900 px-10 py-2.5 rounded-full font-bold text-sm hover:bg-slate-900 hover:text-white transition-all transform active:scale-95">
                  Read more articles
              </button>
            </Link>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link key={blog._id} to={`/blog/${blog.slug?.current}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={blog.mainImage ? urlFor(blog.mainImage).url() : "https://via.placeholder.com/400x250"} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="text-sm text-blue-600 font-semibold mb-3">
                  {new Date(blog.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {blog.title}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
