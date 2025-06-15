import { NextResponse } from 'next/server';
import { Post } from '@/models/Post';
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Mock database for demonstration purposes (same as in src/app/api/blog/route.ts)
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

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

export async function GET() {
  // In a real application, you would fetch all blog posts (published and drafts) for admin view
  // This route should be protected and only accessible by authenticated admins/authors
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  // This route should be protected and only accessible by authenticated admins/authors
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, content, category, tags, coverImage, published, authorId } = await request.json();

  if (!title || !content || !authorId) {
    return NextResponse.json({ message: 'Title, content, and authorId are required' }, { status: 400 });
  }

  const newPost: Post = {
    id: uuidv4(),
    title,
    slug: generateSlug(title),
    content,
    authorId: session.user.id, // In a real app, this would come from session.user.id
    category: category || undefined,
    tags: tags || undefined,
    coverImage: coverImage || undefined,
    published: published || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  posts.push(newPost); // Add to mock database

  return NextResponse.json(newPost, { status: 201 });
}