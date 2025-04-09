import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "../services/blogService";
import { useAuth } from "../contexts/AuthContext";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.post);
      } catch (err) {
        setError("Blog yazısı yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) {
      return;
    }

    setIsDeleting(true);
    
    try {
      await deletePost(id);
      navigate("/");
    } catch (err) {
      setError("Blog yazısı silinirken bir hata oluştu.");
      console.error(err);
      setIsDeleting(false);
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
        <div className="mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog yazısı bulunamadı</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = isAuthenticated && user && post.user_id === user.id;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
        
        <div className="flex items-center justify-between mb-6 text-gray-600">
          <div className="flex items-center">
            <span className="mr-2">Yazar:</span>
            <span className="font-medium">{post.user?.name}</span>
          </div>
          <div>
            {new Date(post.created_at).toLocaleDateString('tr-TR')}
          </div>
        </div>
        
        <div className="prose max-w-none mb-8">
          <p className="whitespace-pre-line">{post.content}</p>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            &larr; Tüm yazılara dön
          </Link>
          
          {isOwner && (
            <div className="space-x-2">
              <Link
                to={`/blog/edit/${post.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Düzenle
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                {isDeleting ? "Siliniyor..." : "Sil"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail; 