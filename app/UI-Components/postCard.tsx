import React from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded shadow p-4">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-2">
        By {post.author} on {post.date}
      </p>
      <p className="text-gray-800">{post.content}</p>
    </article>
  );
}