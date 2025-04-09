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
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-300 border-t-blue-600"></div>
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
        <div className="mt-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center group transition-colors">
            <svg className="w-5 h-5 mr-1 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold mt-4 mb-2 text-gray-800">Blog yazısı bulunamadı</h2>
          <p className="text-gray-600 mb-6">Aradığınız blog yazısı silinmiş veya taşınmış olabilir.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = isAuthenticated && user && post.user_id === user.id;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">{post.title}</h1>
        
        <div className="flex items-center justify-between mb-8 text-gray-600 border-b border-gray-100 pb-4">
          <div className="flex items-center">
            <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <span className="text-sm text-gray-500">Yazar</span>
              <span className="block font-medium text-gray-800">{post.user?.name}</span>
            </div>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">{new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>
        
        <div className="prose max-w-none mb-10 text-gray-700 leading-relaxed">
          <p className="whitespace-pre-line">{post.content}</p>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-10">
          <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center group transition-colors">
            <svg className="w-5 h-5 mr-1 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tüm yazılara dön
          </Link>
          
          {isOwner && (
            <div className="space-x-3">
              <Link
                to={`/blog/edit/${post.id}`}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Düzenle
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
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