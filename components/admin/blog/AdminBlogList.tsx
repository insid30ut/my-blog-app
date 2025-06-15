import Link from 'next/link';
import { Post } from '@/models/Post';

interface AdminBlogListProps {
  posts: Post[];
  onDelete: (postId: string) => Promise<void>;
}

const AdminBlogList: React.FC<AdminBlogListProps> = ({ posts, onDelete }) => {
  if (!posts || posts.length === 0) {
    return <p>No blog posts found for management.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Created At</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                  {post.title}
                </Link>
              </td>
              <td className="py-3 px-6 text-left">
                <span className={`py-1 px-3 rounded-full text-xs ${
                  post.published ? 'bg-green-200 text-green-600' : 'bg-yellow-200 text-yellow-600'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <Link href={`/admin/blog/${post.id}/edit`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>
                  <button onClick={() => onDelete(post.id)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogList;