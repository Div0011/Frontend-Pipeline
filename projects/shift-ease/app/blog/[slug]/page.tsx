import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/data';
import type { Metadata } from 'next';
import { Calendar, User, Clock, ArrowLeft, Share2, Tag, Truck } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Article Not Found — ShiftEase' };

  return {
    title: `${post.title} | ShiftEase Moving Guide`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts().filter((p) => p.slug !== post.slug);

  return (
    <article className="container-custom py-8 max-w-4xl mx-auto">
      {/* Back to Blog link */}
      <div className="mb-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate hover:text-teal text-sm font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Moving Insights
        </Link>
      </div>

      {/* Header section */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/10 text-teal text-xs font-semibold rounded-full mb-4">
          <Tag className="w-3.5 h-3.5" /> {post.category}
        </div>
        <h1 className="heading-xl font-display text-navy mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-lg text-slate mb-6 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 text-sm text-slate">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-navy">
              <User className="w-4 h-4 text-teal" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal" /> {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate uppercase font-semibold">Share:</span>
            <button className="p-2 rounded-full hover:bg-lightGray text-slate hover:text-teal transition-colors" aria-label="Share article">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Cover Image */}
      <div className="relative rounded-2xl overflow-hidden mb-10 h-72 md:h-96 shadow-md">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 mb-12">
        <div className="prose max-w-none text-slate space-y-6 leading-relaxed">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="heading-md font-display text-navy mt-8 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.trim().startsWith('- ')) {
              return (
                <ul key={index} className="list-disc list-inside space-y-2 bg-lightGray/60 p-4 rounded-xl">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i} className="text-slate font-medium">
                      {item.replace('- ', '')}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="text-body text-slate">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* CTA Quote Box inside Article */}
        <div className="mt-12 bg-gradient-to-r from-navy to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-teal font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 mb-2">
                <Truck className="w-4 h-4" /> Planning your next move?
              </span>
              <h4 className="heading-md font-display text-white mb-2">Get Instant Price Quotes from Verified Packers</h4>
              <p className="text-slate-300 text-sm max-w-lg">Compare estimates from top-rated moving companies in your city in under 2 minutes.</p>
            </div>
            <Link href="/quote" className="btn-primary shadow-lg shadow-teal/20 whitespace-nowrap">
              Calculate Moving Cost →
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {allPosts.length > 0 && (
        <section className="pt-8 border-t border-gray-200">
          <h2 className="heading-md font-display text-navy mb-6">Related Guides & Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allPosts.slice(0, 2).map((rel) => (
              <Link key={rel.slug} href={`/blog/${rel.slug}`} className="card p-6 block group hover:border-teal/50 transition-colors">
                <span className="text-xs text-teal font-semibold block mb-2">{rel.category}</span>
                <h3 className="font-display font-bold text-navy group-hover:text-teal transition-colors mb-2">
                  {rel.title}
                </h3>
                <p className="text-small text-slate line-clamp-2">{rel.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
