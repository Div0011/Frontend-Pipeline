import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/data';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

export default function BlogList() {
  const posts = getAllBlogPosts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article key={post.slug} className="card group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="h-52 relative overflow-hidden bg-navy/5">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-sm text-teal text-xs font-semibold px-3 py-1 rounded-full border border-teal/20">
                {post.category}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-slate mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-teal" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal" /> {post.readTime}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-navy group-hover:text-teal transition-colors mb-3 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-slate line-clamp-3 leading-relaxed mb-4">
                {post.excerpt}
              </p>
            </div>
          </div>
          
          <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-slate font-medium flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-teal" /> {post.author}
            </span>
            <Link href={`/blog/${post.slug}`} className="text-teal font-semibold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Read Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}