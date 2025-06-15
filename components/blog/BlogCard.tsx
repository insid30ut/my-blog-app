import Link from 'next/link';
import { Post } from '@/models/Post';

interface BlogCardProps {
  post: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">
        <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
          {post.title}
        </Link>
      </h2>
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
      )}
      <p className="text-gray-700 mb-4">{post.content.substring(0, 150)}...</p>
      <div className="text-sm text-gray-500">
        <p>Published: {new Date(post.createdAt).toLocaleDateString()}</p>
        {post.category && <p>Category: {post.category}</p>}
        {post.tags && post.tags.length > 0 && (
          <p>Tags: {post.tags.join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default BlogCard;