import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPostById, updatePost } from "../services/blogService";
import toast from "react-hot-toast";

function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setTitle(response.post.title);
        setContent(response.post.content);
      } catch (err) {
        setError("Blog yazısı yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await updatePost(id, { title, content });
      toast.success("Blog yazısı başarıyla güncellendi");
      navigate(`/blog/${id}`);
    } catch (err) {
      setError("Blog yazısı güncellenirken bir hata oluştu.");
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Blog Yazısını Düzenle</h1>
        
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Başlık
            </label>
            <input 
              id="title"
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Blog yazısının başlığı"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              İçerik
            </label>
            <textarea 
              id="content"
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Blog yazısının içeriği..."
              rows="12"
              required
            />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <Link
              to={`/blog/${id}`}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-all shadow-sm hover:shadow font-semibold"
            >
              İptal
            </Link>
            <button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-pink-400 text-white px-6 py-3 rounded-md hover:opacity-90 hover:scale-105 transition-all shadow-sm hover:shadow font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Kaydediliyor..." : "Güncelle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogEdit; 