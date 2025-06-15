import { Post } from '@/models/Post';

interface BlogPostViewProps {
  post: Post;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post }) => {
  if (!post) {
    return <p>Blog post not found.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{post.title}</h1>
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded-md mb-6" />
      )}
      <div className="text-gray-600 text-sm mb-6 flex items-center space-x-4">
        <p>Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
        {post.category && <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{post.category}</span>}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed">
        {/* In a real app, you'd parse Markdown or HTML here */}
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPostView;