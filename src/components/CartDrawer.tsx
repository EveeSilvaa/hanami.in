import { FiShoppingBag, FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTelegramPlane } from 'react-icons/fa';
import { useState } from 'react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    toggleCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalItems,
    totalPrice,
    formatCurrency
  } = useCart();

  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('dinheiro');

  const [isSending, setIsSending] = useState(false);

  const sendOrderToTelegram = async () => {
    if (!tableNumber || !customerName) {
      alert('Por favor, informe seu nome e o número da mesa');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: customerName,
          table_number: tableNumber,
          payment_method: paymentMethod,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          total_price: totalPrice,
        }),
      });

      if (response.ok) {
        const { orderId } = await response.json();
        toggleCart();
        window.location.href = `/track/${orderId}`;
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error('Falha ao enviar o pedido');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('❌ Erro ao enviar pedido. Por favor, fale com um atendente diretamente.');
    } finally {
      setIsSending(false);
    }
  };

  const getImagePath = (item: any) => {
    return `/images/menu/${item.image}`;
  };

  return (
    <>
      {/* Botão da sacola flutuante */}
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 bg-amber-600 text-white p-4 rounded-full shadow-xl z-30 hover:bg-amber-700 transition-all"
      >
        <FiShoppingBag size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Drawer da sacola */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleCart}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
            >
              <div className="p-6 flex-grow overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-amber-800 flex items-center gap-2">
                    <FiShoppingBag /> Sua Sacola ({totalItems})
                  </h2>
                  <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
                    <FiX size={24} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Sua sacola está vazia</p>
                    <button 
                      onClick={toggleCart}
                      className="mt-4 text-amber-600 hover:text-amber-800"
                    >
                      Ver cardápio
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-1">
                          Seu Nome
                        </label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full p-2 border border-amber-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Ex: João"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-1">
                          Nº da Mesa
                        </label>
                        <input
                          type="text"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full p-2 border border-amber-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Ex: 5"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-amber-700 mb-1">
                        Forma de Pagamento
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-2 border border-amber-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="dinheiro">Dinheiro</option>
                        <option value="cartão">Cartão</option>
                        <option value="pix">PIX</option>
                      </select>
                    </div>

                    <ul className="divide-y">
                      {cart.map(item => (
                        <li key={item.id} className="py-4">
                          <div className="flex gap-4">
                            <img 
                              src={getImagePath(item)}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                              }}
                            />
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{item.name}</h3>
                                <span className="font-medium">
                                  {formatCurrency(item.price * item.quantity)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center border rounded-lg overflow-hidden">
                                  <button 
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                                  >
                                    <FiMinus size={14} />
                                  </button>
                                  <span className="px-3">{item.quantity}</span>
                                  <button 
                                    onClick={() => increaseQuantity(item.id)}
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                                  >
                                    <FiPlus size={14} />
                                  </button>
                                </div>
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 p-2 transition-colors"
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <button
                    onClick={sendOrderToTelegram}
                    disabled={isSending}
                    className={`w-full ${isSending ? 'bg-gray-400' : 'bg-[#0088cc] hover:bg-[#0077b5]'} text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95`}
                  >
                    {isSending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <>
                        <FaTelegramPlane size={20} />
                        Enviar Pedido
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};