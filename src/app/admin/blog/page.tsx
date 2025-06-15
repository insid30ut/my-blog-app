import AdminBlogList from '@/components/admin/blog/AdminBlogList';
import { Post } from '@/models/Post';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function getAdminBlogPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/api/admin/blog`, {
    cache: 'no-store', // Always fetch fresh data for admin view
  });
  if (!res.ok) {
    // Handle unauthorized or other errors
    if (res.status === 401 || res.status === 403) {
      // Redirect to login or show an access denied message
      redirect('/login');
    }
    throw new Error('Failed to fetch admin blog posts');
  }
  return res.json();
}

export default async function AdminBlogPage() {
  const session = await getServerSession(authOptions);

  if (!session || !(session.user as any).role || (session.user as any).role !== 'admin') {
    redirect('/login');
  }
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    posts = await getAdminBlogPosts();
  } catch (err: any) {
    error = err.message;
  }

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/api/admin/blog/${postId}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          throw new Error('Failed to delete blog post');
        }
        // Revalidate data after deletion
        window.location.reload(); // Simple reload for revalidation
      } catch (err: any) {
        alert(`Error deleting post: ${err.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Blog Management</h1>
      <div className="mb-4">
        <Link href="/admin/blog/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Create New Blog Post
        </Link>
      </div>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <AdminBlogList posts={posts} onDelete={handleDelete} />
      )}
    </div>
  );
}