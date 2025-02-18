import { useState } from "react";
import PostCard from "./postCard";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
};

export default function PostList() {
  const [filter, setFilter] = useState("all");

  // Dummy post data with image URLs and authors
  const posts: Post[] = [
    {
      id: 1,
      title: "Local Art is on Fire",
      content:
        "The local art scene is thriving with new exhibitions and galleries opening downtown.",
      author: "Jane Doe",
      date: "2025-02-16",
      imageUrl: "https://visitmorristowntn.com/wp-content/uploads/2024/12/Gallery-copy-1.jpg",
    },
    {
      id: 2,
      title: "Community Garden Update",
      content:
        "The community garden has seen a vibrant bloom this season—check out the new organic produce!",
      author: "John Smith",
      date: "2025-02-15",
      imageUrl:
        "https://www.allrecipes.com/thmb/O0rtIZnxXdHren0mlBlKFtUs594=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/102793756-community-garden-and-greenhouse-photo-by-meredith-6cfd0cbabbb14a568fb9e9bca735fef9.jpg",
    },
    {
      id: 3,
      title: "Historic Downtown Renovation",
      content:
        "Downtown Montclair is getting a historic facelift thanks to new conservation efforts.",
      author: "Alex Johnson",
      date: "2025-02-14",
      imageUrl:
        "https://jerseydigs.com/wp-content/uploads/2022/03/11-south-fullerton-ave-montclair-renovation.jpg",
    },
  ];

  return (
    <section className="container mx-auto px-4 pt-0 py-12 bg-gradient-to-br from-gray-800 via-black to-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">What's new in Montclair?</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 bg-white text-gray-800 rounded"
        >
          <option value="all">All Posts</option>
          <option value="reviews">Reviews</option>
          <option value="posts">Posts</option>
        </select>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}