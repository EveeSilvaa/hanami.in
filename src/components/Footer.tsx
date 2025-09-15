import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-50 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">Hanami Cafeteria</h3>
            <p className="mb-2">Amor em forma de xícara 😊</p>
            <p>Segunda à Sábado - 7h às 11:30h / 15h às 20h</p>
            <p>Domingo - 8h às 11h / 16h às 20h</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Localização</h3>
            <p>Av.nome - cidade</p>
            <p>CEP: 0000-0000</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <a 
              href="https://instagram.com/nomeficticio" 
              className="block mb-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @nomeficticio
            </a>
            <a 
              href="https://instagram.com/yvi_maz" 
              className="block hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @yvi_maz
            </a>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-t border-amber-800 mt-8 pt-6 text-center"
        >
          <p>© {new Date().getFullYear()} Evellyn Silva. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;