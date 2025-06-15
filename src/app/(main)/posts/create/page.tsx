'use client';

import React from 'react';
import PostForm from '@/components/posts/PostForm';
import { Post } from '@/models/Post';
import { useRouter } from 'next/navigation';

const CreatePostPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (postData: Omit<Post, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    router.push('/'); // Redirect to homepage after successful creation
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Create New Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePostPage;