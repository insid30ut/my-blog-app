import { NextResponse } from 'next/server';
import { Post } from '@/models/Post';

// Placeholder for in-memory posts
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

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const { title, content, authorId, category, tags, coverImage, published } = await request.json();

  if (!title || !content || !authorId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newPost: Post = {
    id: (posts.length + 1).toString(), // Simple ID generation
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, ''), // Basic slug generation
    content,
    authorId,
    category,
    tags,
    coverImage,
    published: published ?? false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  posts.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
}