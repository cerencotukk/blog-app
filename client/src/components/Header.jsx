import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-pink-400 text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
          </svg>
          Blog Uygulaması
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link to="/" className="relative py-2 hover:text-white transition-colors group font-semibold">
            Ana Sayfa
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="relative py-2 hover:text-white transition-colors group font-semibold">
                Kontrol Paneli
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/blog/create" className="relative py-2 hover:text-white transition-colors group font-semibold">
                Yeni Yazı
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <div className="relative group">
                <button className="flex items-center hover:text-white transition-colors font-semibold">
                  <span>{user?.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block transform opacity-0 group-hover:opacity-100 transition-all duration-300 origin-top-right scale-95 group-hover:scale-100">
                  <button 
                    onClick={logout} 
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors text-left font-medium"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="relative py-2 hover:text-white transition-colors group font-semibold">
                Giriş Yap
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/register" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-all shadow-sm hover:shadow font-semibold">
                Kayıt Ol
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header; 