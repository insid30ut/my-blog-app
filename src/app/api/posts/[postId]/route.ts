import { NextResponse } from 'next/server';
import { Post } from '@/models/Post';

// Placeholder for in-memory posts (should be consistent with route.ts)
let posts: Post[] = [
  {
    id: '1',
    title: 'First Blog Post',
    slug: 'first-blog-post',
    content: 'This is the content of the first blog post.',
    authorId: 'user1',
    category: 'Technology',
    tags: ['nextjs', 'blog'],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Second Blog Post',
    slug: 'second-blog-post',
    content: 'This is the content of the second blog post.',
    authorId: 'user2',
    category: 'Lifestyle',
    tags: ['travel', 'food'],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const updatedData = await request.json();

  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex === -1) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  posts[postIndex] = { ...posts[postIndex], ...updatedData, updatedAt: new Date() };

  return NextResponse.json(posts[postIndex]);
}

export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;

  const initialLength = posts.length;
  posts = posts.filter(p => p.id !== postId);

  if (posts.length === initialLength) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Post deleted successfully' });
}