import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  formatCurrency: (value: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('hanamiCart', JSON.stringify(newCart));
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const preciseAdd = (a: number, b: number) => {
    return parseFloat((a + b).toFixed(2));
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItemIndex = cart.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex] = {
        ...newCart[existingItemIndex],
        quantity: newCart[existingItemIndex].quantity + 1
      };
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...item, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => 
    cart.reduce((sum, item) => preciseAdd(sum, item.price * item.quantity), 0), 
    [cart]
  );

  const increaseQuantity = (id: string) => {
    saveCart(cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id: string) => {
    const item = cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
      saveCart(cart.map(item => 
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      removeItem(id);
    }
  };

  const removeItem = (id: string) => {
    saveCart(cart.filter(item => item.id !== id));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider 
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        totalItems,
        totalPrice,
        isCartOpen,
        toggleCart,
        formatCurrency
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};