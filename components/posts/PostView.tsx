import React from 'react';
import { Post } from '@/models/Post';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PostViewProps {
  post: Post;
}

const PostView: React.FC<PostViewProps> = ({ post }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/posts/${post.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          router.push('/'); // Redirect to homepage after deletion
        } else {
          const errorData = await response.json();
          alert(`Failed to delete post: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', maxWidth: '800px', margin: '20px auto' }}>
      <h1>{post.title}</h1>
      <p>By {post.authorId} on {new Date(post.createdAt).toLocaleDateString()}</p>
      {post.category && <p>Category: {post.category}</p>}
      {post.tags && post.tags.length > 0 && <p>Tags: {post.tags.join(', ')}</p>}
      {post.coverImage && <img src={post.coverImage} alt={post.title} style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />}
      <div style={{ lineHeight: '1.6' }}>
        {post.content}
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link href={`/posts/${post.slug}/edit`} style={{ marginRight: '10px', padding: '8px 12px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Edit
        </Link>
        <button onClick={handleDelete} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostView;