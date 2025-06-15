import Link from 'next/link';
import { Post } from '@/models/Post';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
      <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2>{post.title}</h2>
        <p>By {post.authorId} on {new Date(post.createdAt).toLocaleDateString()}</p>
        <p>{post.content.substring(0, 150)}...</p>
      </Link>
    </div>
  );
};

export default PostCard;