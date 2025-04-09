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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 relative inline-block">
            Yeni Blog Yazısı
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded"></span>
          </h1>
          
          {error && (
            <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <div className="flex items-center">
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm hover:shadow focus:shadow"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm hover:shadow focus:shadow"
                placeholder="Blog yazısının içeriği..."
                rows="12"
                required
              />
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <Link
                to="/"
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-all shadow-sm hover:shadow font-semibold"
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  İptal
                </div>
              </Link>
              <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-500 to-pink-400 text-white px-6 py-3 rounded-md hover:opacity-90 hover:scale-105 transition-all shadow-sm hover:shadow font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Kaydediliyor...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Yayınla
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogCreate; 