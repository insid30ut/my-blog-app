import { NextResponse } from 'next/server';
import { Post } from '@/models/Post';

// Mock database for demonstration purposes
let posts: Post[] = [
  {
    id: '1',
    title: 'My First Blog Post',
    slug: 'my-first-blog-post',
    content: 'This is the content of my first blog post. It is a great day to write!',
    authorId: 'user1',
    category: 'Technology',
    tags: ['Next.js', 'React', 'Blog'],
    coverImage: 'https://via.placeholder.com/600x400?text=Blog+Post+1',
    published: true,
    createdAt: new Date('2023-01-15T10:00:00Z'),
    updatedAt: new Date('2023-01-15T10:00:00Z'),
  },
  {
    id: '2',
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    content: 'A comprehensive guide to setting up your first Next.js project.',
    authorId: 'user1',
    category: 'Web Development',
    tags: ['Next.js', 'JavaScript', 'Frontend'],
    coverImage: 'https://via.placeholder.com/600x400?text=Next.js+Guide',
    published: true,
    createdAt: new Date('2023-02-20T11:30:00Z'),
    updatedAt: new Date('2023-02-20T11:30:00Z'),
  },
  {
    id: '3',
    title: 'Draft Post - Do Not Publish',
    slug: 'draft-post-do-not-publish',
    content: 'This post is still a draft and should not be publicly visible.',
    authorId: 'user2',
    category: 'Drafts',
    tags: ['Draft', 'Internal'],
    published: false,
    createdAt: new Date('2023-03-01T09:00:00Z'),
    updatedAt: new Date('2023-03-01T09:00:00Z'),
  },
];

export async function GET() {
  // In a real application, you would fetch published blog posts from a database
  const publishedPosts = posts.filter(post => post.published);
  return NextResponse.json(publishedPosts);
}