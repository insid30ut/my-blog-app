import BlogPostView from '@/components/blog/BlogPostView';
import { Post } from '@/models/Post';
import { notFound } from 'next/navigation';

async function getBlogPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/api/blog/${slug}`, {
    cache: 'no-store',
  });

  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error('Failed to fetch blog post');
  }
  return res.json();
}

export default async function SingleBlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <BlogPostView post={post} />
    </div>
  );
}