import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Blog Uygulaması</Link>
        
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-200 transition-colors">Ana Sayfa</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                Kontrol Paneli
              </Link>
              <Link to="/blog/create" className="hover:text-blue-200 transition-colors">
                Yeni Yazı
              </Link>
              <div className="relative group">
                <button className="flex items-center hover:text-blue-200 transition-colors">
                  <span>{user?.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <button 
                    onClick={logout} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition-colors">Giriş Yap</Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">Kayıt Ol</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header; 