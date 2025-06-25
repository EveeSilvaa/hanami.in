import { motion } from 'framer-motion';
import { FaCoffee, FaHeart, FaStore } from 'react-icons/fa';

const AboutPage = () => {
  const galleryImages = [
    { id: 1, src: 'src/assets/images/ambiente2.jpeg', alt: 'Interior da cafeteria' },
    { id: 2, src: 'src/assets/images/ambiente3.jpeg', alt: 'Área externa' },
    { id: 3, src: 'src/assets/images/fotoambiente.jpeg', alt: 'Balcão de atendimento' },
    { id: 4, src: '/images/ambiente-4.jpg', alt: 'Nosso café especial' },
  ];

  return (
    <div className="bg-amber-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            Conheça a Hanami
          </h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-lg text-amber-700 max-w-3xl mx-auto">
            Amor em forma de xícara desde 2025
          </p>
        </motion.div>

        {/* Seção Nossa História */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
              <FaHeart className="text-amber-600 mr-3" />
              Nossa História
            </h2>
            <p className="text-amber-700 mb-4">
              A Hanami nasceu do sonho de trazer a autêntica experiência de café 
              especial para o coração da cidade. Inspirada na tradição japonesa 
              de apreciar a beleza efêmera, cada xícara é preparada com cuidado 
              e dedicação.
            </p>
            <p className="text-amber-700">
              Começamos pequenos, em uma esquina aconchegante, e hoje somos 
              referência em qualidade e atendimento personalizado.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <img 
              src="/images/historia.jpg" 
              alt="Fundadores da Hanami" 
              className="rounded-lg shadow-xl w-full h-auto max-h-96 object-cover"
            />
          </motion.div>
        </div>

        {/* Seção Galeria */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-amber-800 mb-8 text-center flex justify-center items-center"
          >
            <FaStore className="text-amber-600 mr-3" />
            Nosso Espaço
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Seção Filosofia */}
        <div className="bg-amber-100 rounded-xl p-8 md:p-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FaCoffee className="text-amber-600 text-4xl mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-4">
              Nossa Filosofia
            </h2>
            <p className="text-amber-700 max-w-3xl mx-auto">
              "Na Hanami, acreditamos que cada xícara conta uma história. Desde a seleção 
              dos grãos até o serviço final, buscamos criar momentos especiais e memoráveis 
              para nossos clientes, onde o café se torna uma experiência sensorial completa."
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;