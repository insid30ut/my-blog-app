export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}