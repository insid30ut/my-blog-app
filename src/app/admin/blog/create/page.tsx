'use client';

import BlogForm from '@/components/admin/blog/BlogForm';
import { Post } from '@/models/Post';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function CreateBlogPostPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session || (session.user as any).role !== 'admin') {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || (session.user as any).role !== 'admin') {
    return <div>Loading...</div>; // Or a more elaborate loading/redirecting message
  }

  const handleSubmit = async (postData: Omit<Post, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/api/admin/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create blog post');
      }

      router.push('/admin/blog'); // Redirect to admin blog list on success
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
}