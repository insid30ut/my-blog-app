import BlogList from '@/components/blog/BlogList';
import { Post } from '@/models/Post';

async function getBlogPosts(): Promise<Post[]> {
  // In a real application, this would fetch data from your API
  // For now, we'll use mock data or fetch from the existing /api/posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/api/blog`, {
    cache: 'no-store', // Ensure fresh data on each request
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch blog posts');
  }
  return res.json();
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
      <BlogList posts={posts} />
    </div>
  );
}