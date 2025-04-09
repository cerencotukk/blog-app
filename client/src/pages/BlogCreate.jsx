import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPost } from "../services/blogService";

function BlogCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await createPost({ title, content });
      navigate(`/blog/${response.post.id}`);
    } catch (err) {
      setError("Blog yazısı oluşturulurken bir hata oluştu.");
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Yeni Blog Yazısı</h1>
        
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
              to="/"
              className="text-blue-600 hover:underline"
            >
              İptal
            </Link>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Kaydediliyor..." : "Yayınla"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogCreate; 