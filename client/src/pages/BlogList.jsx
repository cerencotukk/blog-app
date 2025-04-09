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
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-300 border-t-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800 relative">
        <span className="relative inline-block">
          Son Blog Yazıları
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-pink-300 rounded"></span>
        </span>
      </h1>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 p-12 bg-white rounded-lg shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-gray-900">Henüz hiç blog yazısı bulunmuyor</h3>
          <p className="mt-1 text-gray-600">İlk blog yazısını eklemek için giriş yapın.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="p-6">
                <div className="bg-pink-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-100 transition-colors">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-pink-600 transition-colors">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content.length > 180
                    ? `${post.content.substring(0, 180)}...`
                    : post.content}
                </p>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(post.created_at).toLocaleDateString('tr-TR')}
                  </div>
                  <div className="text-sm font-medium text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {post.user?.name}
                  </div>
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-4 inline-block w-full text-center bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-all shadow-sm hover:shadow group-hover:scale-[1.03] duration-300"
                >
                  Devamını Oku
                  <svg className="w-4 h-4 ml-1 inline-block transform translate-y-0 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
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