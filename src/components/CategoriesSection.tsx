import { Link } from 'react-router-dom';
import { categories } from '@/data/menu';
import { motion } from 'framer-motion';

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container-app">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Explore Our Menu
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            From hearty breakfasts to aromatic biryanis, discover your favorites
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/menu?category=${category.id}`}
                className="group block p-6 rounded-2xl bg-card border border-border text-center hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.itemCount} items
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
