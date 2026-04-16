import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sanityClient, urlFor } from '@/lib/sanity';
import { getBlogPostBySlugQuery } from '@/lib/sanityQueries';
import { PortableText } from '@portabletext/react';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await sanityClient.fetch(getBlogPostBySlugQuery, { slug });
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading story...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Post not found</h2>
        <p className="text-slate-500 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog">
          <button className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-all">
            Back to Blog
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src={post.mainImage ? urlFor(post.mainImage).url() : "https://images.unsplash.com/photo-1513258496099-48168024aec0"} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/blog" className="inline-flex items-center gap-2 text-blue-400 font-semibold mb-6 hover:text-blue-300 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
              <div className="flex flex-wrap gap-4 mb-6">
                {post.categories?.map((cat: string) => (
                  <span key={cat} className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-8 text-white/80 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-white">{post.authorName || 'Simplesphere Team'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span>{new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-16">
          {/* Excerpt */}
          {post.excerpt && (
            <div className="mb-12">
              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-6">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Body Content */}
          <div className="prose prose-lg md:prose-xl max-w-none text-slate-800 prose-headings:text-slate-900 prose-a:text-blue-600 prose-img:rounded-2xl">
            <PortableText 
              value={post.body || []} 
              components={{
                types: {
                  image: ({ value }: any) => (
                    <div className="my-10 rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src={urlFor(value).url()} 
                        alt={value.alt || 'Blog image'} 
                        className="w-full"
                      />
                      {value.caption && <p className="text-center text-sm text-slate-500 mt-4">{value.caption}</p>}
                    </div>
                  )
                }
              }}
            />
          </div>

          {/* Footer / Share / Tags */}
          <div className="mt-16 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <img 
                src={post.authorImage ? urlFor(post.authorImage).url() : `https://ui-avatars.com/api/?name=${post.authorName}`} 
                alt={post.authorName} 
                className="w-14 h-14 rounded-full border-2 border-blue-600"
              />
              <div>
                <p className="text-sm text-slate-500 font-medium">Article by</p>
                <h4 className="text-lg font-bold text-slate-900">{post.authorName || 'Simplesphere Team'}</h4>
              </div>
            </div>
            
            <Link to="/contact">
              <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all transform active:scale-95">
                Join our Community
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
