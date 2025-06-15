'use client';

import BlogForm from '@/components/admin/blog/BlogForm';
import { Post } from '@/models/Post';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session || (session.user as any).role !== 'admin') {
      router.push('/login');
      return;
    }

    async function fetchPost() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/api/blog/${params.slug}`);
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch post for editing');
        }
        const data = await res.json();
        // Client-side authorization check for author
        if (session?.user?.id !== data.authorId && (session?.user as any)?.role !== 'admin') {
          router.push('/admin/blog'); // Redirect if not authorized
          alert('You are not authorized to edit this post.');
          return;
        }
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [params.slug, session, status, router]);

  if (status === 'loading' || !session || (session.user as any).role !== 'admin') {
    return <div>Loading...</div>; // Or a more elaborate loading/redirecting message
  }

  const handleSubmit = async (postData: Omit<Post, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => {
    if (!post) return; // Should not happen if post is loaded

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/api/admin/blog/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update blog post');
      }

      router.push('/admin/blog'); // Redirect to admin blog list on success
    } catch (err: any) {
      console.error('Error updating blog post:', err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading post...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  if (!post) {
    return <div className="container mx-auto p-4">Post not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post: {post.title}</h1>
      <BlogForm initialData={post} onSubmit={handleSubmit} />
    </div>
  );
}