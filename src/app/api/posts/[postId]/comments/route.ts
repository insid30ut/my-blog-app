import { NextResponse } from 'next/server';
import { Comment } from '@/models/Comment';

// Placeholder for in-memory comments
let comments: Comment[] = [
  {
    id: 'c1',
    postId: '1',
    content: 'Great post!',
    authorId: 'user3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'c2',
    postId: '1',
    content: 'Very insightful.',
    authorId: 'user4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'c3',
    postId: '2',
    content: 'Nice read.',
    authorId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const postComments = comments.filter(comment => comment.postId === postId);
  return NextResponse.json(postComments);
}

export async function POST(request: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const { content, authorId } = await request.json();

  if (!content || !authorId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newComment: Comment = {
    id: `c${comments.length + 1}`, // Simple ID generation
    postId,
    content,
    authorId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  comments.push(newComment);

  return NextResponse.json(newComment, { status: 201 });
}