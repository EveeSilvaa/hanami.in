import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Header = () => {
    return (
        <header className="bg-amber-900 text-amber-50 shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1}}
                        transition={{ duration: 0.5}}
                    >
                     <Link to="/" className="flex items-left space-x-2">
                        <img 
                            src="/images/logo.jpeg" 
                            alt="Hanami Cafeteria Logo" 
                            className="h-12 object-contain border-2 border-amber-200 rounded-full"
                        />
                     </Link>
                    </motion.div>

                    <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className="px-3 py-2 rounded hover:bg-amber-700 transition"
            >
              Home
            </Link>
            <Link to="/sobre" className="px-3 py-2 rounded hover:bg-amber-700 transition"
            >
              Sobre
            </Link>
            <Link 
              to="/menu" 
              className="px-3 py-2 rounded hover:bg-amber-700 transition"
            >
              Cardápio
            </Link>
          </nav>
          
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
                
