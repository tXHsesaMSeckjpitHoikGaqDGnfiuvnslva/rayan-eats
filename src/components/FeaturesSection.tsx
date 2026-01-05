import { Truck, Clock, CreditCard, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free delivery within 5km radius. Orders delivered within 30-45 minutes.',
  },
  {
    icon: Clock,
    title: 'Pre-Order Available',
    description: 'Schedule your orders in advance for pickup or delivery at your preferred time.',
  },
  {
    icon: CreditCard,
    title: 'Easy Payments',
    description: 'Pay conveniently via UPI or Cash on Delivery. Secure transactions guaranteed.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Fresh ingredients, hygienic preparation, and quality you can trust since 1985.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-app">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
