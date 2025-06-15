export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}