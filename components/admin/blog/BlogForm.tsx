import React, { useState, useEffect } from 'react';
import { Post } from '@/models/Post';
import { useRouter } from 'next/navigation';

interface BlogFormProps {
  initialData?: Post;
  onSubmit: (post: Omit<Post, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [published, setPublished] = useState(initialData?.published || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setCategory(initialData.category || '');
      setTags(initialData.tags?.join(', ') || '');
      setCoverImage(initialData.coverImage || '');
      setPublished(initialData.published);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit({
        title,
        content,
        authorId: 'user1', // Placeholder for current user - will be replaced by actual user ID from session
        category: category || undefined,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined,
        coverImage: coverImage || undefined,
        published,
      });
      router.push('/admin/blog'); // Redirect to admin blog list after submission
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={10}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated, optional)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Cover Image URL (optional)"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="text-gray-700">Published</span>
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Save Blog Post'}
      </button>
    </form>
  );
};

export default BlogForm;