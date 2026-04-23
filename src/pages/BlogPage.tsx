import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sanityClient, urlFor } from '@/lib/sanity';
import { getBlogsQuery } from '@/lib/sanityQueries';
import { SEO } from '@/components/SEO';

import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await sanityClient.fetch(getBlogsQuery);
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const featuredPost = blogs[0];
  const latestPosts = blogs.slice(1);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Post Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <Skeleton className="aspect-video w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-40 rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium text-slate-500">
        No blogs found. Start adding content in Sanity Studio!
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO 
        title="Blog" 
        description="Stay updated with the latest trends in technology, AI, and professional development. Read our insights and guides at the SimpleSphere blog."
        keywords="tech blog, AI insights, learning resources, professional development tips, simplesphere"
      />
      {/* Featured Post */}
      {featuredPost && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="rounded-2xl overflow-hidden aspect-video shadow-lg">
            <img 
              src={featuredPost.mainImage ? urlFor(featuredPost.mainImage).url() : "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070"} 
              alt={featuredPost.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold inline-block mb-4">Featured Post</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{featuredPost.title}</h1>
            <p className="text-gray-600 mb-6 text-lg">{featuredPost.excerpt}</p>
            <Link to={`/blog/${featuredPost.slug?.current}`}>
              <button className="bg-blue-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors">Read More</button>
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Latest Articles */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post) => (
              <div key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="rounded-xl overflow-hidden h-48 mb-4 bg-gray-100">
                  <img 
                    src={post.mainImage ? urlFor(post.mainImage).url() : "https://via.placeholder.com/400x300"} 
                    alt={post.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                  {post.categories?.[0] || 'Uncategorized'}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.authorImage ? urlFor(post.authorImage).url() : `https://ui-avatars.com/api/?name=${post.authorName}`} 
                      alt={post.authorName} 
                      className="w-8 h-8 rounded-full" 
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{post.authorName || 'Simplesphere Team'}</h4>
                      <p className="text-xs text-gray-500">{new Date(post.publishedAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Link to={`/blog/${post.slug?.current}`}>
                    <button className="text-blue-800 font-bold text-sm hover:underline">Read More</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">Sign up to receive the latest news and updates.</p>
            <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-gray-200 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <button className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
