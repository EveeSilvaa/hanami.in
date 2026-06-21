import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const MenuItemCard = ({ item }: { item: any }) => {
  const { cart, addToCart, formatCurrency } = useCart();
  const [showSelector, setShowSelector] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const generateItemId = () => {
    return `${item.name}-${item.price}`.replace(/\s+/g, '-').toLowerCase();
  };

  const itemId = generateItemId();
  const cartItem = cart.find(i => i.id === itemId);
  const inCartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart({
      id: itemId,
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image
    }, quantity);
    setShowSelector(false);
    setQuantity(1);
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative group flex flex-col h-full">
      {inCartQuantity > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg flex items-center gap-1.5"
        >
          <FiShoppingBag size={12} />
          {inCartQuantity} na sacola
        </motion.div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`/images/menu${item.image}`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-amber-900 text-lg leading-tight">{item.name}</h3>
          <span className="font-bold text-amber-600 text-lg whitespace-nowrap">
            {formatCurrency(item.price)}
          </span>
        </div>
        
        {item.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        )}

        <div className="mt-auto">
          <AnimatePresence mode="wait">
            {!showSelector ? (
              <motion.button
                key="add-button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => setShowSelector(true)}
                className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-all font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
              >
                <FiPlus size={18} /> Adicionar
              </motion.button>
            ) : (
              <motion.div
                key="selector"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-1 border border-gray-200">
                  <button 
                    onClick={decrement}
                    className="p-2.5 text-amber-800 hover:bg-white hover:shadow-sm rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <FiMinus size={20} />
                  </button>
                  <span className="font-bold text-xl text-amber-900 w-8 text-center">{quantity}</span>
                  <button 
                    onClick={increment}
                    className="p-2.5 text-amber-800 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                  >
                    <FiPlus size={20} />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowSelector(false);
                      setQuantity(1);
                    }}
                    className="flex-1 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-[2] bg-amber-600 text-white py-2.5 rounded-lg hover:bg-amber-700 transition-all font-bold shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    Confirmar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};