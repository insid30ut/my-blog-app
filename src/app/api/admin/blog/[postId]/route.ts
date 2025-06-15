import { NextResponse } from 'next/server';
import { Post } from '@/models/Post';
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
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export async function PUT(request: Request, { params }: { params: { postId: string } }) {
  // This route should be protected and only accessible by authenticated admins/authors
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { postId } = params;
  const { title, content, category, tags, coverImage, published } = await request.json();

  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex === -1) {
    return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
  }

  const existingPost = posts[postIndex];

  // Authorization check: Only author or admin can update
  if (session.user.id !== existingPost.authorId && (session.user as any).role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const updatedPost: Post = {
    ...existingPost,
    title: title || existingPost.title,
    slug: title ? generateSlug(title) : existingPost.slug,
    content: content || existingPost.content,
    category: category !== undefined ? category : existingPost.category,
    tags: tags !== undefined ? tags : existingPost.tags,
    coverImage: coverImage !== undefined ? coverImage : existingPost.coverImage,
    published: published !== undefined ? published : existingPost.published,
    updatedAt: new Date(),
  };

  posts[postIndex] = updatedPost;

  return NextResponse.json(updatedPost);
}

export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
  // This route should be protected and only accessible by authenticated admins/authors
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { postId } = params;

  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex === -1) {
    return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
  }

  const existingPost = posts[postIndex];

  // Authorization check: Only author or admin can delete
  if (session.user.id !== existingPost.authorId && (session.user as any).role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  posts = posts.filter(p => p.id !== postId); // Remove from mock database

  return NextResponse.json({ message: 'Blog post deleted successfully' }, { status: 200 });
}