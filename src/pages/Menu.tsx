import { motion } from 'framer-motion';
import { FaCoffee, FaIceCream, FaWineBottle } from 'react-icons/fa';
import { GiSandwich, GiBrazil } from 'react-icons/gi';
import { MenuSection } from '../components/MenuSection';
import { CartDrawer } from '../components/CartDrawer';


const sandwiches = [
  { name: 'Pão com manteiga', price: 3.0, image: "/paes-ovos/paoCmanteiga.jpeg", description: "Pão fresquinho com manteiga derretida", ingredients: "Pão francês, manteiga"},
  { name: 'Pão com ovo', price: 5.5, image: "/paes-ovos/PaoCOvo.jpeg", description: "Pão fresquinho com ovos mexidos", ingredients: "Pão francês, manteiga, ovo frito"},
  {name:  "Pão com Manteiga e Queijo", price: 5.00, image: "/paes-ovos/paoCmanteigaQueijo.jpeg", description: "Pão fresquinho com manteiga e queijo derretido", ingredients: "Pão francês, manteiga, queijo mussarela"},
  { name: 'Pão com manteiga e presunto', price: 5.0, image: '/paes-ovos/paoManteigaPresunto.jpeg', description: '', ingredients: '' },
  { name: 'Pão com manteiga, queijo e presunto', price: 7.5, image: '', description: '', ingredients: '' },
  { name: 'Pão com manteiga, queijo e ovo', price: 8.0, image: '', description: '', ingredients: '' },
  { name: 'Pão com manteiga, queijo, presunto e ovo', price: 9.5, image: '', description: '', ingredients: '' },
  { name: 'Queijo quente', price: 6.5, image: '/paes-ovos/queijoQuente.jpeg', description: '', ingredients: '' },
  { name: "Misto Quente",  price: 7.50, image: "/paes-ovos/mistoQuente.jpeg", description: "Clássico misto quente crocante", ingredients: "Pão de forma, queijo, presunto"},
];

const tapiocas = [
  { name: 'Tapioca com manteiga', price: 5.0, image: '/tapiocas/tapioca.jpeg', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga e ovo', price: 7.5, image: '/tapiocas/tapiocaCovos.jpeg', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga e queijo', price: 7.0, image: '', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga e presunto', price: 6.0, image: '/tapiocas/tapiocaCpresunto.jpeg', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga, queijo e presunto', price: 9.0, image: '/tapiocas/tapiocaCqueijoEpresunto.jpeg', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga, queijo e ovo', price: 9.5, image: '', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga, presunto e ovo', price: 9.0, image: '', description: '', ingredients: '' },
  { name: 'Tapioca com manteiga, queijo, presunto e ovo', price: 11.0, image: '', description: '', ingredients: '' },
  { name: 'Cuzcuz com ovo', price: 8.0, image: '/cuzcuz/cuzcuzCovo.jpeg', description: '', ingredients: '' },
  { name: 'Omelete (3 ovos)', price: 7.0, image: '/paes-ovos/omelete.jpeg', description: '', ingredients: '' },
  { name: 'Ovos mexidos (3 ovos)', price: 7.0, image: '/paes-ovos/ovosMexidos.jpeg', description: '', ingredients: '' },
  { name: 'Farofa de ovos (3 ovos)', price: 9.0, image: '/paes-ovos/farofaOvo.jpeg', description: '', ingredients: '' },
];

const cafes = [
  { name: 'Expresso', price: 5.0, image: '/cafes/cafeExpresso.jpeg', description: 'Café expresso' },
  { name: 'Café puro', price: 4.0, image: '/cafes/cafePuro.jpeg', description: 'Café puro' },
  { name: 'Café com leite', price: 5.0, image: '/cafes/cafeCleite.jpeg', description: 'Café com Leite' },
  { name: 'Leite quente', price: 4.0, image: '/cafes/leiteQuente.jpeg', description: 'Leite quente' },
  { name: 'Capputino', price: 7.5, image: "/cafes/capputino.jpeg", description: "Café expresso com leite vaporizado e espuma"},
  { name: 'Café especial', price: 10.0, image: "/cafes/cafeEspecial.jpeg", description: "Nosso blend exclusivo de grãos especiais"},
  { name: 'Achocolatado (quente ou gelado)', price: 6.0, image: "/cafes/achocolatado.jpeg", description: "Delicioso achocolatado cremoso",},
];

const doces = [
  { name: 'Bolo de chocolate', price: 6.0, image: "/doces/boloChocolate.jpeg", description: "Bolo de chocolate fofinho", ingredients: "Chocolate, farinha, ovos" },
  { name: 'Torta de limão', price: 7.0, image: "/doces/tortaLimao.jpeg", description: "Torta de limão com merengue", ingredients: "Limão, leite condensado, merengue" },
  { name: 'Donuts', price: 5.0, image: "/doces/donuts.jpeg", description: "Donuts macios e doces", ingredients: "Farinha, açúcar, cobertura" },
  { name: 'Brigadeiro', price: 3.0, image: "/doces/brigadeiro.jpeg", description: "Clássico brigadeiro brasileiro", ingredients: "Chocolate, leite condensado, granulado" },
];

const bebidas = [
  { name: 'Refrigerante de 600ml!', price: 3.0, image: '/bebidas/refrigerante600.jpeg', description: '' },
  { name: 'Refrigerante lata', price: 5.0, image: '/bebidas/refrigeranteLata.jpeg', description: ''},
  { name: 'Refrigerante garrafa!', price: 7.0, image: '/bebidas/refrigerante200.jpeg', description: '' },
  { name: 'Refrigerante', price: 9.0, image: '', description: '' },
  { name: 'Suco copo', price: 5.0, image: '/bebidas/sucoCopo.jpeg', description: '' },
  { name: 'Suco natural Jarra', price: 12.0, image: '/bebidas/sucoJarra.jpeg', description: '' },
  // { name: 'Água mineral', price: 3.0, image: '', description: ''},
];

const acais = [
  {
    id: 1,
    name: "Açaí Tradicional",
    price: 12.00,
    image: "/images/acai/tradicional.jpg",
    description: "Açaí puro acompanhado de banana e granola",
    sizes: ["300ml", "500ml", "700ml"]
  },
  // Adicionar mais itens...
];
 

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
              <FaIceCream className="text-3xl md:text-4xl mb-2" />
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

        {/* Seções do Cardápio */}
        <MenuSection id="sandwiches" title="Sanduíches" items={sandwiches} />
        <MenuSection id="tapiocas" title="Tapiocas" items={tapiocas} />
        <MenuSection id="cafes" title="Cafés Especiais" items={cafes} />
        <MenuSection id="doces" title="Doces" items={doces} />
        <MenuSection id="acais" title="Açaí" items={acais} />
        <MenuSection id="bebidas" title="Bebidas" items={bebidas} />
      </div>

      {/* Sacola de Pedidos Flutuante */}
      <CartDrawer />
    </div>
  );
};

export default Menu;