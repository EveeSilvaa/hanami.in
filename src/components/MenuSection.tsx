import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext'; // Importe o hook do carrinho
import type { MenuItem } from '../types';

interface MenuSectionProps {
  id?: string;
  title: string;
  items: MenuItem[];
}

const MenuItemCard = ({ item }: { item: MenuItem }) => {
  const { addToCart } = useCart(); // Use o hook do carrinho

  const handleAddToCart = () => {
    addToCart({
      id: `${item.name}-${item.price}`.replace(/\s+/g, '-').toLowerCase(),
      name: item.name,
      price: item.price,
      category: item.category || 'outros',
      image: item.image
    });
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`/images/menu/${item.image}`}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />
        {item.isNew && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NOVO
          </span>
        )}
      </div>
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-amber-900">{item.name}</h3>
          <span className="text-lg font-bold text-amber-600 whitespace-nowrap">
            R$ {item.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        {item.description && (
          <p className="text-sm text-amber-700 mt-2">{item.description}</p>
        )}
        {item.ingredients && (
          <p className="text-xs text-amber-500 mt-2 italic">{item.ingredients}</p>
        )}
      </div>
      <div className="p-5">
        <button
          onClick={handleAddToCart}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg transition-colors"
        >
          Adicionar à sacola
        </button>
      </div>
    </motion.div>
  );
};

export const MenuSection = ({ id, title, items }: MenuSectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-amber-800 mb-8 pb-2 border-b-2 border-amber-200">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <MenuItemCard 
            key={`${title}-${index}`}
            item={{ 
              ...item,
              category: title.toLowerCase()
            }} 
          />
        ))}
      </div>
    </motion.section>
  );
};