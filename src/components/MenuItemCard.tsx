import { useCart } from '../contexts/CartContext';

export const MenuItemCard = ({ item }: { item: any }) => {
  const { addToCart, formatCurrency } = useCart();

  const generateItemId = () => {
    return `${item.category}-${item.name}-${item.price}`
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`/menu/${item.category}/${item.image}`}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-amber-900">{item.name}</h3>
          <span className="font-bold text-amber-600">
            {formatCurrency(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        )}
        <button
          onClick={() => addToCart({
            id: generateItemId(),
            name: item.name,
            price: item.price,
            category: item.category,
            image: item.image
          })}
          className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-all"
        >
          Adicionar à sacola
        </button>
      </div>
    </div>
  );
};