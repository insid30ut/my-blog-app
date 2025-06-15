# Blog Feature Design Plan

This document outlines the architectural plan for implementing a new blog feature.

## 1. Clarification/Assumption

Based on the existing file structure, which includes:
*   `app/(main)/posts/...`
*   `app/api/posts/...`
*   `models/Post.ts`
*   `components/posts/...`

It's assumed that a "posts" functionality already exists. The new "blog page" feature will be designed as an **extension and specialized view of this existing "posts" system**. Blog posts will utilize the existing `Post` data model but will have dedicated routes, UI components, and stricter access controls for creation and editing, limited to an authenticated administrator/owner.

## 2. Route Definitions

The following URL routes will be defined for the blog feature, organized under the `/blog` path:

*   **Public Routes:**
    *   `GET /blog`: View a list of all published blog posts.
    *   `GET /blog/[slug]`: View a single published blog post by its slug.
*   **Admin/Protected Routes:**
    *   `GET /admin/blog`: View a list of all blog posts (published and drafts) with management options (edit, delete).
    *   `GET /admin/blog/create`: Page to create a new blog post.
    *   `POST /admin/blog/create`: API endpoint to handle new blog post submission.
    *   `GET /admin/blog/[slug]/edit`: Page to edit an existing blog post.
    *   `PUT /admin/blog/[slug]/edit`: API endpoint to handle blog post update submission.
    *   `DELETE /admin/blog/[slug]`: API endpoint to delete a blog post.

## 3. Data Model

The existing data model defined in [`models/Post.ts`](models/Post.ts) will be reused for blog posts. The structure is as follows:

```typescript
export interface Post {
  id: string;        // Unique identifier
  title: string;     // Title of the blog post
  slug: string;      // URL-friendly slug
  content: string;   // Main content of the post (e.g., Markdown, HTML)
  authorId: string;  // ID of the user who created the post
  category?: string; // Optional category (could be fixed to "Blog" or similar)
  tags?: string[];   // Optional tags
  coverImage?: string; // Optional cover image URL
  published: boolean; // Status: true for published, false for draft
  createdAt: Date;   // Timestamp of creation
  updatedAt: Date;   // Timestamp of last update
}
```
For blog posts, the `authorId` will be crucial for authorization, and the `published` flag will control public visibility. We might implicitly filter by a specific category (e.g., "blog") or add a dedicated `postType: 'blog'` field if differentiation from other post types becomes necessary in the future. For now, dedicated routes will manage the distinction.

## 4. Authentication/Authorization Strategy

Access to create, edit, and delete blog posts will be restricted to authenticated users, presumably with an "admin" role or the original author.

*   **Authentication**: Leverage the existing authentication system (likely NextAuth.js or similar, given the `app/(auth)/...` and `app/api/auth/...` structure). API endpoints for creating/editing/deleting blog posts will require a valid session.
*   **Authorization**:
    *   **Creation**: Only authenticated users (potentially with a specific "admin" role) can access the `/admin/blog/create` page and use the corresponding API endpoint.
    *   **Editing/Deletion**: Only the original `authorId` of a blog post (or an admin) can edit or delete it. This check will be performed in the API route handlers for `PUT /admin/blog/[slug]/edit` and `DELETE /admin/blog/[slug]`.
    *   Frontend UI for edit/delete buttons will be conditionally rendered based on the user's authentication status and authorization (e.g., checking if `session.user.id === post.authorId` or if `session.user.role === 'admin'`).

## 5. File Structure

New files and directories will be organized as follows:

*   **Frontend Pages (under `src/app/`):**
    *   `src/app/blog/page.tsx`: Page to display a list of all published blog posts.
    *   `src/app/blog/[slug]/page.tsx`: Page to display a single published blog post.
    *   `src/app/admin/blog/page.tsx`: Admin page to list all blog posts (for management).
    *   `src/app/admin/blog/create/page.tsx`: Admin page for creating a new blog post.
    *   `src/app/admin/blog/[slug]/edit/page.tsx`: Admin page for editing an existing blog post.

*   **API Route Handlers (under `src/app/api/`):**
    *   `src/app/api/blog/route.ts`: Handles `GET` for public listing of blog posts. (May reuse/extend `src/app/api/posts/route.ts` with filtering).
    *   `src/app/api/blog/[slug]/route.ts`: Handles `GET` for a single public blog post. (May reuse/extend `src/app/api/posts/[postId]/route.ts`).
    *   `src/app/api/admin/blog/route.ts`: Handles `POST` for creating new blog posts (protected).
    *   `src/app/api/admin/blog/[postId]/route.ts`: Handles `PUT` (update) and `DELETE` (delete) for specific blog posts (protected, author/admin check).
        *   *Note: Using `[postId]` instead of `[slug]` for API routes that modify data is generally more robust, as slugs can potentially change, while IDs are immutable. The frontend can resolve slug to ID if needed.*

*   **UI Components (under `components/`):**
    *   `components/blog/BlogCard.tsx`: Component to display a blog post summary in a list. (Could adapt `components/posts/PostCard.tsx`).
    *   `components/blog/BlogList.tsx`: Component to render a list of `BlogCard`s. (Could adapt `components/posts/PostList.tsx`).
    *   `components/blog/BlogPostView.tsx`: Component to display the full content of a blog post. (Could adapt `components/posts/PostView.tsx`).
    *   `components/admin/blog/BlogForm.tsx`: Form component for creating/editing blog posts. (Could adapt `components/posts/PostForm.tsx`).
    *   `components/admin/blog/AdminBlogList.tsx`: Component for the admin view, listing blog posts with edit/delete controls.

## 6. Summary of Deliverables

### Key Frontend Components/Pages:
*   Public blog listing page (`/blog`)
*   Public single blog post page (`/blog/[slug]`)
*   Admin blog management page (`/admin/blog`)
*   Admin blog creation page (`/admin/blog/create`)
*   Admin blog editing page (`/admin/blog/[slug]/edit`)
*   Reusable UI components for blog cards, lists, views, and forms.

### Key API Endpoints:
*   `GET /api/blog`: Fetch published blog posts.
*   `GET /api/blog/[slug]`: Fetch a single published blog post.
*   `POST /api/admin/blog`: Create a new blog post (protected).
*   `PUT /api/admin/blog/[postId]`: Update an existing blog post (protected).
*   `DELETE /api/admin/blog/[postId]`: Delete a blog post (protected).

This plan leverages existing structures where possible to ensure consistency and reduce redundant effort.