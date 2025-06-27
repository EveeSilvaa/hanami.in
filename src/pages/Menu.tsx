import { motion } from 'framer-motion';
import { FaCoffee, FaIceCream, FaWineBottle } from 'react-icons/fa';
import { GiSandwich, GiBrazil } from 'react-icons/gi';
import { MenuSection } from '../components/MenuSection';
import { CartDrawer } from '../components/CartDrawer';
import menuData from '../data/menuData.json';
import { TbCup } from "react-icons/tb"

const Menu = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Título do Cardápio */}
        <motion.h1 
          className="text-4xl font-extrabold text-amber-800 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Cardápio
        </motion.h1>

        {/* Navegação por ícones */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          <div className="flex space-x-4 md:space-x-8">
            <button 
              onClick={() => scrollToSection('sandwiches')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition min-w-[70px]"
            >
              <GiSandwich className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Sanduíches</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('tapiocas')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition min-w-[70px]"
            >
              <GiBrazil className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Tapiocas</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('cafes')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition min-w-[70px]"
            >
              <FaCoffee className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Cafés</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('doces')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition min-w-[70px]"
            >
              <FaIceCream className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Doces</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('acais')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition min-w-[70px]"
            >
              <TbCup className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Açaí</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('bebidas')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition min-w-[70px]"
            >
              <FaWineBottle className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Bebidas</span>
            </button>
          </div>
        </div>

        {menuData.sections.map(section => (
        <MenuSection
          key={section.id}
          id={section.id}
          title={section.title}
          items={section.items}
        />
       ))}
      
      <CartDrawer />
      
      </div>
    </div>
  );
};

export default Menu;