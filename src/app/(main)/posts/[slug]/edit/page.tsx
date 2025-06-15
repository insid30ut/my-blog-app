'use client';

import React, { useEffect, useState } from 'react';
import { Post } from '@/models/Post';
import PostForm from '@/components/posts/PostForm';
import { useParams, useRouter } from 'next/navigation';

const EditPostPage: React.FC = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (slug && typeof slug === 'string') {
        setLoading(true);
        setError('');
        try {
          // In a real app, you'd fetch by slug. For now, we'll fetch all and find by slug.
          const allPostsResponse = await fetch('/api/posts');
          if (allPostsResponse.ok) {
            const allPosts: Post[] = await allPostsResponse.json();
            const foundPost = allPosts.find(p => p.slug === slug);
            if (foundPost) {
              setPost(foundPost);
            } else {
              setError('Post not found');
            }
          } else {
            setError('Failed to fetch posts');
          }
        } catch (err) {
          setError('An error occurred while fetching the post');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [slug]);

  const handleSubmit = async (postData: Omit<Post, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => {
    if (!post) return; // Should not happen if post is loaded

    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    router.push(`/posts/${post.slug}`); // Redirect to single post page after successful update
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading post for editing...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (!post) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Post not found for editing.</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Edit Post</h1>
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditPostPage;