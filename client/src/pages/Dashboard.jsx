import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUserPosts, deletePost } from "../services/blogService";
import toast from "react-hot-toast";

function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await getUserPosts();
        setPosts(response.posts);
      } catch (err) {
        setError("Gönderileriniz yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) {
      return;
    }
    
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
      toast.success("Blog yazısı başarıyla silindi");
    } catch (err) {
      toast.error("Blog yazısı silinirken bir hata oluştu");
      console.error(err);
    }
  };

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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Kontrol Paneli</h1>
          <Link
            to="/blog/create"
            className="bg-gradient-to-r from-blue-500 to-pink-400 text-white px-4 py-2 rounded-md hover:opacity-90 hover:scale-105 transition-all shadow-sm hover:shadow font-semibold"
          >
            Yeni Yazı Oluştur
          </Link>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Hoş geldiniz, {user?.name}</h2>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Yazılarınız</h3>
            
            {posts.length === 0 ? (
              <p className="text-gray-600">Henüz hiç yazınız bulunmuyor.</p>
            ) : (
              <div className="divide-y">
                {posts.map((post) => (
                  <div key={post.id} className="py-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{post.title}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="space-x-3">
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 rounded-md hover:opacity-90 hover:scale-105 transition-all shadow-sm hover:shadow text-sm font-semibold"
                      >
                        Görüntüle
                      </Link>
                      <Link
                        to={`/blog/edit/${post.id}`}
                        className="inline-flex items-center bg-gradient-to-r from-pink-400 to-rose-400 text-white px-3 py-1.5 rounded-md hover:opacity-90 hover:scale-105 transition-all shadow-sm hover:shadow text-sm font-semibold"
                      >
                        Düzenle
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="inline-flex items-center bg-gray-800 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 hover:scale-105 transition-all shadow-sm hover:shadow text-sm font-semibold"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 