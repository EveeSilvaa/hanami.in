import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Alteração aqui
import { motion, AnimatePresence } from 'framer-motion';

const QRCodeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUrl = window.location.origin + '/menu';

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-amber-600 text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 rounded-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-amber-800 mb-4">Acesse nosso cardápio</h3>
              <div className="flex justify-center mb-6 p-4 bg-white rounded">
                <QRCodeSVG // Alteração aqui
                  value={currentUrl} 
                  size={200} 
                  fgColor="#92400e"
                  level="H"
                />
              </div>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Escaneie este QR Code para acessar o cardápio no seu celular
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QRCodeModal;