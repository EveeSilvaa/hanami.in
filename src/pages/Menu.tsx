import { MenuSection } from '../components/MenuSection';
import { motion } from 'framer-motion';
import { FaCoffee, FaIceCream, FaWineBottle } from 'react-icons/fa';
import { GiBrazil, GiSandwich } from 'react-icons/gi';



const sandwiches = [
  { name: 'Pão com manteiga', price: 3.0, image: "sandwich-manteiga.jpg", description: "Pão fresquinho com manteiga derretida", ingredients: "Pão francês, manteiga"},
  { name: 'Pão com manteiga e ovo', price: 5.5, image: "sandwich-ovo.jpg", description: "Pão fresquinho com manteiga e ovo frito", ingredients: "Pão francês, manteiga, ovo frito"},
  {name: "Pão com Manteiga e Queijo", price: 5.00, image: "sandwich-queijo.jpg", description: "Pão fresquinho com manteiga e queijo derretido", ingredients: "Pão francês, manteiga, queijo mussarela"},
  { name: 'Pão com manteiga e presunto', price: 5.0, image: '', description: '', ingredients: '' },
  { name: 'Pão com manteiga, queijo e presunto', price: 7.5, image: '', description: '', ingredients: '' },
  { name: 'Pão com manteiga, queijo e ovo', price: 8.0, image: '', description: '', ingredients: '' },
  { name: 'Pão com manteiga, queijo, presunto e ovo', price: 9.5, image: '', description: '', ingredients: '' },
  { name: 'Queijo quente', price: 6.5, image: '', description: '', ingredients: '' },
  { name: "Misto Quente",  price: 7.50, image: "misto-quente.jpg", description: "Clássico misto quente crocante", ingredients: "Pão de forma, queijo, presunto"},
];

const tapiocas = [
  { name: 'Tapioca com manteiga', price: 5.0, image: '', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga e ovo', price: 7.5, image: '', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga e queijo', price: 7.0, image: '', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga e presunto', price: 6.0, image: '', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga, queijo e presunto', price: 9.0, image: '', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga, queijo e ovo', price: 9.5, image: '', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga, presunto e ovo', price: 9.0, image: '', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga, queijo, presunto e ovo', price: 11.0, image: '', description: '', ingredients: '' },
  { name: 'Cuzcuz com ovo', price: 8.0, image: '', description: '', ingredients: '' },
  { name: 'Omelete (3 ovos)', price: 7.0, image: '', description: '', ingredients: '' },
  { name: 'Ovos mexidos (3 ovos)', price: 7.0, image: '', description: '', ingredients: '' },
  { name: 'Farofa de ovos (3 ovos)', price: 9.0, image: '', description: '', ingredients: '' },
];

const cafes = [
  { name: 'Expresso', price: 5.0, image: '', description: '' },
  { name: 'Café puro', price: 4.0, image: '', description: '' },
  { name: 'Café com leite', price: 5.0, image: '', description: '' },
  { name: 'Leite quente', price: 4.0, image: '', description: '' },
  { name: 'Caprutino', price: 7.5, image: "capuccino.jpg", description: "Café expresso com leite vaporizado e espuma"},
  { name: 'Café especial', price: 10.0, image: "cafe-especial.jpg", description: "Nosso blend exclusivo de grãos especiais"},
  { name: 'Achocolatado (quente ou gelado)', price: 6.0, image: "achocolatado.jpg", description: "Delicioso achocolatado cremoso",},
];

const doces = [
  { name: 'Bolo de chocolate', price: 6.0, image: "bolo-chocolate.jpg", description: "Bolo de chocolate fofinho", ingredients: "Chocolate, farinha, ovos" },
  { name: 'Torta de limão', price: 7.0, image: "torta-limao.jpg", description: "Torta de limão com merengue", ingredients: "Limão, leite condensado, merengue" },
  { name: 'Donuts', price: 5.0, image: "donuts.jpg", description: "Donuts macios e doces", ingredients: "Farinha, açúcar, cobertura" },
  { name: 'Brigadeiro', price: 3.0, image: "brigadeiro.jpg", description: "Clássico brigadeiro brasileiro", ingredients: "Chocolate, leite condensado, granulado" },
];

const bebidas = [
  { name: 'Refrigerante zoom!', price: 3.0, image: '', description: '', ingredients: '' },
  { name: 'Refrigerante lata', price: 5.0, image: '', description: '', ingredients: '' },
  { name: 'Refrigerante garrafa boom!', price: 7.0, image: '', description: '', ingredients: '' },
  { name: 'Refrigerante ri.', price: 9.0, image: '', description: '', ingredients: '' },
  { name: 'Suco copo', price: 5.0, image: '', description: '', ingredients: '' },
  { name: 'Suco nattal ri.', price: 12.0, image: '', description: '', ingredients: '' },
  { name: 'Água mineral zoom!', price: 3.0, image: '', description: '', ingredients: '' },
];

const Menu = () => {


  function scrollToSection(section: string): void {
    const sectionTitles: Record<string, string> = {
      sandwiches: "Sanduíches",
      tapiocas: "Tapiocas",
      cafes: "Cafés Especiais",
      doces: "Doces",
      bebidas: "Bebidas"
    };
    const title = sectionTitles[section];
    if (!title) return;
    const sectionElement = Array.from(document.querySelectorAll('h2'))
      .find(el => el.textContent?.trim() === title);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="bg-amber-50">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-extrabold text-amber-800 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Cardápio
        </motion.h1>
         <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          <div className="flex space-x-4 md:space-x-8">
            <button 
              onClick={() => scrollToSection('sandwiches')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition"
            >
              <GiSandwich className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Sanduíches</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('tapiocas')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition"
            >
              <GiBrazil className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Tapiocas</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('cafes')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition"
            >
              <FaCoffee className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Cafés</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('doces')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition"
            >
              <FaIceCream className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Doces</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('bebidas')}
              className="flex flex-col items-center text-amber-700 hover:text-amber-900 transition"
            >
              <FaWineBottle className="text-3xl md:text-4xl mb-2" />
              <span className="text-sm md:text-base">Bebidas</span>
            </button>
          </div>
        </div>
        <MenuSection title="Sanduíches" items={sandwiches} />
        <MenuSection title="Tapiocas" items={tapiocas} />
        <MenuSection title="Cafés Especiais" items={cafes} />
        <MenuSection title="Doces" items={doces} />
        <MenuSection title="Bebidas" items={bebidas} />
      </div>
    </div>
  );
};

export default Menu;