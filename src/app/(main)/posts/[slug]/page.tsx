'use client';

import React, { useEffect, useState } from 'react';
import { Post } from '@/models/Post';
import { Comment } from '@/models/Comment';
import PostView from '@/components/posts/PostView';
import CommentList from '@/components/comments/CommentList';
import CommentForm from '@/components/comments/CommentForm';
import { useParams } from 'next/navigation';

const SinglePostPage: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorPost, setErrorPost] = useState('');
  const [errorComments, setErrorComments] = useState('');

  const fetchPost = async (postSlug: string) => {
    setLoadingPost(true);
    setErrorPost('');
    try {
      // In a real app, you'd fetch by slug. For now, we'll fetch all and find by slug.
      const allPostsResponse = await fetch('/api/posts');
      if (allPostsResponse.ok) {
        const allPosts: Post[] = await allPostsResponse.json();
        const foundPost = allPosts.find(p => p.slug === postSlug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setErrorPost('Post not found');
        }
      } else {
        setErrorPost('Failed to fetch posts');
      }
    } catch (err) {
      setErrorPost('An error occurred while fetching the post');
    } finally {
      setLoadingPost(false);
    }
  };

  const fetchComments = async (postId: string) => {
    setLoadingComments(true);
    setErrorComments('');
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        setErrorComments('Failed to fetch comments');
      }
    } catch (err) {
      setErrorComments('An error occurred while fetching comments');
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      fetchPost(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (post?.id) {
      fetchComments(post.id);
    }
  }, [post?.id]);

  const handleCommentAdded = () => {
    if (post?.id) {
      fetchComments(post.id); // Re-fetch comments after a new one is added
    }
  };

  if (loadingPost) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading post...</div>;
  }

  if (errorPost) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {errorPost}</div>;
  }

  if (!post) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Post not found.</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <PostView post={post} />
      <CommentList comments={comments} />
      <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default SinglePostPage;