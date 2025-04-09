import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../services/blogService";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response.posts);
      } catch (err) {
        setError("Blog yazıları yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Son Blog Yazıları</h1>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-500">
          Henüz hiç blog yazısı bulunmuyor.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h2>
                <p className="text-gray-600 mb-4">
                  {post.content.length > 150
                    ? `${post.content.substring(0, 150)}...`
                    : post.content}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString('tr-TR')}
                  </div>
                  <div className="text-sm font-medium">
                    {post.user?.name}
                  </div>
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Devamını Oku
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList; 