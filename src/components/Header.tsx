import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Header = () => {
  // Estado para controlar a visibilidade do menu mobile
  // isMenuOpen inicia como false, ou seja, o menu está fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-amber-800 text-amber-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo e links desktop */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo-hanami.png" 
              alt="Hanami Cafeteria" 
              className="h-12 object-contain"
            />
          </Link>
          
          {/* Menu desktop (hidden on mobile) */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="px-3 py-2 rounded hover:bg-amber-700 transition">
              Home
            </Link>
            <Link to="/menu" className="px-3 py-2 rounded hover:bg-amber-700 transition">
              Cardápio
            </Link>
            <Link to="/sobre" className="px-3 py-2 rounded hover:bg-amber-700 transition">
              Sobre
            </Link>
          </nav>

          {/* Botão mobile (hidden on desktop) */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Menu mobile"
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6 text-amber-50" />
            ) : (
              <HiMenu className="h-6 w-6 text-amber-50" />
            )}
          </button>
        </div>

        {/* Menu mobile (aparece quando isMenuOpen = true) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded hover:bg-amber-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className="block px-3 py-2 rounded hover:bg-amber-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Cardápio
            </Link>
            <Link 
              to="/sobre" 
              className="block px-3 py-2 rounded hover:bg-amber-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;