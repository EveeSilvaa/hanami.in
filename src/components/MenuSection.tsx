import { motion } from 'framer-motion';
import type { MenuItem } from '../types';

interface MenuSectionProps {
  id?: string;
  title: string;
  items: MenuItem[];
}

import { MenuItemCard } from './MenuItemCard';

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