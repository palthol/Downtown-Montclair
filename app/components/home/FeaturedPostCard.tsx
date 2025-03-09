type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
};

export default function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-72 object-cover"
        />
      )}
      <div className="p-6">
        <div className="mb-2 text-xs text-gray-500 uppercase">Featured Post</div>
        <h3 className="text-3xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">
          By {post.author} on {post.date}
        </p>
        <p className="text-gray-800">{post.content}</p>
      </div>
    </article>
  );
}