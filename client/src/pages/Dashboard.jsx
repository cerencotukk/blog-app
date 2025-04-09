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
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
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
                    <div className="space-x-2">
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-block text-blue-600 hover:text-blue-800"
                      >
                        Görüntüle
                      </Link>
                      <Link
                        to={`/blog/edit/${post.id}`}
                        className="inline-block text-green-600 hover:text-green-800"
                      >
                        Düzenle
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="inline-block text-red-600 hover:text-red-800"
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